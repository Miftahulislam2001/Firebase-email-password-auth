import React, { useRef, useState } from "react";
import "./Register.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../Firebase/firebase.init";
import { Link } from "react-router-dom";

const Register = () => {
  const auth = getAuth(app);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUserSubmit = (event) => {
    // prevent Default...
    event.preventDefault();

    // Get form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    // Validation
    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError(" Ensure string has two uppercase letters.");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Ensure string has two digits.");
      return;
    }

    // firebase add in ...
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        event.target.reset();
        setSuccess("user Register successfully");
        console.log(user);
        sendVerificationEmail(user);
        updateProfileData(user, name);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorMessage);
      });
  };

  // Send Verification Email
  const sendVerificationEmail = (user) => {
    console.log(user);
    sendEmailVerification(user)
      .then((result) => {
        alert("please verification your email");
      })
      .then((error) => {
        console.log(error?.message);
      });
  };

  // Update Profile data
  const updateProfileData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        alert("Profile Update");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h2>Please Register Now !!!</h2>
      <form onSubmit={handleUserSubmit}>
        <label>Email : </label>
        <input
          type="email"
          name="email"
          placeholder="Write Email..."
          required
        />
        <br />
        <input type="text" name="name" placeholder="Write Name..." required />
        <br />

        <label>Password : </label>
        <input
          type="password"
          name="password"
          placeholder="write password..."
          required
        />
        <br />
        <p>{error}</p>
        <p>{success}</p>
        <input type="submit" value="Register" />
      </form>
      <h5>
        <small>
          Already have a account ? please Login <Link to="/login">LogIn</Link>
        </small>
      </h5>
    </div>
  );
};

export default Register;
