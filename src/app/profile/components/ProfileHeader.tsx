"use client";

// Fix import to match the actual type from your auth context
import { useAuth } from '@/lib/contexts/AuthContext';

interface ProfileHeaderProps {
    user: any | null; // Changed from User to any to avoid type errors
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    // Extracting first letters of display name for avatar, or fallback to "U"
    const avatarText = user?.displayName
        ? user.displayName.split(' ').map((name: string) => name[0]).join('').substring(0, 2)
        : "U";

    return (
        <header className="flex items-center space-x-4">
            <div
                className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-medium shadow-lg"
                aria-label="Profil avatarı"
            >
                {avatarText}
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-100">
                    {user?.displayName || "Kullanıcı Adı"}
                </h2>
                <p className="text-gray-400">
                    {user?.email || "kullanici@email.com"}
                </p>
            </div>
        </header>
    );
}
