import { useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { SubProjectAPI, type Subproject } from "../../services/SubProjectAPI";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";


interface Props{
    open:boolean;
    onClose: () => void;
    onSubprojectCreated: (id: string, projectName: string, description: string) => void;
    parentId: string;
}

const CreateSubProjectModal: React.FC<Props> = ({open, onClose, onSubprojectCreated, parentId}) => {
    const userId = useAppSelector((state) => state.auth.userId);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setProjectName('');
        setDescription('');
        setError('');
        onClose();
    };

    const handleSubmit = async () => {
        const trimmedName = projectName.trim();
        const trimmedDescription = description.trim();

        if(!trimmedName || !trimmedDescription){
            setError('All fields are required');
            return;
        }
        if(!userId){
            setError('User authentication required');
            return;
        }

        setLoading(true);
        setError('');

        try {
        const project = await SubProjectAPI.createSubProject({
            projectName: trimmedName,
            description: trimmedDescription,
            createdById: userId
        }, parentId);
        
        console.log(project);
        handleClose();
        onSubprojectCreated(project.id, project.projectName, project.description);
        } catch (error: any) {
          setError(error.message || 'Failed to create subproject');
        } finally {
          setLoading(false);
        }
    };

    return (
        <Dialog 
          open={open} 
          onClose={handleClose} 
          fullWidth
          slotProps={{ 
            paper: {
              sx: {
                bgcolor: '#2C3E50',
                borderRadius: 2,
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              } 
            }
          }}
        >
          <DialogTitle sx={{
            color: '#F5F5F5',
            pt: 3,
            fontSize: '1.5rem',
            fontWeight: 500 
            }}>Create New Subproject</DialogTitle>
          
          <DialogContent>
            {error && (
              <Box sx={{ 
                bgcolor: 'rgba(249, 89, 89, 0.1)', 
                color: '#F95959', 
                p: 2, 
                borderRadius: 1,
                mb: 2 
              }}>
                <Typography variant="body2">{error}</Typography>
              </Box>
            )}
            
            <TextField
              autoFocus
              fullWidth
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              margin="normal"
              variant="outlined"
              slotProps={{
                  input: {
                    sx: { color: '#F5F5F5' }
                  },
                  inputLabel: {
                    sx: { color: '#F5F5F5' }
              }}}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              slotProps={{
                  input: {
                    sx: { color: '#F5F5F5' }
                  },
                  inputLabel: {
                    sx: { color: '#F5F5F5' }
              }}}
            />
          </DialogContent>
          
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={handleClose} 
              disabled={loading}
              sx={{ 
                color: '#F5F5F5',
                '&:hover': { 
                  bgcolor: 'rgba(255, 255, 255, 0.05)' 
                }
              }}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              sx={{ 
                bgcolor: '#F95959', 
                color: '#F5F5F5',
                px: 3,
                py: 1,
                fontWeight: 500,
                '&:hover': { 
                  bgcolor: '#e54747' 
                }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={15} color="primary" sx={{ mr: 1 }} />
                  Creating...
                </>
              ) : (
                'Create'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      );

}

export default CreateSubProjectModal;