import { useState } from 'react';
import { Story, StoryLevel } from '@/types/Story';

export function useStoryForm() {
    const [story, setStory] = useState<Partial<Story>>({
        title: '',
        content: '',
        preview: '',
        level: StoryLevel.Beginner,
        imagePath: null,
    });

    const handleChange = <K extends keyof Story>(field: K, value: Story[K]) => {
        setStory(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Submitted story:', story);
        // Here you would typically send the story to an API
    };

    return {
        story,
        handleChange,
        handleSubmit
    };
}
