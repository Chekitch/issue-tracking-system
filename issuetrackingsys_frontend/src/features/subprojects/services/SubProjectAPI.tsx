import axiosInstance from "../../../core/api/axios-config";
import type { Subproject } from "../components/SubprojectList";




export const SubProjectAPI = {
    getSubProjectsByParentProject: async (parentId : string | undefined ) : Promise<Subproject[]> => {
        if (!parentId){
            throw new Error("Parent ID is required");
        }
        return await axiosInstance.get(`/sub-projects?parentId=${parentId}`);
    }

}