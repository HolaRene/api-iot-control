import { supabase } from '../config/db';
import { Sensor } from '../models/sensor.types';

export class SensorService {
  static async getAll(): Promise<Sensor[]> {
    const { data, error } = await supabase
      .from('sensores')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data as Sensor[];
  }

  static async getById(id: string): Promise<Sensor | null> {
    const { data, error } = await supabase
      .from('sensores')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data as Sensor;
  }

  static async create(sensor: Omit<Sensor, 'id' | 'created_at'>): Promise<Sensor> {
    const { data, error } = await supabase
      .from('sensores')
      .insert(sensor)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data as Sensor;
  }

  static async update(id: string, updates: Partial<Sensor>): Promise<Sensor> {
    const { data, error } = await supabase
      .from('sensores')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data as Sensor;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('sensores')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  }
}