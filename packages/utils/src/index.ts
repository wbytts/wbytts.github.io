export type Nullable<T> = T | null | undefined;

export function isNil<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

export function assert(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function joinPath(...segments: Array<string | undefined | null>): string {
  return segments
    .filter((segment): segment is string => Boolean(segment) && segment.trim().length > 0)
    .join('/')
    .replace(/\/{2,}/g, '/');
}
