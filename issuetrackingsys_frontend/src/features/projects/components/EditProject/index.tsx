import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, CircularProgress, Alert,
  IconButton, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ParentProjectAPI } from '../../services/projectService';

interface Props {
  open: boolean;
  onClose: () => void;
  projectId: string;
  currentName: string;
  currentDescription: string;
  onProjectUpdated: (id: string, projectName: string, description: string) => void;
  onProjectDeleted?: (id: string) => void;
}

const EditParentProjectModal = ({ open, onClose, projectId, currentName, currentDescription,onProjectUpdated,onProjectDeleted } : Props) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setProjectName(currentName);
      setDescription(currentDescription);
      setError('');
    }
  }, [open, currentName, currentDescription]);

  const handleClose = () => {
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    const trimmedName = projectName.trim();
    const trimmedDescription = description.trim();
    
    if (!trimmedName || !trimmedDescription) {
      setError('All fields are required');
      return;
    }

    if (trimmedName === currentName && trimmedDescription === currentDescription) {
      handleClose();
      return;
    }

    setLoading(true);
    setError('');

    try {
      await ParentProjectAPI.updateParentProject(projectId, { 
        projectName: trimmedName,
        description: trimmedDescription
      });

      onProjectUpdated(projectId, trimmedName, trimmedDescription);
      handleClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                           err.message || 
                           'Failed to update project';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    setError('');
    
    try {
      await ParentProjectAPI.deleteParentProject(projectId);
      setConfirmDeleteOpen(false);

      if (onProjectDeleted) {
        onProjectDeleted(projectId);
      }

      handleClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                           err.message || 
                           'Failed to delete project';
      setError(errorMessage);
      setConfirmDeleteOpen(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth
        slotProps={{
          paper:{
            sx: {bgcolor: '#2C3E50'}
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#F5F5F5', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Edit Project</span>
          <IconButton 
            onClick={handleDeleteClick}
            sx={{ color: '#F95959' }}
            disabled={loading || deleteLoading}
          >
            <DeleteIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            autoFocus
            fullWidth
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            margin="dense"
            sx={{ 
              '& .MuiOutlinedInput-root': { color: '#F5F5F5' },
              '& .MuiInputLabel-root': { color: '#F5F5F5' }
            }}
          />
          
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="dense"
            sx={{ 
              '& .MuiOutlinedInput-root': { color: '#F5F5F5' },
              '& .MuiInputLabel-root': { color: '#F5F5F5' }
            }}
          />
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleClose} 
            disabled={loading}
            sx={{ color: '#F5F5F5' }}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={loading || !projectName.trim() || !description.trim()}
            sx={{ 
              bgcolor: '#4ECDC4', 
              color: 'black',
              '&:hover': { bgcolor: '#3dbdb5' },
              '&.Mui-disabled': { opacity: 0.7 }
            }}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        slotProps={{
          paper:{
            sx: { bgcolor: '#2C3E50', color: '#F5F5F5'}
          }
        }}
      >
        <DialogTitle>
          Delete Project
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{currentName}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCancelDelete}
            disabled={deleteLoading}
            sx={{ color: '#F5F5F5' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={deleteLoading}
            sx={{ 
              bgcolor: '#F95959', 
              color: '#F5F5F5',
              '&:hover': { bgcolor: '#e54747' },
            }}
            startIcon={deleteLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditParentProjectModal;