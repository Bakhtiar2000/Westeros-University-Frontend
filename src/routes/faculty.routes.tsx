import FacultyChangePassword from "../pages/faculty/FacultyChangePassword";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyStudents from "../pages/faculty/MyStudents";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "courses",
    element: <MyCourses />,
  },
  {
    path: "courses/:registeredSemesterId/:courseId",
    element: <MyStudents />,
  },
  {
    name: "Change Password",
    path: "faculty-change-password",
    element: <FacultyChangePassword />,
  },
];
