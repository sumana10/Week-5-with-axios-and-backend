import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from "./Appbar.jsx";
import { Signin, Signup, AddCourse, Courses, Course } from './components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

    const stylex = {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee"
    }

    return (
        <div style={stylex}
        >
            
            <Router>
                <Appbar />
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Signup/>}/>
                    <Route path={"/addcourse"} element={<AddCourse />} />
                    <Route path={"/course/:courseId"} element={<Course />} />
                    <Route path={"/courses"} element={<Courses />} />
                    <Route path={"/signin"} element={<Signin />} />
                    <Route path={"/signup"} element={<Signup />} />
                </Routes>
            </Router>
            
        </div>
    );
}

export default App;