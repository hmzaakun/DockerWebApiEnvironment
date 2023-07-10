"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const Vehicle_1 = require("../models/Vehicle");
class VehicleController {
    addVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = new Vehicle_1.Vehicle(req.body);
                yield vehicle.save();
                res.status(201).json(vehicle);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const vehicle = yield Vehicle_1.Vehicle.findByIdAndDelete(id);
                if (!vehicle) {
                    res.status(404).json({ error: 'Vehicle not found' });
                }
                else {
                    res.json(vehicle);
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const vehicle = yield Vehicle_1.Vehicle.findByIdAndUpdate(id, req.body, { new: true });
                if (!vehicle) {
                    res.status(404).json({ error: 'Vehicle not found' });
                }
                else {
                    res.json(vehicle);
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAllVehicles(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicles = yield Vehicle_1.Vehicle.find();
                res.json(vehicles);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.VehicleController = VehicleController;
