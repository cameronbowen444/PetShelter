import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Button from "../../Components/UI/Button/Button";
import Card from "../../Components/UI/Card/Card";
import { getPetIcon } from "../../utils/getPetIcon";
import styles from "./ShowPet.module.css";

const ShowPet = () => {
  const [pet, setPet] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://petshelter-dgjy.onrender.com/api/pets/" + id)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <span>Pet Details</span>
          <h2>Meet {pet.name || "This Pet"}</h2>
          <p>Learn more about this pet before helping them find a loving home.</p>
        </div>

        <Button to="/" variant="outline">
          Back Home
        </Button>
      </div>

      <Card className={styles.profileCard}>
        <div className={styles.hero}>
          <div className={styles.avatar}>{getPetIcon(pet.petType)}</div>

          <div>
            <span className={styles.status}>Ready for adoption</span>
            <h3>{pet.name || "Unnamed Pet"}</h3>
            <p>{pet.petType || "Pet type not listed"}</p>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <div className={`${styles.detailBox} ${styles.fullDetail}`}>
            <span>Description</span>
            <p>{pet.description || "No description added yet."}</p>
          </div>

          <div className={styles.detailBox}>
            <span>Skill 1</span>
            <p>{pet.skill1 || "No skill listed"}</p>
          </div>

          <div className={styles.detailBox}>
            <span>Skill 2</span>
            <p>{pet.skill2 || "No skill listed"}</p>
          </div>

          <div className={styles.detailBox}>
            <span>Skill 3</span>
            <p>{pet.skill3 || "No skill listed"}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button to={`/edit/${pet._id}`} variant="green">
            Edit Pet
          </Button>

          <Button to="/" variant="soft">
            View All Pets
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ShowPet;