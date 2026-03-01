import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from "@nestjs/config";
import { configSchema, databaseConfig } from './config';
import { NarangoModule } from "@ronatilabs/narango";
import { Agent } from "node:http";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.STAGE_NAME}`, ".env"],
      validationSchema: configSchema,
      load: [databaseConfig],
    }),
    NarangoModule.registerAsync({
      global: true,
      useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => ({
        database: {
          url: dbConfig.url,
          databaseName: dbConfig.name,
          auth: {
            username: dbConfig.user,
            password: dbConfig.password,
          },
          maxConnections: 20, // instead of default 3
          requestTimeout: 60_000, // 60 seconds instead of infinite
          acquireTimeoutTotal: 120_000, // 120 seconds instead of 30 s

          // Custom HTTP agent – this is the most important part
          agent: new Agent({
            keepAlive: true,
            keepAliveMsecs: 90_000, // probe every 90 s (well before 300 s server close)
            timeout: 45_000, // kill socket if silent > 45 s
            maxSockets: 20, // same as maxConnections
          }),
        },
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
})
export class AppModule { }
