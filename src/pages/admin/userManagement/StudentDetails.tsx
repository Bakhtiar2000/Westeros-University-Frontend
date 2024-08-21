import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h3>Student Details of {studentId}</h3>
    </div>
  );
};

export default StudentDetails;
