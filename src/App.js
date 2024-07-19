import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import Main from "./components/Main";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import SignUP from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileJobCreator from "./components/ProfileJobCreator";
import ProfileJobSeeker from "./components/profileseeker";
import { useState, useEffect } from "react";
import { auth, db } from "./Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import DashboardCreator from "./components/DashboardCreator";
import DashboardSeeker from "./components/DashboardSeeker";

function App() {
  const [userDetails, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        
        <Route
              path="/"
              element={userDetails ? <Navigate to="/jobhunt" /> : <Login />}
            />
        <Route path ='/jobhunt' element={<Main/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUP />} />
        {userDetails ? (
          userDetails.role === "job_creator" ? (
            <>
            <Route path='/profile' element={<ProfileJobCreator />} />
            <Route path='dashboard' element ={<DashboardCreator/>}/>
            </>
          ) : (
            <>
            <Route path='/profile' element={<ProfileJobSeeker />} />
            <Route path='/dashboard' element ={<DashboardSeeker/>}/>
            </>
          )
        ) : (
          <Route path='*' element={<Navigate to="/login" />} />
        )}
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
