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
        className: `w-full px-4 py-3 rounded-3xl border border-gray-700 text-gray-200 placeholder-gray-400
                shadow-sm transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500
             ${isFocused ? 'bg-[171717]' : 'text-gray-200'}`,
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
                        top: `calc(100%/2)`,
                        fontSize: isFocused || value ? '14px' : '16px',
                        lineHeight: '1',
                        transform: isFocused || value ? `translateY(calc(-${containerHeight}px/2 - 50%))` : `translateY(-50%)`,
                        backgroundColor: isFocused || value ? '#0a0a0a' : 'transparent',

                    }
                }
                className={`absolute left-4 transition-all  duration-300 ease-in-out bg-[171717] pointer-events-none
                ${isFocused || value
                        ? 'px-1 text-blue-500'
                        : 'text-gray-400 opacity-90'}`}>
                {label}
            </label>
        </div >
    );
};

export default TextField;
