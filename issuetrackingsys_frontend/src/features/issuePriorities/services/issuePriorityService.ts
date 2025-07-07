import axiosInstance from "../../../core/api/axios-config";
import { ISSUE_PRIORITIES } from "../../../core/api/endpoints";

export interface IssuePriority {
  id: number;
  name: string;
  description: string;
  color: string;
}

export interface CreateIssuePriorityDTO {
  name: string;
  description: string;
  color: string;
}

export const IssuePriorityAPI = {
  getAllIssuePriorities: async (): Promise<IssuePriority[]> => {
    return await axiosInstance.get(ISSUE_PRIORITIES.ALL());
  },

  getIssuePriorityById: async (id: number): Promise<IssuePriority> => {
    if (id < 0) throw new Error("Priority ID is required");
    return await axiosInstance.get(ISSUE_PRIORITIES.BY_ID(id));
  },

  createIssuePriority: async (data: CreateIssuePriorityDTO): Promise<IssuePriority> => {
    return await axiosInstance.post(ISSUE_PRIORITIES.CREATE(), data);
  },
  
  updateIssuePriority: async (id: number, data: Partial<CreateIssuePriorityDTO>): Promise<IssuePriority> => {
    if (id < 0) throw new Error("Priority ID is required");
    return await axiosInstance.put(ISSUE_PRIORITIES.UPDATE(id), data);
  },
  
  deleteIssuePriority: async (id: number): Promise<void> => {
    if (id < 0) throw new Error("Priority ID is required");
    return await axiosInstance.delete(ISSUE_PRIORITIES.DELETE(id));
  }
};