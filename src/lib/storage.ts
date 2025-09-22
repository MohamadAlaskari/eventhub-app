/**
 * Secure local storage utilities
 * @module lib/storage
 */

class SecureStorage {
  private prefix = 'eventhub_';

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(this.getKey(key), value);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  getItem(key: string): string | null {
    try {
      return localStorage.getItem(this.getKey(key));
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }

  clear(): void {
    try {
      // Only clear items with our prefix
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}

export const secureStorage = new SecureStorage();