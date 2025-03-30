"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FirebaseError } from "firebase/app";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, signInWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    const handleEmailSignIn = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
            router.push(redirect);
        } catch (error: unknown) {
            console.error(error);
            setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");

        try {
            console.log("Google ile giriş yapılıyor...");
            await signInWithGoogle();
            router.push(redirect);
        } catch (error: unknown) {
            console.error(error);
            // Check for the specific configuration error
            if (error instanceof FirebaseError && error.code === "auth/configuration-not-found") {
                setError("Google giriş yapılandırması eksik. Firebase konsolunda Google kimlik doğrulama sağlayıcısını etkinleştirmeniz gerekiyor.");
            } else {
                setError("Google ile giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-white mb-8">Giriş Yap</h2>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 rounded-2xl p-4 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-2xl transition mb-6 disabled:opacity-70"
                    >
                        <FcGoogle className="w-5 h-5" />
                        <span>Google ile Giriş Yap</span>
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">veya e-posta ile giriş yap</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailSignIn}>
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

                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-gray-300 text-sm font-medium">
                                    Şifre
                                </label>
                                <Link href="/auth/reset-password" className="text-sm text-blue-500 hover:text-blue-400">
                                    Şifremi unuttum
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-700 border-0 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition disabled:opacity-70"
                        >
                            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                        </button>
                    </form>
                </div>

                <div className="px-8 py-6 bg-gray-700/20 text-center">
                    <p className="text-gray-300">
                        Hesabınız yok mu?{" "}
                        <Link href="/auth/signup" className="text-blue-500 hover:text-blue-400 font-medium">
                            Kayıt ol
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}