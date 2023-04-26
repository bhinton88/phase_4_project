import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../App';

function LoginForm () {
  const [ setUser ]= useContext(UserContext)
  const [errors, setErrors] = useState([]);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: ""
  });

  function onChange(event){
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value
    })
  }

  function onSubmit(e) {
    e.preventDefault()
    fetch("/logout", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(loginFormData)
    })
    .then(response =>{
      if (response.ok) {
        response.json().then(user => setUser(user))
      } else {
        response.json().then(data => setErrors(data.errors))
      }
    })
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          name="username"
          type="text" 
          placeholder="Enter Username" 
          value={loginFormData.username}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          name="password"
          type="password" 
          placeholder="Password" 
          value={loginFormData.password}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Text>
        <ul>
          {
            errors.map(value => {
              return <li>{value}</li>
            })
          }
        </ul>
      </Form.Text>

      <Button variant="primary" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default LoginForm