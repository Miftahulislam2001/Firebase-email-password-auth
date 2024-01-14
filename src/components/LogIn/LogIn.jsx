import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../../Firebase/firebase.init";
import { Link } from "react-router-dom";

const LogIn = () => {
  const auth = getAuth(app);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleUserSubmit = (event) => {
    // prevent Default...
    event.preventDefault();

    // Get form data
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Validation
    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Ensure string has two uppercase letters.");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Ensure string has two digits.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("login successfully");
      })
      .then((error) => {
        setError(error);
      });
  };

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("please write at least Email for password reset");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email");
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  return (
    <div>
      <h2>Please Log In !!!</h2>

      <form onSubmit={handleUserSubmit}>
        <label>Email : </label>
        <input
          type="email"
          name="email"
          ref={emailRef}
          placeholder="Write Email..."
          required
        />
        <br />

        <label>Password : </label>
        <input
          type="password"
          name="password"
          placeholder="Write password..."
          required
        />
        <br />
        <p>{error}</p>
        <p>{success}</p>
        <input type="submit" value="Log In" />

        <h5>
          <small>
            Forget Password ?{" "}
            <Link onClick={handleResetPassword}>Reset Password</Link>
          </small>
        </h5>
      </form>
      <h5>
        <small>
          New to this website ? please Register{" "}
          <Link to="/register">Register</Link>
        </small>
      </h5>
    </div>
  );
};

export default LogIn;
