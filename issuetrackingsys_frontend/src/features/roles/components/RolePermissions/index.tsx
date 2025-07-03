import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  CircularProgress,
  Button,
  TextField,
  Typography,
  Alert,
  Box
} from '@mui/material';
import type { UserRole } from '../../services/roleService';
import { PermissionAPI, type Permission } from '../../../permissions/services/permissionService';
import PermissionItem from '../PermissionItem';
import "./styles.css";

interface Props {
  open: boolean;
  onClose: () => void;
  role: UserRole;
  onRoleUpdated: (role: UserRole) => void;
}

const RolePermissions = ({ open, onClose, role, onRoleUpdated }: Props) => {
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPermissions = async () => {
    if (!open) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [allPerms, rolePerms] = await Promise.all([
        PermissionAPI.getAllPermissions(),
        PermissionAPI.getPermissionsByRole(role.id)
      ]);
      
      setAllPermissions(allPerms);
      setRolePermissions(rolePerms);
    } catch (err: any) {
      setError(err.message || 'Failed to load permissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setSearchQuery('');
      fetchPermissions();
    }
  }, [open, role.id]);

  const isPermissionAssigned = (permissionId: number) => 
    rolePermissions.some(p => p.id === permissionId);

  const handlePermissionToggle = async (permission: Permission) => {
    setSaveLoading(true);
    setError(null);
    
    try {
      const isAssigned = isPermissionAssigned(permission.id);
      
      if (isAssigned) {
        await PermissionAPI.removePermissionFromRole(permission.id, role.id);
        setRolePermissions(prev => prev.filter(p => p.id !== permission.id));
      } else {
        await PermissionAPI.assignPermissionToRole(permission.id, role.id);
        setRolePermissions(prev => [...prev, permission]);
      }
      
      // onRoleUpdated({ ...role });
    } catch (err: any) {
      setError(err.message || 'Failed to update permissions');
    } finally {
      setSaveLoading(false);
    }
  };

  const filteredPermissions = allPermissions.filter(permission =>
    permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => {
    if (!saveLoading) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{ '& .MuiDialog-paper': { backgroundColor: '#2C3E50', color: '#F5F5F5', minHeight: '500px' } }}
    >
      <DialogTitle>
        <Typography variant="h6">
          Permissions for: <strong>{role.role}</strong>
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2, backgroundColor: '#3a1f1f', color: '#f95959', '& .MuiAlert-icon': { color: '#f95959' } }}
          >
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          placeholder="Search permissions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#233142',
              '& fieldset': { borderColor: '#4ECDC4', borderWidth: '2px' },
              '&:hover fieldset': { borderColor: '#3dbdb5' },
              '&.Mui-focused fieldset': { borderColor: '#4ECDC4' }
            },
            '& .MuiInputBase-input': { color: '#F5F5F5' },
            '& .MuiInputBase-input::placeholder': { color: 'rgba(255, 255, 255, 0.7)', opacity: 1 }
          }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#4ECDC4' }} />
          </Box>
        ) : (
          <Paper
            className="rp-list-container"
            sx={{
              backgroundColor: '#233142',
              borderRadius: 1,
              maxHeight: '400px',
              overflow: 'auto',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {filteredPermissions.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: '#E0E0E0' }}>
                  {searchQuery ? 'No permissions match your search' : 'No permissions available'}
                </Typography>
              </Box>
            ) : (
              filteredPermissions.map((permission) => (
                <PermissionItem
                  key={permission.id}
                  permission={permission}
                  isAssigned={isPermissionAssigned(permission.id)}
                  onToggle={handlePermissionToggle}
                  disabled={saveLoading}
                />
              ))
            )}
          </Paper>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleClose}
          disabled={saveLoading}
          variant="contained"
          sx={{
            backgroundColor: '#4ECDC4',
            color: '#233142',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#3dbdb5' }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RolePermissions;