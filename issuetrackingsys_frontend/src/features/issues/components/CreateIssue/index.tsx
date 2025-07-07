import { useState, useEffect, type FormEvent } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Typography, Box, CircularProgress,
  FormControl, Select, MenuItem, OutlinedInput
} from "@mui/material";
import { IssueAPI, type Issue } from "../../services/IssueAPI";
import type { IssueStatus } from "../../../issueStatus/services/issueStatusService";
import type { IssuePriority } from "../../../issuePriorities/services/issuePriorityService";
import type { IssueType } from "../../../issueTypes/services/issueTypeService";
import type { User } from "../../../user/service/userService";
import { ErrorDisplay, LoadingIndicator } from "../../../../utils/commonFunctions";
import { styles } from "../styles/styles";

interface Props {
  open: boolean;
  onClose: () => void;
  onIssueCreated: (issue: Issue) => void;
  subprojectId: string;
  statuses: IssueStatus[];
  priorities: IssuePriority[];
  types: IssueType[];
  users: User[];
}

interface FormData {
  title: string;
  description: string;
  priorityId: number;
  statusId: number;
  typeId: number;
  assigneeId: string;
}

const CreateIssueModal = ({ open, onClose, onIssueCreated, subprojectId, statuses, priorities, types, users }: Props) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priorityId: 0,
    statusId: 0,
    typeId: 0,
    assigneeId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(prev => ({
        ...prev,
        statusId: statuses[0]?.id || 0,
        priorityId: priorities[0]?.id || 0,
        typeId: types[0]?.id || 0,
        assigneeId: users[0]?.id || ''
      }));
    }
  }, [open, statuses, priorities, types, users]);

  const handleClose = () => {
    setFormData({ title: '', description: '', priorityId: 0, statusId: 0, typeId: 0, assigneeId: '' });
    setError('');
    onClose();
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { title, description, priorityId, statusId, typeId, assigneeId } = formData;
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription || !priorityId || !statusId || !typeId || !assigneeId) {
      setError('All required fields must be filled');
      return;
    }

    if (!userId) {
      setError('User authentication required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const issue = await IssueAPI.createIssue(subprojectId, {
        title: trimmedTitle,
        description: trimmedDescription,
        priorityId, statusId, typeId,
        reporterId: userId,
        assigneeId
      });
      
      handleClose();
      onIssueCreated(issue);
    } catch (error: any) {
      setError(error.message || 'Failed to create issue');
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (label: string, content: React.ReactNode) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={styles.fieldLabel}>
        {label}
      </Typography>
      {content}
    </Box>
  );

  const renderPriorityOption = (priority: IssuePriority) => (
    <MenuItem key={priority.id} value={priority.id}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: priority.color, mr: 1 }} />
        <Typography>{priority.name}</Typography>
      </Box>
    </MenuItem>
  );

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="md"
      slotProps={{
        paper: {
          elevation: 8,
          sx: {
            bgcolor: '#1E293B',
            borderRadius: 3,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
          }
        }
      }}
      aria-labelledby="create-issue-title"
    >
      <DialogTitle id="create-issue-title" sx={styles.dialogTitle}>
        Create New Issue
      </DialogTitle>
      
      <DialogContent sx={{ py: 2 }}>
        <ErrorDisplay error={error} />
        
        {renderFormField("Issue Title*", 
          <OutlinedInput
            autoFocus
            fullWidth
            placeholder="Concise description of the issue"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            sx={styles.input}
            aria-required="true"
          />
        )}
        
        {renderFormField("Description*", 
          <OutlinedInput
            fullWidth
            multiline
            rows={4}
            placeholder="Detailed explanation of the issue"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            sx={styles.input}
            aria-required="true"
          />
        )}
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <Box sx={styles.selectField}>
            <Typography variant="subtitle1" sx={styles.fieldLabel}>
              Priority*
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.priorityId}
                onChange={(e) => handleChange('priorityId', e.target.value as number)}
                renderValue={(selected) => {
                  const selectedPriority = priorities.find(p => p.id === selected);
                  if (!selectedPriority) return 'Select priority';
                  
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: selectedPriority.color, mr: 1 }} />
                      <Typography>{selectedPriority.name}</Typography>
                    </Box>
                  );
                }}
                sx={styles.select}
                aria-required="true"
              >
                {priorities.map(renderPriorityOption)}
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={styles.selectField}>
            <Typography variant="subtitle1" sx={styles.fieldLabel}>
              Status*
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.statusId}
                onChange={(e) => handleChange('statusId', e.target.value as number)}
                sx={styles.select}
                aria-required="true"
              >
                {statuses.map(status => (
                  <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={styles.selectField}>
            <Typography variant="subtitle1" sx={styles.fieldLabel}>
              Issue Type*
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.typeId}
                onChange={(e) => handleChange('typeId', e.target.value as number)}
                sx={styles.select}
                aria-required="true"
              >
                {types.map(type => (
                  <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        {renderFormField("Assignee*", 
          <FormControl fullWidth required>
            <Select
              value={formData.assigneeId}
              onChange={(e) => handleChange('assigneeId', e.target.value as string)}
              renderValue={(selected) => {
                const selectedUser = users.find(u => u.id === selected);
                return selectedUser ? selectedUser.username : 'Select assignee';
              }}
              sx={styles.select}
              aria-required="true"
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  <Typography>{user.username}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2}}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          variant="outlined"
          sx={styles.secondaryButton}>
          Cancel
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
          sx={styles.primaryButton}>
          {loading ? 'Creating...' : 'Create Issue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateIssueModal;