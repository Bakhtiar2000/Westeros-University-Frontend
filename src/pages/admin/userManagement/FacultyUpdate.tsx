
import { useParams } from 'react-router-dom';

const FacultyUpdate = () => {
    const { facultyId } = useParams();
    return (
        <div>
            <h3>Faculty update of {facultyId}</h3>
        </div>
    );
};

export default FacultyUpdate;