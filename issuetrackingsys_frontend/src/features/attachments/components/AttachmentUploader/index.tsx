import { useState } from 'react';
import { 
  Box, Button, Typography, CircularProgress, 
  Paper, IconButton, List, ListItem, ListItemText,
  Dialog, DialogContent, DialogTitle, IconButton as MuiIconButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AttachmentAPI } from '../../services/attachmentService';
import { ErrorDisplay } from '../../../../utils/commonFunctions';

interface Props {
  issueId: string;
  userId: string | null;
  onAttachmentUploaded: () => void;
}

export const AttachmentUploader = ({ issueId, userId, onAttachmentUploaded }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handlePreviewFile = (file: File) => {
    setPreviewFile(file);
    setPreviewOpen(true);
  };
  
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };
  
  const handleUpload = async () => {
    if (!userId || files.length === 0) return;
    
    setUploading(true);
    setError('');
    
    try {
      for (const file of files) {
        await AttachmentAPI.uploadAttachment({
          file,
          userId,
          issueId
        });
      }
      
      setFiles([]);
      onAttachmentUploaded();
    } catch (err: any) {
      setError(err.message || 'Failed to upload attachments');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Box sx={{ mt: 2 }}>
      <Paper sx={{ p: 2, bgcolor: 'rgba(30, 41, 59, 0.8)', borderRadius: 1 }}>
        <Box
          component="label"
          sx={{
            border: '1px dashed #475569',
            borderRadius: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: files.length > 0 ? 2 : 0,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.03)',
            },
          }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            multiple
          />
          <CloudUploadIcon sx={{ fontSize: 40, color: '#60A5FA', mb: 1 }} />
          <Typography variant="body1" color="#E2E8F0">Click to select files or drag and drop</Typography>
          <Typography variant="caption" color="#94A3B8">
            Max file size: 10MB
          </Typography>
        </Box>
        
        {files.length > 0 && (
          <>
            <List sx={{ bgcolor: 'rgba(15, 23, 42, 0.7)', borderRadius: 1, mb: 2, mt: 2 }}>
              {files.map((file, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Box>
                      <IconButton 
                        edge="end" 
                        onClick={() => handlePreviewFile(file)}
                        sx={{ color: '#60A5FA', mr: 1 }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        onClick={() => handleRemoveFile(index)}
                        sx={{ color: '#EF4444' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={file.name}
                    secondary={`${(file.size / 1024).toFixed(1)} KB`}
                    slotProps={{
                      primary: { style: { color: '#E2E8F0' } },
                      secondary: { style: { color: '#94A3B8' } }
                    }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploading}
              startIcon={uploading ? <CircularProgress size={16} color="inherit" /> : null}
              sx={{ 
                bgcolor: '#3B82F6', 
                '&:hover': { bgcolor: '#2563EB' },
                '&.Mui-disabled': { bgcolor: 'rgba(59, 130, 246, 0.5)' }
              }}
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </>
        )}
      </Paper>
      
      {error && <ErrorDisplay error={error} />}
      
      <Dialog 
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="lg"
        fullWidth
        slotProps={{
          paper:{
            sx:{
              bgcolor: '#1E293B',
              color: '#E2E8F0'
            }
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            {previewFile?.name}
          </Typography>
          <MuiIconButton
            onClick={handleClosePreview}
            sx={{ color: '#94A3B8' }}
          >
            <CloseIcon />
          </MuiIconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#1E293B', height: 'calc(100vh - 200px)', minHeight: '400px' }}>
          {previewFile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6" color="#E2E8F0">
                Preview not available for this file type.
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};