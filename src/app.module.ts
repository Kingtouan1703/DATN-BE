import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { RollCallModule } from './roll-call/roll-call.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttModule } from 'nest-mqtt';
import { IotModule } from './room/room.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    MqttModule.forRoot({
      host: '78c415f89ff6429d919a8bf55b487641.s1.eu.hivemq.cloud',
      port: 8883,
      username: 'redutdep13',
      password: 'redutdep1703',
      protocol: 'mqtts',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    RollCallModule,
    AuthModule,
    IotModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
