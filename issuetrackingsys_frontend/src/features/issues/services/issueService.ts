import axiosInstance from "../../../core/api/axios-config";
import { ISSUES } from "../../../core/api/endpoints";
import type { IssuePriority } from "../../issuePriorities/services/issuePriorityService";
import type { IssueStatus } from "../../issueStatus/services/issueStatusService";
import type { IssueType } from "../../issueTypes/services/issueTypeService";
import type { User } from "../../user/service/userService";

export interface UserSummary{
  id: string;
  username: string;
}
export interface Issue {
  id: string;
  creationDate: string;
  lastModificationDate: string;
  title: string;
  description: string;
  issueStatus: IssueStatus;
  issuePriority: IssuePriority;
  issueType: IssueType;
  reporter: UserSummary;
  assignee: UserSummary;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  priorityId: number;
  statusId: number;
  typeId: number;
  reporterId: string;
  assigneeId: string;
}

export const IssueAPI = {
  getIssuesBySubProject: async (subprojectId: string): Promise<Issue[]> => {
    if (!subprojectId) throw new Error("Subproject ID is required");
    return await axiosInstance.get(ISSUES.BY_SUBPROJECT(subprojectId));
    
  },

  getIssueById: async (issueId: string): Promise<Issue> => {
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.get(ISSUES.GET_ISSUE(issueId));
    
  },

  createIssue: async (subprojectId: string, issueData: CreateIssueRequest): Promise<Issue> => {
    if (!subprojectId) throw new Error("Subproject ID is required");
    return await axiosInstance.post(ISSUES.CREATE_ISSUE(subprojectId), issueData);
    
  },

  updateIssue: async (issueId: string, issueData: Partial<CreateIssueRequest>): Promise<Issue> => {
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.put(ISSUES.UPDATE_ISSUE(issueId), issueData);
   
  },

  deleteIssue: async (issueId: string): Promise<void> => {
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.delete(ISSUES.DELETE_ISSUE(issueId));
  },

};