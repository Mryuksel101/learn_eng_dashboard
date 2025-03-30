"use client";
import { useAuth } from '@/lib/contexts/AuthContext';
import ProfileHeader from './ProfileHeader';

export default function ProfileContent() {
    const { user } = useAuth();

    return (
        <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <h1 className="text-lg font-medium text-gray-200 mb-5">Profil Sayfası</h1>
                <article className="bg-gray-800 overflow-hidden shadow-lg rounded-2xl border border-gray-700 p-6">
                    <div className="flex flex-col space-y-4">
                        <ProfileHeader user={user} />
                    </div>
                </article>
            </div>
        </main>
    );
}
