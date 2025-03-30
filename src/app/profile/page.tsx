"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import ProfileHeader from './components/ProfileHeader';

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <ProfileHeader user={user}></ProfileHeader>


            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h2 className="text-lg font-medium text-gray-200 mb-5">Profil Sayfası</h2>
                    <div className="bg-gray-800 overflow-hidden shadow-lg rounded-2xl border border-gray-700 p-6">
                        {/* Profile content */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-medium shadow-lg">
                                    My
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-100">Kullanıcı Adı</h3>
                                    <p className="text-gray-400">kullanici@email.com</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <h4 className="text-md font-medium text-gray-200 mb-3">Profil Detayları</h4>
                                <p className="text-gray-400">
                                    Profil içeriği buraya gelecek.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
