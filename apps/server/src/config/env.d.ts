export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ARANGODB_URL: string;
      ARANGODB_NAME: string;
      ARANGODB_USER: string;
      ARANGODB_PASSWORD: string;
      STAGE_NAME: "dev" | "prod";
    }
  }
}
