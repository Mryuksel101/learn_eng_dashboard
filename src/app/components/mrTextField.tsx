import React from 'react';

interface TextFieldProps {
    label?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, type = 'text', value, onChange }) => {
    const [isFocused, setFocus] = React.useState<boolean>(false);

    const handleFocus = () => {
        setFocus(true);
    }
    const handleBlur = () => setFocus(false);

    return (
        // h-12.8
        <div className='relative h-12.8'>
            <input
                className={` top-0 w-full px-4 py-3 rounded-3xl border-2 border-gray-700 text-gray-200 placeholder-gray-400
                shadow-sm transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
             ${isFocused ? 'bg-[171717]' : 'text-gray-200'}`}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <label style={
                {
                    backgroundColor: isFocused || value ? '#0a0a0a' : 'transparent',
                }
            } className={`absolute left-4 transition-all duration-200 ease-in-out bg-[0a0a0a] pointer-events-none
                ${isFocused || value
                    ? '-top-2.5 text-xs px-1 text-blue-500'
                    : 'top-1/2 transform -translate-y-1/2 text-gray-400'}`}>
                {label}
            </label>
        </div>
    );
};

export default TextField;
