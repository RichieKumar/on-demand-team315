import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Welcome To On Demand</h1>

    <p className="lead">
     On Demand is a tutoring application that allows users to quickly and effciently
     connect with their peers to facilitate learning sessions and educational growth.
     
    </p>
  </div>
);

export default Hero;
