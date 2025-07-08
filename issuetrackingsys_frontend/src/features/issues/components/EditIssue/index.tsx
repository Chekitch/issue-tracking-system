import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, Select, MenuItem, Button,
  Typography, Box, CircularProgress, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IssueAPI, type Issue } from '../../services/issueService';
import type { IssueStatus } from '../../../issueStatus/services/issueStatusService';
import type { IssuePriority } from '../../../issuePriorities/services/issuePriorityService';
import type { IssueType } from '../../../issueTypes/services/issueTypeService';
import type { User } from '../../../user/service/userService';
import { ErrorDisplay } from '../../../../utils/commonFunctions';
import { styles } from '../styles/styles';

interface FormData {
  title: string;
  description: string;
  priorityId: number | '';
  statusId: number | '';    
  typeId: number | '';      
  assigneeId: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  issue: Issue;
  statuses: IssueStatus[];
  priorities: IssuePriority[];
  types: IssueType[];
  users: User[];
  onIssueUpdated: (issue: Issue) => void;
  onIssueDeleted?: (issueId: string) => void;
}

const EditIssueModal = ({ open, onClose, issue, statuses, priorities, types, users, onIssueUpdated, onIssueDeleted }: Props) => {

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priorityId: '',
    statusId: '',
    typeId: '',
    assigneeId: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (open && issue) {
      setFormData({
        title: issue.title,
        description: issue.description,
        priorityId: issue.issuePriority.id,
        statusId: issue.issueStatus.id,
        typeId: issue.issueType.id,
        assigneeId: issue.assignee.id
      });
      setError('');
    }
  }, [open, issue]);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!issue.id) return;
    
    setDeleteLoading(true);
    setError('');
    
    try {
      await IssueAPI.deleteIssue(issue.id);
      setConfirmDeleteOpen(false);
      if (onIssueDeleted) {
        onIssueDeleted(issue.id);
      }
      handleClose();
    } catch (err: any) {
      setError(err.message || 'Failed to delete issue');
      setConfirmDeleteOpen(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSubmit = async () => {
    const { title, description, statusId, priorityId, typeId, assigneeId } = formData;
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    
    if (!trimmedTitle || !trimmedDescription || 
        statusId === '' || priorityId === '' || typeId === '') {
      setError('Required fields are missing');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const updatedIssue = await IssueAPI.updateIssue(issue.id, {
        title: trimmedTitle,
        description: trimmedDescription,
        statusId: statusId as number,
        priorityId: priorityId as number,
        typeId: typeId as number,
        assigneeId
      });
      
      onIssueUpdated(updatedIssue);
      handleClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update issue');
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (label: string, content: React.ReactNode) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={styles.fieldLabel}>
        {label}
      </Typography>
      {content}
    </Box>
  );
  
  const renderPriorityOption = (priority: IssuePriority) => (
    <MenuItem key={priority.id} value={priority.id}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: priority.color, mr: 1 }} />
        <Typography>{priority.name}</Typography>
      </Box>
    </MenuItem>
  );
  
  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            elevation: 8,
            sx: styles.dialogPaper
          }
        }}
      >
        <DialogTitle sx={styles.dialogTitle}>
          <span>Edit Issue</span>
          <IconButton 
            onClick={handleDeleteClick}
            sx={{ color: '#F95959' }}
            disabled={loading || deleteLoading}
            aria-label="Delete issue"
          >
            <DeleteIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ py: 3 }}>
          <ErrorDisplay error={error} />
          
          {renderFormField("Issue Title*", 
            <TextField
              autoFocus
              fullWidth
              placeholder="Concise description of the issue"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              variant="outlined"
              sx={styles.input}
              aria-required="true"
            />
          )}
          
          {renderFormField("Description*", 
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Detailed explanation of the issue"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              variant="outlined"
              sx={styles.input}
              aria-required="true"
            />
          )}
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
            <Box sx={styles.selectField}>
              <Typography variant="subtitle1" sx={styles.fieldLabel}>
                Priority*
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.priorityId}
                  onChange={(e) => handleChange("priorityId", e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    
                    const selectedPriority = priorities.find(p => p.id === selected);
                    if (!selectedPriority) return 'Select priority';
                    
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: selectedPriority.color, mr: 1 }} />
                        <Typography>{selectedPriority.name}</Typography>
                      </Box>
                    );
                  }}
                  sx={styles.select}
                  aria-required="true"
                >
                  {priorities.map(renderPriorityOption)}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={styles.selectField}>
              <Typography variant="subtitle1" sx={styles.fieldLabel}>
                Status*
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.statusId}
                  onChange={(e) => handleChange("statusId", e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    const selectedStatus = statuses.find(s => s.id === selected);
                    return selectedStatus ? selectedStatus.name : 'Select status';
                  }}
                  sx={styles.select}
                  aria-required="true"
                >
                  {statuses.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={styles.selectField}>
              <Typography variant="subtitle1" sx={styles.fieldLabel}>
                Issue Type*
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.typeId}
                  onChange={(e) => handleChange("typeId", e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    const selectedType = types.find(t => t.id === selected);
                    return selectedType ? selectedType.name : 'Select type';
                  }}
                  sx={styles.select}
                  aria-required="true"
                >
                  {types.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {renderFormField("Assignee", 
            <FormControl fullWidth>
              <Select
                value={formData.assigneeId}
                onChange={(e) => handleChange("assigneeId", e.target.value as string)}
                displayEmpty
                renderValue={(selected) => {
                  const selectedUser = users.find(u => u.id === selected);
                  return selectedUser ? selectedUser.username : '';
                }}
                sx={styles.select}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <Typography>{user.username}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Button 
            onClick={handleClose} 
            disabled={loading}
            variant="outlined"
            sx={styles.secondaryButton}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="contained"
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
            sx={styles.primaryButton}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        slotProps={{
          paper: {
            elevation: 8,
            sx: styles.dialogPaper
          }
        }}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: '#F5F5F5' }}>
          Delete Issue
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#F5F5F5' }}>
            Are you sure you want to delete issue "{formData.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setConfirmDeleteOpen(false)}
            disabled={deleteLoading}
            sx={{ color: '#e0e0e0', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={deleteLoading}
            sx={styles.dangerButton}
            startIcon={deleteLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditIssueModal;