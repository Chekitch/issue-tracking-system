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
import { PermissionAPI, type Permission } from '../../services/permissionService';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
  open: boolean;
  onClose: () => void;
  permission: Permission;
  onPermissionUpdated: (permission: Permission) => void;
  onPermissionDeleted: (permissionId: number) => void;
}

const EditPermissionModal = ({ open, onClose, permission, onPermissionUpdated, onPermissionDeleted }: Props) => {
  const [formData, setFormData] = useState({
    name: '',
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
        name: permission.name,
        description: permission.description
      });
      setApiError(null);
      setErrors({});
    }
  }, [open, permission]);

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
    
    if (!formData.name.trim()) newErrors.name = 'Permission name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setApiError(null);
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const updatedPermission = await PermissionAPI.updatePermission(permission.id, formData);
      onPermissionUpdated(updatedPermission);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to update permission. Please try again.');
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
      await PermissionAPI.deletePermission(permission.id);
      onPermissionDeleted(permission.id);
      setConfirmDeleteOpen(false);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to delete permission');
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
          <span>Edit Permission</span>
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
              label="Permission Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
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
            {isSubmitting ? <CircularProgress size={24} /> : 'Update Permission'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Permission</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete permission "{permission.name}"? This action cannot be undone.
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

export default EditPermissionModal;