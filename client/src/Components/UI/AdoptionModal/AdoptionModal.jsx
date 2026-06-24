import { useState } from "react";
import Button from "../Button/Button";
import styles from "./AdoptionModal.module.css";

const initialForm = {
  pickupName: "",
  pickupPhone: "",
  pickupEmail: "",
  pickupDate: "",
  pickupTime: "",
  agreement: false,
};

const AdoptionModal = ({
  isOpen,
  pet,
  isLoading = false,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  if (!isOpen || !pet) return null;

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 10);

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    }

    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
      6
    )}`;
  };

  const updateForm = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneNumbers = form.pickupPhone.replace(/\D/g, "");

    if (!form.pickupName.trim()) {
      newErrors.pickupName = "Your name is required.";
    } else if (form.pickupName.trim().length < 3) {
      newErrors.pickupName = "Name must be at least 3 characters.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(form.pickupName.trim())) {
      newErrors.pickupName =
        "Name can only include letters, spaces, hyphens, and apostrophes.";
    }

    if (!form.pickupPhone.trim()) {
      newErrors.pickupPhone = "Phone number is required.";
    } else if (phoneNumbers.length !== 10) {
      newErrors.pickupPhone = "Enter a 10-digit phone number.";
    }

    if (!form.pickupEmail.trim()) {
      newErrors.pickupEmail = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.pickupEmail.trim())) {
      newErrors.pickupEmail = "Enter a valid email address.";
    }

    if (!form.pickupDate) {
      newErrors.pickupDate = "Choose a pickup date.";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(form.pickupDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.pickupDate = "Pickup date cannot be in the past.";
      }
    }

    if (!form.pickupTime) {
      newErrors.pickupTime = "Choose a pickup time.";
    }

    if (!form.agreement) {
      newErrors.agreement =
        "Please confirm you understand this is a real adoption pickup.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetModal = () => {
    setStep("form");
    setForm(initialForm);
    setErrors({});
  };

  const handleClose = () => {
    if (isLoading) return;

    resetModal();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStep("success");
  };

  const handleFinish = () => {
    if (isLoading) return;

    onComplete();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {step === "form" ? (
          <>
            <div className={styles.header}>
              <div className={styles.icon}>🐾</div>

              <div>
                <span>Adoption Pickup</span>
                <h3>Adopt {pet.name}</h3>
                <p>
                  Complete the pickup details below before finalizing the
                  adoption.
                </p>
              </div>
            </div>

            <div className={styles.petPreview}>
              <div className={styles.petBubble}>💙</div>
              <div>
                <h4>{pet.name} is almost home</h4>
                <p>One quick form, then this pet will be marked as adopted.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>
                    Your Name <span>Required</span>
                  </label>
                  <input
                    type="text"
                    value={form.pickupName}
                    placeholder="Example: Cameron Bowen"
                    className={errors.pickupName ? styles.inputError : ""}
                    onChange={(e) => updateForm("pickupName", e.target.value)}
                  />
                  {errors.pickupName && (
                    <p className={styles.error}>{errors.pickupName}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Phone Number <span>Required</span>
                  </label>
                  <input
                    type="text"
                    value={form.pickupPhone}
                    placeholder="Example: (818) 555-1234"
                    className={errors.pickupPhone ? styles.inputError : ""}
                    onChange={(e) =>
                      updateForm("pickupPhone", formatPhone(e.target.value))
                    }
                  />
                  {errors.pickupPhone && (
                    <p className={styles.error}>{errors.pickupPhone}</p>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  Email Address <span>Required</span>
                </label>
                <input
                  type="email"
                  value={form.pickupEmail}
                  placeholder="Example: cameron@email.com"
                  className={errors.pickupEmail ? styles.inputError : ""}
                  onChange={(e) => updateForm("pickupEmail", e.target.value)}
                />
                {errors.pickupEmail && (
                  <p className={styles.error}>{errors.pickupEmail}</p>
                )}
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>
                    Pickup Date <span>Required</span>
                  </label>
                  <input
                    type="date"
                    min={getToday()}
                    value={form.pickupDate}
                    className={errors.pickupDate ? styles.inputError : ""}
                    onChange={(e) => updateForm("pickupDate", e.target.value)}
                  />
                  {errors.pickupDate && (
                    <p className={styles.error}>{errors.pickupDate}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Pickup Time <span>Required</span>
                  </label>
                  <select
                    value={form.pickupTime}
                    className={errors.pickupTime ? styles.inputError : ""}
                    onChange={(e) => updateForm("pickupTime", e.target.value)}
                  >
                    <option value="">Choose a time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                  {errors.pickupTime && (
                    <p className={styles.error}>{errors.pickupTime}</p>
                  )}
                </div>
              </div>

              <label
                className={`${styles.checkBox} ${
                  errors.agreement ? styles.checkBoxError : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.agreement}
                  onChange={(e) => updateForm("agreement", e.target.checked)}
                />
                <span>
                  I understand I am scheduling a pickup for {pet.name} and will
                  bring a valid ID.
                </span>
              </label>

              {errors.agreement && (
                <p className={styles.error}>{errors.agreement}</p>
              )}

              <div className={styles.actions}>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>

                <Button type="submit" variant="green">
                  Continue
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              {isLoading ? <div className={styles.miniSpinner}></div> : "🎉"}
            </div>

            <span>Adoption Complete</span>
            <h3>Congrats on your new pet!</h3>
            <p>
              {pet.name} is ready for pickup on{" "}
              <strong>
                {form.pickupDate} at {form.pickupTime}
              </strong>
              .
            </p>

            {isLoading && (
              <p className={styles.loadingText}>
                Updating the shelter list now...
              </p>
            )}

            <Button
              variant="primary"
              onClick={handleFinish}
              disabled={isLoading}
            >
              {isLoading ? "Completing..." : "Back Home"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionModal;