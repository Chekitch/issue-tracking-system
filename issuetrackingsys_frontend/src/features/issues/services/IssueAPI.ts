import axiosInstance from "../../../core/api/axios-config";
import { ISSUES } from "../../../core/api/endpoints";
import type { IssuePriority } from "../../issuePriorities/services/issuePriorityService";
import type { IssueStatus } from "../../issueStatus/services/issueStatusService";
import type { IssueType } from "../../issueTypes/services/issueTypeService";

export interface Issue {
  id: string;
  title: string;
  description: string;
  issueStatus: IssueStatus;
  issuePriority: IssuePriority;
  issueType: IssueType;
  reporter: {
    id: string;
    username: string;
  };
  assignee: {
    id: string;
    username: string;
  };
}

export interface IssueActivity {
  id: number;
  description: string;
  performed_by_username: string;
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

export interface IssueActivityCreateDTO {
  description: string;
  performedById: string;
}

export interface IssueActivityUpdateDTO {
  description: string;
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
    console.log(issueData); 
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

  getIssueActivities: async (issueId: string): Promise<IssueActivity[]> => {
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.get(ISSUES.ISSUE_ACTIVITIES(issueId));
    
  },

  createIssueActivity: async (issueId: string, activityData: IssueActivityCreateDTO): Promise<IssueActivity> => {
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.post(ISSUES.ISSUE_ACTIVITIES(issueId), activityData);
    
  },

  updateIssueActivity: async (issueId: string, activityId: number, activityData: IssueActivityUpdateDTO): Promise<IssueActivity> => {
    if (!issueId) throw new Error("Issue ID is required");
    if (activityId <= 0) throw new Error("Activity ID is required");
    return await axiosInstance.put(`${ISSUES.ISSUE_ACTIVITIES(issueId)}/${activityId}`, activityData);
   
  },

  deleteIssueActivity: async (issueId: string, activityId: number): Promise<void> => {
    if (!issueId) throw new Error("Issue ID is required");
    if (activityId <= 0) throw new Error("Activity ID is required");
    return await axiosInstance.delete(`${ISSUES.ISSUE_ACTIVITIES(issueId)}/${activityId}`);
  },

  assignUserToIssue: async (issueId: string, userId: string): Promise<Issue> => {
    if (!issueId) throw new Error("Issue ID is required");
    if (!userId) throw new Error("User ID is required");
    return await axiosInstance.post(`${ISSUES.GET_ISSUE(issueId)}/assign`, { userId });
    
  },

  unassignUserFromIssue: async (issueId: string): Promise<Issue> => {
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.post(`${ISSUES.GET_ISSUE(issueId)}/unassign`);
    
  }
};