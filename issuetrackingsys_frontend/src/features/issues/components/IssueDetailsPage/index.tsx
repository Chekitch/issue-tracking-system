import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Button, IconButton, TextField,
  List, Paper, CircularProgress, Breadcrumbs, Link
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IssueAPI, type Issue } from '../../services/issueService';
import { ErrorDisplay, LoadingIndicator } from '../../../../utils/commonFunctions';
import EditIssueModal from '../EditIssue';
import { useModal } from '../../../../utils/hooks';
import { IssueStatusAPI } from '../../../issueStatus/services/issueStatusService';
import { IssuePriorityAPI } from '../../../issuePriorities/services/issuePriorityService';
import { IssueTypeAPI } from '../../../issueTypes/services/issueTypeService';
import { UserAPI } from '../../../user/service/userService';
import type { IssueStatus } from '../../../issueStatus/services/issueStatusService';
import type { IssuePriority } from '../../../issuePriorities/services/issuePriorityService';
import type { IssueType } from '../../../issueTypes/services/issueTypeService';
import type { User } from '../../../user/service/userService';
import { SectionBox, SectionHeader } from './SectionHeader';
import { CommentItem } from '../../../comments/components/CommentItem';
import { CommentAPI, type Comment } from '../../../comments/services/commentService';
import { useAppSelector } from '../../../../store/hooks';
import { stylesIssueDetailsPage } from '../styles/styles';

interface Props {
  projectName?: string;
}


type SectionKey = 'details' | 'description' | 'activity' | 'people' | 'dates';

const styles = stylesIssueDetailsPage;

const IssueDetailsPage = () => {
  const { projectId, issueId } = useParams<{ projectId: string; issueId: string }>();
  
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    description: true,
    activity: true,
    people: true,
    dates: true});

  const [statuses, setStatuses] = useState<IssueStatus[]>([]);
  const [priorities, setPriorities] = useState<IssuePriority[]>([]);
  const [types, setTypes] = useState<IssueType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const editModal = useModal();
  const userId = useAppSelector((state) => state.auth.userId);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const fetchIssue = async () => {
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
    };

    fetchIssue();
  }, [issueId]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!issueId) return;
      try {
        const commentsData = await CommentAPI.getCommentsByIssue(issueId);
        setComments(commentsData);
      } catch (err: any) {
        setError(err.message || 'Failed to load comments');
      }
    };
    fetchComments();
  }, [issueId]);

  useEffect(() => {
    const fetchLists = async () => {
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
        setError(err.message || "Failed");
      }
    };
    fetchLists();
  }, []);

  const handleEditIssue = () => {
    if (issue) {
      editModal.openModal();
    }
  };

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

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
          <Link href={`/subprojects/${projectId}/issues`} underline="hover" sx={styles.breadcrumbLink}>
            Issues
          </Link>
          <Typography color="#F5F5F5">
            {issue.id}
          </Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h1" sx={styles.titleText}>
            {issue.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={handleEditIssue}
              sx={styles.primaryButton}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '65%', ...styles.contentColumn }}>
          <SectionHeader title="Details" expanded={expandedSections.details} onClick={() => toggleSection('details')} />
          
          {expandedSections.details && (
            <SectionBox>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'max-content 1fr', 
                gap: 2, 
                alignItems: 'center',
              }}>
                <Typography sx={styles.labelText}>Type:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1, width: 16, height: 16, bgcolor: '#36B37E', borderRadius: '2px' }} />
                  <Typography sx={styles.valueText}>{issue.issueType.name}</Typography>
                </Box>
                
                <Typography sx={styles.labelText}>Priority:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      mr: 1, 
                      width: 16, 
                      height: 16, 
                      bgcolor: issue.issuePriority.color,
                      borderRadius: '50%' 
                    }} 
                  />
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
              <Typography variant="body1" sx={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                color: '#E2E8F0',
              }}>
                {issue.description || "No description provided."}
              </Typography>
            </SectionBox>
          )}
          
          <SectionHeader title="Activity" expanded={expandedSections.activity} onClick={() => toggleSection('activity')} />
          
          {expandedSections.activity && (
            <SectionBox>
              <Box sx={{ mb: 3 }}>
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
                {commentError && (
                  <Box sx={{ mt: 1 }}>
                    <ErrorDisplay error={commentError} />
                  </Box>
                )}
              </Box>
              
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
            </SectionBox>
          )}
        </Box>
        
        <Box sx={{ width: '35%', ...styles.rightColumn }}>
          <SectionHeader title="People" expanded={expandedSections.people} onClick={() => toggleSection('people')} />
          
          {expandedSections.people && (
            <SectionBox>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={styles.labelText}>Assignee:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={styles.valueText}>{issue.assignee.username}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={styles.labelText}>Reporter:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={styles.valueText}>{issue.reporter.username}</Typography>
                </Box>
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