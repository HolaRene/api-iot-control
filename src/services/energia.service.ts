import { supabase } from '../config/db';
import { SensorEnergia } from '../models/sensor.types';

export class EnergiaService {
  static async getCurrent(sensorId: string): Promise<SensorEnergia | null> {
    const { data, error } = await supabase
      .from('sensores_energia')
      .select('*')
      .eq('sensor_id', sensorId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async updateData(sensorId: string, data: Partial<SensorEnergia>): Promise<void> {
    const { error } = await supabase
      .from('sensores_energia')
      .upsert({ sensor_id: sensorId, ...data });
    
    if (error) throw new Error(error.message);
  }
}