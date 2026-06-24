import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../../Components/UI/Button/Button";
import Card from "../../Components/UI/Card/Card";

import ConfirmModal from "../../Components/UI/ConfirmModal/ConfirmModal";
import AdoptionModal from "../../Components/UI/AdoptionModal/AdoptionModal";
import { getPetIcon } from "../../utils/getPetIcon";

import styles from "./Display.module.css";

const Display = () => {
  const [pets, setPets] = useState([]);
  const [petToDelete, setPetToDelete] = useState(null);
  const [petToAdopt, setPetToAdopt] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((res) => {
        setPets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePet = (petId) => {
    axios
      .delete("http://localhost:8000/api/pets/" + petId)
      .then(() => {
        setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
        setPetToDelete(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeAdoption = () => {
    if (!petToAdopt) return;

    axios
      .delete("http://localhost:8000/api/pets/" + petToAdopt._id)
      .then(() => {
        setPets((prevPets) =>
          prevPets.filter((pet) => pet._id !== petToAdopt._id)
        );
        setPetToAdopt(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className={styles.page}>
      

      {pets.length === 0 ? (
        <Card className={styles.emptyState}>
          <div className={styles.emptyIcon}>🐾</div>

          <h3>No pets listed yet</h3>
          <p>Add the first pet to start building the shelter list.</p>

          <Button to="/new">Add First Pet</Button>
        </Card>
      ) : (
        <div className={styles.grid}>
          {pets.map((pet) => (
            <Card key={pet._id} className={styles.petCard}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>{getPetIcon(pet.petType)}</div>

                <div>
                  <h3>{pet.name}</h3>
                  <p>{pet.petType}</p>
                </div>
              </div>

              <div className={styles.cardBody}>
                <span>Ready for adoption</span>
                <p>
                  {pet.name} is waiting for the right person to give them a
                  loving home.
                </p>
              </div>

              <div className={styles.actions}>
                <Button to={`/show/${pet._id}`} variant="soft">
                  Details
                </Button>

                <Button to={`/edit/${pet._id}`} variant="outline">
                  Edit
                </Button>

                <Button variant="green" onClick={() => setPetToAdopt(pet)}>
                  Adopt
                </Button>

                <Button variant="danger" onClick={() => setPetToDelete(pet)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!petToDelete}
        title="Delete this pet?"
        message={`Are you sure you want to delete ${petToDelete?.name}? This cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        onClose={() => setPetToDelete(null)}
        onConfirm={() => deletePet(petToDelete._id)}
      />

      <AdoptionModal
        isOpen={!!petToAdopt}
        pet={petToAdopt}
        onClose={() => setPetToAdopt(null)}
        onComplete={completeAdoption}
      />
    </div>
  );
};

export default Display;