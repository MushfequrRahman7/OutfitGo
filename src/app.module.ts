// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';  
import { CategoryModule } from './category/category.module';  
import { DiscountModule } from './discount/discount.module';  
import { ProductModule } from './product/product.module';  
import { OrderModule } from './order/order.module';  
import { AuthModule } from './auth/auth.module';  
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '45721',
      database: 'OutfitGo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  
      synchronize: true,  
    }),
    AdminModule,  
    CategoryModule,  
    DiscountModule, 
    ProductModule,  
    OrderModule,  
    AuthModule, NotificationModule,  
  ],
})
export class AppModule {}
