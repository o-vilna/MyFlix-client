import{ useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const[birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();


  const data ={
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  };

  fetch("https://star-flix-5d32add713bf.herokuapp.com/users", {
    method:"POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response)=> {
    if (response.ok) {
      alert("Signup successful");
      window.location.reload();
    } else {
      alert("Signup failed");
    }
  })
  .catch((error) => {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again.");
  });
};

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="signUpFormUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control
          type="text"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          required
          minLength="3"
          />
      </Form.Group>
   <Form.Group controlId= "signUpFormPassword">
   <Form.Label>Password:</Form.Label>
   <Form.Control
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
       />
   </Form.Group>
  <Form.Group controlId="signUpFormEmail">
    <Form.Label>Email:</Form.Label>
    <Form.Control 
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    />
  </Form.Group>
  <Form.Group controlId="signUpFormBirthday">
  <Form.Label>Birthday:</Form.Label>
  <Form.Control
  type="date"
  value={birthday}
  onChange={(e) => setBirthday(e.target.value)}
  required
  />
  </Form.Group>
      <Button variant="primary" type="submit">Signup</Button>
    </Form>
  );
};
