import { Router } from 'express';
import ambientalRoutes from './ambiental.routes';
import calidadAireRoutes from './calidadAire.routes';
import sensorRoutes from './sensor.routes'
import personalizadoRoutes from './personalizado.routes'; 
import energiaRoutes from './energia.routes';
import seguridadRoutes from './seguridad.routes'; 
import sueloRoutes from './suelo.routes'; 
import industrialRoutes from './industrial.routes'; // 

const router = Router();


// Rutas base
router.use('/sensores', sensorRoutes);

// Rutas específicas por categoría
router.use('/sensores/:sensorId/ambiental', ambientalRoutes);

router.use('/sensores/:sensorId/calidad-aire', calidadAireRoutes);

router.use('/sensores/:sensorId/energia', energiaRoutes);

router.use('/sensores/:sensorId/personalizado', personalizadoRoutes); 

router.use('/sensores/:sensorId/seguridad', seguridadRoutes);

router.use('/sensores/:sensorId/suelo', sueloRoutes);

router.use('/sensores/:sensorId/industrial', industrialRoutes);


export default router;