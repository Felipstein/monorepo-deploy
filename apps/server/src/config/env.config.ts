export interface EnvConfig {
  NODE_ENV: 'development' | 'production'
  PORT: string
  JWT_SECRET: string
  ORIGIN: string
}

export const env = process.env as unknown as EnvConfig
