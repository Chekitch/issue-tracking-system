import { useEffect, useState } from "react";
import "./styles.css";
import { PermissionAPI, type Permission } from "../../services/permissionService";
import AddIcon from '@mui/icons-material/Add';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from "@mui/material";
import CreatePermissionModal from "../CreatePermission";
import EditPermissionModal from "../EditPermission";

function PermissionList() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const fetchedPermissions = await PermissionAPI.getAllPermissions();
      setPermissions(fetchedPermissions);
    } catch (error: any) {
      setError(error.message || "Failed to fetch permissions");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePermission = () => {
    setIsCreateModalOpen(true);
  };

  const handlePermissionCreated = (permission: Permission) => {
    setPermissions([...permissions, permission]);
  };

  const handleEditPermission = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsEditModalOpen(true);
  };

  const handlePermissionUpdated = (updated: Permission) => {
    setPermissions(prevPermissions => 
      prevPermissions.map(permission => 
        permission.id === updated.id ? updated : permission
      )
    );
  };

  const handlePermissionDeleted = (id: number) => {
    setPermissions(prevPermissions => 
      prevPermissions.filter(permission => permission.id !== id)
    );
  };

  if (loading && permissions.length === 0) {
    return (
      <Box className="loading-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#4ECDC4' }} size={60} />
      </Box>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="permissions-container">
      <Typography variant="h4" component="h1" className="page-title">
        Permission Management
      </Typography>

      <div className="header-container">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreatePermission}
          className="create-permission-btn"
        >
          Add New Permission
        </Button>
      </div>

      <TableContainer component={Paper} className="permission-table-container">
        <Table sx={{ minWidth: 650 }} aria-label="permissions table">
          <TableHead>
            <TableRow>
              <TableCell>Permission Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">No permissions found</TableCell>
              </TableRow>
            ) : (
              permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell align="right">
                    <Button size="small" className="edit-btn" onClick={() => handleEditPermission(permission)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreatePermissionModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPermissionCreated={handlePermissionCreated}
      />

      {selectedPermission && (
        <EditPermissionModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          permission={selectedPermission}
          onPermissionUpdated={handlePermissionUpdated}
          onPermissionDeleted={handlePermissionDeleted}
        />
      )}
    </div>
  );
}

export default PermissionList;