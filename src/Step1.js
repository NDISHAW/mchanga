import React from "react";
import { useHistory } from "react-router-dom";
import heyRegex from "hey-regex";

import Navigation from "./Navigation";

export let storage = {
  name: "",
  email: ""
};

export const validateName = (name) => name.length > 0;
export const validateEmail = (email) =>
  email && heyRegex.isEmailId(email, "common");

const Step1 = () => {
  const history = useHistory();
  const nameInput = React.useRef(null);
  const emailInput = React.useRef(null);

  const [name, setName] = React.useState(storage.name);
  const [email, setEmail] = React.useState(storage.email);

  const [valid, setValid] = React.useState(
    Boolean(validateName(name) && validateEmail(email))
  );

  React.useEffect(() => {
    setValid(Boolean(validateName(name) && validateEmail(email)));
  }, [name, email, validateName, validateEmail]);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!valid) {
      alert("Please fill the fields appropriately.");
      return;
    }

    history.push("/step2");
  };

  const handleInput = (name, value) => {
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    }

    storage = { ...storage, [name]: value };
  };

  return (
    <div>
      <Navigation current={1} prevDisabled={false} nextDisabled={!valid} />
      <form
        style={{ display: "flex", alignItems: "center" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" style={{ marginRight: "10px", display: "block" }}>
          <div>Name</div>
          <input
            required
            pattern="\.\+"
            ref={nameInput}
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleInput("name", e.currentTarget.value)}
            onBlur={validateName}
          />
        </label>
        <label
          htmlFor="email"
          style={{ marginRight: "10px", display: "block" }}
        >
          <div>Email</div>
          <input
            required
            ref={emailInput}
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleInput("email", e.currentTarget.value)}
            onBlur={validateEmail}
          />
        </label>
        <br />
        <input
          type="submit"
          onClick={handleSubmit}
          value="OK"
          disabled={!valid}
        />
      </form>
    </div>
  );
};

export default Step1;
