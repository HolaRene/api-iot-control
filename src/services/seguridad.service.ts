import { supabase } from '../config/db';
import { SensorSeguridad } from '../models/sensor.types';

export class SeguridadService {
  static async getCurrent(sensorId: string): Promise<SensorSeguridad | null> {
    const { data, error } = await supabase
      .from('sensores_seguridad')
      .select('*')
      .eq('sensor_id', sensorId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async updateData(sensorId: string, data: Partial<SensorSeguridad>): Promise<void> {
    const { error } = await supabase
      .from('sensores_seguridad')
      .upsert({ sensor_id: sensorId, ...data });
    
    if (error) throw new Error(error.message);
  }
}