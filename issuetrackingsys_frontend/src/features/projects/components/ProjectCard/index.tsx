
import { useNavigate } from 'react-router-dom';
import './styles.css'

interface CardProps{

    id: string;
    projectName: string;
    description: string;
    onEdit: (id: string, projectName: string, description: string) => void;
}

function ParentProjectCard({id, projectName, description, onEdit} : CardProps) {

    const navigate = useNavigate();

    const handleViewSubprojects = () => {
    navigate(`/projects/${id}/subprojects`);

    };

    const handleEdit = () => {
        onEdit(id, projectName, description);
    };

    return (
        <div key={id} className="project-card">

            <div className="project-header">
                <h3>{projectName}</h3>
            </div>

            <p className="project-description">
                {description}
            </p>
                            
            <div className="project-footer">
                <button className="view-details-btn" onClick={handleViewSubprojects}>Go into Subprojects</button>
                <button className="edit-project-btn" onClick={handleEdit}>Edit Project</button>
            </div>
        </div>
  )
}

export default ParentProjectCard