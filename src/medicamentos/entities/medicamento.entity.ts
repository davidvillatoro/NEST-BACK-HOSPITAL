import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Medicamento extends Document {

    @Prop({
        unique:true,
        index:true
    })
    nombre: string;
    
    @Prop()
    tipo: string;

    @Prop()
    estado: string;

    @Prop()
    cantidad: number;

    @Prop({
        type: String,
        enum: ['si','no','talves'],
    })
    categoria: string;

};


export const MedicamentoSchema = SchemaFactory.createForClass( Medicamento );
