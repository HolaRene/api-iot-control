import { Router } from 'express';
import { SueloController } from '../controllers/suelo.controller';

const router = Router({ mergeParams: true });

router.get('/', SueloController.getCurrent);
router.post('/data', SueloController.updateData);

export default router;