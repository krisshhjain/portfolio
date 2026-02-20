import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

import './CircularGallery.css';

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function lerp(p1, p2, t) {
    return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
    const proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach(key => {
        if (key !== 'constructor' && typeof instance[key] === 'function') {
            instance[key] = instance[key].bind(instance);
        }
    });
}

function wrapText(context, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        if (context.measureText(testLine).width > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    return lines;
}

function createTextTexture(gl, text, font = 'bold 30px monospace', color = 'black') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const fontSize = parseInt(font, 10);
    const lineHeight = Math.ceil(fontSize * 1.4);
    const maxWidth = 260;

    const lines = wrapText(context, text, maxWidth);

    // Canvas width is the wider of maxWidth or the widest single line (capped)
    let widestLine = 0;
    for (const line of lines) {
        widestLine = Math.max(widestLine, context.measureText(line).width);
    }
    canvas.width = Math.min(Math.ceil(widestLine), maxWidth) + 24;
    canvas.height = lineHeight * lines.length + 16;

    // Re-set font after resize (canvas resize clears context state)
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.clearRect(0, 0, canvas.width, canvas.height);

    const startY = (canvas.height - lineHeight * lines.length) / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], canvas.width / 2, startY + i * lineHeight);
    }

    const texture = new Texture(gl, { generateMipmaps: false });
    texture.image = canvas;
    return { texture, width: canvas.width, height: canvas.height };
}

class Title {
    constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }) {
        autoBind(this);
        this.gl = gl;
        this.plane = plane;
        this.renderer = renderer;
        this.text = text;
        this.textColor = textColor;
        this.font = font;
        this.createMesh();
    }
    createMesh() {
        const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
        const geometry = new Plane(this.gl);
        const program = new Program(this.gl, {
            vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
            uniforms: { tMap: { value: texture } },
            transparent: true
        });
        this.mesh = new Mesh(this.gl, { geometry, program });
        const aspect = width / height;
        // Cap the text width so it doesn't exceed the plane width
        const maxTextW = this.plane.scale.x * 0.85;
        let textW = maxTextW;
        let textH = textW / aspect;
        // If text is taller than expected, scale down
        const maxH = this.plane.scale.y * 0.25;
        if (textH > maxH) {
            textH = maxH;
            textW = textH * aspect;
        }
        this.mesh.scale.set(textW, textH, 1);
        this.mesh.position.y = -this.plane.scale.y * 0.5 - textH * 0.5 - 0.08;
        this.mesh.setParent(this.plane);
    }
}

class Media {
    constructor({
        geometry,
        gl,
        image,
        index,
        length,
        renderer,
        scene,
        screen,
        text,
        viewport,
        bend,
        textColor,
        borderRadius = 0,
        font
    }) {
        this.extra = 0;
        this.geometry = geometry;
        this.gl = gl;
        this.image = image;
        this.index = index;
        this.length = length;
        this.renderer = renderer;
        this.scene = scene;
        this.screen = screen;
        this.text = text;
        this.viewport = viewport;
        this.bend = bend;
        this.textColor = textColor;
        this.borderRadius = borderRadius;
        this.font = font;
        this.createShader();
        this.createMesh();
        this.createTitle();
        this.onResize();
    }
    createShader() {
        const texture = new Texture(this.gl, {
            generateMipmaps: true
        });
        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
            uniforms: {
                tMap: { value: texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uSpeed: { value: 0 },
                uTime: { value: 100 * Math.random() },
                uBorderRadius: { value: this.borderRadius }
            },
            transparent: true
        });
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.image;
        img.onload = () => {
            texture.image = img;
            this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
        };
    }
    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        });
        this.plane.setParent(this.scene);
    }
    createTitle() {
        this.title = new Title({
            gl: this.gl,
            plane: this.plane,
            renderer: this.renderer,
            text: this.text,
            textColor: this.textColor,
            fontFamily: this.font
        });
    }
    update(scroll, direction) {
        this.plane.position.x = this.x - scroll.current - this.extra;

        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        } else {
            const B_abs = Math.abs(this.bend);
            const R = (H * H + B_abs * B_abs) / (2 * B_abs);
            const effectiveX = Math.min(Math.abs(x), H);

            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
            } else {
                this.plane.position.y = arc;
                this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
            }
        }

        this.speed = scroll.current - scroll.last;
        this.program.uniforms.uTime.value += 0.04;
        this.program.uniforms.uSpeed.value = this.speed;

        const planeOffset = this.plane.scale.x / 2;
        const viewportOffset = this.viewport.width / 2;
        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
        if (direction === 'right' && this.isBefore) {
            this.extra -= this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
        if (direction === 'left' && this.isAfter) {
            this.extra += this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
    }
    onResize({ screen, viewport } = {}) {
        if (screen) this.screen = screen;
        if (viewport) {
            this.viewport = viewport;
            if (this.plane.program.uniforms.uViewportSizes) {
                this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
            }
        }
        this.scale = this.screen.height / 1500;
        this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
        this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
        this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
        this.padding = 2;
        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }
}

