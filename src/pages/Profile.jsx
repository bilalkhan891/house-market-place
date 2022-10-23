import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

function Profile() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    console.log(auth.currentUser);
    setUser(auth.currentUser);
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user && <p>{user.displayName}</p>}
    </div>
  );
}

export default Profile;
