import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/UI/Button/Button";
import Card from "../../Components/UI/Card/Card";
import ConfirmModal from "../../Components/UI/ConfirmModal/ConfirmModal";

import styles from "./PetForm.module.css";

const PetForm = () => {
  const [name, setName] = useState("");
  const [petType, setPetType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");

  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const clearError = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Pet name is required.";
    } else if (name.trim().length < 3) {
      newErrors.name = "Pet name must be at least 3 characters.";
    }

    if (!petType.trim()) {
      newErrors.petType = "Pet type is required.";
    } else if (petType.trim().length < 3) {
      newErrors.petType = "Pet type must be at least 3 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "Pet description is required.";
    } else if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (skill1.trim() && skill1.trim().length < 2) {
      newErrors.skill1 = "Skill 1 must be at least 2 characters.";
    }

    if (skill2.trim() && skill2.trim().length < 2) {
      newErrors.skill2 = "Skill 2 must be at least 2 characters.";
    }

    if (skill3.trim() && skill3.trim().length < 2) {
      newErrors.skill3 = "Skill 3 must be at least 2 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const openConfirm = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowConfirm(true);
  };

  const createPet = () => {
    axios
      .post("https://petshelter-dgjy.onrender.com/api/pets", {
        name: name.trim(),
        petType: petType.trim(),
        description: description.trim(),
        skill1: skill1.trim(),
        skill2: skill2.trim(),
        skill3: skill3.trim(),
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setShowConfirm(false);

        if (err.response?.data?.err?.errors) {
          setErrors(err.response.data.err.errors);
        }
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <span>Add New Pet</span>
          <h2>Tell us about this pet</h2>
          <p>Fill out the details below so this pet can find the right home.</p>
        </div>

        <Button to="/" variant="outline">
          Back Home
        </Button>
      </div>

      <Card className={styles.formCard}>
        <form onSubmit={openConfirm}>
          <div className={styles.formLayout}>
            <section className={styles.formSection}>
              <div className={styles.sectionHeading}>
                <div className={styles.headingIcon}>🐾</div>

                <div>
                  <h3>Pet Information</h3>
                  <p>Basic details visitors will see when browsing pets.</p>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  Pet Name <span>Required</span>
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Example: Milo"
                  className={errors.name ? styles.inputError : ""}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                />
                {errors.name && (
                  <p className={styles.errorMessage}>
                    {errors.name.message || errors.name}
                  </p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Pet Type <span>Required</span>
                </label>
                <input
                  type="text"
                  value={petType}
                  placeholder="Example: Dog, Cat, Rabbit"
                  className={errors.petType ? styles.inputError : ""}
                  onChange={(e) => {
                    setPetType(e.target.value);
                    clearError("petType");
                  }}
                />
                {errors.petType && (
                  <p className={styles.errorMessage}>
                    {errors.petType.message || errors.petType}
                  </p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Pet Description <span>Required</span>
                </label>
                <textarea
                  value={description}
                  placeholder="Tell us about this pet's personality..."
                  className={errors.description ? styles.inputError : ""}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    clearError("description");
                  }}
                />
                <div className={styles.helperRow}>
                  {errors.description ? (
                    <p className={styles.errorMessage}>
                      {errors.description.message || errors.description}
                    </p>
                  ) : (
                    <p className={styles.helperText}>
                      Minimum 10 characters.
                    </p>
                  )}

                  <p className={styles.countText}>{description.length}/10</p>
                </div>
              </div>
            </section>

            <section className={`${styles.formSection} ${styles.softSection}`}>
              <div className={styles.sectionHeading}>
                <div className={styles.headingIcon}>🦴</div>

                <div>
                  <h3>Optional Skills</h3>
                  <p>Add fun skills, tricks, or personality traits.</p>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  Pet Skill 1 <span>Optional</span>
                </label>
                <input
                  type="text"
                  value={skill1}
                  placeholder="Example: Knows sit"
                  className={errors.skill1 ? styles.inputError : ""}
                  onChange={(e) => {
                    setSkill1(e.target.value);
                    clearError("skill1");
                  }}
                />
                {errors.skill1 && (
                  <p className={styles.errorMessage}>{errors.skill1}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Pet Skill 2 <span>Optional</span>
                </label>
                <input
                  type="text"
                  value={skill2}
                  placeholder="Example: Loves fetch"
                  className={errors.skill2 ? styles.inputError : ""}
                  onChange={(e) => {
                    setSkill2(e.target.value);
                    clearError("skill2");
                  }}
                />
                {errors.skill2 && (
                  <p className={styles.errorMessage}>{errors.skill2}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Pet Skill 3 <span>Optional</span>
                </label>
                <input
                  type="text"
                  value={skill3}
                  placeholder="Example: Good with kids"
                  className={errors.skill3 ? styles.inputError : ""}
                  onChange={(e) => {
                    setSkill3(e.target.value);
                    clearError("skill3");
                  }}
                />
                {errors.skill3 && (
                  <p className={styles.errorMessage}>{errors.skill3}</p>
                )}
              </div>

              <div className={styles.formTip}>
                <span>💙</span>
                <p>
                  Keep it simple. A few clear details help adopters connect with
                  the right pet faster.
                </p>
              </div>
            </section>
          </div>

          <div className={styles.formActions}>
            <Button to="/" variant="outline">
              Cancel
            </Button>

            <Button type="submit" variant="green">
              Add Pet
            </Button>
          </div>
        </form>
      </Card>

      <ConfirmModal
        isOpen={showConfirm}
        title="Add this pet?"
        message={`${name || "This pet"} will be added to the shelter list.`}
        confirmText="Add Pet"
        variant="green"
        onClose={() => setShowConfirm(false)}
        onConfirm={createPet}
      />
    </div>
  );
};

export default PetForm;