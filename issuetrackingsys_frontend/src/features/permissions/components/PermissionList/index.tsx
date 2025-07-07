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
import { ErrorDisplay, LoadingIndicator, EmptyState } from "../../../../utils/commonFunctions";
import { useModal } from '../../../../utils/hooks';

function PermissionList() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const createModal = useModal();
  const editModal = useModal();
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
    createModal.openModal();
  };

  const handlePermissionCreated = (permission: Permission) => {
    setPermissions([...permissions, permission]);
  };

  const handleEditPermission = (permission: Permission) => {
    setSelectedPermission(permission);
    editModal.openModal();
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
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="perm-container">
      <Typography variant="h4" component="h1" className="perm-title">
        Permission Management
      </Typography>

      <div className="perm-header-container">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreatePermission}
          className="perm-create-btn"
        >
          Add New Permission
        </Button>
      </div>

      <TableContainer component={Paper} className="perm-table-container">
        <Table sx={{ minWidth: 650 }} aria-label="permissions table">
          <TableHead>
            <TableRow>
              <TableCell className="perm-table-header">Permission Name</TableCell>
              <TableCell className="perm-table-header">Description</TableCell>
              <TableCell className="perm-table-header" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.length === 0 ? (
              <TableRow>
                <TableCell className="perm-table-cell" colSpan={3} align="center"><EmptyState message="No permissions found" /></TableCell>
              </TableRow>
            ) : (
              permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="perm-table-cell">{permission.name}</TableCell>
                  <TableCell className="perm-table-cell">{permission.description}</TableCell>
                  <TableCell className="perm-table-cell" align="right">
                    <Button size="small" className="perm-edit-btn" onClick={() => handleEditPermission(permission)}>
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
        open={createModal.open}
        onClose={createModal.closeModal}
        onPermissionCreated={handlePermissionCreated}
      />

      {selectedPermission && (
        <EditPermissionModal
          open={editModal.open}
          onClose={editModal.closeModal}
          permission={selectedPermission}
          onPermissionUpdated={handlePermissionUpdated}
          onPermissionDeleted={handlePermissionDeleted}
        />
      )}
    </div>
  );
}

export default PermissionList;