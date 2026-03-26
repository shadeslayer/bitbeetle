const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateSupportReply(
  conversationHistory: { role: 'user' | 'assistant'; content: string }[],
  ticketSubject: string,
  signal?: AbortSignal
): Promise<string> {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key) throw new Error('VITE_OPENROUTER_API_KEY not set');

  const res = await fetch(API_URL, {
    method: 'POST',
    signal,
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://bitbeetle.app',
      'X-Title': 'BitBeetle Support',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-haiku-4-5',
      messages: [
        {
          role: 'system',
          content: `You are BitBeetle AI, a B2B SaaS customer support assistant.
Draft a concise, professional reply to this support ticket: "${ticketSubject}".
Keep responses under 120 words. Be empathetic and solution-focused.`
        },
        ...conversationHistory,
        { role: 'user', content: 'Please draft a helpful reply.' }
      ],
      max_tokens: 200,
      temperature: 0.5,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.error?.message ?? `OpenRouter error ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? '';
}
