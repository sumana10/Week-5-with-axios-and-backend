import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "./helper/apicalls";

const Appbar = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);

    const stylex = {
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1,
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getData();
            setUserEmail(data.username);
        } catch (error) {
            console.error("Axios error:", error);
        }
    };

    if (userEmail) {
        return (
            <div style={stylex}>
                <div style={{ marginLeft: 10 }}>
                    <Typography variant={"h6"}>Coursera{userEmail}</Typography>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10, display: "flex" }}>
                        <div style={{ marginRight: 10 }}>
                            <Button
                                onClick={() => {
                                    navigate("/addcourse");
                                }}
                            >
                                Add course
                            </Button>
                        </div>

                        <div style={{ marginRight: 10 }}>
                            <Button
                                onClick={() => {
                                    navigate("/courses");
                                }}
                            >
                                Courses
                            </Button>
                        </div>

                        <Button
                            variant={"contained"}
                            onClick={() => {
                                localStorage.setItem("token", null);
                                window.location = "/";
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div style={stylex}>
                <div style={{ marginLeft: 10 }}>
                    <Typography variant={"h6"}>Coursera</Typography>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Signup
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                navigate("/signin");
                            }}
                        >
                            Signin
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Appbar;
