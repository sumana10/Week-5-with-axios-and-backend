import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

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
                    <br /><br />

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

                                const res = await axios.post(
                                    "http://localhost:3000/admin/login",
                                    {},
                                    config
                                );

                                const data = res.data;
                                localStorage.setItem("token", data.token);
                                navigate('/courses');
                               // window.location ='/'
                            } catch (error) {
                                console.error('Error during signin:', error);
                            }
                        }}
                    >
                        Signin
                    </Button>

                </Card>
            </div>
        </div>
    )
}

export default Signin;