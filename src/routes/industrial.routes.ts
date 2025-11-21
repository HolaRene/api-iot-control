import { Router } from 'express';
import { IndustrialController } from '../controllers/industrial.controller';

const router = Router({ mergeParams: true });

router.get('/', IndustrialController.getCurrent);
router.post('/data', IndustrialController.updateData);

export default router;