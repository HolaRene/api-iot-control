import { supabase } from '../config/db';
import { SensorPersonalizado } from '../models/sensor.types';

export class PersonalizadoService {
  static async getCurrent(sensorId: string): Promise<SensorPersonalizado | null> {
    const { data, error } = await supabase
      .from('sensores_personalizado')
      .select('*')
      .eq('sensor_id', sensorId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async updateData(sensorId: string, datos: Record<string, any>): Promise<void> {
    const { error } = await supabase
      .from('sensores_personalizado')
      .upsert({ 
        sensor_id: sensorId, 
        datos: datos 
      });
    
    if (error) throw new Error(error.message);
  }
}