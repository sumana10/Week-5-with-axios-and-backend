import React, { useState } from 'react';
import { Card, Typography, Button, TextField, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
          <Button
            style={{marginRight: "10px"}}
            size={'large'}
            variant="contained"
            onClick={async () => {
                try {
                    const response = await axios.post('http://localhost:3000/admin/signup', {
                      username: email,
                      password: password,
                    });
              
                    const data = response.data;
                    localStorage.setItem('token', data.token);
                    navigate('/courses');
                  } catch (error) {
                    console.error('Error during signup:', error);
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
