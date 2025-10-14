import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { MarineServicesModule } from './marine-services/marine-services.module';
import { LearningCenterModule } from './learning-center/learning-center.module';
import { SeaPersonnelModule } from './sea-personnel/sea-personnel.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SeaJobsModule } from './sea-jobs/sea-jobs.module';
import { join } from 'path';
import { TokenizationModule } from './tokenization/tokenization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User],
      autoLoadEntities: true,
      synchronize: true, // only for dev
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api/{*test}'],
      serveRoot: '/uploads',
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    AuthModule,
    UserModule,
    MarketplaceModule,
    MarineServicesModule,
    SeaJobsModule,
    SeaPersonnelModule,
    LearningCenterModule,
    TokenizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
