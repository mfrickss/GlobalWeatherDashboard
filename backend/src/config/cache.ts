import { env } from './env';

interface CacheEntry<T> {
  value: T;
  expiry: number;
}

class NativeCache {
  private store = new Map<string, CacheEntry<unknown>>();
  private defaultTtlMs: number;

  constructor(defaultTtlSeconds: number) {
    this.defaultTtlMs = defaultTtlSeconds * 1000;
  }

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlSeconds?: number): void {
    const ttlMs =
      ttlSeconds !== undefined ? ttlSeconds * 1000 : this.defaultTtlMs;
    const expiry = Date.now() + ttlMs;
    this.store.set(key, { value, expiry });
  }

  flushAll(): void {
    this.store.clear();
  }
}

export const cache = new NativeCache(env.cacheTtlSeconds);
