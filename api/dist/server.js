"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const VehicleController_1 = require("./controllers/VehicleController");
const CarSitterController_1 = require("./controllers/CarSitterController");
// Création de l'application Express
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Connexion à la base de données MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/mydatabase')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});
// Contrôleurs
const vehicleController = new VehicleController_1.VehicleController();
const carSitterController = new CarSitterController_1.CarSitterController();
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
app.get('/', (req, res) => {
    res.send('API is running');
});
// Port d'écoute
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
