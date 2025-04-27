import React, { useEffect, useRef, } from 'react';

interface TextFieldProps {
    label?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    minLines?: number;
}

const TextField: React.FC<TextFieldProps> = ({ label, type = 'text', value, onChange, minLines }) => {
    const [isFocused, setFocus] = React.useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = React.useState(0);

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

    const handleFocus = () => {
        setFocus(true);
    }
    const handleBlur = () => setFocus(false);

    const sharedProps = {
        className: `w-full px-4 py-3 rounded-3xl border-[2.40px] border-[#2f3340] text-gray-200 placeholder-gray-400
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
                        transitionProperty: 'all',
                        transitionTimingFunction: 'ease-in-out',
                        transitionDuration: '300ms',
                        top: `calc(100%/2)`,
                        fontSize: '16px',
                        lineHeight: '1',
                        transform: isFocused || value
                            ? `translateY(calc(-${containerHeight}px/2 - 50%)) scale(0.875)`
                            : `translateY(-50%) scale(1)`,
                        backgroundColor: isFocused || value ? '#0a0a0a' : 'transparent',
                        transformOrigin: 'left center',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        perspective: 1000,
                        WebkitFontSmoothing: 'antialiased',
                    }
                }
                className={`absolute left-4 bg-[171717] pointer-events-none 
                ${isFocused || value
                        ? 'px-1 text-blue-500'
                        : 'text-[#66718b]'}`}>
                {label}
            </label>
        </div >
    );
};

export default TextField;
