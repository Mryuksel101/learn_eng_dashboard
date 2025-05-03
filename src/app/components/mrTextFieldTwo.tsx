import React, { useEffect, useRef, useState, useMemo } from 'react';

interface TextFieldProps {
    label?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    minLines?: number;
}

const TextField: React.FC<TextFieldProps> = React.memo(({ label, type = 'text', value, onChange, minLines }) => {
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

    // Memoize textarea style
    const textareaStyle = useMemo(() => ({
        resize: 'vertical',
        minHeight: minLines ? `${minLines * 1.5}em` : undefined
    }) as React.CSSProperties, [minLines]);

    const inputFieldClasses = `w-full px-4 py-3 rounded-3xl border-[2.40px] border-slate-800 text-gray-200
        shadow-sm transition-colors duration-300 ease-in-out bg-[#101828]
        focus:outline-none focus:border-blue-500`;

    const baseContainerClass = 'relative overflow-visible textfield-container';
    const containerClass = value ? `${baseContainerClass} has-value` : baseContainerClass;

    return (
        <div ref={containerRef} className={containerClass}>
            <style jsx>{`
                .textfield-container {
                    position: relative;
                }
                
                .textfield-label {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    background-color: #101828;
                    pointer-events: none;
                    padding: 0 4px;
                    color: #64748B;
                    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateY(-50%) scale(1);
                    transform-origin: left center;
                    backface-visibility: hidden;
                    -webkit-font-smoothing: antialiased;
                }
                
                .textfield-container:focus-within .textfield-label,
                .textfield-container.has-value .textfield-label {
                    transform: translateY(calc(-${containerHeight}px/2 - 50%)) scale(0.875);
                    color: #3b82f6; /* blue-500 */
                }
            `}</style>

            {minLines ? (
                <textarea
                    className={inputFieldClasses}
                    rows={minLines}
                    value={value}
                    onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                    spellCheck="true"
                    style={textareaStyle}
                />
            ) : (
                <input
                    className={inputFieldClasses}
                    type={type}
                    value={value}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                />
            )}
            <label className="textfield-label">
                {label}
            </label>
        </div>
    );
});

// Add display name for debugging
TextField.displayName = 'TextField';

export default TextField;
