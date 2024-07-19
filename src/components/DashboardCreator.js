import React, { useState } from "react";
import NavBar from "./NavBar";
import "../styling/Dashboard.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../Config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import JobCreate from "./jobCreate";
import FetchJobs from './fetchJob'


const DashboardCreator = () => {
  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = () => setModalShow(true);

  return (
    <>
      <div className="Dashboard-nav">Dashbaord</div>
      <div className="Dashboard-creator">
        <div className="Dashboard-heading">
          <h1>All Jobs</h1>
        </div>
        <div className="Dashboard-button">
          <button onClick={handleModalShow} className="btn btn-primary">
            Create Jobs
          </button>
          <JobCreate show={modalShow} onHide={() => setModalShow(false)} />
        </div>
         
      </div>
        <div className="Dashboard-table">
          <FetchJobs/>
        </div>
    </>
  );
};

export default DashboardCreator;
