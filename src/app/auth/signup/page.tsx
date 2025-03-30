"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FirebaseError } from "firebase/app";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup, signInWithGoogle, updateUserProfile } = useAuth();
    const router = useRouter();

    const handleEmailSignUp = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Şifre eşleşme kontrolü
        if (password !== confirmPassword) {
            setError("Şifreler eşleşmiyor.");
            setLoading(false);
            return;
        }

        try {
            // Kullanıcı kaydını oluştur
            const result = await signup(email, password);

            // Kullanıcı adını güncelle
            if (name) {
                await updateUserProfile({ displayName: name });
            }

            router.push("/");
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    setError("Bu e-posta adresi zaten kullanımda.");
                } else if (error.code === "auth/weak-password") {
                    setError("Şifre en az 6 karakter olmalıdır.");
                } else {
                    setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
                }
            } else {
                setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);
        setError("");

        try {
            await signInWithGoogle();
            router.push("/");
        } catch (error: unknown) {
            console.error(error);
            setError("Google ile kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-white mb-8">Hesap Oluştur</h2>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 rounded-2xl p-4 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGoogleSignUp}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-2xl transition mb-6 disabled:opacity-70"
                    >
                        <FcGoogle className="w-5 h-5" />
                        <span>Google ile Kaydol</span>
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">veya e-posta ile kaydol</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailSignUp}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                                Ad Soyad
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-700 border-0 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ad Soyad"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                                E-posta Adresi
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-700 border-0 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="ornek@email.com"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                                Şifre
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-700 border-0 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="En az 6 karakter"
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                                Şifre Tekrarı
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-gray-700 border-0 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Şifrenizi tekrar girin"
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition disabled:opacity-70"
                        >
                            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
                        </button>
                    </form>
                </div>

                <div className="px-8 py-6 bg-gray-700/20 text-center">
                    <p className="text-gray-300">
                        Zaten hesabınız var mı?{" "}
                        <Link href="/auth/signin" className="text-blue-500 hover:text-blue-400 font-medium">
                            Giriş yap
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}