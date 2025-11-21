import { Request, Response, NextFunction } from 'express';
import { CalidadAireService } from '../services/calidadAire.service';
import { AppError } from '../middlewares/errorHandler';

export class CalidadAireController {
  static async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const data = await CalidadAireService.getCurrent(sensorId);
      
      if (!data) {
        throw new AppError(404, 'Sensor de calidad de aire no encontrado');
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
      
      await CalidadAireService.updateData(sensorId, sensorData);
      res.json({ message: 'Datos de calidad de aire actualizados correctamente' });
    } catch (error) {
      next(error);
    }
  }
}