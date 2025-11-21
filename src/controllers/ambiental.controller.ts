import { Request, Response, NextFunction } from 'express';
import { AmbientalService } from '../services/ambiental.service';
import { AppError } from '../middlewares/errorHandler';

export class AmbientalController {
  static async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const data = await AmbientalService.getCurrent(sensorId);
      
      if (!data) {
        throw new AppError(404, 'Sensor ambiental no encontrado');
      }
      
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async getHistorial(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const limit = parseInt(req.query.limit as string) || 100;
      
      const data = await AmbientalService.getHistorial(sensorId, limit);
      res.json({ data, count: data.length });
    } catch (error) {
      next(error);
    }
  }

  static async updateData(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const sensorData = req.body;
            
      await AmbientalService.updateData(sensorId, sensorData);
      res.json({ message: 'Datos actualizados correctamente' });
    } catch (error) {
      next(error);
    }
  }

  static async getResumen(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const data = await AmbientalService.getResumen(sensorId);
      
      if (!data) {
        throw new AppError(404, 'No hay datos históricos');
      }
      
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
}