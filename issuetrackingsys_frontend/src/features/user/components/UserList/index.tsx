import { useEffect, useState } from "react"
import "./styles.css"
import { UserAPI, type User } from "../../service/userService";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CreateUserModal from "../CreateUser";
import EditUserModal from "../EditUser";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { logout } from "../../../../core/auth/store/authSlice";

function UserList(){
    const[users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const userId = useAppSelector(store => store.auth.userId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchUsers();
    },[]);

    const fetchUsers = async () => {
        setLoading(true);
        try{
            const fetchingUsers = await UserAPI.getAllUsers();
            console.log(fetchingUsers);
            setUsers(fetchingUsers);
        } catch (error: any){
            setError(error.message || "Failed to fetch users");
        } finally{
            setLoading(false);
        }
    }

    const handleCreateUser = () => {
        setIsCreateModalOpen(true);
    }
    const handleUserCreated = (user: User) => {
        setUsers([...users, user]);
    }

    const handleEditUser = (user: User) => {
      setSelectedUser(user);
      setIsEditModalOpen(true);
    }

    const handleUserUpdated = (updated : User) => {
      if(updated.id === userId) dispatch(logout());
      setUsers(previousUsers => previousUsers.map(user=> user.id === updated.id ? updated : user));
    }

    const handleUserDeleted = (id: string) => {
      setUsers(previousUsers => previousUsers.filter(user=>user.id !== id));
    }


    if(loading){
        return (
            <Box className="loading-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress sx={{ color: '#4ECDC4' }} size={60} />
            </Box>
        );
    }

    if(error){
        return <div className="error">{error}</div>;
    }

    return (
        <div className='users-container'>
            <Typography variant="h4" component="h1" className="page-title">
                User Management
            </Typography>

        <div className='header-container'>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateUser}
                className='create-user-btn'
            >
                Add New User
            </Button>
      </div>

      <TableContainer component={Paper} className="user-table-container">
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No users found</TableCell>
              </TableRow>
            ) : (
              users.map((user : User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  {user.role === null ? (
                    <TableCell>Null</TableCell>
                  ) : (
                    <TableCell>{user.role.role}</TableCell>
                  )}
                  <TableCell align="right">
                    <Button size="small" className="edit-btn" onClick={() => handleEditUser(user)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateUserModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onUserCreated={handleUserCreated}
      />

      {selectedUser && (
        <EditUserModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
    )
}

export default UserList