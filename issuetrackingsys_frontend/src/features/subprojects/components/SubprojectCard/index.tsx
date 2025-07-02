import { useNavigate } from "react-router-dom";
import "./styles.css";

interface Props {
  id: string;
  projectName: string;
  description: string;
  onEdit: (id: string, projectName: string, description: string) => void;
  onViewIssues?: (id: string) => void;
}

function SubprojectCard({ id, projectName, description, onEdit }: Props) {
  
  const navigate = useNavigate();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id, projectName, description);
    }
  };

  const handleViewIssues = () => {
    navigate(`/subprojects/${id}/issues`);
  }

  return (
    <div className="subproject-card">
      <div className="subproject-header">
        <h3>{projectName}</h3>
      </div>
      <p className="subproject-description">{description}</p>
      <div className="subproject-footer">
        <button className="edit-btn" onClick={handleEdit}>
          Edit Subproject
        </button>
        <button className="view-issues-btn" onClick={handleViewIssues}>
          View Issues
        </button>
      </div>
    </div>
  );
}

export default SubprojectCard