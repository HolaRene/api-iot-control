import { Router } from 'express';
import { PersonalizadoController } from '../controllers/personalizado.controller';

const router = Router({ mergeParams: true });

router.get('/', PersonalizadoController.getCurrent);
router.post('/data', PersonalizadoController.updateData);

export default router;