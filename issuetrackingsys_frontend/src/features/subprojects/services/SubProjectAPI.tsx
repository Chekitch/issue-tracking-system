import axiosInstance from "../../../core/api/axios-config";
import { SUBPROJECTS } from "../../../core/api/endpoints";

interface CreateSubProjectDTO{
    projectName: string;
    description: string;
    createdById: string;
}

interface UpdateSubProjectDTO{
    projectName: string;
    description: string;
}
export interface Subproject {
  id: string;
  projectName: string;
  description: string;
}

export const SubProjectAPI = {
    getSubProjectsByParentProject: async (parentId : string ) : Promise<Subproject[]> => {
        if (!parentId){
            throw new Error("Parent ID is required");
        }
        return await axiosInstance.get(SUBPROJECTS.ALL(parentId));
    },

    createSubProject: async (subProject: CreateSubProjectDTO, parentId: string) : Promise<Subproject> => {

        return await axiosInstance.post(SUBPROJECTS.CREATE(parentId), subProject);
    },

    updateSubProject: async (id: string, subProject: UpdateSubProjectDTO) : Promise<Subproject> => {
        return await axiosInstance.put(SUBPROJECTS.UPDATE(id), subProject);
    },

    deleteSubProject: async (id: string) : Promise<void> => {
        return await axiosInstance.delete(SUBPROJECTS.DELETE(id));
    }
}