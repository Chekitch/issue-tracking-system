import axiosInstance from "../../../core/api/axios-config";
import { COMMENTS } from "../../../core/api/endpoints";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
}

export interface CreateCommentRequest {
    content: string;
    userId: string;
}


export const CommentAPI = {
    
    getCommentsByIssue: async (issueId: string) : Promise<Comment[]> => {
        if(!issueId) throw new Error("Issue ID is required");
        return await axiosInstance.get(COMMENTS.BY_ISSUE(issueId));
    },
    getCommentById: async (issueId: string, commentId: number) : Promise<Comment> => {
        if(!issueId) throw new Error("Issue ID is required");
        if(!commentId) throw new Error("Comment ID is required");
        return await axiosInstance.get(COMMENTS.GET_COMMENT(issueId, commentId));
    },
    createComment: async (issueId: string, commentData: CreateCommentRequest) : Promise<Comment> => {
        if(!issueId) throw new Error("Issue ID is required");
        return await axiosInstance.post(COMMENTS.CREATE_COMMENT(issueId), commentData);

    },
    updateComment: async (issueId: string, commentId: number, commentData: Partial<CreateCommentRequest>) : Promise<Comment> => {
        if(!issueId) throw new Error("Issue ID is required");
        if(!commentId) throw new Error("Comment ID is required");
        return await axiosInstance.put(COMMENTS.UPDATE_COMMENT(issueId, commentId), commentData);
    },
    deleteComment: async (issueId: string, commentId: number) : Promise<void> => {
        if(!issueId) throw new Error("Issue ID is required");
        if(!commentId) throw new Error("Comment ID is required");
        return await axiosInstance.delete(COMMENTS.DELETE_COMMENT(issueId, commentId))
    }
}