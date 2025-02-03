// src/notification/notification.controller.ts
import { Controller, Get, Delete, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';

@Controller('admin/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Get all notifications
  @Get()
  async getNotifications(): Promise<Notification[]> {
    return this.notificationService.getNotifications();
  }

  // Delete a notification by ID
  @Delete(':id')
  async deleteNotification(@Param('id') id: number): Promise<void> {
    await this.notificationService.deleteNotification(id);
  }
}
