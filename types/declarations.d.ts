declare module 'diff' {
  interface Change {
    value: string;
    added?: boolean;
    removed?: boolean;
    count?: number;
  }
  
  export function diffLines(oldText: string, newText: string, options?: any): Change[];
  export function diffWords(oldText: string, newText: string, options?: any): Change[];
  export function diffChars(oldText: string, newText: string, options?: any): Change[];
}