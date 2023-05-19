import { Module } from '@nestjs/common';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-hospital') ,
    MedicamentosModule,
    CommonModule
  ],
})
export class AppModule {}
  