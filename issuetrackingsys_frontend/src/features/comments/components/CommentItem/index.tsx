import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography, IconButton, TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import type { Comment } from "../../services/commentService";
import { stylesIssueDetailsPage } from "../../../issues/components/styles/styles";

const styles = stylesIssueDetailsPage;

interface Props {
  comment: Comment;
  currentUserId?: string | null;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
}

export const CommentItem = ({ comment, currentUserId, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const isOwner = currentUserId && comment.author?.id === currentUserId;
  
  const handleSaveEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };
  
  return (
    <ListItem alignItems="flex-start" sx={{ ...styles.commentItem, display: 'block', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Avatar sx={styles.avatar}>{comment.author.username.charAt(0).toUpperCase()}</Avatar>
        <Box sx={{ ml: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2" sx={styles.commentAuthor}>{comment.author.username}</Typography>
            <Typography variant="caption" sx={styles.commentDate}>
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Box>
          {isOwner && !isEditing && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={() => setIsEditing(true)} 
                size="small"
                sx={{ color: '#94A3B8', '&:hover': { color: '#E2E8F0', backgroundColor: 'rgba(255,255,255,0.08)' }, p: 0.5, mr: 0.5 }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => onDelete(comment.id)} 
                size="small"
                sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444', backgroundColor: 'rgba(239,68,68,0.08)' }, p: 0.5 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 1, ml: 6, p: 1 }}>
        {isEditing ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
              size="small"
              multiline
              minRows={1}
              maxRows={3}
              sx={{ flex: 1, ...styles.commentField, mb: 0, mt: 0, '.MuiInputBase-root': { py: 0.5, fontSize: '0.95rem' } }}
              slotProps={{ input: { style: { padding: '4px 8px' } } }}
            />
            <Button
              variant="text"
              size="small"
              onClick={handleSaveEdit}
              sx={{ ml: 0.5, minWidth: 0, px: 0.5, py: 0, fontSize: '0.85rem', color: '#22C55E', textTransform: 'none' }}
            >
              Save
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => setIsEditing(false)}
              sx={{ color: '#EF4444', ml: 0.5, minWidth: 0, px: 0.5, py: 0, fontSize: '0.85rem', textTransform: 'none' }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Typography 
            variant="body2" 
            component="div" 
            sx={styles.commentContent}
          >
            {comment.content}
          </Typography>
        )}
      </Box>
    </ListItem>
  );
};