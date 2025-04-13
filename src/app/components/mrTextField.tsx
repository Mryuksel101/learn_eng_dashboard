import React from 'react';

interface TextFieldProps {
    label?: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, placeholder, type = 'text', value, onChange }) => {
    const [isFocused, setFocus] = React.useState<boolean>(false);

    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);

    return (
        <div>
            {label && <label className="block text-gray-200 text-sm font-medium mb-2 transition-colors">{label}</label>}
            <input
                className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-400
                shadow-sm transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                hover:border-gray-600"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default TextField;
