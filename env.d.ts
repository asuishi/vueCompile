/// <reference types="vite/client" />

declare module 'compiler-step' {
  export function parseTemplate(args: any[]): any;
  export function transformTemplate(args: any[]): any;
  export function generateTemplate(args: any[]): any;
}