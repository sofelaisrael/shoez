import React, { useState } from "react";
import PasswordInput from "../Components/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validate } from "../helpers/helper";
import { useSnackbar } from "notistack"; 
import { auth, db } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleValidation = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      enqueueSnackbar("Enter your email address", { variant: "error" });
      return;
    }

    if (!validate(email)) {
      enqueueSnackbar("Email entered is invalid", { variant: "error" });
      return;
    }

    if (!username) {
      enqueueSnackbar("Enter a username", { variant: "error" });
      return;
    }

    if (!password) {
      enqueueSnackbar("Enter your password", { variant: "error" });
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      
      await updateProfile(user, {
        displayName: username,
      });

      
      const userobject = {
        uid: user.uid,
        email: user.email,
        displayName: username,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userobject);

      enqueueSnackbar("Account created successfully! Redirecting...", {
        variant: "success",
      });
      setLoading(false);
      

      
      navigate("/");
    } catch (err) {
      setLoading(false);

      
      if (err.code === "auth/email-already-in-use") {
        enqueueSnackbar(
          "This email address is already registered. Please log in.",
          { variant: "error" }
        );
      } else if (err.code === "auth/network-request-failed") {
        enqueueSnackbar(
          "Network error. Please check your internet connection and try again.",
          { variant: "error" }
        );
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", {
          variant: "error",
        });
      }
    }
  };

  return (
    <div className="h-[100vh] relative flex flex-col items-center justify-center overflow-hidden">
      <div className="box sm:border max-sm:w-[100%] bg-white p-5 px-10 rounded-lg shadow-xl">
        <span className="text-[32px] ">Create an Account</span>
        <form
          className="flex flex-col gap-5 py-5"
          action=""
          onSubmit={handleValidation}
        >
          <div className="email flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <div className="inp border p-3 rounded-md">
              <input
                className="focus:outline-none w-full"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="username flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <div className="inp border p-3 rounded-md">
              <input
                className="focus:outline-none w-full"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div className="password flex flex-col gap-1">
            <span className="">Password</span>
            <div className="inp p-3 rounded-md border flex justify-between">
              <PasswordInput
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
                placeholder={"Enter your password"}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <div className="log py-3 text-gray-600">
        Already have an account?
        <span
          className="text-white underline cursor-pointer px-2"
          onClick={() => navigate("/sign-in")}
        >
          Log in
        </span>
      </div>

      <div className="contain -z-20">
        <span className="ripple r1"></span>
        <span className="ripple r2"></span>
        <span className="ripple r3"></span>
        <span className="ripple r4"></span>
        <span className="ripple r5"></span>
      </div>
    </div>
  );
};

export default Signup;
