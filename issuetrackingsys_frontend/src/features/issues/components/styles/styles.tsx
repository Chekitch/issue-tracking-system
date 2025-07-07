import { Box, MenuItem, Typography } from "@mui/material";
import type { IssuePriority } from "../../../issuePriorities/services/issuePriorityService";

export const styles = {
  input: { 
    color: '#F1F5F9',
    bgcolor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 2,
    '& .MuiOutlinedInput-root': { 
      color: '#F5F5F5',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&.Mui-focused fieldset': { borderColor: '#60A5FA' }
    }
  },
  select: { 
    color: '#F1F5F9',
    bgcolor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 2,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.1)'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#60A5FA'
    }
  },
  fieldLabel: { 
    mb: 1, 
    color: '#94A3B8', 
    fontWeight: 500 
  },
  dialogTitle: {
    color: '#F5F5F5',
    pt: 3, pb: 2,
    fontSize: '1.75rem',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  primaryButton: {
    bgcolor: '#2563EB', 
    color: '#fff',
    px: 3, py: 1, 
    fontWeight: 600,
    '&:hover': { bgcolor: '#1D4ED8' }
  },
  secondaryButton: {
    color: '#94A3B8',
    borderColor: 'rgba(148, 163, 184, 0.5)',
    '&:hover': { 
      borderColor: '#94A3B8', 
      bgcolor: 'rgba(148, 163, 184, 0.08)' 
    }
  },
  dangerButton: {
    bgcolor: '#F95959', 
    color: '#F5F5F5',
    '&:hover': { bgcolor: '#e54747' }
  },
  selectField: {
    flex: 1,
    minWidth: { xs: '100%', sm: '200px' },
    mb: { xs: 3, sm: 0 }
  },
  dialogPaper: {
    elevation: 8,
    bgcolor: '#1E293B',
    borderRadius: 3,
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))'
  }
}
