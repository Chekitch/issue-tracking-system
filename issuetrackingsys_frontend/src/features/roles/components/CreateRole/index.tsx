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
import { RoleAPI, type UserRole } from '../../services/roleService';

interface Props {
  open: boolean;
  onClose: () => void;
  onRoleCreated: (role: UserRole) => void;
}

const INITIAL_FORM = {
  role: '',
  description: ''
};

const CreateRoleModal = ({ open, onClose, onRoleCreated } : Props) => {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.role.trim()) newErrors.role = 'Role name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setApiError(null);
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const newRole = await RoleAPI.createRole(formData);
      onRoleCreated(newRole);
      handleClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to create role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Role</DialogTitle>
      
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {apiError && <Alert severity="error">{apiError}</Alert>}
          
          <TextField
            label="Role Name"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            error={!!errors.role}
            helperText={errors.role}
            fullWidth
          />
          
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
            rows={4}
          />
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          variant="contained" 
          color="primary"
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Create Role'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoleModal;