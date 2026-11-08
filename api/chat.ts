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

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI setup is not finished yet. The website owner needs to add GEMINI_API_KEY in Vercel project environment variables.' });
  }

  try {
    const input = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const messages = input
      .filter((item: any) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
      .slice(-12);
    if (!messages.length) return res.status(400).json({ error: 'Please enter a message.' });

    const contents = messages.map((item: any) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content.slice(0, 2000) }]
    }));

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 500,
        temperature: 0.4
      }
    });
    return res.status(200).json({ reply: response.text || 'Sorry, I could not prepare a reply. Please try again.' });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'The AI assistant could not reply right now. Please try again shortly.' });
  }
}
