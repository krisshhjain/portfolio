import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './DecryptedText.css';

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'view',
    revealDirection = 'start',
    onAnimationComplete,
    sequential = false,
    useOriginalCharsOnly = false,
    ...props
}) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);
    const intervalRef = useRef(null);
    const iterationRef = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsInView(true);
            },
            { threshold: 0.3 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (animateOn === 'view' && isInView && !hasAnimated) {
            // Delay to let the parent MotionWrap entrance animation finish first
            const timer = setTimeout(() => {
                startAnimation();
                setHasAnimated(true);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isInView, animateOn, hasAnimated]);

    const startAnimation = () => {
        iterationRef.current = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            iterationRef.current += 1;
            setDisplayText(prev =>
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        const revealIndex = revealDirection === 'start' ? index : text.length - 1 - index;
                        if (revealIndex < iterationRef.current) return text[index];
                        const pool = useOriginalCharsOnly ? text : characters;
                        return pool[Math.floor(Math.random() * pool.length)];
                    })
                    .join('')
            );
            if (iterationRef.current >= text.length + maxIterations) {
                clearInterval(intervalRef.current);
                setDisplayText(text);
                onAnimationComplete?.();
            }
        }, speed);
    };

    const handleHoverStart = () => {
        if (animateOn !== 'hover') return;
        setIsHovering(true);
        startAnimation();
    };

    const handleHoverEnd = () => {
        if (animateOn !== 'hover') return;
        setIsHovering(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    return (
        <motion.span
            ref={containerRef}
            className={`decrypted-text ${parentClassName}`}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            {...props}
        >
            {displayText.split('').map((char, index) => {
                const isRevealed = char === text[index];
                return (
                    <span
                        key={index}
                        className={isRevealed ? className : `${className} ${encryptedClassName}`}
                    >
                        {char}
                    </span>
                );
            })}
        </motion.span>
    );
}
