import { Router } from 'express';
import { SensorController } from '../controllers/sensor.controller';

const router = Router();

router.get('/', SensorController.getAll);
router.get('/:id', SensorController.getById);
router.post('/', SensorController.create);
router.put('/:id', SensorController.update);
router.delete('/:id', SensorController.delete);

export default router;