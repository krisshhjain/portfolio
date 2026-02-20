import { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
    sparkColor = '#fff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
    children,
}) => {
    const canvasRef = useRef(null);
    const sparksRef = useRef([]);

    const createSpark = useCallback((x, y) => {
        const spark = {
            x, y,
            particles: Array.from({ length: sparkCount }, (_, i) => {
                const angle = (Math.PI * 2 * i) / sparkCount;
                return {
                    x: 0, y: 0,
                    vx: Math.cos(angle) * sparkRadius * extraScale,
                    vy: Math.sin(angle) * sparkRadius * extraScale,
                    life: 1,
                    size: sparkSize,
                };
            }),
            startTime: performance.now(),
        };
        sparksRef.current.push(spark);
    }, [sparkCount, sparkRadius, sparkSize, extraScale]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const animate = (now) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            sparksRef.current = sparksRef.current.filter(spark => {
                const elapsed = now - spark.startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                spark.particles.forEach(p => {
                    const px = spark.x + p.vx * easedProgress;
                    const py = spark.y + p.vy * easedProgress;
                    const size = p.size * (1 - progress);
                    const alpha = 1 - progress;

                    ctx.save();
                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = sparkColor;
                    ctx.beginPath();
                    ctx.arc(px, py, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                });

                return progress < 1;
            });
            animId = requestAnimationFrame(animate);
        };
        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, [sparkColor, duration]);

    const handleClick = (e) => {
        createSpark(e.clientX, e.clientY);
    };

    return (
        <div onClick={handleClick} style={{ position: 'relative' }}>
            {children}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 99999,
                }}
            />
        </div>
    );
};

export default ClickSpark;
