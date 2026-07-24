export interface WeatherData {
  country: string;
  city: string;
  localtime: string;
  temperature_c: number;
  temperature_f: number;
  condition: string;
  condition_icon: string;
  feels_like_c: number;
  feels_like_f: number;
  humidity: number;
  wind_kph: number;
  precip_mm: number;
  cloud: number;
  uv: number;
  pressure_mb: number;
  vis_km: number;
  forecast?: { time: string; temp_c: number; temp_f: number; condition: string }[];
}


export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  code: string;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
