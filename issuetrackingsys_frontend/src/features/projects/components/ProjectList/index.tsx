import React, { useEffect, useState } from 'react'
import './styles.css'
import { Box, Button, CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {ParentProjectAPI, type ParentProject} from "../../services/projectService.ts";
import ParentProjectCard from "../ProjectCard";
import CreateParentProjectModal from "../CreateProject";
import EditParentProjectModal from "../EditProject";

function ParentProjectList() {

    const [projects, setProjects] = useState<ParentProject[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<ParentProject | null>(null);


    useEffect(() => {
        setLoading(true);
        ParentProjectAPI.getAllParentProjects()
            .then(projects => {
                setProjects(projects);
            })
            .catch(error => {
                setError(error.message || "Failed to fetch projects");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleCreateProject = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditProject = (id: string, projectName: string, description: string)  => {
        setEditingProject({ id, projectName, description });
        setIsEditModalOpen(true);
    };

    const handleProjectCreated = (id: string, projectName: string, description: string)  => {
        setProjects(projects => [...projects, {id, projectName, description}]);
    }

    const handleProjectUpdated = (id: string, projectName: string, description: string) => {
        setProjects(prevProjects => 
            prevProjects.map(project => 
                project.id === id 
                    ? { ...project, projectName, description } 
                    : project
            )
        );
    };

    const handleProjectDeleted = (id: string) => {

        setProjects(prevProjects => 
            prevProjects.filter(project => project.id !== id)
        );
    };


    if (loading && projects.length === 0) {
        return (
            <Box className="loading-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress sx={{ color: '#4ECDC4' }} size={60} />
            </Box>
        );
    }


    if (error && projects.length === 0) {
        return <div className='error'>{error}</div>;
    }
    

    return (
        <div className='projects-container'>
            <h2>Parent Projects</h2>

            <div className='header-container'>
                <Button variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleCreateProject}
                    id='create-parent-project-btn'>
                    New Project
                </Button>
            </div>
            
            {projects.length === 0 ? (
                <div className="no-projects">
                    <p>No parent projects found</p>
                </div>
            ) : (
                <div className='projects'>
                    {projects.map(project => (
                        <ParentProjectCard
                            key={project.id}
                            id={project.id}
                            projectName={project.projectName}
                            description={project.description}
                            onEdit={handleEditProject}
                        />
                    ))}
                </div>
            )}

            <CreateParentProjectModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onProjectCreated={handleProjectCreated}/>

            {editingProject && <EditParentProjectModal
                                open={isEditModalOpen}
                                onClose={() => setIsEditModalOpen(false)}
                                projectId={editingProject.id}
                                currentName={editingProject.projectName}
                                currentDescription={editingProject.description}
                                onProjectUpdated={handleProjectUpdated}
                                onProjectDeleted={handleProjectDeleted}
                                />  
            }
        </div>
    )
}

export default ParentProjectList