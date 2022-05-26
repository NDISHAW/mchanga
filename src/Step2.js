import React from "react";
import { Redirect } from "react-router-dom";

import Navigation from "./Navigation";
import { storage, validateEmail, validateName } from "./Step1";

const Step2 = () => {
  if (!validateEmail(storage.email) || !validateName(storage.name)) {
    return <Redirect to="/step1" />;
  }

  return (
    <div>
      <Navigation current={2} prevDisabled={false} />
      <h2>Congratulations</h2>
      <p>You have completed the form.</p>
    </div>
  );
};

export default Step2;
