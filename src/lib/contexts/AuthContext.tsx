"use client";
import { useRouter } from 'next/navigation';

import { useState, useEffect, createContext, useContext } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import nookies from 'nookies';

// Kullanıcı tipi
type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
};

// Context tipi
type AuthContextType = {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    signInWithGoogle: () => Promise<any>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (data: { displayName?: string, photoURL?: string }) => Promise<void>;
};

// Context oluşturma
const AuthContext = createContext<AuthContextType | null>(null);

// Provider bileşeni
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Kullanıcı oturum durumu değişikliklerini izleme
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Kullanıcı oturum açtığında
                const token = await user.getIdToken();

                // Cookie'ye token kaydetme (server-side doğrulama için)
                nookies.set(undefined, 'token', token, {
                    path: '/',
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 30 * 24 * 60 * 60 // 30 gün
                });

                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            } else {
                // Kullanıcı çıkış yaptığında
                nookies.destroy(undefined, 'token');
                setUser(null);
                router.push('/auth/signin'); // Giriş sayfasına yönlendir
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // E-posta/şifre ile kayıt
    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // E-posta/şifre ile giriş
    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google ile giriş
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Çıkış yapma
    const logout = async () => {
        await signOut(auth);
    };

    // Şifre sıfırlama
    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Profil güncelleme
    const updateUserProfile = async (data: { displayName?: string, photoURL?: string }) => {
        if (!auth.currentUser) throw new Error("Kullanıcı oturum açmamış");
        await updateProfile(auth.currentUser, data);

        // Kullanıcı state'ini güncelleme
        if (user) {
            setUser({
                ...user,
                displayName: data.displayName || user.displayName,
                photoURL: data.photoURL || user.photoURL
            });
        }
    };

    const value = {
        user,
        loading,
        signup,
        login,
        signInWithGoogle,
        logout,
        resetPassword,
        updateUserProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook kullanımı için
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};