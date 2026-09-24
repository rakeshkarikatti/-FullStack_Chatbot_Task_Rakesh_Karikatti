/**
 * Optional Ollama Local LLM Integration Service
 * 
 * NOTE: This service is entirely optional and fail-safe.
 * If Ollama is not installed or running, it returns null without throwing errors.
 */

export async function askOllama(prompt: string): Promise<string | null> {
  const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'qwen2.5-coder:7b';

  const systemContext =
    'You are the DroneTV AI Support Assistant. ' +
    'DroneTV provides commercial drone services (aerial surveys, inspections, mapping, agriculture spraying) ' +
    'and structured drone pilot training courses. ' +
    'Answer questions concisely, professionally, and helpfully. ' +
    'Do not invent unsupported statistics or pricing. Encourage the user to contact DroneTV via the enquiry form for specific quotations.';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

    const response = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        system: systemContext,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { response?: string };
    if (data && typeof data.response === 'string' && data.response.trim().length > 0) {
      return data.response.trim();
    }

    return null;
  } catch (_err) {
    // Ollama is offline or unavailable; cleanly return null
    return null;
  }
}
