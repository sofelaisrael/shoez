import React, { useState } from "react";
import PasswordInput from "../Components/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validate } from "../helpers/helper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { enqueueSnackbar } from "notistack";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

    if (!password) {
      enqueueSnackbar("Enter your password", { variant: "error" });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(user);
      

      localStorage.setItem("userID", user.uid);

      enqueueSnackbar("Login successful!", { variant: "success" });

      navigate("/");
    } catch (error) {
      setLoading(false);

      if (error.code === "auth/user-not-found") {
        enqueueSnackbar("No user found with this email. Please sign up.", {
          variant: "error",
        });
      } else if (error.code === "auth/wrong-password") {
        enqueueSnackbar("Incorrect password. Please try again.", {
          variant: "error",
        });
      } else if (error.code === "auth/network-request-failed") {
        enqueueSnackbar("Network error. Please check your connection.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] t flex flex-col items-center justify-center overflow-hidden relative">
      <div className="box w-[400px] max-sm:w-[100%] sm:border p-5 rounded-lg bg-white shadow-xl">
        <span className="text-[32px] pr-16">Sign In</span>
        <form className="flex flex-col gap-5 py-5" onSubmit={handleValidation}>
          <div className="email flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <div className="inp border p-3 rounded-md">
              <input
                className="focus:outline-none w-[100%]"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="password flex flex-col gap-1">
            <span className="">Password</span>
            <div className="inp p-3 rounded-md border flex justify-between">
              <PasswordInput
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-black"
            } text-white p-3 rounded-md`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      <div className="log py-3 text-gray-300">
        Don't have an account?
        <span
          className="text-white underline cursor-pointer px-2"
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </span>
      </div>

      <div className="contain -z-20">
        <span className="ripple r2"></span>
        <span className="ripple r3"></span>
        <span className="ripple r4"></span>
        <span className="ripple r5"></span>
      </div>
    </div>
  );
};

export default Login;
