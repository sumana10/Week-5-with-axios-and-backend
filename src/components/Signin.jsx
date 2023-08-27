import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { signin } from '../helper/apicalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
        display: "flex",
        justifyContent: "center"
    }
    return (
        <div>
            <div style={stylex}>
                <Typography variant={"h6"}>
                    Welcome to Coursera. Sign up below
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
                    <TextField
                        onChange={(evant11) => {
                            let elemt = evant11.target;
                            setEmail(elemt.value);
                        }}
                        fullWidth={true}
                        label="Email"
                        variant="outlined"
                    />
                    <br /><br />
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        type={"password"}
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
                        size="large"
                        variant="contained"


                        onClick={async () => {
                            try {

                                const config = {
                                    headers: {
                                        "Content-type": "application/json",
                                        username: email,
                                        password: password,
                                    },
                                };
                                const data = await signin(config, isChecked);

                                if (data.token) {
                                    const decodedToken = jwtDecode(data.token);
                                    const role = decodedToken.role;
                                    console.log('Role:', role);
                                    localStorage.setItem('token', data.token);
                                   // navigate('/courses');
                                    window.location.href = '/courses';
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
                        Signin
                    </Button>

                </Card>
            </div>
        </div>
    )
}

export default Signin;