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
  },
  sectionHeaderStyles: {
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      mb: 1,
      mt: 2
    },
    sectionTitle: {
      fontWeight: 'bold',
      color: '#F5F5F5',
    },
  },
}

export const stylesIssueDetailsPage = {
  container: {
    maxWidth: '100%', 
    bgcolor: '#1E293B',
    borderRadius: 2, 
    boxShadow: 1,
    color: '#F5F5F5'
  },
  header: {
    p: 2, 
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
  },
  breadcrumbLink: {
    color: '#94A3B8'
  },
  titleText: {
    color: '#F5F5F5', 
    fontWeight: 600
  },
  outlinedButton: {
    color: '#94A3B8',
    borderColor: 'rgba(148, 163, 184, 0.5)',
    '&:hover': { 
      borderColor: '#94A3B8', 
      bgcolor: 'rgba(148, 163, 184, 0.08)' 
    }
  },
  primaryButton: {
    bgcolor: '#2563EB', 
    color: '#fff',
    '&:hover': { bgcolor: '#1D4ED8' }
  },
  contentColumn: {
    p: 2,
    color: '#F5F5F5'
  },
  rightColumn: {
    p: 2, 
    borderLeft: '1px solid rgba(255, 255, 255, 0.08)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    mb: 1
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#F5F5F5'
  },
  labelText: {
    color: '#94A3B8'
  },
  valueText: {
    color: '#F1F5F9'
  },
  tabButton: (isActive: boolean) => ({
    mr: 2,
    pb: 1,
    color: isActive ? '#60A5FA' : '#94A3B8',
    borderBottom: isActive ? 2 : 0,
    borderColor: '#60A5FA',
    borderRadius: 0
  }),
  commentField: { 
    mb: 2,
    '& .MuiOutlinedInput-root': { 
      color: '#F5F5F5',
      bgcolor: 'rgba(255, 255, 255, 0.03)',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
      '&.Mui-focused fieldset': { borderColor: '#60A5FA' }
    }
  },
  commentItem: {
    px: 0,
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    py: 2
  },
  commentAuthor: {
    color: '#F1F5F9'
  },
  commentDate: {
    color: '#94A3B8'
  },
  commentContent: {
    whiteSpace: 'normal', 
    color: '#E2E8F4',
  
  },
  avatar: {
    bgcolor: '#2563EB'
  },
  smallAvatar: {
    width: 24, 
    height: 24, 
    mr: 1, 
    fontSize: '0.75rem', 
    bgcolor: '#2563EB'
  },
  emptyState: {
    p: 2, 
    textAlign: 'center', 
    bgcolor: 'rgba(255, 255, 255, 0.03)', 
    borderRadius: 1
  }
};