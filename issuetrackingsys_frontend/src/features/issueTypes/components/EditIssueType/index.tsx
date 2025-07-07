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
import { IssueTypeAPI, type IssueType } from '../../services/issueTypeService';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  open: boolean;
  onClose: () => void;
  type: IssueType;
  onTypeUpdated: (type: IssueType) => void;
  onTypeDeleted: (id: number) => void;
}

const EditIssueTypeModal = ({ open, onClose, type, onTypeUpdated, onTypeDeleted }: Props) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (open && type) {
      setFormData({
        name: type.name,
        description: type.description
      });
      setApiError(null);
      setErrors({});
    }
  }, [open, type]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleUpdate = async () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    setApiError(null);
    setIsSubmitting(true);
    
    try {
      const updatedType = await IssueTypeAPI.updateIssueType(type.id, formData);
      onTypeUpdated(updatedType);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to update issue type');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await IssueTypeAPI.deleteIssueType(type.id);
      onTypeDeleted(type.id);
      setConfirmDeleteOpen(false);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to delete issue type');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Edit Issue Type</span>
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
            {isSubmitting ? <CircularProgress size={24} /> : 'Update Type'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Issue Type</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete type "{type.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmDeleteOpen(false)} disabled={isDeleting}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
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

export default EditIssueTypeModal;