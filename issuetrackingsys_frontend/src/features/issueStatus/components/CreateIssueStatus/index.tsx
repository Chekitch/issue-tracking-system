import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert,
  Stack,
  CircularProgress
} from '@mui/material';
import { IssueStatusAPI, type IssueStatus } from '../../services/issueStatusService';

interface Props {
  open: boolean;
  onClose: () => void;
  onStatusCreated: (status: IssueStatus) => void;
}

const INITIAL_FORM = {
  name: '',
  description: ''
};

const CreateIssueStatusModal = ({ open, onClose, onStatusCreated }: Props) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleClose = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setApiError(null);
    onClose();
  };

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

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const newStatus = await IssueStatusAPI.createIssueStatus(formData);
      onStatusCreated(newStatus);
      handleClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to create status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Status</DialogTitle>
      
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
            placeholder="e.g., Open, In Progress, Closed"
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
            placeholder="e.g., Issues that are currently being worked on"
          />
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          variant="contained" 
          color="primary"
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Create Status'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateIssueStatusModal;