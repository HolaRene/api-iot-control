import { supabase } from '../config/db';
import { SensorCalidadAire } from '../models/sensor.types';

export class CalidadAireService {
  static async getCurrent(sensorId: string): Promise<SensorCalidadAire | null> {
    const { data, error } = await supabase
      .from('sensores_calidad_aire')
      .select('*')
      .eq('sensor_id', sensorId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async updateData(sensorId: string, data: Partial<SensorCalidadAire>): Promise<void> {
    const { error } = await supabase
      .from('sensores_calidad_aire')
      .upsert({ sensor_id: sensorId, ...data });
    
    if (error) throw new Error(error.message);
  }
}