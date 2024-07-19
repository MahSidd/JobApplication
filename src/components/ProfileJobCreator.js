import React, { useState, useEffect } from 'react';
import { auth, db, storage } from "../Config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const ProfileJobCreator = () => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [roleInCompany, setRoleInCompany] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.username);
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not authenticated");
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profilePic) {
      toast.error("Please upload a profile picture.");
      return;
    }

    try {
      const user = auth.currentUser;
      const storageRef = ref(storage, `profile_pictures/${user.uid}/${profilePic.name}`);
      await uploadBytes(storageRef, profilePic);
      const profilePicURL = await getDownloadURL(storageRef);

      await setDoc(doc(db, "Users", user.uid), {
        companyName: companyName,
        roleInCompany: roleInCompany,
        profilePicURL: profilePicURL,
      }, { merge: true });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profile Job Creator</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role in Your Company</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your role in the company"
            value={roleInCompany}
            onChange={(e) => setRoleInCompany(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            onChange={handleProfilePicChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ProfileJobCreator;
