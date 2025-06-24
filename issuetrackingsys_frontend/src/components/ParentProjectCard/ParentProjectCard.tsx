
import './ParentProjectCard.css'

interface CardProps{

    id: string;
    projectName: string;
    description: string;
}

function ParentProjectCard({id, projectName, description} : CardProps) {
  return (
        <div key={id} className="project-card">

            <div className="project-header">
                <h3>{projectName}</h3>
            </div>

            <p className="project-description">
                {description}
            </p>
                            
            <div className="project-footer">
                <button className="view-details-btn">View Details</button>
            </div>

        </div>
  )
}

export default ParentProjectCard