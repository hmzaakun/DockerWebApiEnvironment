import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { VehicleController } from './controllers/VehicleController';
import { CarSitterController } from './controllers/CarSitterController';

// Création de l'application Express
const app = express();
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://mongodb:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });


// Contrôleurs
const vehicleController = new VehicleController();
const carSitterController = new CarSitterController();

// Routes pour les véhicules
app.post('/api/vehicles', vehicleController.addVehicle.bind(vehicleController));
app.delete('/api/vehicles/:id', vehicleController.deleteVehicle.bind(vehicleController));
app.put('/api/vehicles/:id', vehicleController.updateVehicle.bind(vehicleController));
app.get('/api/vehicles', vehicleController.getAllVehicles.bind(vehicleController));

// Routes pour les carsitters
app.post('/api/carsitters', carSitterController.addCarSitter.bind(carSitterController));
app.delete('/api/carsitters/:id', carSitterController.deleteCarSitter.bind(carSitterController));
app.put('/api/carsitters/:id', carSitterController.updateCarSitter.bind(carSitterController));
app.get('/api/carsitters', carSitterController.getAllCarSitters.bind(carSitterController));

// Route de base pour tester l'API
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// Port d'écoute
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
