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

function RoleList() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

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
    setIsCreateModalOpen(true);
  };

  const handleRoleCreated = (role: UserRole) => {
    setRoles([...roles, role]);
  };

  const handleEditRole = (role: UserRole) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleRoleUpdated = (updated: UserRole) => {
    setRoles(prevRoles => 
      prevRoles.map(role => role.id === updated.id ? updated : role)
    );
  };

  const handleRoleDeleted = (id: number) => {
    setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
  };

  if (loading && roles.length === 0) {
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
    <div className="roles-container">
      <Typography variant="h4" component="h1" className="page-title">
        Role Management
      </Typography>

      <div className="header-container">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateRole}
          className="create-role-btn"
        >
          Add New Role
        </Button>
      </div>

      <TableContainer component={Paper} className="role-table-container">
        <Table sx={{ minWidth: 650 }} aria-label="roles table">
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">No roles found</TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.role}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell align="right">
                    <Button size="small" className="edit-btn" onClick={() => handleEditRole(role)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateRoleModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onRoleCreated={handleRoleCreated}
      />

      {selectedRole && (
        <EditRoleModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          role={selectedRole}
          onRoleUpdated={handleRoleUpdated}
          onRoleDeleted={handleRoleDeleted}
        />
      )}
    </div>
  );
}

export default RoleList;