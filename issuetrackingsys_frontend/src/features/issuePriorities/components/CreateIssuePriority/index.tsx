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
  CircularProgress,
  Box,
  InputLabel
} from '@mui/material';
import { IssuePriorityAPI, type IssuePriority } from '../../services/issuePriorityService';
import { ChromePicker } from 'react-color';

interface Props {
  open: boolean;
  onClose: () => void;
  onPriorityCreated: (priority: IssuePriority) => void;
}

const INITIAL_FORM = {
  name: '',
  description: '',
  color: '#ff3030'
};

const CreateIssuePriorityModal = ({ open, onClose, onPriorityCreated } : Props) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleClose = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setApiError(null);
    setShowColorPicker(false);
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
      const newPriority = await IssuePriorityAPI.createIssuePriority(formData);
      onPriorityCreated(newPriority);
      handleClose();
    } catch (error: any) {
      setApiError(error.message || 'Failed to create priority. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth >
      <DialogTitle>Add New Issue Priority</DialogTitle>
      
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
            placeholder="e.g., High, Medium, Low"
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
            placeholder="e.g., Issue needs to be fixed within 24 hours"
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
          {isSubmitting ? <CircularProgress size={24} /> : 'Create Priority'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateIssuePriorityModal;