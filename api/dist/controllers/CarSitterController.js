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
exports.CarSitterController = void 0;
const CarSitter_1 = require("../models/CarSitter");
class CarSitterController {
    addCarSitter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carSitter = new CarSitter_1.CarSitter(req.body);
                yield carSitter.save();
                res.status(201).json(carSitter);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteCarSitter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const carSitter = yield CarSitter_1.CarSitter.findByIdAndDelete(id);
                if (!carSitter) {
                    res.status(404).json({ error: 'CarSitter not found' });
                }
                else {
                    res.json(carSitter);
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateCarSitter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const carSitter = yield CarSitter_1.CarSitter.findByIdAndUpdate(id, req.body, { new: true });
                if (!carSitter) {
                    res.status(404).json({ error: 'CarSitter not found' });
                }
                else {
                    res.json(carSitter);
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAllCarSitters(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carSitters = yield CarSitter_1.CarSitter.find();
                res.json(carSitters);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CarSitterController = CarSitterController;
