import mongoose, { Schema, Document } from 'mongoose';

export interface CarSitterDocument extends Document {
  name: string;
  // Ajoute les autres propriétés spécifiques à un carsitter ici
}

const carSitterSchema = new Schema<CarSitterDocument>({
  name: { type: String, required: true },
  // Ajoute les autres propriétés spécifiques à un carsitter ici
});

export const CarSitter = mongoose.model<CarSitterDocument>('CarSitter', carSitterSchema);
