import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import "../styling/Ourjobs.css";
import JobCard from './card'
const Ourjobs = () => {
  return (
    <div className="jobs-container">
      <h1>Our Jobs</h1>
      <Container>
        <Row>
          <Col xs={3}>
          <Row>
          <div className="mb-2" style={{ marginBottom: '20px' }}>
            <Dropdown data-bs-theme="dark" drop="down">
              <Dropdown.Toggle id="dropdown-location" variant="secondary">
                Filter by Location
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/location-1">Location 1</Dropdown.Item>
                <Dropdown.Item href="#/location-2">Location 2</Dropdown.Item>
                <Dropdown.Item href="#/location-3">Location 3</Dropdown.Item>
                <Dropdown.Item href="#/location-4">Location 4</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          </Row>
          <Row>

          <div className="mb-2" style={{ marginBottom: '20px' }}>
            <Dropdown data-bs-theme="dark" drop="down">
              <Dropdown.Toggle id="dropdown-job-type" variant="secondary">
                Filter by Job Type
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/job-type-1">Full-time</Dropdown.Item>
                <Dropdown.Item href="#/job-type-2">Part-time</Dropdown.Item>
                <Dropdown.Item href="#/job-type-3">Contract</Dropdown.Item>
                <Dropdown.Item href="#/job-type-4">Temporary</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          </Row>
          </Col>
          <Col>
          <JobCard/>
          <JobCard/>
          <JobCard/>
          <JobCard/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ourjobs;
