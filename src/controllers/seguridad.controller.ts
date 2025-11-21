import { Request, Response, NextFunction } from 'express';
import { SeguridadService } from '../services/seguridad.service';
import { AppError } from '../middlewares/errorHandler';

export class SeguridadController {
  static async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const data = await SeguridadService.getCurrent(sensorId);
      
      if (!data) {
        throw new AppError(404, 'Sensor de seguridad no encontrado');
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
      
      await SeguridadService.updateData(sensorId, sensorData);
      res.json({ message: 'Datos de seguridad actualizados correctamente' });
    } catch (error) {
      next(error);
    }
  }
}