export interface Config {
  secret: string;
  refreshSecret: string;
  tokenExpireMin: number;
  refreshTokenExpireMin: number;
}

export const config: Config = {
  secret: process.env.SECRET || 'hcetofnippaodotkcabsj',
  refreshSecret: process.env.REFRESH_SECRET || 'jgmenhivobgdkslslvvflfbjfpbkrnspwnv',
  tokenExpireMin: Number(process.env.TOKEN_EXPIRES_MIN) || 60,
  refreshTokenExpireMin: Number(process.env.REFRESH_TOKEN_EXPIRES_MIN) || 10080
};
