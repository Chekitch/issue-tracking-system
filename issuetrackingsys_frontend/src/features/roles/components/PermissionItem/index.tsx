import { Box, Checkbox, Typography } from "@mui/material";
import type { Permission } from "../../../permissions/services/permissionService";

interface Props {
  permission: Permission;
  isAssigned: boolean;
  onToggle: (permission: Permission) => void;
  disabled?: boolean;
}

const PermissionItem= ({ permission, isAssigned, onToggle, disabled = false } : Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        '&:last-child': {
          borderBottom: 'none'
        },
        '&:hover': {
          backgroundColor: 'rgba(78, 205, 196, 0.08)'
        }
      }}
    >
      <Box sx={{ flex: 1, mr: 2 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 600, 
            color: '#F5F5F5',
            mb: 0.5
          }}
        >
          {permission.name}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#E0E0E0',
            fontSize: '0.9rem'
          }}
        >
          {permission.description}
        </Typography>
      </Box>
      <Checkbox
        checked={isAssigned}
        onChange={() => onToggle(permission)}
        disabled={disabled}
        sx={{
          color: '#4ECDC4',
          '&.Mui-checked': {
            color: '#4ECDC4'
          }
        }}
      />
    </Box>
  );
};

export default PermissionItem;