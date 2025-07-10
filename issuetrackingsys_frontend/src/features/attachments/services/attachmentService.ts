import axiosInstance from "../../../core/api/axios-config";
import { ATTACHMENTS } from "../../../core/api/endpoints";

export interface AttachmentResponseDTO {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
}

export interface DownloadedFile {
  fileBytes: Blob;
  contentType: string;
  fileName: string;
}

export interface AttachmentRequestDTO {
  file: File;
  userId: string;
  issueId: string;
}

export const AttachmentAPI = {
  uploadAttachment: async (requestDTO: AttachmentRequestDTO): Promise<AttachmentResponseDTO> => {
    if (!requestDTO.file) throw new Error("File is required");
    if (!requestDTO.userId) throw new Error("User ID is required");
    if (!requestDTO.issueId) throw new Error("Issue ID is required");

    const maxSize = 10 * 1024 * 1024;
    if (requestDTO.file.size > maxSize) {
      throw new Error("File size exceeds 10MB limit");
    }

    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword','text/plain',
      'text/csv', 'application/json', 'application/xml'
    ];
    
    if (!allowedTypes.includes(requestDTO.file.type)) {
      throw new Error("File type not supported");
    }

    const formData = new FormData();
    formData.append('file', requestDTO.file);
    formData.append('userId', requestDTO.userId);
    formData.append('issueId', requestDTO.issueId);

    return await axiosInstance.post(ATTACHMENTS.UPLOAD(requestDTO.issueId), formData, {
      headers: {
        
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getAttachmentMetadata: async (issueId: string, attachmentId: number): Promise<AttachmentResponseDTO> => {
    if (!attachmentId) throw new Error("Attachment ID is required");
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.get(ATTACHMENTS.BY_ID(issueId, attachmentId));
  },

  downloadAttachment: async (issueId: string, attachmentId: number): Promise<Blob> => {
    if (!attachmentId) throw new Error("Attachment ID is required");
    if (!issueId) throw new Error("Issue ID is required");

    const response : {base64Content: string, contentType: string} = await axiosInstance.get(ATTACHMENTS.DOWNLOAD(issueId, attachmentId));

    const { base64Content, contentType } = response;
    
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  },

  getAttachmentsByIssue: async (issueId: string): Promise<AttachmentResponseDTO[]> => {
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.get(ATTACHMENTS.BY_ISSUE(issueId));
  },

  deleteAttachment: async (issueId: string, attachmentId: number): Promise<void> => {
    if (!attachmentId) throw new Error("Attachment ID is required");
    if (!issueId) throw new Error("Issue ID is required");
    return await axiosInstance.delete(ATTACHMENTS.DELETE(issueId, attachmentId));
  }
};
