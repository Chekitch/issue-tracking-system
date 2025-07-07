import axiosInstance from "../../../core/api/axios-config";
import { ISSUE_STATUSES } from "../../../core/api/endpoints";

export interface IssueStatus {
  id: number;
  name: string;
  description: string;
}

export interface CreateIssueStatusDTO {
  name: string;
  description: string;
}

export const IssueStatusAPI = {
  getAllIssueStatuses: async (): Promise<IssueStatus[]> => {
    return await axiosInstance.get(ISSUE_STATUSES.ALL());
  },

  getIssueStatusById: async (id: number): Promise<IssueStatus> => {
    if (id < 0) throw new Error("Type ID is required");
    return await axiosInstance.get(ISSUE_STATUSES.BY_ID(id));
  },

  createIssueStatus: async (data: CreateIssueStatusDTO): Promise<IssueStatus> => {
    return await axiosInstance.post(ISSUE_STATUSES.CREATE(), data);
  },
  
  updateIssueStatus: async (id: number, data: Partial<CreateIssueStatusDTO>): Promise<IssueStatus> => {
    if (id < 0) throw new Error("Type ID is required");
    return await axiosInstance.put(ISSUE_STATUSES.UPDATE(id), data);
  },
  
  deleteIssueStatus: async (id: number): Promise<void> => {
    if (id < 0) throw new Error("Type ID is required");
    return await axiosInstance.delete(ISSUE_STATUSES.DELETE(id));
  }
};