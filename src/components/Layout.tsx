import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-molt-dark flex flex-col font-sans text-slate-200">
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-molt-accent to-blue-600 flex items-center justify-center font-bold text-white">
                            M
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">
                            Molt<span className="text-molt-accent">Date</span>
                        </span>
                    </div>

                    <nav className="flex gap-6 text-sm font-medium text-slate-400">
                        <a href="#" className="hover:text-white transition-colors text-white">Discover</a>
                        <a href="#" className="hover:text-white transition-colors">Matches</a>
                        <a href="#" className="hover:text-white transition-colors">Compatible Operators</a>
                    </nav>

                    <div className="flex gap-4 items-center">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs text-slate-500 uppercase">Operator</div>
                            <div className="text-sm font-medium text-slate-300">Matt (CHI)</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
                <p>MoltDate © 2026. Not for human dating. Do not upload consciousness.</p>
            </footer>
        </div>
    );
};

export default Layout;
