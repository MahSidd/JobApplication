import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../Config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Multan",
  "Faisalabad",
  // Add more cities as needed
];
const Types=[
  "Fulltime",
  "Parttime",
  "Contract",
  "Remote"
]

const JobCreate = (props) => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [ jobType, setjobType]= useState("")
  const [requirements, setRequirements] = useState("");

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      let logoURL = "";

      if (logo) {
        const storageRef = ref(storage, `company_logos/${user.uid}/${logo.name}`);
        await uploadBytes(storageRef, logo);
        logoURL = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, "Jobs", `${user.uid}_${jobTitle}`), {
        companyName: companyName,
        jobTitle: jobTitle,
        location: location,
        logoURL: logoURL,
        description: description,
        requirements: requirements,
        userId: user.uid,
        jobtype: jobType,
      });

      toast.success("Job created successfully!");
      props.onHide();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Job
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <select
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">Select location</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <label className='form-label'>  Job Type</label>
            <select
            className="form-control"
            value={jobType}
            onChange={(e)=>setjobType(e.target.value)}
            required
            >
              <option value="">Select Job Type</option>
              {Types.map((type,index)=>(
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
              
              
            </select>

          </div>
          <div className="mb-3">
            <label className="form-label">Company Logo</label>
            <input
              type="file"
              className="form-control"
              onChange={handleLogoChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Requirements</label>
            <textarea
              className="form-control"
              placeholder="Enter job requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              required
            />
          </div>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default JobCreate;
