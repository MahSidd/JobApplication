import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { auth, db } from '../Config/firebase';
import { collection, getDocs } from "firebase/firestore";

const FetchJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobData = async () => {
      const user = auth.currentUser;
      if (user) {
        const jobsCollectionRef = collection(db, 'Jobs');
        const jobsSnapshot = await getDocs(jobsCollectionRef);
        const jobsList = jobsSnapshot.docs.map(doc => doc.data());
        setJobs(jobsList);
      }
    };

    fetchJobData();
  }, []);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company Name</th>
          <th>Location</th>
          <th>Requirements</th>
          <th>Responses</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr key={index}>
            <td>{job.jobTitle}</td>
            <td>{job.companyName}</td>
            <td>{job.location}</td>
            <td>{job.requirements}</td>
            <td>
                <button className='btn-primary btn'>view</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FetchJobs;
