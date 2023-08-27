import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, TextField, Link, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signup } from '../helper/apicalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('hello')

  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    console.log(isChecked);
  }, [isChecked]);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const stylex = {
    paddingTop: 150,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
  }

  return (
    <div>
      <div
        style={stylex}
      >
        <Typography variant={'h6'}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant={'outlined'} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              let element = event.target;
              setEmail(element.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={'password'}
          />
          <br />
          <br />
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChange} />}
            label="Admin"
          />
          <br />
          <br />
          <Button
            style={{ marginRight: "10px" }}
            size={'large'}
            variant="contained"
            onClick={async () => {
              try {
                const data = await signup(email, password, isChecked);

                if(data.token){
                  localStorage.setItem('token', data.token);
                  navigate('/courses');
                }
                else {
                  // console.log(data);
                  setMessage(data)
                  toast(data);
                }

              } catch (error) {
                console.error("Axios error:", error);
              }
            }
            }
          >
            Signup
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate('/signin')
            }}
          >
            Signin
          </Link>
        </Card>
       
      </div>
     
    </div>
  );
}

export default Signup;
