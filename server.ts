import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Store inquiries in-memory for live session inspection
  const inquiries: any[] = [];

  // API endpoint for receiving customer inquiry submissions
  app.post('/api/inquiry', (req, res) => {
    const { fullName, email, company, serviceName, budget, timeline, message, submittedAt } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Missing required inquiry fields.' });
    }

    const inquiryRecord = {
      id: `inq_${Date.now()}`,
      fullName,
      email,
      company,
      serviceName,
      budget,
      timeline,
      message,
      submittedAt: submittedAt || new Date().toISOString(),
      status: 'pending_review'
    };

    inquiries.unshift(inquiryRecord);
    console.log(`[INQUIRY RECEIVED] From ${fullName} (${company}) for ${serviceName}`);

    return res.status(201).json({
      success: true,
      message: 'Inquiry registered successfully.',
      inquiryId: inquiryRecord.id
    });
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', agency: "ARSH'S AI SOLUTION AGENCY", timestamp: new Date().toISOString() });
  });

  // Setup Vite dev middleware or serve production dist
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
