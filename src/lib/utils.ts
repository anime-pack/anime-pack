import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

/**
 * Type guard to check if a value is a plain object (not null and not an array).
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Recursively converts ISO date strings within an object/array back to Date objects.
 * This function is designed to be used after a general deserializer (like zipson.parse)
 * has converted the string into a JavaScript object structure.
 *
 * @template T The expected type of the value after revival.
 * @param {T} value The value to traverse (object, array, or primitive).
 * @returns {T} The value with Date strings converted to Date objects.
 */
export function reviveDates<T>(value: T): T {
  // Check if it's a string that looks like an ISO date
  if (typeof value === 'string') {
    // A more robust regex for ISO 8601 date strings.
    // This allows for optional milliseconds (.xyz) and the 'Z' timezone.
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;
    if (isoDateRegex.test(value)) {
      // Return a new Date object if it matches the pattern
      return new Date(value) as T; // Cast needed as Date is not strictly 'string'
    }
  }

  // If it's a plain object (not null, not an array)
  if (isPlainObject(value)) {
    const newObject: Record<string, unknown> = {};
    for (const key in value) {
      // Ensure we only process own properties to avoid prototype chain issues
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        // Recursively call reviveDates for nested properties
        newObject[key] = reviveDates(value[key]);
      }
    }
    return newObject as T; // Cast the new object back to the original generic type T
  }

  // If it's an array
  if (Array.isArray(value)) {
    // Map over each element, recursively calling reviveDates
    return value.map(item => reviveDates(item)) as T; // Cast the new array back to T
  }

  // For primitives (numbers, booleans, non-date strings) or null, return as is
  return value;
}
