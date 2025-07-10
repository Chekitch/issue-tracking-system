import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Button, TextField,
  List, Paper, CircularProgress, Breadcrumbs, Link,
  IconButton, ListItem, ListItemText, Tabs, Tab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';

import { IssueAPI } from '../../services/issueService';
import { CommentAPI } from '../../../comments/services/commentService';
import { IssueStatusAPI } from '../../../issueStatus/services/issueStatusService';
import { IssuePriorityAPI } from '../../../issuePriorities/services/issuePriorityService';
import { IssueTypeAPI } from '../../../issueTypes/services/issueTypeService';
import { UserAPI } from '../../../user/service/userService';
import { AttachmentAPI } from '../../../attachments/services/attachmentService';

import { ErrorDisplay, LoadingIndicator } from '../../../../utils/commonFunctions';
import EditIssueModal from '../EditIssue';
import { useModal } from '../../../../utils/hooks';
import { SectionBox, SectionHeader } from './SectionHeader';
import { CommentItem } from '../../../comments/components/CommentItem';
import { useAppSelector } from '../../../../store/hooks';
import { stylesIssueDetailsPage } from '../styles/styles';

import type { Issue } from '../../services/issueService';
import type { Comment } from '../../../comments/services/commentService';
import type { IssueStatus } from '../../../issueStatus/services/issueStatusService';
import type { IssuePriority } from '../../../issuePriorities/services/issuePriorityService';
import type { IssueType } from '../../../issueTypes/services/issueTypeService';
import type { User } from '../../../user/service/userService';
import type { AttachmentResponseDTO } from '../../../attachments/services/attachmentService';

type SectionKey = 'details' | 'description' | 'activity' | 'people' | 'dates';

const styles = stylesIssueDetailsPage;

