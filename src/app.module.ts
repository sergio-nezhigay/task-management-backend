import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { TaskListModule } from './task-list/task-list.module';
import { TaskList } from './task-list/entities/task-list.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables using ConfigModule
    TypeOrmModule.forRootAsync({
      // Use TypeOrmModule.forRootAsync for async configuration
      imports: [ConfigModule], // Import ConfigModule to access ConfigService
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'postgres'),

        entities: [Task, TaskList],
        synchronize: true,
        logging: true,
        ssl: true,
      }),
    }),
    TaskModule,
    TaskListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
