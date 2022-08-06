export const PORT: number = Number(process.env.PORT) || 3000
export const MODE: string | 'development' =
  process.env.NODE_ENV || 'development'
