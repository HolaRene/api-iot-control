import { Request, Response, NextFunction } from 'express';
import { IndustrialService } from '../services/industrial.service';
import { AppError } from '../middlewares/errorHandler';

export class IndustrialController {
  static async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const data = await IndustrialService.getCurrent(sensorId);
      
      if (!data) {
        throw new AppError(404, 'Sensor industrial no encontrado');
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
      
      await IndustrialService.updateData(sensorId, sensorData);
      res.json({ message: 'Datos industriales actualizados correctamente' });
    } catch (error) {
      next(error);
    }
  }
}