import { supabase } from '../config/db';
import { SensorSuelo } from '../models/sensor.types';

export class SueloService {
  static async getCurrent(sensorId: string): Promise<SensorSuelo | null> {
    const { data, error } = await supabase
      .from('sensores_suelo')
      .select('*')
      .eq('sensor_id', sensorId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async updateData(sensorId: string, data: Partial<SensorSuelo>): Promise<void> {
    const { error } = await supabase
      .from('sensores_suelo')
      .upsert({ sensor_id: sensorId, ...data });
    
    if (error) throw new Error(error.message);
  }
}