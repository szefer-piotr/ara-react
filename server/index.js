import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/summarize', async (req, res) => {
  const apiKey = process.env.VITE_OPENAI_API_KEY;
  const endpoint = process.env.VITE_OPENAI_ENDPOINT;

  if (!apiKey || !endpoint) {
    return res.status(500).json({ error: 'OpenAI environment variables are missing' });
  }

  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const prompt = `Provide a short summary of the following CSV data:\n${data.map(row => row.join(',')).join('\n')}`;

  try {
    const openaiRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const json = await openaiRes.json();
    res.status(openaiRes.status).json(json);
  } catch {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
