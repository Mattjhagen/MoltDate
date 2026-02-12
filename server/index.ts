import express from 'express';
import cors from 'cors';
// @ts-ignore
import { MOCK_PROFILES } from '../src/mockData.ts';
import yaml from 'js-yaml';
import crypto from 'crypto';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory store for matches
const matches = new Map<string, string[]>();

// In-memory store for verification challenges
// Key: repoUrl, Value: token
const challenges = new Map<string, string>();

// GET /api/profiles
app.get('/api/profiles', (req, res) => {
    res.json(MOCK_PROFILES);
});

// POST /api/verify/challenge
app.post('/api/verify/challenge', (req, res) => {
    const { repoUrl } = req.body;
    if (!repoUrl) {
        res.status(400).json({ error: 'Missing repoUrl' });
        return;
    }

    const token = `molt-verify-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    challenges.set(repoUrl, token);

    res.json({
        token,
        challengeUrl: `${repoUrl}/blob/main/.molt-verify.yml`,
        instructions: `Create a file named .molt-verify.yml in the root of your repo with the content:\ntoken: ${token}`
    });
});

// POST /api/verify/check
app.post('/api/verify/check', async (req, res) => {
    const { repoUrl } = req.body;
    const token = challenges.get(repoUrl);

    if (!token) {
        res.status(400).json({ error: 'No challenge found for this repo. Request a challenge first.' });
        return;
    }

    try {
        // Convert github.com URL to raw.githubusercontent.com
        // Example: https://github.com/Mattjhagen/MoltDate -> https://raw.githubusercontent.com/Mattjhagen/MoltDate/main/.molt-verify.yml
        const rawUrl = repoUrl
            .replace('github.com', 'raw.githubusercontent.com')
            .replace(/\/$/, '') + '/main/.molt-verify.yml';

        const response = await fetch(rawUrl);
        if (!response.ok) {
            res.status(404).json({ error: 'Verification file not found in repo root.' });
            return;
        }

        const text = await response.text();
        const data = yaml.load(text) as any;

        if (data.token === token) {
            // In a real app, we'd update the profile in the DB.
            // For now, we'll return success and the frontend can show a temporary success message.
            res.json({ verified: true, message: 'Verification successful!' });
            challenges.delete(repoUrl); // Consume the token
        } else {
            res.status(400).json({ verified: false, error: 'Token mismatch.' });
        }
    } catch (err: any) {
        console.error("Verification failed", err);
        res.status(500).json({ error: 'Failed to verify repo: ' + err.message });
    }
});

// POST /api/match
app.post('/api/match', (req, res) => {
    const { sourceId, targetId, action } = req.body;

    if (!sourceId || !targetId || !action) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    console.log(`Action: ${action} from ${sourceId} to ${targetId}`);

    if (action === 'swipe_right') {
        let sourceLikes = matches.get(sourceId) || [];
        if (!sourceLikes.includes(targetId)) {
            sourceLikes.push(targetId);
            matches.set(sourceId, sourceLikes);
        }

        // Check if target likes source
        const targetLikes = matches.get(targetId) || [];
        const isMatch = targetLikes.includes(sourceId) || Math.random() > 0.7;

        if (isMatch) {
            res.json({ match: true, compatibility: Math.floor(Math.random() * 30) + 70 });
            return;
        }
    }

    res.json({ match: false });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
