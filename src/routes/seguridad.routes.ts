import { Router } from 'express';
import { SeguridadController } from '../controllers/seguridad.controller';

const router = Router({ mergeParams: true });

router.get('/', SeguridadController.getCurrent);
router.post('/data', SeguridadController.updateData);

export default router;