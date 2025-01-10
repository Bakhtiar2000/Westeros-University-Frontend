import MySchedule from "../pages/student/MySchedule";
import MyOfferedCourse from "../pages/student/MyOfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentChangePassword from "../pages/student/StudentChangePassword";
import MyEnrolledCourses from "../pages/student/MyEnrolledCourses";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Courses",
    path: "offered-course",
    element: <MyOfferedCourse />,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
  {
    name: "My Courses",
    path: "enrolled-courses",
    element: <MyEnrolledCourses />,
  },
  {
    name: "Change Password",
    path: "student-change-password",
    element: <StudentChangePassword />,
  }
]
