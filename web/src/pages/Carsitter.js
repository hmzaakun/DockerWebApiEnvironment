import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carsitter = () => {
  const [carsitters, setCarsitters] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateProfile, setUpdateProfile] = useState('');

  // Fonction pour récupérer tous les carsitters
  const getAllCarsitters = async () => {
    try {
      const response = await axios.get('/api/carsitters');
      setCarsitters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour rechercher un carsitter par ID
  const searchCarsitterById = async () => {
    if (searchId === '') return;
    try {
      const response = await axios.get(`/api/carsitters/${searchId}`);
      setCarsitters(response.data ? [response.data] : []);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer un carsitter par ID
  const deleteCarsitterById = async () => {
    if (deleteId === '') return;
    try {
      await axios.delete(`/api/carsitters/${deleteId}`);
      getAllCarsitters();
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour modifier un carsitter par ID
  const updateCarsitterById = async (e) => {
    e.preventDefault();
    if (updateId === '' || updateName === '' || updateProfile === '') return;
    try {
      await axios.put(`/api/carsitters/${updateId}`, {
        name: updateName,
        profile: updateProfile,
      });
      getAllCarsitters();
      setUpdateId('');
      setUpdateName('');
      setUpdateProfile('');
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

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={getAllCarsitters}
        >
          Récupérer tous les carsitters
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2">Rechercher par ID :</label>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded"
          onClick={searchCarsitterById}
        >
          Rechercher
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2">Supprimer par ID :</label>
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
        <div className="flex mb-4">
          <label className="mr-2">Profil :</label>
          <input
            type="text"
            value={updateProfile}
            onChange={(e) => setUpdateProfile(e.target.value)}
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

      <h2 className="text-lg font-semibold mb-2">Liste des carsitters :</h2>
      {carsitters.length > 0 ? (
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Profil</th>
            </tr>
          </thead>
          <tbody>
            {carsitters.map((carsitter) => (
              <tr key={carsitter.id}>
                <td className="border border-gray-300 px-4 py-2">{carsitter.id}</td>
                <td className="border border-gray-300 px-4 py-2">{carsitter.name}</td>
                <td className="border border-gray-300 px-4 py-2">{carsitter.profile}</td>
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