class GalleryApp {
    constructor(
        container,
        {
            items,
            bend,
            textColor = '#ffffff',
            borderRadius = 0,
            font = 'bold 30px Figtree',
            scrollSpeed = 2,
            scrollEase = 0.05,
            onItemClick
        } = {}
    ) {
        this.container = container;
        this.scrollSpeed = scrollSpeed;
        this.onItemClick = onItemClick;
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck, 200);
        this.dragDistance = 0;
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias(items, bend, textColor, borderRadius, font);
        this.update();
        this.addEventListeners();
    }
    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.gl.canvas);
    }
    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }
    createScene() {
        this.scene = new Transform();
    }
    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100
        });
    }
    createMedias(items, bend = 1, textColor, borderRadius, font) {
        const galleryItems = items && items.length ? items : [];
        this.mediasImages = galleryItems.concat(galleryItems);
        this.medias = this.mediasImages.map((data, index) => {
            return new Media({
                geometry: this.planeGeometry,
                gl: this.gl,
                image: data.image,
                index,
                length: this.mediasImages.length,
                renderer: this.renderer,
                scene: this.scene,
                screen: this.screen,
                text: data.text,
                viewport: this.viewport,
                bend,
                textColor,
                borderRadius,
                font
            });
        });
    }
    onTouchDown(e) {
        this.isDown = true;
        this.dragDistance = 0;
        this.scroll.position = this.scroll.current;
        this.start = e.touches ? e.touches[0].clientX : e.clientX;
    }
    onTouchMove(e) {
        if (!this.isDown) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const distance = (this.start - x) * (this.scrollSpeed * 0.025);
        this.dragDistance += Math.abs(x - this.start);
        this.scroll.target = this.scroll.position + distance;
    }
    onTouchUp(e) {
        if (!this.isDown) return;
        this.isDown = false;

        // If drag was very small, treat as click
        if (this.dragDistance < 5 && this.onItemClick) {
            const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
            this.handleClick(clientX, clientY);
        }

        this.onCheck();
    }
    handleClick(clientX, clientY) {
        if (!this.medias || !this.medias.length) return;

        const rect = this.container.getBoundingClientRect();
        // Convert click to normalized device coordinates (-1 to 1)
        const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ndcY = -(((clientY - rect.top) / rect.height) * 2 - 1);

        const originalLength = this.mediasImages.length / 2;
        let bestIndex = null;
        let bestDist = Infinity;

        // Project each plane's world position to screen space and find closest to click
        this.medias.forEach((media, i) => {
            const plane = media.plane;
            // Get world position of this plane's center
            const wx = plane.position.x;
            const wy = plane.position.y;
            const wz = plane.position.z || 0;

            // Project to clip space using camera matrices
            // viewMatrix * worldPos
            const vm = this.camera.viewMatrix;
            const vx = vm[0] * wx + vm[4] * wy + vm[8] * wz + vm[12];
            const vy = vm[1] * wx + vm[5] * wy + vm[9] * wz + vm[13];
            const vz = vm[2] * wx + vm[6] * wy + vm[10] * wz + vm[14];
            const vw = vm[3] * wx + vm[7] * wy + vm[11] * wz + vm[15];

            // projectionMatrix * viewPos
            const pm = this.camera.projectionMatrix;
            const cx = pm[0] * vx + pm[4] * vy + pm[8] * vz + pm[12] * vw;
            const cy = pm[1] * vx + pm[5] * vy + pm[9] * vz + pm[13] * vw;
            const cw = pm[3] * vx + pm[7] * vy + pm[11] * vz + pm[15] * vw;

            if (cw === 0) return;

            // NDC position of this plane
            const screenX = cx / cw;
            const screenY = cy / cw;

            // Also compute approximate screen-space half-width of the plane
            const halfW = plane.scale.x / 2;
            const edgeX = wx + halfW;
            const evx = vm[0] * edgeX + vm[4] * wy + vm[8] * wz + vm[12];
            const evy = vm[1] * edgeX + vm[5] * wy + vm[9] * wz + vm[13];
            const evz = vm[2] * edgeX + vm[6] * wy + vm[10] * wz + vm[14];
            const evw = vm[3] * edgeX + vm[7] * wy + vm[11] * wz + vm[15];
            const ecx = pm[0] * evx + pm[4] * evy + pm[8] * evz + pm[12] * evw;
            const ecw = pm[3] * evx + pm[7] * evy + pm[11] * evz + pm[15] * evw;
            const screenEdgeX = ecx / ecw;
            const screenHalfW = Math.abs(screenEdgeX - screenX);

            const halfH = plane.scale.y / 2;
            const edgeY = wy + halfH;
            const evy2 = vm[0] * wx + vm[4] * edgeY + vm[8] * wz + vm[12];
            const eyy2 = vm[1] * wx + vm[5] * edgeY + vm[9] * wz + vm[13];
            const evz2 = vm[2] * wx + vm[6] * edgeY + vm[10] * wz + vm[14];
            const evw2 = vm[3] * wx + vm[7] * edgeY + vm[11] * wz + vm[15];
            const ecy = pm[1] * evy2 + pm[5] * eyy2 + pm[9] * evz2 + pm[13] * evw2;
            const ecw2 = pm[3] * evy2 + pm[7] * eyy2 + pm[11] * evz2 + pm[15] * evw2;
            const screenEdgeY = ecy / ecw2;
            const screenHalfH = Math.abs(screenEdgeY - screenY);

            // Check if click is inside this plane's screen-space bounds
            if (Math.abs(ndcX - screenX) < screenHalfW && Math.abs(ndcY - screenY) < screenHalfH) {
                const dist = Math.abs(ndcX - screenX);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestIndex = i % originalLength;
                }
            }
        });

        if (bestIndex !== null) {
            this.onItemClick(bestIndex);
        }
    }
    onWheel(e) {
        const delta = e.deltaY || e.wheelDelta || e.detail;
        this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
        this.onCheckDebounce();
    }
    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }
    onResize() {
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({
            aspect: this.screen.width / this.screen.height
        });
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        if (this.medias) {
            this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
        }
    }
    update() {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, direction));
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }
    addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);
        window.addEventListener('resize', this.boundOnResize);
        window.addEventListener('mousewheel', this.boundOnWheel);
        window.addEventListener('wheel', this.boundOnWheel);
        window.addEventListener('mousedown', this.boundOnTouchDown);
        window.addEventListener('mousemove', this.boundOnTouchMove);
        window.addEventListener('mouseup', this.boundOnTouchUp);
        window.addEventListener('touchstart', this.boundOnTouchDown);
        window.addEventListener('touchmove', this.boundOnTouchMove);
        window.addEventListener('touchend', this.boundOnTouchUp);
    }
    destroy() {
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.boundOnResize);
        window.removeEventListener('mousewheel', this.boundOnWheel);
        window.removeEventListener('wheel', this.boundOnWheel);
        window.removeEventListener('mousedown', this.boundOnTouchDown);
        window.removeEventListener('mousemove', this.boundOnTouchMove);
        window.removeEventListener('mouseup', this.boundOnTouchUp);
        window.removeEventListener('touchstart', this.boundOnTouchDown);
        window.removeEventListener('touchmove', this.boundOnTouchMove);
        window.removeEventListener('touchend', this.boundOnTouchUp);
        if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
            this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
        }
    }
}

export default function CircularGallery({
    items,
    bend = 3,
    textColor = '#ffffff',
    borderRadius = 0.05,
    font = 'bold 30px Figtree',
    scrollSpeed = 2,
    scrollEase = 0.05,
    onItemClick
}) {
    const containerRef = useRef(null);
    useEffect(() => {
        const app = new GalleryApp(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, onItemClick });
        return () => {
            app.destroy();
        };
    }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, onItemClick]);
    return <div className="circular-gallery" ref={containerRef} />;
}
