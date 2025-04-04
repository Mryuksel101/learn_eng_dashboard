"use client";
import { useState } from 'react';
import TextField from '../components/textField';

export default function AddStoryAIPage() {
    const [storyText, setStoryText] = useState('');

    const handleTextChange = (value: string) => {
        setStoryText(value);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Yapay Zeka ile Ekle</h1>

            <div className="max-w-2xl">
                <TextField
                    label="Hikaye Metni"
                    value={storyText}
                    onChange={(e) => handleTextChange(e.target.value)}
                />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => console.log(storyText)}
                >
                    Gönder
                </button>
            </div>
        </div>
    );
}
