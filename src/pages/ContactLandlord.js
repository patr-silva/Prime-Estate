import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

import classes from "./ContactLandlord.module.css";

const ContactLandlord = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    };

    getLandlord();
  }, [params.landlordId]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className={classes.container}>
      <header>
        <p className={classes.header}>Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className={classes.contact}>
            <p className={classes.name}>Contact {landlord.userName}</p>
          </div>

          <form className={classes.form}>
            <div className={classes.message}>
              <label htmlFor='message' className={classes.label}>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className={classes.textarea}
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              target='_blank'
              rel='noreferrer'
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type='button' className={classes.btn}>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
};

export default ContactLandlord;
