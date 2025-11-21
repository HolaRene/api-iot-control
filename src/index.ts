import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler, AppError } from './middlewares/errorHandler';
import { ENV } from './config/env';
import { AmbientalService } from './services/ambiental.service';
import { CalidadAireService } from './services/calidadAire.service';
import { EnergiaService } from './services/energia.service';
import { IndustrialService } from './services/industrial.service';
import { PersonalizadoService } from './services/personalizado.service';
import { SeguridadService } from './services/seguridad.service';
import { SueloService } from './services/suelo.service';

const app: Application = express();

// CORS - permitir cualquier origen
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de API Key para endpoints de ESP32
const API_KEY = ENV.apiKey;

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');
  
  if (!apiKey || apiKey !== API_KEY) {
    return next(new AppError(401, 'API Key inválida'));
  }
  
  next();
};

// Endpoint SIMPLE para ESP32 (recomendado)
app.post('/api/v1/esp32/data', validateApiKey, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sensor_id, categoria, data } = req.body;
    
    if (!sensor_id || !categoria || !data) {
      throw new AppError(400, 'Faltan parámetros: sensor_id, categoria o data');
    }

    // Guardar según categoría
    switch (categoria) {
      case 'ambiental':
        await AmbientalService.updateData(sensor_id, data);
        break;
      case 'calidad_aire':
        await CalidadAireService.updateData(sensor_id, data);
        break;
      case 'energia':
        await EnergiaService.updateData(sensor_id, data);
        break;
      case 'industrial':
        await IndustrialService.updateData(sensor_id, data);
        break;
      case 'personalizado':
        await PersonalizadoService.updateData(sensor_id, data);
        break;
      case 'seguridad':
        await SeguridadService.updateData(sensor_id, data);
        break;
      case 'suelo':
        await SueloService.updateData(sensor_id, data);
        break;
      default:
        throw new AppError(400, 'Categoría no válida');
    }

    res.json({ status: 'ok', message: 'Datos guardados correctamente' });
  } catch (error) {
    next(error);
  }
});

// Health check (público)
app.get('/salud', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    ip: req.ip 
  });
});

// Rutas API (para frontend)
app.use('/api/', routes);

// Manejo de errores
app.use(errorHandler);

const PORT = parseInt(ENV.port as string, 10) || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en red: http://${getLocalIP()}:${PORT}`);
  console.log(`📚 Health check: http://localhost:${PORT}/salud`);
  console.log(`🔐 API Key configurada: ${API_KEY ? '✅' : '❌'}`);
});

function getLocalIP(): string {
  const interfaces = require('os').networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}