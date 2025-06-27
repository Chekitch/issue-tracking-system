import axiosInstance from "../../../core/api/axios-config";
import type { ResponseWrapper } from "../../../core/api/types";

export interface ParentProject {
  id: string;
  projectName: string;
  description: string;
}

interface CreateParentProjectDTO {
  projectName?: string;
  description?: string;
  createdById?: string;
}

interface UpdateParentProjectDTO {
  projectName?: string;
  description?: string;
}


export const ParentProjectAPI = {

  getAllParentProjects: async (): Promise<ParentProject[]> => {

    return await axiosInstance.get("/parent-projects");
  },

  getParentProjectById: async (projectId: string | undefined) => {
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    return await axiosInstance.get(`/parent-projects/${projectId}`);
  },
  
  createParentProject: async (projectData: CreateParentProjectDTO) => {
    return await axiosInstance.post("/parent-projects", projectData);
  },

  updateParentProject: async (projectId: string, projectData: UpdateParentProjectDTO) => {
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    return await axiosInstance.put(`/parent-projects/${projectId}`, projectData);
  },

  deleteParentProject: async (projectId: string) => {
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    return await axiosInstance.delete(`/parent-projects/${projectId}`);
  },
};
