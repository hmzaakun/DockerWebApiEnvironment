import mongoose, { Schema, Document } from 'mongoose';

export interface VehicleDocument extends Document {
  name: string;
  type: 'car' | 'motorcycle';
  // Ajoute les autres propriétés spécifiques à un véhicule ici
}

const vehicleSchema = new Schema<VehicleDocument>({
  name: { type: String, required: true },
  type: { type: String, enum: ['car', 'motorcycle'], required: true },
  // Ajoute les autres propriétés spécifiques à un véhicule ici
});

export const Vehicle = mongoose.model<VehicleDocument>('Vehicle', vehicleSchema);
