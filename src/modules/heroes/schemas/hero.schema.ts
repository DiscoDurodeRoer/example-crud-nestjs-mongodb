import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Hero {

    /*
        Indico que:
         - Es requerido
         - Es unico
         - Se guarda en mayusculas
         - Limpia espacios por delante y por detras
    */
    @Prop({ required: true, unique: true, uppercase: true, trim: true })
    name: string;

    @Prop()
    age: number;

    @Prop()
    superpower: string;

}

// Crea el schema a partir de la clase
export const heroSchema = SchemaFactory.createForClass(Hero)
