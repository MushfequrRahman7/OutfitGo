// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy], 
  exports: [AuthService], 
})
export class AuthModule {}
