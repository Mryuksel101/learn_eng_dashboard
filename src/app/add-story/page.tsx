"use client";
import { useStoryForm } from '@/hooks/useStoryForm';
import MrTextFieldTwo from '../components/mrTextFieldTwo';
import { StoryLevel } from '@/types/Story';

export default function AddStoryPage() {
    const { story, handleChange, handleSubmit } = useStoryForm();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Hikaye Ekle</h1>

            <div className="max-w-2xl space-y-6">
                <MrTextFieldTwo
                    label="Başlık"
                    value={story.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                />

                <MrTextFieldTwo
                    label="İçerik"
                    value={story.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    minLines={5}
                />

                <MrTextFieldTwo
                    label="Önizleme"
                    value={story.preview}
                    onChange={(e) => handleChange('preview', e.target.value)}
                    minLines={3}
                />

                <div className="relative">
                    <label className="block text-gray-400 mb-2 ml-2">Seviye</label>
                    <select
                        value={story.level}
                        onChange={(e) => handleChange('level', e.target.value as StoryLevel)}
                        className="w-full px-4 py-3 rounded-3xl border-[2.35px] border-gray-700 text-gray-200 bg-[#0a0a0a] focus:outline-none focus:border-blue-500"
                    >
                        {Object.values(StoryLevel).map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
                    onClick={handleSubmit}
                >
                    Hikaye Ekle
                </button>
            </div>
        </div>
    );
}
