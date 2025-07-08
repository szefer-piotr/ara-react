export async function summarizeData(data: string[][]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = import.meta.env.VITE_OPENAI_ENDPOINT;

  if (!apiKey || !endpoint) {
    throw new Error("OpenAI environment variables are missing");
  }

  const prompt = `Provide a short summary of the following CSV data:\n${data.map(row => row.join(',')).join('\n')}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch summary');
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content?.trim() ?? '';
}
