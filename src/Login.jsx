import React, { useContext, useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Login.css';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  var ressss;
  // console.log(import.meta.env.VITE_REACT_APP_API_URL);
  const login = async () => {
    try {

      const response = await fetch(
        import.meta.env.VITE_REACT_APP_API_URL+"/api/UserAuth/Login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: username,
            password: password
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const res = await response.json();

      if (res) {
        console.log(response);
        setUser(res); 
        ressss = res;
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    if (user) {
      // Redirect based on usertype
      if (user.usertype === 1) {
        navigate('/admin');
      } else if (user.usertype === 2) {
        navigate('/secretary');
      }else if (user.usertype === 3) {
        navigate('/clients');
      }
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
    {/* {user ? (
        <p>Welcome, {user.id } {user.username } {user.usertype }!</p>
      ) : (
        <p>No user logged in.</p>
      )} */}
      <div className="login-container">
        <Card className="login-card">
          <CardBody>
            <CardTitle tag="h5">Login</CardTitle>
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button color="primary" onClick={(e)=> {handleLogin(e)}}>
                Login
              </Button>
            </Form>
          </CardBody>
        </Card>
        {/* <button onClick={()=>{
        setUser(null)
      }}>Logout</button> */}
      </div>
      
    </>
  );
};

export default Login;
