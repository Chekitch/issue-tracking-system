import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert,
  Stack,
  CircularProgress,
  Typography,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IssueStatusAPI, type IssueStatus } from '../../services/issueStatusService';

interface Props {
  open: boolean;
  onClose: () => void;
  status: IssueStatus;
  onStatusUpdated: (status: IssueStatus) => void;
  onStatusDeleted: (id: number) => void;
}

const EditIssueStatusModal = ({ open, onClose, status, onStatusUpdated, onStatusDeleted }: Props) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (open && status) {
      setFormData({
        name: status.name,
        description: status.description
      });
      setApiError(null);
      setErrors({});
    }
  }, [open, status]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Status name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const updatedStatus = await IssueStatusAPI.updateIssueStatus(status.id, formData);
      onStatusUpdated(updatedStatus);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to update status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setApiError(null);
    
    try {
      await IssueStatusAPI.deleteIssueStatus(status.id);
      onStatusDeleted(status.id);
      setConfirmDeleteOpen(false);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to delete status. Please try again.');
      setConfirmDeleteOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Edit Status</span>
          <IconButton 
            onClick={handleDeleteClick}
            sx={{ color: '#F95959' }}
            disabled={isSubmitting || isDeleting}
          >
            <DeleteIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {apiError && <Alert severity="error">{apiError}</Alert>}
            
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button 
            onClick={handleUpdate} 
            disabled={isSubmitting} 
            variant="contained" 
            color="primary"
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Update Status'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Status</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete status "{status.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmDeleteOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            disabled={isDeleting}
            variant="contained" 
            color="error"
          >
            {isDeleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditIssueStatusModal;