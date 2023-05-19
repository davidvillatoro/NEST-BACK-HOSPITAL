import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Medicamento } from './entities/medicamento.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MedicamentosService {

  constructor(
    @InjectModel( Medicamento.name ) //injetar el servicio
    private readonly MedicametnoModel: Model<Medicamento>, //referencia a los medotodos de mongoose y la entidad
  ){}

  async create(createMedicamentoDto: CreateMedicamentoDto) {
    try {
      
      createMedicamentoDto.nombre = createMedicamentoDto.nombre.toLocaleLowerCase(); //grabar el nombre en minuscula
      const medicamento = await this.MedicametnoModel.create(createMedicamentoDto);
      return medicamento;

    } catch (error) {
      this.ErrorDuplicado_valoresInvalidos(error);
    }

  }

  findAll() {
    return `This action returns all medicamentos`;
  }

  async findOne(term: string) {
    let medicamento: Medicamento;
    
   /*  if (!isNaN(+term)) {
      medicamento = await this.MedicametnoModel.findOne({ cantidad: term })
    } */  //-----------busqueda con numeros


    //medicamento por id
    if(!medicamento && isValidObjectId(term)) medicamento = await this.MedicametnoModel.findById(term);

    //medicamento por nombre
    if( !medicamento) medicamento = await this.MedicametnoModel.findOne({ nombre: term.toLocaleLowerCase()})

    //medicamento no existe
    if(!medicamento) throw new NotFoundException(`medicamento con id , name o tipo "${term}" no existe`);

    return medicamento;
  };




  async update(term: string, updateMedicamentoDto: UpdateMedicamentoDto) {
    try {
      
      const medicamento = await this.findOne(term);
      if (updateMedicamentoDto.nombre) {
        updateMedicamentoDto.nombre = updateMedicamentoDto.nombre.toLocaleLowerCase();
      }
      
      await medicamento.updateOne( updateMedicamentoDto);
      
      return {
        ...medicamento.toJSON(),  ...updateMedicamentoDto
      }


    } catch (error) {
       this.ErrorDuplicado_valoresInvalidos(error);
    }
  }



  async remove(id: string) {
    
    const {deletedCount} = await this.MedicametnoModel.deleteOne({ _id: id});

    if (deletedCount ===0) {
      throw new BadRequestException(`Medicamento  con ID "${id}" no se encuentra`);
    }

    return;
  }



  //metodos de errores
 private ErrorDuplicado_valoresInvalidos(error: any){
      if (error._message === 'Medicamento validation failed' ) {
        throw new BadRequestException(`Valores no validos:  ${error} `)
      } 

      if (error.code === 11000 ) {
        throw new BadRequestException(`Medicamento ya existe en la bbdd: ${JSON.stringify(error.keyValue)} `);
      } 

      console.log(error);
      throw new InternalServerErrorException( 'logs del servidor')
        
    }

}



