import { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Stepper.css';

export const Step = ({ children }) => <div className="step-content">{children}</div>;

const Stepper = ({
    children,
    initialStep = 1,
    onStepChange,
    onFinalStepCompleted,
    backButtonText = 'Previous',
    nextButtonText = 'Next',
    className = ''
}) => {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [direction, setDirection] = useState(1);
    const steps = Children.toArray(children);
    const totalSteps = steps.length;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setDirection(1);
            const next = currentStep + 1;
            setCurrentStep(next);
            onStepChange?.(next);
        } else {
            onFinalStepCompleted?.();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            const prev = currentStep - 1;
            setCurrentStep(prev);
            onStepChange?.(prev);
        }
    };

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
    };

    return (
        <div className={`stepper ${className}`}>
            <div className="stepper-progress">
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`stepper-dot ${index + 1 <= currentStep ? 'active' : ''} ${index + 1 === currentStep ? 'current' : ''}`}
                    >
                        <span>{index + 1}</span>
                    </div>
                ))}
                <div className="stepper-progress-bar">
                    <motion.div
                        className="stepper-progress-fill"
                        animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                </div>
            </div>

            <div className="stepper-body">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="stepper-step"
                    >
                        {steps[currentStep - 1]}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="stepper-actions">
                <button
                    className="stepper-btn stepper-btn-back"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                >
                    {backButtonText}
                </button>
                <button
                    className="stepper-btn stepper-btn-next"
                    onClick={handleNext}
                >
                    {currentStep === totalSteps ? 'Finish' : nextButtonText}
                </button>
            </div>
        </div>
    );
};

export default Stepper;
