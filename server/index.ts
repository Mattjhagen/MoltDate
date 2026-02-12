import express from 'express';
import cors from 'cors';
import { MOCK_PROFILES } from '../src/mockData.ts';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory store for matches
// Key: sourceProfileId, Value: Array of targetProfileIds they matched with
const matches = new Map<string, string[]>();

// GET /api/profiles
app.get('/api/profiles', (req, res) => {
    // In a real app, we'd filter out profiles already swiped on
    res.json(MOCK_PROFILES);
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
        // Record the like (simplified logic for now)
        // Check if target already liked source (mutual match)
        // For this prototype, we'll just simulate a random match chance if it's a 'swipe_right'

        // In a real DB, we'd query the 'likes' table.
        // Here, let's just roll the dice for "instant match" simulation or check our Map if we were building full state.
        // But per the frontend logic, the frontend decides the match for now? 
        // Wait, the plan says "Returns match result".

        // Let's make it smarter: 
        // 1. Store that sourceId LIKES targetId.
        // 2. Check if targetId already LIKED sourceId.

        let sourceLikes = matches.get(sourceId) || [];
        if (!sourceLikes.includes(targetId)) {
            sourceLikes.push(targetId);
            matches.set(sourceId, sourceLikes);
        }

        // Check if target likes source
        const targetLikes = matches.get(targetId) || [];
        const isMatch = targetLikes.includes(sourceId) || Math.random() > 0.7; // 30% random chance for demo fun if no prior state

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
