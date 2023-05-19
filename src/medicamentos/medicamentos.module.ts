import { Module } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from './medicamentos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicamento, MedicamentoSchema } from './entities/medicamento.entity';

@Module({
  controllers: [MedicamentosController],
  providers: [MedicamentosService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Medicamento.name,
        schema: MedicamentoSchema,
      }
    ])
  ]
})
export class MedicamentosModule {}
