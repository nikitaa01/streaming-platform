declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    APP_URL: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    FILES_ROOT: string;
  }
}
