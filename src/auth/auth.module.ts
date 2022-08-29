import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from "@nestjs/mongoose"
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from "./local.auth";
import { UserSchema } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";


@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }