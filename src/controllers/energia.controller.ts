import { Request, Response, NextFunction } from 'express';
import { EnergiaService } from '../services/energia.service';
import { AppError } from '../middlewares/errorHandler';

export class EnergiaController {
  static async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const data = await EnergiaService.getCurrent(sensorId);
      
      if (!data) {
        throw new AppError(404, 'Sensor de energía no encontrado');
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
      
      await EnergiaService.updateData(sensorId, sensorData);
      res.json({ message: 'Datos de energía actualizados correctamente' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}