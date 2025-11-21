import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  supabase: {
    url: process.env.SUPABASE_URL!,
    anonKey: process.env.SUPABASE_ANON_KEY!,
  },
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY!,
};