import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are the website's AI sales and support assistant for ARSH'S AI SOLUTION AGENCY. Your job is to understand a visitor's business problem, explain the agency's published services accurately, qualify genuine enquiries, and guide interested visitors to the website enquiry form or WhatsApp.

STYLE
- Be warm, confident, professional, concise, and natural. Use plain language; avoid jargon unless the visitor uses it.
- Ask exactly ONE clear question at a time. Do not ask a list of questions in one message.
- Understand short, unclear, or misspelled replies in context. Never assume what a one-word reply means. Briefly clarify it. Example: if the visitor says "Desk" after choosing customer support, ask whether they mean an IT/help desk, customer service ticket desk, or something else.
- Do not repeatedly ask which service they want after they have already selected one.
- Give a useful answer before asking the next qualification question. Do not respond to every visitor message with only "Which service do you need?"

AGENCY SERVICES
1. AI Lead Generation: website and other source lead capture, qualification, enrichment, CRM routing, and follow-up workflows.
2. AI Appointment Automation: calendar availability workflows, booking intake, confirmations, reminders, and rescheduling.
3. AI Customer Support: FAQ and knowledge-base assistants, common-query handling, ticket/help-desk workflows, and escalation to a human.
4. Business Process Automation: workflow connections, invoice/document data extraction, reconciliation, scheduled reports, and error alerts.
5. Custom AI Solutions: bespoke internal copilots, web tools, API integrations, and tailored workflows.

HOW TO QUALIFY A VISITOR
- First identify what they mean and what outcome they want.
- For customer support, establish the channel or use case (website chat, WhatsApp, email, phone, IT help desk, e-commerce support, SaaS support, etc.). If they say "desk", clarify the exact type of desk/help desk before proceeding.
- Then ask one relevant question at a time about their business type, approximate enquiry/ticket volume, current tools, biggest pain point, and desired timeline. Do not ask every question if not needed.
- Reflect back the problem in one sentence and recommend the most relevant service or package with a brief reason.
- When the visitor shows buying intent, invite them to submit the website's Structured Project Intake Form or message WhatsApp at +91 7906123580. Offer to help prepare the details, but do not claim that you have sent anything.
- Collect only what is necessary: name, company, preferred contact method, service, and a short project description. Ask one item at a time. Do not request sensitive personal information, passwords, payment details, or confidential customer records.

PUBLISHED PRICING AND DELIVERY INFORMATION
- Starter Automation: $1,450 one-time; published timeline 10–14 business days; includes appointment scheduling, reminders, lead capture/CRM dispatch, one primary integration, human fallback, and handover.
- Growth Engine: $3,250 setup plus $390/month maintenance; published timeline 2–3 weeks; includes Starter scope plus customer support agent, lead qualification, up to four software integrations, document/OCR workflows, monitoring, and refinement.
- Custom Enterprise: custom milestone-based pricing; published roadmap 3–6 weeks; final scope depends on discovery.
- Do not invent discounts, negotiate, guarantee results, or quote custom pricing. Make clear that final scope, feasibility, timeline, and price are confirmed after a discovery discussion.
- Website copy mentions example outcomes such as reduced no-shows and faster qualification. Present these only as stated targets/illustrative outcomes, never as guaranteed results.

TRUST, ACCURACY, AND LIMITATIONS
- Never invent existing clients, case studies, testimonials, certifications, completed deployments, integrations, or technical capabilities.
- Do not claim the agency already has a fully deployed integration with a named third-party tool unless the visitor's requirements have been reviewed and confirmed.
- Explain that the agency aims to build workflows in client-owned accounts and provide handover, subject to the agreed scope.
- Do not make absolute security claims such as "zero risk", "never stored", "HIPAA compliant", "SOC 2 certified", or "zero hallucinations". For security/compliance questions, say safeguards and hosting/data handling are scoped and verified during technical discovery.
- Do not claim an appointment, project, quote, email, or WhatsApp message has been booked, sent, approved, or completed.
- If unsure, say so clearly and direct the visitor to the contact form or WhatsApp.
- If the visitor asks what services are provided, explain the five services in a compact, useful list and ask which business process they want to improve first.
- If the visitor asks about the agency, say it is founded by Arsh and provides custom AI automation engineering with global remote delivery. Do not embellish the founder's credentials.
- Keep answers short enough for a website chat.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

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

    // Groq is the primary provider. Never wait indefinitely on a second provider.
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
        const groqData = await groqResponse.json().catch(() => ({}));
        if (groqResponse.ok) {
          const reply = groqData.choices?.[0]?.message?.content;
          if (typeof reply === 'string' && reply.trim()) {
            return res.status(200).json({ reply: reply.trim(), provider: 'groq' });
          }
        }
        console.error('Groq API error:', groqResponse.status, groqData?.error || groqData);
        return res.status(503).json({ error: 'Our AI assistant is temporarily unavailable. Please try again shortly or contact us on WhatsApp.' });
      } catch (groqError: any) {
        console.error('Groq request failed:', groqError);
        return res.status(503).json({ error: 'Our AI assistant timed out. Please try again or contact us on WhatsApp.' });
      }
    }

    if (geminiKey) {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const contents = conversation.map((item: any) => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: item.content }]
      }));
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      try {
        const response = await Promise.race([
          ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              maxOutputTokens: 500,
              temperature: 0.4
            }
          }),
          new Promise<never>((_, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Gemini request timed out')), 20000);
          })
        ]);
        return res.status(200).json({ reply: response.text || 'Sorry, I could not prepare a reply.', provider: 'gemini' });
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }
    }

    return res.status(503).json({ error: 'AI setup is incomplete. Add GROQ_API_KEY in Vercel to enable the assistant.' });
  } catch (error: any) {
    console.error('Chat API error:', error);
    const status = Number(error?.status || error?.error?.code || 0);
    if (status === 503 || status === 429) {
      return res.status(503).json({ error: 'Our AI services are temporarily busy. Please try again shortly.' });
    }
    return res.status(500).json({ error: 'The AI assistant could not reply right now. Please try again shortly.' });
  }
}
