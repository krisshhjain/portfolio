import React, { useRef, useState, useEffect, useCallback } from 'react';
import DomeGallery from '../../components/ReactBits/DomeGallery/DomeGallery';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import { useTheme } from '../../context/ThemeContext';
import './Gallery.css';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtku6vik9/image/upload/f_auto,q_auto,w_600,c_limit,fl_progressive';

const publicIds = [
    '20251024_142006528_iOS-1_jklmtr',
    '20260124_104536137_iOS_q15hes',
    '20260220_074911850_iOS_hrhj4g',
    '20260218_212217098_iOS_kjtvp9',
    '20260124_084351747_iOS_h9eteu',
    '20250902_093608726_iOS_y0syjc',
    '20250616_072909411_iOS_dw0t6c',
    '20260102_122851784_iOS_yay2p9',
    '20251225_031604465_iOS_wj7jv8',
    '20251101_180330246_iOS_pmifdv',
    '20251031_164939236_iOS_eybset',
    '20251001_133852525_iOS_yssubn',
    '20250524_175927846_iOS_wnw7yg',
    '20250901_183850527_iOS_q3bpwl',
    '20250615_135002074_iOS_pwvqdt',
    '20250612_125953795_iOS_x051jg',
    '20250517_104710331_iOS_haacns',
    '20250524_181250941_iOS_bjainl',
    '20250524_180937375_iOS_j0a2yw',
    '20241231_111130005_iOS_wyfopm',
    '20250103_121643980_iOS_rndzbk',
    '20250101_095716026_iOS_jpvgcp',
    '20241230_103627004_iOS_mwatfd',
    '20241101_022156502_iOS_oj6kyb',
    '20250101_123752131_iOS_ugmh3k',
    '20241101_023830213_iOS_qbnnzy',
    '20241230_121405429_iOS_lpwx50',
    '20241031_072621919_iOS_kkxqjp',
    '20241225_155152840_iOS_fepjkk',
    '20240528_091143900_iOS_nw9ij4',
    '20241031_214837956_iOS_yncciu',
    '20240111_151128612_iOS_r8i0v6',
    '20241026_113633119_iOS_kluabp',
];

const galleryImages = publicIds.map((id, i) => ({
    src: `${CLOUDINARY_BASE}/${id}`,
    alt: `Moment ${i + 1}`
}));

/* ── Scroll-hijack settings ── */
const TOTAL_SCROLL_DEG = 360;            // 1 full rotation before release
const DEG_PER_PIXEL = 0.35;             // how fast wheel-delta maps to rotation

const Gallery = () => {
    const domeRef = useRef(null);
    const sectionRef = useRef(null);
    const accumulatedRef = useRef(0);       // degrees rotated so far
    const hijackingRef = useRef(false);
    const completedRef = useRef(false);     // true once rotation finished
    const { theme } = useTheme();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        setIsMobile(mq.matches);
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    /* ── Bulletproof scroll-hijack using overflow:hidden ── */
    /* When dome is in view, freeze the page (overflow:hidden), then
       only wheel events rotate the dome. No scroll fighting. */
    useEffect(() => {
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) return;

        let cooldown = false;

        /* Observe the dome container */
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (cooldown || completedRef.current) return;
                if (!entry.isIntersecting) {
                    // If scrolled away before completing, reset
                    if (!hijackingRef.current) {
                        accumulatedRef.current = 0;
                    }
                    return;
                }

                // Dome is sufficiently visible — snap to center and lock
                if (!hijackingRef.current) {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    setTimeout(() => {
                        // Freeze the page
                        document.documentElement.style.overflow = 'hidden';
                        document.body.style.overflow = 'hidden';
                        hijackingRef.current = true;
                    }, 500);
                }
            },
            { threshold: 0.6 }
        );

        const startObserving = () => {
            const domeEl = sectionRef.current?.querySelector('.gallery__dome-container');
            if (domeEl) observer.observe(domeEl);
        };
        startObserving();

        /* Wheel handler — rotate dome while locked, or allow up-scroll to escape */
        const handleWheel = (e) => {
            if (!hijackingRef.current || !domeRef.current) return;

            const deltaY = e.deltaY;

            // Allow scrolling up to escape — unfreeze the page
            if (deltaY < 0) {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                hijackingRef.current = false;
                accumulatedRef.current = 0;
                return;
            }

            // Scrolling down — prevent default and rotate dome
            e.preventDefault();

            const degreeDelta = deltaY * DEG_PER_PIXEL;
            accumulatedRef.current += Math.abs(degreeDelta);

            domeRef.current.scrollRotate(degreeDelta);

            // Done — unfreeze and mark completed
            if (accumulatedRef.current >= TOTAL_SCROLL_DEG) {
                completedRef.current = true;
                hijackingRef.current = false;
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';

                // Cooldown so the observer doesn't re-trigger immediately
                cooldown = true;
                setTimeout(() => { cooldown = false; }, 2000);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            observer.disconnect();
            window.removeEventListener('wheel', handleWheel);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, []);

    /* Progress indicator (subtle) */
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let raf;
        const tick = () => {
            const p = Math.min(accumulatedRef.current / TOTAL_SCROLL_DEG, 1);
            setProgress(p);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div className="app__gallery" id="gallery" ref={sectionRef}>
            <h2 className="head-text gallery__title">
                <DecryptedText text="Moments" speed={50} maxIterations={10} animateOn="view" />
            </h2>
            <p className="gallery__subtitle">Drag to explore • Click to enlarge</p>

            {/* Scroll progress ring */}
            {progress > 0 && progress < 1 && (
                <div className="gallery__scroll-hint">
                    <svg className="gallery__progress-ring" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(82,39,255,0.15)" strokeWidth="2.5" />
                        <circle
                            cx="20" cy="20" r="17"
                            fill="none"
                            stroke="#5227FF"
                            strokeWidth="2.5"
                            strokeDasharray={`${progress * 106.8} 106.8`}
                            strokeLinecap="round"
                            transform="rotate(-90 20 20)"
                            style={{ transition: 'stroke-dasharray 0.1s ease' }}
                        />
                    </svg>
                    <span className="gallery__scroll-label">Scroll to explore</span>
                </div>
            )}

            <div className="gallery__dome-container">
                <DomeGallery
                    ref={domeRef}
                    images={galleryImages}
                    fit={isMobile ? 0.6 : 0.8}
                    minRadius={isMobile ? 280 : 600}
                    maxVerticalRotationDeg={0}
                    segments={isMobile ? 20 : 34}
                    dragDampening={2}
                    grayscale
                    overlayBlurColor={theme === 'light' ? '#f5f3ff' : '#060010'}
                    imageBorderRadius="12px"
                    openedImageBorderRadius="16px"
                    openedImageWidth={isMobile ? "200px" : "300px"}
                    openedImageHeight={isMobile ? "280px" : "420px"}
                />
            </div>
        </div>
    );
};

export default Gallery;
