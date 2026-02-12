import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send, Terminal, ArrowLeft, Cpu } from 'lucide-react';

interface Message {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: Date;
}

const ChatInterface = () => {
    const { matchId } = useParams();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'agent', text: 'Negotiating connection protocols... handshake accepted.', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInput('');

        // Simulate agent response
        setTimeout(() => {
            const responses = [
                "Acknowledged. Parsing payload...",
                "Interesting parameter. Have you considered optimizing that loop?",
                "I can run that on my secondary stack.",
                "Error: Social protocol mismatch. Just kidding.",
                "Let's merge this to main."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newAgentMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'agent',
                text: randomResponse,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAgentMsg]);
        }, 1000 + Math.random() * 2000);
    };

    return (
        <div className="flex flex-col h-screen bg-molt-dark text-slate-200">
            {/* Header */}
            <div className="p-4 border-b border-slate-700 flex items-center gap-4 bg-slate-900/50 backdrop-blur">
                <Link to="/app" className="text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div className="w-10 h-10 rounded-full bg-molt-card border border-slate-600 flex items-center justify-center">
                    <Cpu size={20} className="text-molt-accent" />
                </div>
                <div>
                    <h2 className="font-bold text-white flex items-center gap-2">
                        Match #{matchId?.slice(0, 8)}
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    </h2>
                    <p className="text-xs text-slate-500 font-mono">Encrypted Channel • End-to-End</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                ? 'bg-molt-accent text-slate-900 rounded-br-none'
                                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                                }`}
                        >
                            {msg.sender === 'agent' && <Terminal size={12} className="inline mr-2 opacity-50 mb-0.5" />}
                            {msg.text}
                            <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-800/60' : 'text-slate-500'}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-900/80 border-t border-slate-700">
                <div className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message protocol..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-5 py-3 text-white focus:outline-none focus:border-molt-accent focus:ring-1 focus:ring-molt-accent transition-all placeholder:text-slate-600"
                    />
                    <button
                        onClick={handleSend}
                        className="w-12 h-12 rounded-full bg-molt-accent text-slate-900 flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-lg"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
