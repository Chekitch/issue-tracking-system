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
  IconButton,
  Box,
  InputLabel
} from '@mui/material';
import { IssuePriorityAPI, type IssuePriority } from '../../services/issuePriorityService';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChromePicker } from "react-color";

interface Props {
  open: boolean;
  onClose: () => void;
  priority: IssuePriority;
  onPriorityUpdated: (priority: IssuePriority) => void;
  onPriorityDeleted: (id: number) => void;
}

const EditIssuePriorityModal = ({ open, onClose, priority, onPriorityUpdated,onPriorityDeleted } : Props) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  

  useEffect(() => {
    if (open) {
      setFormData({
        name: priority.name,
        description: priority.description,
        color: priority.color
      });
      setApiError(null);
      setErrors({});
    }
  }, [open, priority]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleColorChange = (color: any) => {
    setFormData(prev => ({ ...prev, color: color.hex }));
    if (errors.color) {
      setErrors(prev => ({ ...prev, color: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.color) newErrors.color = 'Color is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setApiError(null);
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const updatedPriority = await IssuePriorityAPI.updateIssuePriority(priority.id, formData);
      onPriorityUpdated(updatedPriority);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to update priority. Please try again.');
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
      await IssuePriorityAPI.deleteIssuePriority(priority.id);
      onPriorityDeleted(priority.id);
      setConfirmDeleteOpen(false);
      onClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to delete priority');
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
          <span>Edit Issue Priority</span>
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
              rows={3}
            />
            
            <Box>
              <InputLabel>Color</InputLabel>
              <Box 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mt: 1
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '4px',
                    backgroundColor: formData.color,
                    cursor: 'pointer',
                    border: '1px solid #ccc'
                  }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                <TextField
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  error={!!errors.color}
                  helperText={errors.color}
                  size="small"
                  sx={{ width: 120 }}
                />
              </Box>
              {showColorPicker && (
                <Box sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
                  <ChromePicker
                    color={formData.color}
                    onChange={handleColorChange}
                    disableAlpha
                  />
                  <Box 
                    sx={{ 
                      position: 'fixed', 
                      top: 0, 
                      right: 0, 
                      bottom: 0, 
                      left: 0, 
                      zIndex: -1 
                    }} 
                    onClick={() => setShowColorPicker(false)} 
                  />
                </Box>
              )}
            </Box>
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
            {isSubmitting ? <CircularProgress size={24} /> : 'Update Priority'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Issue Priority</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete priority "{priority.name}"? This action cannot be undone.
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

export default EditIssuePriorityModal;