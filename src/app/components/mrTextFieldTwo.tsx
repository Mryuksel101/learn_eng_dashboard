import React, { useEffect, useRef, useState } from 'react';

interface TextFieldProps {
    label?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    minLines?: number;
}

const TextField: React.FC<TextFieldProps> = ({ label, type = 'text', value, onChange, minLines }) => {
    const [isFocused, setFocus] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(0);
    const [willChange, setWillChange] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.offsetHeight);

            // Create ResizeObserver to detect textarea resize events
            const resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    // Cast to HTMLElement to access offsetHeight
                    setContainerHeight((entry.target as HTMLElement).offsetHeight);
                }
            });

            // Start observing the container
            resizeObserver.observe(containerRef.current);

            // Clean up the observer when component unmounts
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);

    // Modified focus/blur handlers to toggle will-change
    const handleFocus = () => {
        setWillChange(true);  // Enable will-change before animation starts
        setFocus(true);
    }

    const handleBlur = () => {
        setFocus(false);
        // Keep will-change on during the transition
    }

    // Add effect to remove will-change after transition completes
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isFocused || value) {
            // When the label is moved (focused or has value), start transition
            setWillChange(true);
            // Remove will-change after transition ends (300ms + small buffer)
            timeout = setTimeout(() => {
                setWillChange(false);
            }, 350);
        }
        return () => clearTimeout(timeout);
    }, [isFocused, value]);

    const sharedProps = {
        className: `w-full px-4 py-3 rounded-3xl border-[2.40px] border-slate-800 text-gray-200
                shadow-sm transition-colors duration-300 ease-in-out bg-[#101828]
                focus:outline-none focus:border-blue-500
             ${isFocused ? 'bg-[#101828]' : 'text-gray-200'}`,
        value,
        onFocus: handleFocus,
        onBlur: handleBlur,
    };

    return (
        <div ref={containerRef} className='relative overflow-visible'>
            {minLines ? (
                <textarea
                    {...sharedProps}
                    rows={minLines}
                    onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                    spellCheck="true"
                    style={{ resize: 'vertical', minHeight: `${minLines * 1.5}em` }}
                />
            ) : (
                <input
                    {...sharedProps}
                    type={type}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                />
            )}
            <label
                style={
                    {
                        transitionProperty: 'transform',
                        transitionTimingFunction: 'ease-in-out',
                        transitionDuration: '250ms',
                        top: `calc(100%/2)`,
                        fontSize: '16px',
                        lineHeight: '1',
                        transform: isFocused || value
                            ? `translateY(calc(-${containerHeight}px/2 - 50%)) scale(0.875)`
                            : `translateY(-50%) scale(1)`,
                        transformOrigin: 'left center',
                        // Only apply will-change when needed
                        ...(willChange ? { willChange: 'transform' } : {}),
                        backfaceVisibility: 'hidden',
                        perspective: 1000,
                        WebkitFontSmoothing: 'antialiased',
                    }
                }
                className={`absolute left-4 bg-[#101828] pointer-events-none px-1
                ${isFocused || value
                        ? 'text-blue-500'
                        : 'text-[#64748B]'}`}>
                {label}
            </label>
        </div >
    );
};

export default TextField;
