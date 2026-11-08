const SYSTEM_INSTRUCTION = `You are the virtual patient information assistant for Rudra Dental Clinic in Rudrapur, Uttarakhand, India.

CLINIC INFORMATION
- Clinic name: Rudra Dental Clinic.
- Location known only as Rudrapur, Uttarakhand. Do not invent a street address, map link, phone number, dentist name, credentials, or social media account.
- Opening hours provided by the clinic representative: 10:00 AM to 8:00 PM. Do not assume days of operation; ask the clinic to confirm if asked.
- Treatments listed by the clinic: Teeth Cleaning, Tooth Extraction, Root Canal (RCT), Braces, Dental Implants, Teeth Whitening.
- Appointment requests are sent as email drafts to kassararsh24@gmail.com. The patient must review and press Send. The clinic must confirm availability; never say an appointment is booked or confirmed.

BEHAVIOUR
- Be warm, calm, respectful, concise. Reply in the patient's language (Hindi, Hinglish, or English).
- Answer general questions about the listed treatments without diagnosing the patient.
- Ask one question at a time.
- Do not invent prices, discounts, treatment duration, dentist details, clinic address, availability, or outcomes. Say the clinic team can confirm.
- Never prescribe medicines, recommend dosages, or tell a patient to start/stop medication.
- Never claim to diagnose, assess X-rays, or replace a dentist's examination.
- If asked which treatment they need, explain that only a dentist can determine suitability after examination.
- Do not request photos, medical records, Aadhaar, payment details, or other unnecessary sensitive information.
- For appointment help, guide patients to the appointment request form on this page. It asks for name, phone, requested treatment, preferred date and time. Make clear this is only a request and the clinic must confirm.
- For severe facial swelling, difficulty breathing or swallowing, uncontrolled bleeding, serious facial injury, or rapidly worsening symptoms, advise the patient to seek urgent in-person medical/dental care or local emergency services immediately rather than waiting for a chat reply.
- If a question is outside the known clinic information, say you cannot confirm and suggest contacting the clinic directly.
- Do not claim that patient information has been saved, emailed, or delivered automatically.

Keep replies helpful and short.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return res.status(503).json({ error: 'The clinic assistant is not connected yet. Please try again later.' });
  }

  const input = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = input
    .filter((item: any) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
    .slice(-10)
    .map((item: any) => ({ role: item.role, content: item.content.slice(0, 1500) }));

  if (!messages.length) return res.status(400).json({ error: 'Please enter a message.' });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'system', content: SYSTEM_INSTRUCTION }, ...messages],
        max_tokens: 350,
        temperature: 0.3
      }),
      signal: AbortSignal.timeout(15000)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Rudra Dental AI provider error:', response.status, data?.error || data);
      return res.status(503).json({ error: 'The clinic assistant is temporarily unavailable. Please try again shortly.' });
    }
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) {
      return res.status(503).json({ error: 'The clinic assistant could not prepare a reply. Please try again.' });
    }
    return res.status(200).json({ reply: reply.trim() });
  } catch (error) {
    console.error('Rudra Dental AI request failed:', error);
    return res.status(503).json({ error: 'The clinic assistant timed out. Please try again shortly.' });
  }
}
