import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import { adminRoutes } from "./admin.routes";
import { studentPaths } from "./student.routes";
import { facultyPaths } from "./faculty.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    errorElement: <ErrorPage />,
    children: adminRoutes,
  },
  {
    path: "/faculty",
    element: <App />,
    errorElement: <ErrorPage />,
    children: facultyPaths,
  },
  {
    path: "/student",
    element: <App />,
    errorElement: <ErrorPage />,
    children: studentPaths,
  },
  {
    path: "/login", //Absolute path
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
