import { Request, Response, NextFunction } from 'express';
import { SensorService } from '../services/sensor.service';
import { AppError } from '../middlewares/errorHandler';

export class SensorController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const sensores = await SensorService.getAll();
      res.json({ data: sensores });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const sensor = await SensorService.getById(id);
      if (!sensor) throw new AppError(404, 'Sensor no encontrado');
      res.json({ data: sensor });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const sensor = await SensorService.create(req.body);
      res.status(201).json({ data: sensor });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const sensor = await SensorService.update(id, req.body);
      res.json({ data: sensor });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await SensorService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}