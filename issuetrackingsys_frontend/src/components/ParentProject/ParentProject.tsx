import { useEffect, useState } from 'react'
import axios from 'axios'
import './ParentProject.css'
import ParentProjectCard from '../ParentProjectCard/ParentProjectCard';
interface ParentProject{
    id: string,
    projectName: string;
    description: string;
}

function ParentProject() {

    const [projects, setProjects] = useState<ParentProject[]>([]);
    const [error, setError] = useState<String>('');

    useEffect(() => {
        const fetchParentProjects = async () => {
            try{
                const token = localStorage.getItem('token');
                console.log(token);

                if(!token){
                    setError('Auth token not found');
                    return;
                }

                const response = await axios.get("http://localhost:8080/api/parent-projects", {
                    headers:{
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                });
                console.log(response.data.data);
                setProjects(response.data.data);
                    
            }catch(error){
                console.log(error);
            }
        }

        fetchParentProjects();
    }, []);

    
    if(error){
        return <div className='error'>{error}</div>;
    }

  return (
    <div className='projects-container'>
            <h2>Parent Projects</h2>
            {projects.length === 0 ? (
                <div className="no-projects">
                    <p>No parent projects found</p>
                </div>
                ) 
                :
                (
                <div className='projects-flex'>
                    {

                    projects.map(project => (
                        <ParentProjectCard id={project.id}
                            projectName={project.projectName}
                            description={project.description}/>
                    ))
                    
                    }
                </div>
            )}
        </div>
  )
}

export default ParentProject