declare module 'diacritic' {
  /**
   * Removes diacritics from a string
   * @param str - The string from which to remove diacritics
   * @returns The string without diacritics
   */
  export function clean(str: string): string;
  
  /**
   * Diacritic mappings (if needed in your code)
   */
  export const diacritics: Record<string, string>;
}
