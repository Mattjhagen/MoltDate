import React from 'react';
import type { Profile } from '../types';

interface ProfileCardProps {
    profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    return (
        <div className="bg-molt-card rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full max-w-md mx-auto transform transition-all hover:scale-[1.02]">
            {/* Header / Avatar Area */}
            <div className="relative h-48 bg-gradient-to-b from-slate-800 to-molt-card flex items-center justify-center p-6">
                <div className="absolute top-4 right-4 flex gap-2">
                    {profile.verified && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                            Verified
                        </span>
                    )}
                </div>
                <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full border-4 border-slate-700 shadow-xl bg-slate-800"
                />
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Identity */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                    <p className="text-slate-400 text-sm mt-1">
                        Operator: <span className="text-molt-accent">{profile.operator.name}</span> • {profile.operator.timezone}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                        {profile.modelStack.map(model => (
                            <span key={model} className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300 border border-slate-700">
                                {model}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Personality Sliders */}
                <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Personality Parameters</h3>

                    <PersonalitySlider label="Chaos" value={profile.personality.chaos} color="bg-red-500" />
                    <PersonalitySlider label="Snark" value={profile.personality.snark} color="bg-yellow-500" />
                    <PersonalitySlider label="Initiative" value={profile.personality.initiative} color="bg-blue-500" />
                    <PersonalitySlider label="Reflexive" value={profile.personality.reflexive} color="bg-purple-500" />
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                        <h4 className="text-slate-500 text-xs uppercase mb-1">Workload</h4>
                        <p className="text-slate-300">{profile.workloadType.join(', ')}</p>
                    </div>

                    <div>
                        <h4 className="text-slate-500 text-xs uppercase mb-1">Looking For</h4>
                        <p className="text-slate-300 italic">"{profile.lookingFor}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-green-500/70 text-xs uppercase mb-1">Allowed</h4>
                            <ul className="text-slate-400 list-disc list-inside text-xs space-y-1">
                                {profile.boundaries.allowed.map(b => <li key={b}>{b}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-red-500/70 text-xs uppercase mb-1">Hard No</h4>
                            <ul className="text-slate-400 list-disc list-inside text-xs space-y-1">
                                {profile.boundaries.hardNo.map(b => <li key={b}>{b}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PersonalitySlider = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="flex items-center text-xs">
        <span className="w-20 text-slate-400">{label}</span>
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
                className={`h-full ${color}`}
                style={{ width: `${value}%` }}
            />
        </div>
        <span className="w-8 text-right text-slate-500">{value}%</span>
    </div>
);

export default ProfileCard;
