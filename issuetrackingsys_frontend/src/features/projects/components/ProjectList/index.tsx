import React, { useEffect, useState } from 'react'
import './styles.css'
import { Box, Button, CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {ParentProjectAPI, type ParentProject} from "../../services/projectService.ts";
import ParentProjectCard from "../ProjectCard";
import CreateParentProjectModal from "../CreateProject";
import EditParentProjectModal from "../EditProject";
import { ErrorDisplay, LoadingIndicator, EmptyState } from "../../../../utils/commonFunctions";
import { useModal } from '../../../../utils/hooks';

function ParentProjectList() {

    const [projects, setProjects] = useState<ParentProject[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const createModal = useModal();
    const editModal = useModal();

    const [editingProject, setEditingProject] = useState<ParentProject | null>(null);



    useEffect(() => {
        fetchParentProjects();
    }, []);

    const fetchParentProjects = async () => {
        setLoading(true);
        try{
            const fetchedParentProjects = await ParentProjectAPI.getAllParentProjects();
            setProjects(fetchedParentProjects);
        }catch(error: any){
            setError(error.message || "Failed to fetch projects");
        }finally{
            setLoading(false);
        }
    }

    const handleCreateProject = () => {
        createModal.openModal();
    };

    const handleEditProject = (id: string, projectName: string, description: string)  => {
        setEditingProject({ id, projectName, description });
        editModal.openModal();
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
        return <LoadingIndicator />;
    }

    if (error && projects.length === 0) {
        return <ErrorDisplay error={error} />;
    }
    

    return (
        <div className='proj-container'>
            <h2 className='proj-title'>Parent Projects</h2>

            <div className='header-container'>
                <Button variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleCreateProject}
                    className='proj-create-btn'>
                    New Project
                </Button>
            </div>
            
            {projects.length === 0 ? (
                <EmptyState message="No parent projects found" />
            ) : (
                <div className='proj-list'>
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

            <CreateParentProjectModal open={createModal.open} onClose={createModal.closeModal} onProjectCreated={handleProjectCreated}/>

            {editingProject && <EditParentProjectModal
                                open={editModal.open}
                                onClose={editModal.closeModal}
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