import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";
import classes from "./OAuth.module.css";

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      //If user doen't exist, create user
      if (!docSnap.exists) {
        await setDoc(doc(db, "users", user.uid), {
          userName: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  };

  return (
    <div className={classes.container}>
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <button className={classes.icon} onClick={onGoogleClick}>
        <img src={googleIcon} alt='Google' className={classes.img}/>
      </button>
    </div>
  );
};

export default OAuth;
