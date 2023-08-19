import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const Course = () => {
    let { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/admin/course/" + courseId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse(res.data.course);
        });
    }, []);

    if (!course) {
        return <div style={{ height: "100vh", justifyContent: "center", flexDirection: "column" }}>
            Loading....
        </div>
    }

    return (<div>
        <GrayTopper title={course.title} />
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard course={course} />
            </Grid>
        </Grid>
    </div>)
}

const GrayTopper = ({ title }) => {
    return (<div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>)
}

const UpdateCard = ({ course, setCourse }) => {
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [image, setImage] = useState(course.imageLink);
    const [price, setPrice] = useState(course.price);

    return (<div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
            <div style={{ padding: 20 }}>
                <Typography style={{ marginBottom: 10 }}>Update course details</Typography>
                <TextField
                    value={title}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />

                <TextField
                    value={description}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />

                <TextField
                    value={image}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                />
                <TextField
                    value={price}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                />

                <Button
                    variant="contained"
                    onClick={async () => {
                        axios.put("http://localhost:3000/admin/courses/" + course._id, {
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true,
                            price
                        }, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        let updatedCourse = {
                            _id: course._id,
                            title: title,
                            description: description,
                            imageLink: image,
                            price
                        };
                        setCourse(updatedCourse);
                    }}
                > Update course</Button>
            </div>
        </Card>
    </div>)
}

const CourseCard = (props) => {
    const course = props.course;
    return (<div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
        <Card style={{
            margin: 10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
        }}>
            <img src={course.imageLink} style={{ width: 350 }} ></img>
            <div style={{ marginLeft: 10 }}>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                    Price
                </Typography>
                <Typography variant="subtitle1">
                    <b>Rs {course.price} </b>
                </Typography>
            </div>
        </Card>
    </div>)
}

export default Course;

/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
// import { Button, Card, TextField, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function Course() {
//   let { courseId } = useParams();
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//         function callback2(data) {
//             setCourses(data.courses);
//         }
//         function callback1(res) {
//             res.json().then(callback2)
//         }
//         fetch("http://localhost:3000/admin/courses/", {
//             method: "GET",
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             }
//         }).then(callback1)
//     }, []);

//     let course = null;
//     for (let i = 0; i< courses.length; i++) {
//         if (courses[i]._id == courseId) {
//             course = courses[i]
//         }
//     }

//   if (!course) {
//     return <div>Loading... </div>;
//   } else {
//     return (
//       <div>
//         <CourseCard course={course} />
//         <UpdateCard courses={courses} course={course} setCourses={setCourses}/>
//       </div>
//     );
//   }
// }

// function UpdateCard(props) {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [image, setImage]= useState("");
//     const course = props.course;
//     return (
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <Card
//           variant="outlined"
//           style={{
//             width: 400,
//             padding: 20,
//           }}
//         >
//           <Typography>Update course details</Typography>
//           <TextField
//             onChange={(e) => setTitle(e.target.value)}
//             label="Title"
//             variant="outlined"
//             fullWidth = {true}
//           />
//           <br /> <br />
//           <TextField
//             onChange={(e) => setDescription(e.target.value)}
//             label="Description"
//             variant="outlined"
//             fullWidth
//           />
//           <br /> <br />
//           <TextField
//             onChange={(e) => setImage(e.target.value)}
//             label="Image Link"
//             variant="outlined"
//             fullWidth
//           />
//           <br /> <br />
//           <Button
//             size={"large"}
//             variant="contained"
//             onClick={() =>{
//               // console.log(course._id)
//               const callback2 = (data) => {
//                   const updatedCourses = props.courses.map((courseItem) =>
//                     courseItem._id === course._id
//                       ? {
//                           ...courseItem,
//                           title: title,
//                           description: description,
//                           imageLink: image,
//                         }
//                       : courseItem
//                   );
//                   props.setCourses(updatedCourses);
//                 };
//                 function callback1(res) {
//                   return res.json().then(callback2);
//                 }
//                 fetch("http://localhost:3000/admin/courses/" + course._id, {
//                   method: "PUT",
//                   body: JSON.stringify({
//                     title: title,
//                     description: description,
//                     imageLink: image,
//                     published: true,
//                   }),
//                   headers: {
//                     "Content-type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                   },
//                 }).then(callback1);
//               }
//             }
//           >
//             Update Course
//           </Button>
//         </Card>
//       </div>
//     );
//   }


// function CourseCard(props) {
//   // eslint-disable-next-line react/prop-types
//   const course = props.course;
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center'}}>
//       <Card
//         style={{
//           border: "2px solid black",
//           margin: 10,
//           width: 300,
//           minHeight: 200,
//         }}
//       >
//         <Typography variant="h5">{course.title}</Typography>
//         <Typography variant="subtitle">{course.description}</Typography>
//         <img
//           src={course.imageLink}
//           style={{ width: "100%", height: "100%" }}
//         />
//       </Card>
//     </div>
//   );
// }



// export default Course;