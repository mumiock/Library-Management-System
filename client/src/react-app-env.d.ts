/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PUBLIC_URL: string;
    }
  }
}

export {};
