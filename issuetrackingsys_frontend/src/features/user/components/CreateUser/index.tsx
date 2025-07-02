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
  type SelectChangeEvent,
  Typography
} from '@mui/material';
import { UserAPI, type User } from '../../service/userService';
import { RoleAPI, type UserRole } from '../../../roles/services/roleService';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserCreated: (user: User) => void;
}

const INITIAL_FORM = {
  username: '',
  fullName: '',
  password: '',
  roleId: 2
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const fetchRoles = async () => {
    setRolesLoading(true);
    try{
        const fetchingRoles = await RoleAPI.getAllRoles();
        setRoles(fetchingRoles);
    }catch(error: any){
        setApiError(error.message || "Failed to fetch roles");
    }finally{
        setRolesLoading(false);
    }
  };

  useEffect(()=> {
    fetchRoles();
  },[]);

  const handleInputChange = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name) {
        setFormData(prev => ({ ...prev, [name]: value}));

        if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;

        if (name) {
            setFormData(prev => ({...prev, [name]: Number(value)}));

            if (errors[name]) {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
        }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8 || formData.password.length > 20) {
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
      const newUser = await UserAPI.createUser(formData);
      onUserCreated(newUser);
      onClose();
      setFormData(INITIAL_FORM);
    } catch (error: any) {
      setApiError(error.message || 'Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      
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
            label="Password"
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
              {rolesLoading ? (<MenuItem disabled>Loading roles</MenuItem>) :
              (
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
          {isSubmitting ? <CircularProgress size={24} /> : 'Create User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;