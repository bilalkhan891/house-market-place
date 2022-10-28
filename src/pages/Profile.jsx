import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase.config";
import { useNavigate, Link } from "react-router-dom";
import {toast} from 'react-toastify'

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async (e) => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not update profile details.")
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <h1 className="pageHeader">Profile</h1>
        <h2>{name && name}</h2>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <div
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done" : "change"}
          </div>
        </div>
      </main>

      <div className="profileCard">
        <form>
          <input
            type="text"
            value={name}
            onChange={onChange}
            disabled={!changeDetails}
            className={!changeDetails ? "profileName" : "profileNameActive"}
            id="name"
          />
          <input
            type="email"
            value={email}
            onChange={onChange}
            disabled={!changeDetails}
            className={!changeDetails ? "profileEmail" : "profileEmailActive"}
            id="email"
          />
        </form>
      </div>
    </div>
  );
}

export default Profile;
