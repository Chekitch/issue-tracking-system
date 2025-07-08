import { useState } from 'react';
import { Box, Button, CircularProgress, List, Paper, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CommentItem } from '../CommentItem';
import { CommentAPI, type Comment } from '../../services/commentService';
import { ErrorDisplay } from '../../../../utils/commonFunctions';
import { stylesIssueDetailsPage } from '../../../issues/components/styles/styles';

const styles = stylesIssueDetailsPage;

interface Props {
  issueId: string;
  userId: string | null;
  initialComments: Comment[];
}

export const CommentSection = ({ issueId, userId, initialComments }: Props) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');

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

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
    </>
  );
};