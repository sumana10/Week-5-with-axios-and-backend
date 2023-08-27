import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const Courses = () => {
    const [courses, setCourses] = useState([]);

  
   
   // const [user, setUser] = useState('');

   // const token = localStorage.getItem('token');


    //  if (token) {
    //      const decodedToken = jwtDecode(token);
    //     const role = decodedToken.role;
    //     console.log(role)
    //    setUser(role)
    //     // if (role === 'admin') {
    //     //     // User is an admin
    //     //     console.log('User is an admin');

    //     // } else if (role === 'user') {
    //     //     // User is a regular user
    //     //     console.log('User is a regular user');

    //     // }

    // }

    useEffect(() => {
        function callback2(data) {
            setCourses(data.courses);
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);

    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.map(course => {
            return <Course course={course} />
        }
        )}
    </div>
}

export function Course({ course }) {
    const navigate = useNavigate();

    const [user, setUser] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            setUser(role);
        }
    }, []);

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{ width: 300 }} ></img>
         {user === 'admin' && (

            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <Button variant="contained" size="large" onClick={() => {
                    navigate("/course/" + course._id);
                }}>Edit</Button>
            </div>

         )} 

    </Card>

}



export default Courses;