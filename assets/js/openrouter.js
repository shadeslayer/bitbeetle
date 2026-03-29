// BitBeetle — OpenRouter streaming client

async function streamOpenRouter({ messages, onToken, onDone, onError }) {
  try {
    const response = await fetch(`${OPENROUTER_CONFIG.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bitbeetle.com',
        'X-Title': 'BitBeetle Dashboard'
      },
      body: JSON.stringify({
        model: OPENROUTER_CONFIG.model,
        messages,
        stream: true
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenRouter error ${response.status}: ${err}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === 'data: [DONE]') continue;
        if (!trimmed.startsWith('data: ')) continue;

        try {
          const json = JSON.parse(trimmed.slice(6));
          const token = json.choices?.[0]?.delta?.content;
          if (token) onToken(token);
        } catch (_) {
          // skip malformed chunks
        }
      }
    }

    // Flush any remaining buffer content after stream ends
    if (buffer.trim() && buffer.trim().startsWith('data: ') && buffer.trim() !== 'data: [DONE]') {
      try {
        const json = JSON.parse(buffer.trim().slice(6));
        const token = json.choices?.[0]?.delta?.content;
        if (token) onToken(token);
      } catch (_) {}
    }

    onDone();
  } catch (err) {
    onError(err);
  }
}

// Build AI auto-responder messages for a conversation
function buildAutoResponderMessages(conversation) {
  const systemPrompt = `You are BitBeetle AI, an intelligent support agent for B2B SaaS companies.
You resolve customer support tickets concisely and professionally.
Respond in 2-3 short paragraphs. Be specific, empathetic, and actionable.
If the issue requires engineering involvement, say so clearly and describe what diagnostic information you're collecting.`;

  const msgs = [{ role: 'system', content: systemPrompt }];
  for (const m of conversation.messages) {
    msgs.push({ role: m.role === 'customer' ? 'user' : 'assistant', content: m.content });
  }
  return msgs;
}

// Build Copilot messages for a conversation (agent-facing assistant)
function buildCopilotMessages(conversation, copilotHistory) {
  const systemPrompt = `You are BitBeetle Copilot, an AI assistant helping a support agent handle a customer ticket.
You have full context of the conversation. Help the agent draft replies, suggest solutions, and answer questions.
Be concise and direct. When suggesting a customer reply, clearly label it as "Suggested reply:".
Company: ${conversation.company} | Plan: ${conversation.plan} | Channel: ${conversation.channel}`;

  const thread = conversation.messages
    .map(m => `${m.type === 'customer' ? 'Customer' : 'Agent'}: ${m.content}`)
    .join('\n\n');

  const msgs = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Here is the conversation so far:\n\n${thread}` },
    ...copilotHistory
  ];
  return msgs;
}

// Build AI Draft messages (draft a reply for the agent to edit)
function buildDraftMessages(conversation) {
  const systemPrompt = `You are BitBeetle AI, helping a support agent draft a reply.
Write a professional, empathetic response to the customer's latest message.
Keep it concise (2-3 paragraphs). The agent will review and edit before sending.`;

  const msgs = [{ role: 'system', content: systemPrompt }];
  for (const m of conversation.messages) {
    msgs.push({ role: m.role === 'customer' ? 'user' : 'assistant', content: m.content });
  }
  return msgs;
}
