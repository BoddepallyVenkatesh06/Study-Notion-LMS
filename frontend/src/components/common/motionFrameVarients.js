
export const fadeIn = (direction, delay) => {
    return {
        hidden: {
            y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
            opacity: 0,

            x: direction === 'left' ? 80 : direction === 'right' ? -180 : 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.6,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75]
            }
        }
    }
}



export const bounce = {
    hidden: { y: -10, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
            duration: 0.5,
        }
    }
};




export const scaleUp = {
    hidden: { scale: 0.1, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
            duration: 0.5,
        }
    }
};
