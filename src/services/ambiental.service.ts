import { supabase } from '../config/db';
import { SensorAmbiental, SensorAmbientalHistorial } from '../models/sensor.types';

export class AmbientalService {
  static async getCurrent(sensorId: string): Promise<SensorAmbiental | null> {
    const { data, error } = await supabase
      .from('sensores_ambiental')
      .select('*')
      .eq('sensor_id', sensorId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async getHistorial(sensorId: string, limit = 100): Promise<SensorAmbientalHistorial[]> {
    const { data, error } = await supabase
      .from('sensores_ambiental_historial')
      .select('*')
      .eq('sensor_id', sensorId)
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) throw new Error(error.message);
    return data as SensorAmbientalHistorial[];
  }

  static async updateData(sensorId: string, data: Partial<SensorAmbiental>): Promise<void> {
    // Actualizar tabla current
    const { error: updateError } = await supabase
      .from('sensores_ambiental')
      .upsert({ sensor_id: sensorId, ...data });
    
    if (updateError) throw new Error(updateError.message);

    // Insertar en historial
    const { error: insertError } = await supabase
      .from('sensores_ambiental_historial')
      .insert({ sensor_id: sensorId, ...data });
    
    if (insertError) throw new Error(insertError.message);
  }

  static async getResumen(sensorId: string) {
    const { data, error } = await supabase
      .from('sensores_ambiental_historial')
      .select(`
        avg_temperatura: temperatura::float8,
        avg_humedad: humedad::float8,
        avg_presion: presion::float8
      `)
      .eq('sensor_id', sensorId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
}