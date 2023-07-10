import { Request, Response } from 'express';
import { Vehicle, VehicleDocument } from '../models/Vehicle';

export class VehicleController {
  public async addVehicle(req: Request, res: Response): Promise<void> {
    try {
      const vehicle = new Vehicle(req.body);
      await vehicle.save();
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async deleteVehicle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findByIdAndDelete(id);
      if (!vehicle) {
        res.status(404).json({ error: 'Vehicle not found' });
      } else {
        res.json(vehicle);
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async updateVehicle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });
      if (!vehicle) {
        res.status(404).json({ error: 'Vehicle not found' });
      } else {
        res.json(vehicle);
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async getAllVehicles(_: Request, res: Response): Promise<void> {
    try {
      const vehicles = await Vehicle.find();
      res.json(vehicles);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
