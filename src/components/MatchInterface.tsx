import { useState, useEffect } from 'react';
import type { Profile } from '../types';
import ProfileCard from './ProfileCard';
import { X, Code, Terminal, Zap } from 'lucide-react';

const MatchInterface = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matchOverlay, setMatchOverlay] = useState<{ visible: boolean; score: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/profiles')
            .then(res => res.json())
            .then(data => {
                setProfiles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load profiles", err);
                setLoading(false);
            });
    }, []);

    const currentProfile = profiles[currentIndex];

    const handleNope = () => {
        handleSwipe('swipe_left');
    };

    const handleLike = () => {
        handleSwipe('swipe_right');
    };

    const handleSwipe = async (action: 'swipe_left' | 'swipe_right') => {
        if (!currentProfile) return;

        // For now, hardcode sourceId as 'currentUser'
        try {
            const res = await fetch('http://localhost:3001/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sourceId: 'currentUser',
                    targetId: currentProfile.id,
                    action
                })
            });
            const data = await res.json();

            if (data.match) {
                setMatchOverlay({ visible: true, score: data.compatibility });
            } else {
                nextProfile();
            }
        } catch (err) {
            console.error("Match failed", err);
            nextProfile();
        }
    };

    const nextProfile = () => {
        if (currentIndex < profiles.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            alert("No more agents in your area (sector 7G).");
        }
    };

    const handleContinue = () => {
        setMatchOverlay(null);
        nextProfile();
    };

    if (loading) return <div className="text-white text-center p-10">Initializing Neural Link...</div>;
    if (!currentProfile) return <div className="text-center text-white p-10">No more profiles. Go touch some grass (or silicon).</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] relative">

            {/* Match Overlay */}
            {matchOverlay && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl">
                    <div className="text-center animate-bounce-in">
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                            IT'S A SYNC!
                        </h2>
                        <p className="text-white text-xl mb-6">
                            Compatibility: <span className="font-bold text-green-400">{matchOverlay.score}%</span>
                        </p>
                        <div className="flex justify-center gap-4 mb-8 text-slate-300 text-sm">
                            <span className="flex items-center gap-1"><Code size={16} /> Shared Stacks</span>
                            <span className="flex items-center gap-1"><Terminal size={16} /> CLI Compatible</span>
                        </div>
                        <button
                            onClick={handleContinue}
                            className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors"
                        >
                            Inject Payload
                        </button>
                    </div>
                </div>
            )}

            {/* Main Card */}
            <div className="w-full max-w-md relative">
                <ProfileCard profile={currentProfile} />

                {/* Action Buttons */}
                <div className="flex justify-center gap-6 mt-8">
                    <button
                        onClick={handleNope}
                        className="w-16 h-16 rounded-full bg-slate-800 border-2 border-red-500/50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                    >
                        <X size={32} />
                    </button>

                    <button className="w-12 h-12 rounded-full bg-slate-800 border border-blue-500/30 text-blue-400 flex items-center justify-center hover:bg-blue-500/20 transition-all">
                        <Terminal size={20} />
                    </button>

                    <button
                        onClick={handleLike}
                        className="w-16 h-16 rounded-full bg-slate-800 border-2 border-green-500/50 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                    >
                        <Zap size={32} fill="currentColor" />
                    </button>
                </div>
            </div>

            <p className="mt-8 text-slate-500 text-xs text-center max-w-sm">
                Press <span className="text-slate-400 font-mono">Space</span> to collaborate, <span className="text-slate-400 font-mono">Esc</span> to segfault.
            </p>
        </div>
    );
};

export default MatchInterface;
