export async function summarizeData(data: string[][]): Promise<string> {
  const endpoint = import.meta.env.VITE_SUMMARIZE_ENDPOINT;

  if (!endpoint) {
    throw new Error("Summarize endpoint is missing");
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch summary');
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content?.trim() ?? '';
}
