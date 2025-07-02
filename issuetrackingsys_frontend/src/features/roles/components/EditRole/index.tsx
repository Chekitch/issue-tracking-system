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
  Typography
} from '@mui/material';
import { RoleAPI, type UserRole } from '../../services/roleService';

interface Props {
  open: boolean;
  onClose: () => void;
  role: UserRole;
  onRoleUpdated: (role: UserRole) => void;
  onRoleDeleted: (roleId: number) => void;
}

const EditRoleModal = ({ open, onClose, role, onRoleUpdated,onRoleDeleted } : Props) => {
  const [formData, setFormData] = useState({
    role: '',
    description: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        role: role.role,
        description: role.description
      });
      setApiError(null);
      setErrors({});
    }
  }, [open, role]);

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
      const updatedRole = await RoleAPI.updateRole(role.id, formData);
      onRoleUpdated(updatedRole);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to update role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      console.log(role.id);
      await RoleAPI.deleteRole(role.id);
      onRoleDeleted(role.id);
      setConfirmDeleteOpen(false);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to delete role');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Role
          <Button 
            color="error" 
            onClick={handleDeleteClick} 
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            Delete
          </Button>
        </DialogTitle>
        
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
            {isSubmitting ? <CircularProgress size={24} /> : 'Update Role'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete role "{role.role}"? This action cannot be undone.
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

export default EditRoleModal;