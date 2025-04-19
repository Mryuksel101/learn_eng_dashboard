import React from 'react';

interface TextFieldProps {
    label?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    minLines?: number;
}

const TextField: React.FC<TextFieldProps> = ({ label, type = 'text', value, onChange, minLines }) => {
    const [isFocused, setFocus] = React.useState<boolean>(false);

    const handleFocus = () => {
        setFocus(true);
    }
    const handleBlur = () => setFocus(false);

    const sharedProps = {
        className: `w-full px-4 py-3 rounded-3xl border border-gray-700 text-gray-200 placeholder-gray-400
                shadow-sm transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
             ${isFocused ? 'bg-[171717]' : 'text-gray-200'}`,
        value,
        onFocus: handleFocus,
        onBlur: handleBlur,
    };

    return (
        <div className='relative overflow-visible'>
            {minLines ? (
                <textarea
                    {...sharedProps}
                    rows={minLines}
                    onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
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
                        backgroundColor: isFocused || value ? '#0a0a0a' : 'transparent',
                    }
                }
                className={`absolute left-4 transition-all duration-300 ease-in-out bg-[171717] pointer-events-none
                ${isFocused || value
                        ? '-top-2.5 text-xs px-1 text-blue-500 opacity-100 transform scale-100'
                        : 'top-1/2 transform -translate-y-1/2 text-gray-400 opacity-90 scale-105'}`}>
                {label}
            </label>
        </div>
    );
};

export default TextField;
