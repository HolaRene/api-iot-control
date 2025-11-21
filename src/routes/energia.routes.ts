import { Router } from 'express';
import { EnergiaController } from '../controllers/energia.controller';

const router = Router({ mergeParams: true });

router.get('/', EnergiaController.getCurrent);
router.post('/data', EnergiaController.updateData);

export default router;