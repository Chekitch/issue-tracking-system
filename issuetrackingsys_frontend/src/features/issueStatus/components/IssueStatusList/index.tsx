import { useEffect, useState } from "react";
import "./styles.css";
import { IssueStatusAPI, type IssueStatus } from "../../services/issueStatusService";
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
  Typography,
  Container
} from "@mui/material";
import CreateIssueStatusModal from "../CreateIssueStatus";
import EditIssueStatusModal from "../EditIssueStatus";
import { ErrorDisplay, LoadingIndicator, EmptyState } from "../../../../utils/commonFunctions";
import { useModal } from '../../../../utils/hooks';

function IssueStatusList() {
  const [statuses, setStatuses] = useState<IssueStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const createModal = useModal();
  const editModal = useModal();
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | null>(null);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    setLoading(true);
    try {
      const fetchedStatuses = await IssueStatusAPI.getAllIssueStatuses();
      setStatuses(fetchedStatuses);
    } catch (error: any) {
      setError(error.message || "Failed to fetch issue statuses");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStatus = () => {
    createModal.openModal();
  };

  const handleStatusCreated = (status: IssueStatus) => {
    setStatuses(prevStatuses => [...prevStatuses, status]);
  };

  const handleEditStatus = (status: IssueStatus) => {
    setSelectedStatus(status);
    editModal.openModal();
  };

  const handleStatusUpdated = (updated: IssueStatus) => {
    setStatuses(prevStatuses => 
      prevStatuses.map(status => status.id === updated.id ? updated : status)
    );
  };

  const handleStatusDeleted = (id: number) => {
    setStatuses(prevStatuses => prevStatuses.filter(status => status.id !== id));
  };

  if (loading && statuses.length === 0) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <Container className="is-container">
      <Typography 
        variant="h5" 
        component="h1" 
        className="is-title"
      >
        Issue Status Management
      </Typography>

      <Box className="is-header-container">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateStatus}
          className="is-create-btn"
        >
          Add New Status
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        className="is-table-container"
      >
        <Table sx={{ minWidth: 650 }} aria-label="issue statuses table">
          <TableHead>
            <TableRow>
              <TableCell className="is-table-header">
                Name
              </TableCell>
              <TableCell className="is-table-header">
                Description
              </TableCell>
              <TableCell 
                align="right"
                className="is-table-header"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statuses.length === 0 ? (
              <TableRow>
                <TableCell className="is-table-cell" colSpan={3} align="center"><EmptyState message="No issue statuses found" /></TableCell>
              </TableRow>
            ) : (
              statuses.map((status) => (
                <TableRow key={status.id}>
                  <TableCell className="is-table-cell">
                    {status.name}
                  </TableCell>
                  <TableCell className="is-table-cell">
                    {status.description}
                  </TableCell>
                  <TableCell 
                    align="right"
                    className="is-table-cell"
                  >
                    <Button
                      size="small"
                      onClick={() => handleEditStatus(status)}
                      className="is-edit-btn"
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

      <CreateIssueStatusModal
        open={createModal.open}
        onClose={createModal.closeModal}
        onStatusCreated={handleStatusCreated}
      />

      {selectedStatus && (
        <EditIssueStatusModal
          open={editModal.open}
          onClose={editModal.closeModal}
          status={selectedStatus}
          onStatusUpdated={handleStatusUpdated}
          onStatusDeleted={handleStatusDeleted}
        />
      )}
    </Container>
  );
}

export default IssueStatusList;