const IssueDetailsPage = () => {
  const { projectId, issueId } = useParams<{ projectId: string; issueId: string }>();
  const userId = useAppSelector((state) => state.auth.userId);
  const editModal = useModal();
  
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');
  
  const [statuses, setStatuses] = useState<IssueStatus[]>([]);
  const [priorities, setPriorities] = useState<IssuePriority[]>([]);
  const [types, setTypes] = useState<IssueType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const [attachments, setAttachments] = useState<AttachmentResponseDTO[]>([]);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [attachmentError, setAttachmentError] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    description: true,
    activity: true,
    people: true,
    dates: true
  });
  const [activeTab, setActiveTab] = useState<'comments' | 'attachments'>('comments');

  const fetchIssue = useCallback(async () => {
    if (!issueId) {
      setError('No issue ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const issueData = await IssueAPI.getIssueById(issueId);
      setIssue(issueData);
    } catch (err: any) {
      setError(err.message || 'Failed to load issue details');
    } finally {
      setLoading(false);
    }
  }, [issueId]);

  const fetchComments = useCallback(async () => {
    if (!issueId) return;
    try {
      const commentsData = await CommentAPI.getCommentsByIssue(issueId);
      setComments(commentsData);
    } catch (err: any) {
      setCommentError(err.message || 'Failed to load comments');
    }
  }, [issueId]);

  const fetchAttachments = useCallback(async () => {
    if (!issueId) return;
    try {
      const attachmentsData = await AttachmentAPI.getAttachmentsByIssue(issueId);
      setAttachments(attachmentsData);
    } catch (err: any) {
      setAttachmentError(err.message || 'Failed to load attachments');
    }
  }, [issueId]);

  const fetchReferenceData = useCallback(async () => {
    try {
      const [statusesRes, prioritiesRes, typesRes, usersRes] = await Promise.all([
        IssueStatusAPI.getAllIssueStatuses(),
        IssuePriorityAPI.getAllIssuePriorities(),
        IssueTypeAPI.getAllIssueTypes(),
        UserAPI.getAllUsers(),
      ]);
      setStatuses(statusesRes);
      setPriorities(prioritiesRes);
      setTypes(typesRes);
      setUsers(usersRes);
    } catch (err : any) {
      setError(err.message || "Failed to load reference data");
    }
  }, []);

  useEffect(() => {
    fetchIssue();
  }, [fetchIssue]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    fetchAttachments();
  }, [fetchAttachments]);

  useEffect(() => {
    fetchReferenceData();
  }, [fetchReferenceData]);

  const handleIssueUpdated = (updatedIssue: Issue) => {
    setIssue(updatedIssue);
  };

  const handleSubmitComment = async () => {
    if (!comment.trim() || !issueId || !userId) return;
    
    setIsSubmitting(true);
    setCommentError('');
    
    try {
      const created = await CommentAPI.createComment(issueId, { content: comment, userId });
      setComments(prev => [created, ...prev]);
      setComment('');
    } catch (err: any) {
      setCommentError(err.message || 'Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isSubmitting) {
      e.preventDefault();
      if (comment.trim()) {
        handleSubmitComment();
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!issueId) return;
    setCommentError('');
    try {
      await CommentAPI.deleteComment(issueId, Number(commentId));
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err: any) {
      setCommentError(err.message || 'Failed to delete comment');
    }
  };

  const handleEditComment = async (commentId: string, newContent: string) => {
    if (!issueId) return;
    setCommentError('');
    try {
      const updated = await CommentAPI.updateComment(issueId, Number(commentId), { content: newContent });
      setComments(prev => prev.map(c => c.id === commentId ? { ...c, content: updated.content, createdAt: updated.createdAt } : c));
    } catch (err: any) {
      setCommentError(err.message || 'Failed to update comment');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile || !userId || !issueId) return;
    
    setUploadingAttachment(true);
    setAttachmentError('');
    
    try {
      await AttachmentAPI.uploadAttachment({
        file: selectedFile,
        userId,
        issueId
      });
      await fetchAttachments();
      setSelectedFile(null);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setAttachmentError(err.message || 'Failed to upload attachment');
    } finally {
      setUploadingAttachment(false);
    }
  };

  const handleDownloadAttachment = async (attachmentId: number, fileName: string) => {
    if (!issueId) return;
    
    setDownloadingId(attachmentId);
    
    try {
      const blob = await AttachmentAPI.downloadAttachment(issueId, attachmentId);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    } catch (err: any) {
      setAttachmentError(err.message || 'Failed to download file');
    } finally {
      setDownloadingId(null);
    }
  };
  
  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'comments' | 'attachments') => {
    setActiveTab(newValue);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error || !issue) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" sx={{ color: '#94A3B8' }} />}>
          <Link href={`/subprojects/${projectId}/issues`} underline="hover" sx={styles.breadcrumbLink}>Issues</Link>
          <Typography color="#F5F5F5">{issue.id}</Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h1" sx={styles.titleText}>{issue.title}</Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={editModal.openModal}
            sx={styles.primaryButton}
          >
            Edit
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '65%', ...styles.contentColumn }}>
          <SectionHeader title="Details" expanded={expandedSections.details} onClick={() => toggleSection('details')} />
          
          {expandedSections.details && (
            <SectionBox>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={styles.labelText}>Type:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1, width: 16, height: 16, bgcolor: '#36B37E', borderRadius: '2px' }} />
                  <Typography sx={styles.valueText}>{issue.issueType.name}</Typography>
                </Box>
                
                <Typography sx={styles.labelText}>Priority:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1, width: 16, height: 16, bgcolor: issue.issuePriority.color, borderRadius: '50%' }} />
                  <Typography sx={styles.valueText}>{issue.issuePriority.name}</Typography>
                </Box>
                
                <Typography sx={styles.labelText}>Status:</Typography>
                <Typography sx={styles.valueText}>{issue.issueStatus.name}</Typography>
              </Box>
            </SectionBox>
          )}
          
          <SectionHeader title="Description" expanded={expandedSections.description} onClick={() => toggleSection('description')} />
          
          {expandedSections.description && (
            <SectionBox>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#E2E8F0' }}>
                {issue.description || "No description provided."}
              </Typography>
            </SectionBox>
          )}
          
          <SectionHeader title="Activity" expanded={expandedSections.activity} onClick={() => toggleSection('activity')} />
          
          {expandedSections.activity && (
            <SectionBox>
              <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTabs-indicator': { backgroundColor: '#3B82F6' },
                    '& .MuiTab-root': { 
                      color: '#94A3B8',
                      '&.Mui-selected': { color: '#60A5FA' },
                      textTransform: 'none',
                      minWidth: 100,
                      py: 1.5
                    }
                  }}
                >
                  <Tab value="comments" label="Comments" />
                  <Tab value="attachments" label="Attachments" />
                </Tabs>
              </Box>

              {activeTab === 'comments' && (
                <Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={styles.commentField}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
                      disabled={isSubmitting || !comment.trim()}
                      onClick={handleSubmitComment}
                      sx={styles.primaryButton}
                    >
                      {isSubmitting ? 'Submitting...' : 'Add Comment'}
                    </Button>
                  </Box>
                  
                  {commentError && <ErrorDisplay error={commentError} />}
                  
                  <List>
                    {comments.length === 0 ? (
                      <Paper elevation={0} sx={styles.emptyState}>
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                          There are no comments yet on this issue.
                        </Typography>
                      </Paper>
                    ) : (
                      comments.map((comment) => (
                        <CommentItem
                          key={comment.id}
                          comment={comment}
                          currentUserId={userId}
                          onDelete={handleDeleteComment}
                          onEdit={handleEditComment}
                        />
                      ))
                    )}
                  </List>
                </Box>
              )}

              {activeTab === 'attachments' && (
                <Box>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(30, 41, 59, 0.8)', borderRadius: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          borderColor: '#475569',
                          color: '#E2E8F0',
                          '&:hover': {
                            borderColor: '#60A5FA',
                            bgcolor: 'rgba(96, 165, 250, 0.1)',
                          }
                        }}
                      >
                        Select File
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                      </Button>
                      
                      <Typography variant="body2" sx={{ 
                        color: selectedFile ? '#E2E8F0' : '#94A3B8', 
                        flex: 1, 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap' 
                      }}>
                        {selectedFile ? selectedFile.name : 'No file selected'}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        disabled={!selectedFile || uploadingAttachment}
                        onClick={handleUploadFile}
                        startIcon={uploadingAttachment ? <CircularProgress size={16} color="inherit" /> : null}
                        sx={{
                          bgcolor: '#3B82F6',
                          '&:hover': { bgcolor: '#2563EB' },
                          '&.Mui-disabled': { bgcolor: 'rgba(59, 130, 246, 0.3)' }
                        }}
                      >
                        {uploadingAttachment ? 'Uploading...' : 'Upload'}
                      </Button>
                    </Box>
                  </Paper>
                  
                  {attachmentError && <ErrorDisplay error={attachmentError} />}
                  
                  {attachments.length === 0 ? (
                    <Paper elevation={0} sx={styles.emptyState}>
                      <Typography variant="body2" sx={{ color: '#94A3B8', py: 4, textAlign: 'center' }}>
                        No attachments added to this issue yet.
                      </Typography>
                    </Paper>
                  ) : (
                    <List sx={{ bgcolor: 'rgba(15, 23, 42, 0.7)', borderRadius: 1 }}>
                      {attachments.map((attachment) => (
                        <ListItem
                          key={attachment.id}
                          sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                          secondaryAction={
                            <IconButton 
                              onClick={() => handleDownloadAttachment(attachment.id, attachment.fileName)}
                              disabled={downloadingId === attachment.id}
                              sx={{ color: '#60A5FA' }}
                              title="Download file"
                            >
                              {downloadingId === attachment.id ? 
                                <CircularProgress size={20} sx={{ color: '#60A5FA' }} /> : 
                                <DownloadIcon fontSize="small" />
                              }
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={attachment.fileName}
                            secondary={`${(attachment.fileSize / 1024).toFixed(1)} KB • Uploaded by ${attachment.uploadedByUsername || 'Unknown'}`}
                            
                            slotProps={{
                              primary: { sx: { color: '#E2E8F0'} },
                              secondary: { sx: { color: '#94A3B8' } }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              )}
            </SectionBox>
          )}
        </Box>
        
        <Box sx={{ width: '35%', ...styles.rightColumn }}>
          <SectionHeader title="People" expanded={expandedSections.people} onClick={() => toggleSection('people')} />
          
          {expandedSections.people && (
            <SectionBox>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={styles.labelText}>Assignee:</Typography>
                <Typography sx={styles.valueText}>{issue.assignee.username}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={styles.labelText}>Reporter:</Typography>
                <Typography sx={styles.valueText}>{issue.reporter.username}</Typography>
              </Box>
            </SectionBox>
          )}
          
          <SectionHeader title="Dates" expanded={expandedSections.dates} onClick={() => toggleSection('dates')} />
          
          {expandedSections.dates && (
            <SectionBox>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={styles.labelText}>Created:</Typography>
                <Typography sx={styles.valueText}>{
                  issue.creationDate
                    ? `${new Date(issue.creationDate).toLocaleDateString()} ${new Date(issue.creationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : 'N/A'
                }</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={styles.labelText}>Updated:</Typography>
                <Typography sx={styles.valueText}>{
                  issue.lastModificationDate
                    ? `${new Date(issue.lastModificationDate).toLocaleDateString()} ${new Date(issue.lastModificationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : 'N/A'
                }</Typography>
              </Box>
            </SectionBox>
          )}
        </Box>
      </Box>
      
      {issue && (
        <EditIssueModal
          open={editModal.open}
          onClose={editModal.closeModal}
          issue={issue}
          statuses={statuses}
          priorities={priorities}
          types={types}
          users={users}
          onIssueUpdated={handleIssueUpdated}
        />
      )}
    </Box>
  );
};

export default IssueDetailsPage;