import React, {useState} from "react";
import PropTypes from "prop-types";
import SignupView from "../signup-view/signup-view";

export const LoginView = ({ onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit =(event) =>{
    event.preventDefault();
  

const data = {
  Username: username,
  Password: password,
};

fetch("https://star-flix-5d32add713bf.herokuapp.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
  console.log("Login response:", data);

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    onLoggedIn(data.user, data.token);
  } else {
    alert("No such user");
  }
})
.catch((e) => {
  alert("Something went wrong");
});
};

return (
  <form onSubmit={handleSubmit}>
    <label>
      Username:
      <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      />
    </label>
    <label>
      Password:
      <input
      type="password"
      value= {password}
      onChange={(e) => setPassword(e.target.value)}
      required
      />
    </label>
    <button type="submit">Login</button>
  </form>
);
};

LoginView.propTypes= {
  onLoggedIn: PropTypes.func.isRequired,
};
