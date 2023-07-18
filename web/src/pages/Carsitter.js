import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carsitter = () => {
  const [carsitters, setCarsitters] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [newCarsitterName, setNewCarsitterName] = useState('');

  // Fonction pour récupérer tous les carsitters
  const getAllCarsitters = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/carsitters');
      setCarsitters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer un carsitter par ID
  const deleteCarsitterById = async () => {
    if (deleteId === '') return;
    try {
      await axios.delete(`http://localhost:3000/api/carsitters/${deleteId}`);
      getAllCarsitters();
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour modifier un carsitter par ID
  const updateCarsitterById = async (e) => {
    e.preventDefault();
    if (updateId === '' || updateName === '') return;
    try {
      await axios.put(`http://localhost:3000/api/carsitters/${updateId}`, {
        name: updateName,
      });
      getAllCarsitters();
      setUpdateId('');
      setUpdateName('');
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour ajouter un nouveau carsitter
  const addNewCarsitter = async (e) => {
    e.preventDefault();
    if (newCarsitterName === '') return;
    try {
      await axios.post('http://localhost:3000/api/carsitters', {
        name: newCarsitterName,
      });
      getAllCarsitters();
      setNewCarsitterName('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCarsitters();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Gestion des carsitters</h1>

      <form onSubmit={updateCarsitterById} className="mb-4">
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
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Modifier
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Ajouter un carsitter :</h2>
      <form onSubmit={addNewCarsitter} className="mb-4">
        <div className="flex mb-2">
          <label className="mr-2">Nom :</label>
          <input
            type="text"
            value={newCarsitterName}
            onChange={(e) => setNewCarsitterName(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          />
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
          onClick={deleteCarsitterById}
        >
          Supprimer
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Liste des carsitters :</h2>
      {carsitters.length > 0 ? (
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
            </tr>
          </thead>
          <tbody>
            {carsitters.map((carsitter) => (
              <tr key={carsitter.id}>
                <td className="border border-gray-300 px-4 py-2">{carsitter._id}</td>
                <td className="border border-gray-300 px-4 py-2">{carsitter.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun carsitter trouvé.</p>
      )}
    </div>
  );
};

export default Carsitter;
