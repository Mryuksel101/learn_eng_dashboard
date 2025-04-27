import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-100">İngilizce Öğrenme Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <a href="/profile">
                <span className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium shadow-lg cursor-pointer">My</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {/* Overview Statistics */}
        <div className="px-4 sm:px-0">
          <h2 className="text-lg font-medium text-gray-200 mb-5">Dashboard</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stat Card 1 */}
            <div className="bg-gray-800 overflow-hidden shadow-lg rounded-2xl border border-gray-700">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-600 rounded-xl p-3 shadow-inner">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">Toplam İçerik</dt>
                      <dd className="text-lg font-semibold text-gray-100">24</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-gray-800 overflow-hidden shadow-lg rounded-2xl border border-gray-700">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-600 rounded-xl p-3 shadow-inner">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">Aktif Kullanıcı</dt>
                      <dd className="text-lg font-semibold text-gray-100">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 px-4 sm:px-0 mb-8">
          <h2 className="text-lg font-medium text-gray-200 mb-5">Hızlı İşlemler</h2>
          <div className="bg-gray-800 shadow-lg rounded-2xl p-7 border border-gray-700">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/add-story">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-5 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <svg className="h-9 w-9 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium text-lg">Okuma Parçası Ekle</span>
                  </div>
                </div>
              </Link>
              <Link href="/add-story-ai">
                <div className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-5 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <svg className="h-9 w-9 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="font-medium text-lg">Yapay Zeka ile Ekle</span>
                  </div>
                </div>
              </Link>
              <Link href="/dictionary">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-5 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <svg className="h-9 w-9 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-medium text-lg">Sözlük Yönetimi</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* Footer with Version Number */}
      <footer className="fixed right-0 left-0 bottom-0 bg-gray-800 py-3 shadow-[0_-4px_6px_-1px_rgb(17,24,39,0.5)] border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">Version 0.5.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}