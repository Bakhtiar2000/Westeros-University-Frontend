import MySchedule from "../pages/student/MySchedule";
import MyOfferedCourse from "../pages/student/MyOfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <MyOfferedCourse />,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
];
