import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);
    // 0 = initials scattered on dark
    // 1 = initials slide to left, star to right
    // 2 = white panels wipe in (dark stays underneath until panels land)
    // 3 = "rish" / "ain" slide in to complete name
    // 4 = exit

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 2000),
            setTimeout(() => setPhase(2), 4000),
            setTimeout(() => setPhase(3), 5200),  // after panels fully landed (4000+1100)
            setTimeout(() => setPhase(4), 8200),
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 9200),
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase < 4 && (
                <motion.div
                    className="splash"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Dark base — stays fully opaque always, panels cover it */}
                    <div className="splash__dark" />

                    {/* White panels wipe in from top+bottom — start at phase 2 */}
                    <motion.div
                        className="splash__panel splash__panel--top"
                        initial={{ y: '-100%' }}
                        animate={{ y: phase >= 2 ? '0%' : '-100%' }}
                        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                    />
                    <motion.div
                        className="splash__panel splash__panel--bottom"
                        initial={{ y: '100%' }}
                        animate={{ y: phase >= 2 ? '0%' : '100%' }}
                        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                    />

                    {/* ── FIRST NAME: K + rish ── */}
                    <div className="splash__name-row splash__name-row--first">
                        <motion.span
                            className="splash__letter"
                            initial={{ x: '12vw', y: '18vh', opacity: 0, scale: 0.8 }}
                            animate={
                                phase === 0
                                    ? { x: '12vw', y: '18vh', opacity: 1, scale: 1, color: 'rgba(255,255,255,0.85)' }
                                    : phase <= 1
                                        ? { x: 0, y: 0, opacity: 1, scale: 1, color: 'rgba(255,255,255,0.85)' }
                                        : { x: 0, y: 0, opacity: 1, scale: 1, color: '#111' }
                            }
                            transition={{
                                duration: phase === 0 ? 1.0 : 1.2,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            K
                        </motion.span>

                        <motion.span
                            className="splash__letter-rest"
                            initial={{ opacity: 0, x: 50 }}
                            animate={
                                phase >= 3
                                    ? { opacity: 1, x: 0, color: '#111' }
                                    : { opacity: 0, x: 50 }
                            }
                            transition={{
                                duration: 0.8,
                                delay: phase >= 3 ? 0.1 : 0,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            rish
                        </motion.span>
                    </div>

                    {/* ── LAST NAME: J + ain ── */}
                    <div className="splash__name-row splash__name-row--last">
                        <motion.span
                            className="splash__letter"
                            initial={{ x: '22vw', y: '32vh', opacity: 0, scale: 0.8 }}
                            animate={
                                phase === 0
                                    ? { x: '22vw', y: '32vh', opacity: 1, scale: 1, color: 'rgba(255,255,255,0.85)' }
                                    : phase <= 1
                                        ? { x: 0, y: 0, opacity: 1, scale: 1, color: 'rgba(255,255,255,0.85)' }
                                        : { x: 0, y: 0, opacity: 1, scale: 1, color: '#111' }
                            }
                            transition={{
                                duration: phase === 0 ? 1.0 : 1.2,
                                delay: phase === 0 ? 0.25 : 0,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            J
                        </motion.span>

                        <motion.span
                            className="splash__letter-rest"
                            initial={{ opacity: 0, x: 50 }}
                            animate={
                                phase >= 3
                                    ? { opacity: 1, x: 0, color: '#111' }
                                    : { opacity: 0, x: 50 }
                            }
                            transition={{
                                duration: 0.8,
                                delay: phase >= 3 ? 0.2 : 0,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            ain
                        </motion.span>
                    </div>

                    {/* Star symbol */}
                    <motion.span
                        className="splash__star"
                        initial={{ x: '55vw', y: '35vh', opacity: 0, rotate: -45 }}
                        animate={
                            phase === 0
                                ? { x: '55vw', y: '35vh', opacity: 1, rotate: 0 }
                                : phase <= 1
                                    ? { x: 0, y: 0, opacity: 1, rotate: 0 }
                                    : { x: 0, y: 0, opacity: 1, rotate: 0, color: '#111' }
                        }
                        transition={{
                            duration: phase === 0 ? 1.0 : 1.2,
                            delay: phase === 0 ? 0.5 : 0,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                    >
                        (✦)
                    </motion.span>

                    {/* Tagline */}
                    <motion.p
                        className="splash__tagline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Full Stack Developer & Cloud Enthusiast
                    </motion.p>

                    {/* Horizontal line accent */}
                    <motion.div
                        className="splash__line"
                        initial={{ scaleX: 0 }}
                        animate={phase >= 3 ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
