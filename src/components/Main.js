import React from 'react';
import Home from "./Home";
import NavBar from "./NavBar";
import Ourjobs from "./OurJobs"

export const Main = () => {
  return (
    <>
      <NavBar />
      <Home id='home'/>
      <Ourjobs id='ourjobs'/>
    </>
  );
}

export default Main;
