import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="mt-10 max-w-xl mx-auto">

      <img className="mx-auto" src="https://img.freepik.com/premium-vector/website-construction-illustration_86047-168.jpg?w=996" width="480" height="480" />

      <div className="mx-auto cursor-pointer bg-[#001529] text-white text-center rounded py-2 px-5 border-0 text-xl w-fit"><Link to='/'>Back to home</Link></div>
    </div>
  );
}