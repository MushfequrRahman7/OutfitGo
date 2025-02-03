// src/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  // Method to get all notifications
  async getNotifications(): Promise<Notification[]> {
    return this.notificationRepository.find(); 
  }
  async deleteNotification(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
  
}
