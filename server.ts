import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import apiRoutes from './server/routes/api.ts';

dotenv.config();

let resolvedFilename = '';
let resolvedDirname = '';

try {
  resolvedFilename = fileURLToPath(import.meta.url);
  resolvedDirname = path.dirname(resolvedFilename);
} catch (e) {
  resolvedFilename = __filename;
  resolvedDirname = __dirname;
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  const PORT = 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI || MONGODB_URI.includes('localhost')) {
    console.warn('⚠️  MONGODB_URI is not set or points to localhost. Please configure a valid MongoDB Atlas URI in the Secrets panel.');
  }

  if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
      .then(() => console.log('✅ Connected to MongoDB Atlas'))
      .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        console.info('Tip: Verify your IP is whitelisted and credentials are correct in the Secrets panel.');
      });
  }

  // WebSocket Handlers
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('join-tenant', (tenantId) => {
      socket.join(`tenant-${tenantId}`);
      console.log(`Socket ${socket.id} joined tenant-${tenantId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api', apiRoutes);

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
