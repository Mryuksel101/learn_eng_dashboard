import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';

interface TextFieldProps {
    label?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    minLines?: number;
}

const TextField: React.FC<TextFieldProps> = React.memo(({ label, type = 'text', value, onChange, minLines }) => {
    const [isFocused, setFocus] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.offsetHeight);

            // Create ResizeObserver to detect textarea resize events
            const resizeObserver = new ResizeObserver((entries) => {
                // Use requestAnimationFrame to batch updates
                window.requestAnimationFrame(() => {
                    for (const entry of entries) {
                        // Cast to HTMLElement to access offsetHeight
                        setContainerHeight((entry.target as HTMLElement).offsetHeight);
                    }
                });
            });

            // Start observing the container
            resizeObserver.observe(containerRef.current);

            // Clean up the observer when component unmounts
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);

    // Optimized focus/blur handlers with useCallback
    const handleFocus = useCallback(() => {
        setFocus(true);
    }, []);

    const handleBlur = useCallback(() => {
        setFocus(false);
    }, []);

    // Memoize shared props to prevent unnecessary recalculations
    const sharedProps = useMemo(() => ({
        className: `w-full px-4 py-3 rounded-3xl border-[2.40px] border-slate-800 text-gray-200
                shadow-sm transition-colors duration-300 ease-in-out bg-[#101828]
                focus:outline-none focus:border-blue-500
             ${isFocused ? 'bg-[#101828]' : 'text-gray-200'}`,
        value,
        onFocus: handleFocus,
        onBlur: handleBlur,
    }), [isFocused, value, handleFocus, handleBlur]);

    // Memoize label styles to prevent recalculation on every render
    const labelStyles = useMemo(() => ({
        transitionProperty: 'transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Using easing function for smoother animation
        transitionDuration: '250ms',
        top: `calc(100%/2)`,
        fontSize: '16px',
        lineHeight: '1',
        transform: isFocused || value
            ? `translateY(calc(-${containerHeight}px/2 - 50%)) scale(0.875)`
            : `translateY(-50%) scale(1)`,
        transformOrigin: 'left center',
        backfaceVisibility: 'hidden' as const,
        perspective: 1000,
        WebkitFontSmoothing: 'antialiased',
        willChange: isFocused ? 'transform' : 'auto', // Only use will-change when animating
    }), [isFocused, value, containerHeight]);

    // Memoize label classes
    const labelClasses = useMemo(() => `absolute left-4 bg-[#101828] pointer-events-none px-1
        ${isFocused || value ? 'text-blue-500' : 'text-[#64748B]'}`,
        [isFocused, value]);

    // Memoize textarea style
    const textareaStyle = useMemo(() => ({
        resize: 'vertical',
        minHeight: minLines ? `${minLines * 1.5}em` : undefined
    }) as React.CSSProperties, [minLines]);

    return (
        <div ref={containerRef} className='relative overflow-visible'>
            {minLines ? (
                <textarea
                    {...sharedProps}
                    rows={minLines}
                    onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                    spellCheck="true"
                    style={textareaStyle}
                />
            ) : (
                <input
                    {...sharedProps}
                    type={type}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                />
            )}
            <label
                style={labelStyles}
                className={labelClasses}>
                {label}
            </label>
        </div>
    );
});

// Add display name for debugging
TextField.displayName = 'TextField';

export default TextField;
