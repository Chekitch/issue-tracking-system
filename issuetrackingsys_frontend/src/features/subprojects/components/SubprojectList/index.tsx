import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'
import { ParentProjectAPI } from '../../../projects/services/projectService';
import { Box, CircularProgress } from '@mui/material';
import LogoutButton from '../../../../core/auth/components/LogoutButton';
import SubProjectCard from '../SubprojectCard';
import { SubProjectAPI } from '../../services/SubProjectAPI';

export interface Subproject {
  id: string;
  projectName: string;
  description: string;
}

interface ParentProjectDetails {
  id: string;
  projectName: string;
  description: string;
}

function SubprojectPage() {
  const { projectId } = useParams<{projectId: string}>();
  const navigate = useNavigate();

  const [subprojects, setSubprojects] = useState<Subproject[]>([]);
  const [parentProject, setParentProject] = useState<ParentProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!projectId) {
      setError('No project ID provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {

      const projectData = await ParentProjectAPI.getParentProjectById(projectId);
      setParentProject(projectData);

      const subprojectData : Subproject[] = await SubProjectAPI.getSubProjectsByParentProject(projectId);
      setSubprojects(subprojectData || []);
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'Failed to load project data');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const goBack = () => navigate('/dashboard');

  const handleEditSubproject = (id: string, projectName: string, description: string) => {
    console.log('Edit subproject:', id, projectName, description);
  };

  if (loading) {
    return (
      <Box className="loading-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#4ECDC4' }} size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <button className="back-button" onClick={goBack}>Back to Projects</button>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="subprojects-container">
      <div className="subprojects-header">
        <button className="back-button" onClick={goBack}>Back to Projects</button>
        <div className="logout-container"><LogoutButton /></div>
      </div>

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
            <button className="create-subproject-btn">Create Subproject</button>
          </div>
        ) : (
          <div className="subprojects">
            {subprojects.map(sp => (
              <SubProjectCard
                key={sp.id}
                id={sp.id}
                projectName={sp.projectName}
                description={sp.description}
                onEdit={handleEditSubproject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubprojectPage;
