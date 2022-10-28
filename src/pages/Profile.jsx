import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  console.log(auth)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
   
  const {name, email } = formData
  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <h1 className="pageHeader">Profile</h1>
      </header>
      <h2>{name && name}</h2>
      <button type="button" className="logOut" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
