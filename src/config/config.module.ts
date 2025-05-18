import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurationSchema } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      validationSchema: configurationSchema,
      cache: true,
      expandVariables: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class AppConfigModule {}
