export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl !== 'undefined' && envUrl.trim() !== '') {
    return envUrl.replace(/\/$/, '');
  }
  return 'http://localhost:3001';
}

