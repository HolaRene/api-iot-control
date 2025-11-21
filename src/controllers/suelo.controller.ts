import { Request, Response, NextFunction } from 'express';
import { SueloService } from '../services/suelo.service';
import { AppError } from '../middlewares/errorHandler';

export class SueloController {
  static async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const data = await SueloService.getCurrent(sensorId);
      
      if (!data) {
        throw new AppError(404, 'Sensor de suelo no encontrado');
      }
      
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async updateData(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const sensorData = req.body;
      
      await SueloService.updateData(sensorId, sensorData);
      res.json({ message: 'Datos de suelo actualizados correctamente' });
    } catch (error) {
      next(error);
    }
  }
}