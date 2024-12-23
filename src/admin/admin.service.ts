// src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity'; 

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) 
    private adminRepository: Repository<Admin>,
  ) {}

  async validateAdminCredentials(adminId: string, password: string): Promise<boolean> {
    const admin = await this.adminRepository.findOneBy({ adminId });

    if (!admin) {
      return false;
    }

    return admin.password === password;
  }
}
