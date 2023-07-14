import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Bienvenue sur notre site de gestion de flotte de véhicules</h1>
      <p className="text-lg mb-4">
        Ce site a pour objectif de vous permettre de gérer facilement les carsitters et les véhicules de votre flotte.
        Vous pouvez effectuer les opérations suivantes :
      </p>
      <ul className="list-disc pl-6">
        <li>Ajouter, supprimer, modifier et consulter les véhicules</li>
        <li>Ajouter, supprimer, modifier et consulter le profil des carsitters</li>
      </ul>
    </div>
  );
};

export default Home;
