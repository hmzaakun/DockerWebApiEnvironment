import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateType, setUpdateType] = useState('');
  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehicleType, setNewVehicleType] = useState('');

  // Fonction pour récupérer tous les véhicules
  const getAllVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer un véhicule par ID
  const deleteVehicleById = async () => {
    if (deleteId === '') return;
    try {
      await axios.delete(`http://localhost:3000/api/vehicles/${deleteId}`);
      getAllVehicles();
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour modifier un véhicule par ID
  const updateVehicleById = async (e) => {
    e.preventDefault();
    if (updateId === '' || updateName === '' || updateType === '') return;
    try {
      await axios.put(`http://localhost:3000/api/vehicles/${updateId}`, {
        name: updateName,
        type: updateType,
      });
      getAllVehicles();
      setUpdateId('');
      setUpdateName('');
      setUpdateType('');
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour ajouter un nouveau véhicule
  const addNewVehicle = async (e) => {
    e.preventDefault();
    if (newVehicleName === '' || newVehicleType === '') return;
    try {
      await axios.post('http://localhost:3000/api/vehicles', {
        name: newVehicleName,
        type: newVehicleType,
      });
      getAllVehicles();
      setNewVehicleName('');
      setNewVehicleType('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Gestion des véhicules</h1>

      <form onSubmit={updateVehicleById} className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Modifier par ID :</h2>
        <div className="flex mb-2">
          <label className="mr-2">ID :</label>
          <input
            type="text"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          />
        </div>
        <div className="flex mb-2">
          <label className="mr-2">Nom :</label>
          <input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          />
        </div>
        <div className="flex mb-4">
          <label className="mr-2">Type :</label>
          <select
            value={updateType}
            onChange={(e) => setUpdateType(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          >
            <option value="">Sélectionner un type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Modifier
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Ajouter un véhicule :</h2>
      <form onSubmit={addNewVehicle} className="mb-4">
        <div className="flex mb-2">
          <label className="mr-2">Nom :</label>
          <input
            type="text"
            value={newVehicleName}
            onChange={(e) => setNewVehicleName(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          />
        </div>
        <div className="flex mb-4">
          <label className="mr-2">Type :</label>
          <select
            value={newVehicleType}
            onChange={(e) => setNewVehicleType(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          >
            <option value="">Sélectionner un type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Supprimer par ID :</h2>
      <div className="mb-4">
        <label className="mr-2">ID :</label>
        <input
          type="text"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded"
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
          onClick={deleteVehicleById}
        >
          Supprimer
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Liste des véhicules :</h2>
      {Array.isArray(vehicles) && vehicles.length > 0 ? (
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="border border-gray-300 px-4 py-2">{vehicle._id}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.name}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun véhicule trouvé.</p>
      )}
    </div>
  );
};

export default Vehicle;
