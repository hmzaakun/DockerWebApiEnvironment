import { Request, Response } from 'express';
import { CarSitter, CarSitterDocument } from '../models/CarSitter';

export class CarSitterController {
  public async addCarSitter(req: Request, res: Response): Promise<void> {
    try {
      const carSitter = new CarSitter(req.body);
      await carSitter.save();
      res.status(201).json(carSitter);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async deleteCarSitter(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const carSitter = await CarSitter.findByIdAndDelete(id);
      if (!carSitter) {
        res.status(404).json({ error: 'CarSitter not found' });
      } else {
        res.json(carSitter);
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async updateCarSitter(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const carSitter = await CarSitter.findByIdAndUpdate(id, req.body, { new: true });
      if (!carSitter) {
        res.status(404).json({ error: 'CarSitter not found' });
      } else {
        res.json(carSitter);
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async getAllCarSitters(_: Request, res: Response): Promise<void> {
    try {
      const carSitters = await CarSitter.find();
      res.json(carSitters);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
