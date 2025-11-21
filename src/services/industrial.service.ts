import { supabase } from '../config/db';
import { SensorIndustrial } from '../models/sensor.types';

export class IndustrialService {
  static async getCurrent(sensorId: string): Promise<SensorIndustrial | null> {
    const { data, error } = await supabase
      .from('sensores_industrial')
      .select('*')
      .eq('sensor_id', sensorId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async updateData(sensorId: string, data: Partial<SensorIndustrial>): Promise<void> {
    const { error } = await supabase
      .from('sensores_industrial')
      .upsert({ sensor_id: sensorId, ...data });
    
    if (error) throw new Error(error.message);
  }
}