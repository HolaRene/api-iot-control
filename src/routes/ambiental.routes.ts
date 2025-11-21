import { Router } from 'express';
import { AmbientalController } from '../controllers/ambiental.controller';

const router = Router({ mergeParams: true });

router.get('/', AmbientalController.getCurrent);
router.get('/historial', AmbientalController.getHistorial);
router.get('/resumen', AmbientalController.getResumen);
router.post('/data', AmbientalController.updateData);

export default router;