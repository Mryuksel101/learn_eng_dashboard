export enum StoryLevel {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
    // Add any other levels as needed
}

export interface Story {
    id: number;
    title: string;
    content: string;
    level: StoryLevel;
    imagePath: string | null;
    starCount?: number;
    preview?: string;
}
