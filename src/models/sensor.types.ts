export interface Sensor {
  id: string;
  nombre: string;
  categoria: 'ambiental' | 'calidad_aire' | 'energia' | 'industrial' | 'personalizado' | 'seguridad' | 'suelo';
  ubicacion?: string;
  activo: boolean;
  created_at: string;
}

// Tablas específicas
export interface SensorAmbiental {
  sensor_id: string;
  temperatura: number | null;
  humedad: number | null;
  presion: number | null;
  clima: string | null;
}

export interface SensorAmbientalHistorial extends SensorAmbiental {
  id: string;
  timestamp: string;
}

export interface SensorCalidadAire {
  sensor_id: string;
  co2: number | null;
  pm25: number | null;
  voc: number | null;
}

export interface SensorEnergia {
  sensor_id: string;
  voltaje: number | null;
  corriente: number | null;
  potencia: number | null;
}

export interface SensorIndustrial {
  sensor_id: string;
  vibracion: number | null;
  ruido: number | null;
  inclinacion: number | null;
  consumo: number | null;
}

export interface SensorPersonalizado {
  sensor_id: string;
  datos: Record<string, any> | null;
}

export interface SensorSeguridad {
  sensor_id: string;
  movimiento: boolean | null;
  puerta: boolean | null;
  humo: boolean | null;
  agua: boolean | null;
}

export interface SensorSuelo {
  sensor_id: string;
  humedad_suelo: number | null;
  ph: number | null;
}

// DTO para creación/actualización
export type SensorDataDTO<T> = Partial<Omit<T, 'sensor_id'>>;