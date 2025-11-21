import { Request, Response, NextFunction } from 'express';
import { PersonalizadoService } from '../services/personalizado.service';
import { AppError } from '../middlewares/errorHandler';

export class PersonalizadoController {
  static async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const data = await PersonalizadoService.getCurrent(sensorId);
      
      if (!data) {
        throw new AppError(404, 'Sensor personalizado no encontrado');
      }
      
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async updateData(req: Request, res: Response, next: NextFunction) {
    try {
      const { sensorId } = req.params;
      const datos = req.body;
      
      await PersonalizadoService.updateData(sensorId, datos);
      res.json({ message: 'Datos de sensor personalizado actualizados correctamente' });
    } catch (error) {
      next(error);
    }
  }
}