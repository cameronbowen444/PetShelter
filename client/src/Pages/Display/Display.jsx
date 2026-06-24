import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../../Components/UI/Button/Button";
import Card from "../../Components/UI/Card/Card";
import ConfirmModal from "../../Components/UI/ConfirmModal/ConfirmModal";
import AdoptionModal from "../../Components/UI/AdoptionModal/AdoptionModal";
import LoadingState from "../../Components/UI/LoadingState/LoadingState";
import Alert from "../../Components/UI/Alert/Alert";

import { getPetIcon } from "../../utils/getPetIcon";

import styles from "./Display.module.css";

const API_URL = "https://petshelter-dgjy.onrender.com/api/pets";

const Display = () => {
  const [pets, setPets] = useState([]);
  const [petToDelete, setPetToDelete] = useState(null);
  const [petToAdopt, setPetToAdopt] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setPets(res.data);
      })
      .catch((err) => {
        console.log(err);

        setStatus({
          type: "error",
          title: "Could not load pets",
          message:
            "The shelter server may be waking up. Give it a few seconds and refresh.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deletePet = (petId) => {
    if (isActionLoading) return;

    setIsActionLoading(true);

    axios
      .delete(`${API_URL}/${petId}`)
      .then(() => {
        setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
        setPetToDelete(null);

        setStatus({
          type: "success",
          title: "Pet deleted",
          message: "This pet has been removed from the shelter list.",
        });
      })
      .catch((err) => {
        console.log(err);

        setStatus({
          type: "error",
          title: "Delete failed",
          message: "Something went wrong while deleting this pet. Try again.",
        });
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  };

  const completeAdoption = () => {
    if (!petToAdopt || isActionLoading) return;

    setIsActionLoading(true);

    axios
      .delete(`${API_URL}/${petToAdopt._id}`)
      .then(() => {
        setPets((prevPets) =>
          prevPets.filter((pet) => pet._id !== petToAdopt._id),
        );

        setStatus({
          type: "success",
          title: "Adoption complete",
          message: `${petToAdopt.name} has been adopted and removed from the available pets list.`,
        });

        setPetToAdopt(null);
      })
      .catch((err) => {
        console.log(err);

        setStatus({
          type: "error",
          title: "Adoption failed",
          message:
            "Something went wrong while completing the adoption. Please try again.",
        });
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  };

  return (
    <div className={styles.page}>
      {status && (
        <Alert
          type={status.type}
          title={status.title}
          message={status.message}
          onClose={() => setStatus(null)}
        />
      )}

      {isLoading ? (
        <LoadingState
          title="Loading pets..."
          message="Fetching the latest shelter list from Render and Atlas."
        />
      ) : pets.length === 0 ? (
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

                <Button
                  variant="green"
                  onClick={() => setPetToAdopt(pet)}
                  disabled={isActionLoading}
                >
                  Adopt
                </Button>

                <Button
                  variant="danger"
                  onClick={() => setPetToDelete(pet)}
                  disabled={isActionLoading}
                >
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
        loadingText="Deleting..."
        variant="danger"
        isLoading={isActionLoading}
        onClose={() => !isActionLoading && setPetToDelete(null)}
        onConfirm={() => deletePet(petToDelete._id)}
      />

      <AdoptionModal
        isOpen={!!petToAdopt}
        pet={petToAdopt}
        isLoading={isActionLoading}
        onClose={() => !isActionLoading && setPetToAdopt(null)}
        onComplete={completeAdoption}
      />
    </div>
  );
};

export default Display;
