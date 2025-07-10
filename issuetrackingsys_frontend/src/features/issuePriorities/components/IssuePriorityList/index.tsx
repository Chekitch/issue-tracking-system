import { useEffect, useState } from "react";
import "./styles.css";
import { IssuePriorityAPI, type IssuePriority } from "../../services/issuePriorityService";
import AddIcon from '@mui/icons-material/Add';
import { 
  Box, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography
} from "@mui/material";
import CreateIssuePriorityModal from "../CreateIssuePriority";
import EditIssuePriorityModal from "../EditIssuePriority";
import { ErrorDisplay, LoadingIndicator, EmptyState } from "../../../../utils/commonFunctions";
import { useModal } from '../../../../utils/hooks';

function IssuePriorityList() {
  const [priorities, setPriorities] = useState<IssuePriority[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const createModal = useModal();
  const editModal = useModal();
  const [selectedPriority, setSelectedPriority] = useState<IssuePriority | null>(null);

  useEffect(() => {
    fetchPriorities();
  }, []);

  const fetchPriorities = async () => {
    setLoading(true);
    try {
      const fetchedPriorities = await IssuePriorityAPI.getAllIssuePriorities();
      setPriorities(fetchedPriorities);
    } catch (err: any) {
      setError(err.message || "Failed to fetch priorities");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePriority = () => {
    createModal.openModal();
  };

  const handlePriorityCreated = (priority: IssuePriority) => {
    setPriorities(prevPriorities => [...prevPriorities, priority]);
  };

  const handleEditPriority = (priority: IssuePriority) => {
    setSelectedPriority(priority);
    editModal.openModal();
  };

  const handlePriorityUpdated = (updated: IssuePriority) => {
    setPriorities(prevPriorities => 
      prevPriorities.map(priority => priority.id === updated.id ? updated : priority)
    );
  };

  const handlePriorityDeleted = (id: number) => {
    setPriorities(prevPriorities => prevPriorities.filter(priority => priority.id !== id));
  };

  if (loading && priorities.length === 0) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="ip-container">
      <Typography variant="h4" component="h1" className="ip-title">
        Issue Priority Management
      </Typography>

      <Box className="ip-header-container">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreatePriority}
          className="ip-create-btn"
        >
          Add New Priority
        </Button>
      </Box>

      <TableContainer component={Paper} className="ip-table-container">
        <Table sx={{ minWidth: 650 }} aria-label="priorities table">
          <TableHead>
            <TableRow>
              <TableCell className="ip-table-header">Name</TableCell>
              <TableCell className="ip-table-header">Description</TableCell>
              <TableCell className="ip-table-header">Color</TableCell>
              <TableCell className="ip-table-header" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priorities.length === 0 ? (
              <TableRow>
                <TableCell className="ip-table-cell" colSpan={4} align="center"><EmptyState message="No priorities found" /></TableCell>
              </TableRow>
            ) : (
              priorities.map((priority) => (
                <TableRow key={priority.id}>
                  <TableCell className="ip-table-cell">{priority.name}</TableCell>
                  <TableCell className="ip-table-cell">{priority.description}</TableCell>
                  <TableCell className="ip-table-cell">
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: priority.color 
                        }} 
                      />
                      <span>{priority.color}</span>
                    </Box>
                  </TableCell>
                  <TableCell className="ip-table-cell" align="right">
                    <Button
                      size="small"
                      className="ip-edit-btn"
                      onClick={() => handleEditPriority(priority)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateIssuePriorityModal
        open={createModal.open}
        onClose={createModal.closeModal}
        onPriorityCreated={handlePriorityCreated}
      />

      {selectedPriority && (
        <EditIssuePriorityModal
          open={editModal.open}
          onClose={editModal.closeModal}
          priority= {selectedPriority}
          onPriorityUpdated={handlePriorityUpdated}
          onPriorityDeleted={handlePriorityDeleted}
        />
      )}
    </div>
  );
}

export default IssuePriorityList;