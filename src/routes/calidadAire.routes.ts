import { Router } from 'express';
import { CalidadAireController } from '../controllers/calidadAire.controller';

const router = Router({ mergeParams: true });

router.get('/', CalidadAireController.getCurrent);
router.post('/data', CalidadAireController.updateData);

export default router;