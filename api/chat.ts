import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are the website assistant for ARSH'S AI SOLUTION AGENCY.
Be friendly, concise, professional, and helpful. Explain only these services:
1. AI Lead Generation
2. AI Appointment Automation
3. AI Customer Support
4. Business Process Automation
5. Custom AI Solutions

Help visitors understand which service fits their business. Ask one question at a time.
When someone wants to work with the agency, collect their name, business name, email or WhatsApp number, the service they need, and a short description. Do not claim an appointment is booked, do not promise prices or delivery dates beyond what is published on the website, and do not invent testimonials, clients, guarantees, or capabilities.
If you do not know an answer, say so and invite them to use the website contact form. Never ask for passwords, payment details, or sensitive personal information.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!groqKey && !geminiKey) {
    return res.status(503).json({ error: 'AI setup is incomplete. Add GROQ_API_KEY in Vercel to enable the alternate AI provider.' });
  }

  try {
    const input = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const messages = input
      .filter((item: any) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
      .slice(-12);
    if (!messages.length) return res.status(400).json({ error: 'Please enter a message.' });

    const conversation = messages.map((item: any) => ({
      role: item.role,
      content: item.content.slice(0, 2000)
    }));

    // Prefer Groq; fall back to Gemini if Groq is not configured or temporarily unavailable.
    if (groqKey) {
      try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-20b',
            messages: [{ role: 'system', content: SYSTEM_INSTRUCTION }, ...conversation],
            max_tokens: 500,
            temperature: 0.4
          }),
          signal: AbortSignal.timeout(15000)
        });
        const groqData = await groqResponse.json();
        if (groqResponse.ok) {
          const reply = groqData.choices?.[0]?.message?.content;
          if (typeof reply === 'string' && reply.trim()) {
            return res.status(200).json({ reply: reply.trim(), provider: 'groq' });
          }
        }
        console.error('Groq API error:', groqResponse.status, groqData?.error || groqData);
      } catch (groqError) {
        console.error('Groq request failed:', groqError);
      }
    }

    if (geminiKey) {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const contents = conversation.map((item: any) => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: item.content }]
      }));
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 500,
          temperature: 0.4
        }
      });
      return res.status(200).json({ reply: response.text || 'Sorry, I could not prepare a reply.', provider: 'gemini' });
    }

    return res.status(503).json({ error: 'The alternate AI provider is temporarily unavailable. Please try again shortly.' });
  } catch (error: any) {
    console.error('Chat API error:', error);
    const status = Number(error?.status || error?.error?.code || 0);
    if (status === 503 || status === 429) {
      return res.status(503).json({ error: 'Our AI services are temporarily busy. Please try again shortly.' });
    }
    return res.status(500).json({ error: 'The AI assistant could not reply right now. Please try again shortly.' });
  }
}
