import { useParams } from "react-router-dom";

const StudentUpdate = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h3>Update Student Details of {studentId}</h3>
    </div>
  )
};

export default StudentUpdate;
