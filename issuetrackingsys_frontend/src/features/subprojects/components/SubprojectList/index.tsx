import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'
import { ParentProjectAPI, type ParentProject } from '../../../projects/services/projectService';
import { Box, Button, CircularProgress } from '@mui/material';
import SubProjectCard from '../SubprojectCard';
import { SubProjectAPI, type Subproject } from '../../services/SubProjectAPI';
import CreateSubProjectModal from '../CreateSubproject';
import AddIcon from '@mui/icons-material/Add';
import EditParentProjectModal from '../EditSubproject';


function SubprojectPage() {
  const { projectId } = useParams<{projectId: string}>();
  const navigate = useNavigate();

  const [subprojects, setSubprojects] = useState<Subproject[]>([]);
  const [parentProject, setParentProject] = useState<ParentProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ParentProject | null>(null);

  const fetchData = async () => {
    if (!projectId) {
      setError('No project ID provided');
      return;
    }
    
    setLoading(true);

    try {
      const projectData = await ParentProjectAPI.getParentProjectById(projectId);
      setParentProject(projectData);

      const subprojectData : Subproject[] = await SubProjectAPI.getSubProjectsByParentProject(projectId);
      setSubprojects(subprojectData ?? []);
    } catch (err: any) {
      setError(err.message || 'Failed to load project data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchData();
  }, [projectId]);


  const handleCreateSubproject = () => {
    setIsCreateModalOpen(true);
  }

  const handleEditProject = (id: string, projectName: string, description: string) => {
    setEditingProject({id, projectName, description});
    setIsEditModalOpen(true);
  }



  const handleSubprojectCreated = (id: string, projectName: string, description: string) => {
    setSubprojects(subprojects => [...subprojects, {id, projectName, description}]);
  }

  const handleProjectUpdated = (id: string, projectName: string, description: string) => {
    setSubprojects(prevProjects => 
      prevProjects.map(project => project.id===id ? {...project, projectName, description} : project)
    );
  }

  const handleProjectDeleted = (id: string) => {
    setSubprojects(prevProjects => prevProjects.filter(project => project.id !== id));
  }
 
  const goBack = () => navigate('/dashboard');


  if (loading && subprojects.length === 0) {
    return (
      <Box className="loading-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#4ECDC4' }} size={60} />
      </Box>
    );
  }else if (error && subprojects.length === 0) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
      </div>
    );
  }


  return (
    <div className="subprojects-container">

      <Button variant="contained"
          startIcon={<AddIcon/>}
          onClick={handleCreateSubproject}
          id='create-subproject-btn'>
          New Subproject
      </Button>

      {parentProject && (
        <div className="parent-project-info">
          <h1>{parentProject.projectName}</h1>
          <p className="parent-description">{parentProject.description}</p>
        </div>
      )}

      <div className="subprojects-section">
        <h2>Subprojects</h2>
        {subprojects.length === 0 ? (
          <div className="no-subprojects">
            <p>No subprojects found for this project</p>
          </div>
        ) : (
          <div className="subprojects">
            {subprojects.map(sp => (
              <SubProjectCard
                key={sp.id}
                id={sp.id}
                projectName={sp.projectName}
                description={sp.description}
                onEdit={handleEditProject}
              />
            ))}
          </div>
        )}
      </div>
    
        {projectId && (

          <CreateSubProjectModal open={isCreateModalOpen}
                               onClose={() => setIsCreateModalOpen(false)}
                               onSubprojectCreated={handleSubprojectCreated}
                               parentId={projectId} />
          )
        }

        {editingProject && <EditParentProjectModal
                            open={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                          projectId={editingProject.id}
                          currentName={editingProject.projectName}
                          currentDescription={editingProject.description}
                          onSubProjectUpdated={handleProjectUpdated}
                          onSubProjectDeleted={handleProjectDeleted}
                          />}
        
    </div>
  );
}

export default SubprojectPage;
