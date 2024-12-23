// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(adminId: string) {
    const payload = { adminId }; 
    const accessToken = this.jwtService.sign(payload); 

    return {
      access_token: accessToken, 
    };
  }
}
