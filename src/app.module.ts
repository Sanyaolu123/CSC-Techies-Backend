import { Module } from '@nestjs/common';
import { FeaturesModule } from './modules/features.module';
import { SharedModule } from './shared/shared.module';
import { AppConfigModule } from './config/config.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CoreModule } from './core/core.module';
import { JwtConfigModule } from './Jwt/jwt.module';

@Module({
  imports: [
    AppConfigModule,
    CoreModule,
    JwtConfigModule,
    SharedModule,
    FeaturesModule,
    CacheModule.register({ ttl: 0, isGlobal: true }),
  ],
  providers: [],
  exports: [CacheModule],
})
export class AppModule {}
