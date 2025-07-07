import { useEffect, useState } from "react";
import "./styles.css";
import { RoleAPI, type UserRole } from "../../services/roleService";
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
import CreateRoleModal from "../CreateRole";
import EditRoleModal from "../EditRole";
import RolePermissions from "../RolePermissions";
import { ErrorDisplay, LoadingIndicator, EmptyState } from "../../../../utils/commonFunctions";
import { useModal } from '../../../../utils/hooks';

function RoleList() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const createModal = useModal();
  const editModal = useModal();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [permissionsRole, setPermissionsRole] = useState<UserRole | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const fetchedRoles = await RoleAPI.getAllRoles();
      setRoles(fetchedRoles);
    } catch (error: any) {
      setError(error.message || "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = () => {
    createModal.openModal();
  };

  const handleRoleCreated = (role: UserRole) => {
    setRoles(prevRoles => [...prevRoles, role]);
  };

  const handleEditRole = (role: UserRole) => {
    setSelectedRole(role);
    editModal.openModal();
  };

  const handleManagePermissions = (role: UserRole) => {
    setPermissionsRole(role);
    setIsPermissionsModalOpen(true);
  }

  const handleRoleUpdated = (updated: UserRole) => {
    setRoles(prevRoles => 
      prevRoles.map(role => role.id === updated.id ? updated : role)
    );
  };

  const handleRoleDeleted = (id: number) => {
    setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
  };

  if (loading && roles.length === 0) {
    return <LoadingIndicator/>;
  }

  if (error) {
    return <ErrorDisplay error={error}/>;
  }

  return (
    <div className="role-container">
      <Typography variant="h4" component="h1" className="role-title">
        Role Management
      </Typography>

      <div className="role-header-container">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateRole}
          className="role-create-btn"
        >
          Add New Role
        </Button>
      </div>

      <TableContainer component={Paper} className="role-table-container">
        <Table sx={{ minWidth: 650 }} aria-label="roles table">
          <TableHead>
            <TableRow>
              <TableCell className="role-table-header">Role Name</TableCell>
              <TableCell className="role-table-header">Description</TableCell>
              <TableCell className="role-table-header" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.length === 0 ? (
              <TableRow>
                <TableCell className="role-table-cell" colSpan={3} align="center"><EmptyState message="No roles found" /></TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="role-table-cell">{role.role}</TableCell>
                  <TableCell className="role-table-cell">{role.description}</TableCell>
                  <TableCell className="role-table-cell" align="right">
                    <Button
                      size="small"
                      className="role-edit-btn"
                      onClick={() => handleEditRole(role)}
                    >Edit
                    </Button>
                    <Button 
                      size="small" 
                      className="role-permissions-btn" 
                      onClick={() => handleManagePermissions(role)}
                    > Permissions
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateRoleModal
        open={createModal.open}
        onClose={createModal.closeModal}
        onRoleCreated={handleRoleCreated}
      />

      {selectedRole && (
        <EditRoleModal
          open={editModal.open}
          onClose={editModal.closeModal}
          role={selectedRole}
          onRoleUpdated={handleRoleUpdated}
          onRoleDeleted={handleRoleDeleted}
        />
      )}

      {permissionsRole && (
        <RolePermissions
          open={isPermissionsModalOpen}
          onClose={() => setIsPermissionsModalOpen(false)}
          role={permissionsRole}
          onRoleUpdated={handleRoleUpdated}
        />
      )}
    </div>
  );
}

export default RoleList;