import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
  Stack,
  CircularProgress,
  Typography,
  IconButton,
  type SelectChangeEvent
} from '@mui/material';
import { UserAPI, type User } from '../../service/userService';
import { RoleAPI, type UserRole } from '../../../roles/services/roleService';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  open: boolean;
  onClose: () => void;
  user: User;
  onUserUpdated: (user: User) => void;
  onUserDeleted?: (userId: string) => void;
}

const EditUserModal = ({ open, onClose, user, onUserUpdated,onUserDeleted } : Props) => {

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '',
    roleId: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (open) {
      fetchRoles();
      setFormData({
        username: user.username,
        fullName: user.fullName,
        password: "",
        roleId: user.role?.id || 0
      });
      setApiError(null);
      setErrors({});
    }
  }, [open, user]);

  const fetchRoles = async () => {
    setRolesLoading(true);
    try {
      const fetchingRoles = await RoleAPI.getAllRoles();
      setRoles(fetchingRoles);
    } catch (error: any) {
      setApiError(error.message || "Failed to fetch roles");
    } finally {
      setRolesLoading(false);
    }
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

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (formData.password && (formData.password.length < 6 || formData.password.length > 20)) {
      newErrors.password = 'Password must be between 8 and 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    setApiError(null);
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {

      const updateData = {
        username: formData.username,
        fullName: formData.fullName,
        roleId: formData.roleId,
        ...(formData.password ? { password: formData.password } : {})
      };
      
      const updatedUser = await UserAPI.updateUser(user.id, updateData);
      onUserUpdated(updatedUser);
      onClose();

    } catch (error: any) {

      setApiError(error.message || 'Failed to update user. Please try again.');
      
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
      await UserAPI.deleteUser(user.id);
      setConfirmDeleteOpen(false);
      if (onUserDeleted) {
        onUserDeleted(user.id);
      }
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to delete user');
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
          <span>Edit User</span>
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
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
            />
            
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
            />
            
            <TextField
              label="New Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />
            
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="roleId"
                value={formData.roleId}
                onChange={handleSelectChange}
                label="Role"
              >
                {rolesLoading ? (
                  <MenuItem disabled>Loading roles</MenuItem>
                ) : (
                  roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.role}
                      {role.description && (
                        <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                          ({role.description})
                        </Typography>
                      )}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
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
            {isSubmitting ? <CircularProgress size={24} /> : 'Update User'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user "{user.username}"? This action cannot be undone.
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

export default EditUserModal;