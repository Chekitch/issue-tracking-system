import axiosInstance from "../../../core/api/axios-config";
import { ISSUE_TYPES } from "../../../core/api/endpoints";

export interface IssueType {
  id: number;
  name: string;
  description: string;
}

export interface CreateIssueTypeDTO {
  name: string;
  description: string;
}

export const IssueTypeAPI = {
  getAllIssueTypes: async (): Promise<IssueType[]> => {
    return await axiosInstance.get(ISSUE_TYPES.ALL());
  },

  getIssueTypeById: async (id: number): Promise<IssueType> => {
    if (id < 0) throw new Error("Type ID is required");
    return await axiosInstance.get(ISSUE_TYPES.BY_ID(id));
  },

  createIssueType: async (data: CreateIssueTypeDTO): Promise<IssueType> => {
    return await axiosInstance.post(ISSUE_TYPES.CREATE(), data);
  },
  
  updateIssueType: async (id: number, data: Partial<CreateIssueTypeDTO>): Promise<IssueType> => {
    if (id < 0) throw new Error("Type ID is required");
    return await axiosInstance.put(ISSUE_TYPES.UPDATE(id), data);
  },
  
  deleteIssueType: async (id: number): Promise<void> => {
    if (id < 0) throw new Error("Type ID is required");
    return await axiosInstance.delete(ISSUE_TYPES.DELETE(id));
  }
};