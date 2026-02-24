import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
    <div ref={ref} {...rest} className={`card-swap__card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
});

const placeNow = (el, slot, skew) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true
    });

const CardSwap = ({
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    autoPlay = true,
    onActiveChange,
    skewAmount = 6,
    easing = 'elastic',
    children
}) => {
    const config =
        easing === 'elastic'
            ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
            : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

    const childArr = useMemo(() => Children.toArray(children), [children]);
    const refs = useMemo(
        () => childArr.map(() => React.createRef()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [childArr.length]
    );

    const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
    const tlRef = useRef(null);
    const intervalRef = useRef();
    const container = useRef(null);
    const swapRef = useRef(null);
    const onActiveChangeRef = useRef(onActiveChange);

    useEffect(() => { onActiveChangeRef.current = onActiveChange; }, [onActiveChange]);

    useEffect(() => {
        const total = refs.length;
        refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

        // Fire initial active
        if (onActiveChangeRef.current) onActiveChangeRef.current(order.current[0]);

        const swap = () => {
            if (order.current.length < 2) return;
            if (tlRef.current) tlRef.current.kill();

            const [front, ...rest] = order.current;
            const elFront = refs[front].current;

            // Update order IMMEDIATELY so rapid clicks always use correct state
            order.current = [...rest, front];

            // Immediately update text to the new front
            if (onActiveChangeRef.current) onActiveChangeRef.current(rest[0]);

            const tl = gsap.timeline();
            tlRef.current = tl;

            tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });

            tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
            rest.forEach((idx, i) => {
                const el = refs[idx].current;
                const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
                tl.set(el, { zIndex: slot.zIndex }, 'promote');
                tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
            });

            const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
            tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
            tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
            tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
        };

        swapRef.current = swap;

        // Auto-cycle only when autoPlay is true
        if (autoPlay) {
            intervalRef.current = window.setInterval(swap, delay);
        }

        if (pauseOnHover) {
            const node = container.current;
            const pause = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
            const resume = () => { tlRef.current?.play(); intervalRef.current = window.setInterval(swap, delay); };
            node.addEventListener('mouseenter', pause);
            node.addEventListener('mouseleave', resume);
            return () => { node.removeEventListener('mouseenter', pause); node.removeEventListener('mouseleave', resume); clearInterval(intervalRef.current); };
        }
        return () => clearInterval(intervalRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, autoPlay]);

    // Click on front card → trigger swap + reset timer
    // Front card naturally receives clicks (highest zIndex), no guard needed
    const handleCardClick = () => {
        clearInterval(intervalRef.current);
        swapRef.current?.();
        intervalRef.current = window.setInterval(() => swapRef.current?.(), delay);
    };

    const rendered = childArr.map((child, i) =>
        isValidElement(child)
            ? cloneElement(child, {
                key: i,
                ref: refs[i],
                style: { width, height, cursor: 'pointer', ...(child.props.style ?? {}) },
                onClick: (e) => {
                    child.props.onClick?.(e);
                    handleCardClick();
                }
            })
            : child
    );

    return (
        <div ref={container} className="card-swap__container" style={{ width, height }}>
            {rendered}
        </div>
    );
};

export default CardSwap;
