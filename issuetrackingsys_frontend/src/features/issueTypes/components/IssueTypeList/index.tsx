import { useEffect, useState } from "react";
import "./styles.css";
import { IssueTypeAPI, type IssueType } from "../../services/issueTypeService";
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
import CreateIssueTypeModal from "../CreateIssueType";
import EditIssueTypeModal from "../EditIssueType";
import { ErrorDisplay, LoadingIndicator, EmptyState } from "../../../../utils/commonFunctions";
import { useModal } from '../../../../utils/hooks';

function IssueTypeList() {
  const [types, setTypes] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const createModal = useModal();
  const editModal = useModal();
  const [selectedType, setSelectedType] = useState<IssueType | null>(null);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const fetchedTypes = await IssueTypeAPI.getAllIssueTypes();
      setTypes(fetchedTypes);
    } catch (error: any) {
      setError(error.message || "Failed to fetch issue types");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateType = () => {
    createModal.openModal();
  };

  const handleTypeCreated = (type: IssueType) => {
    setTypes(prevTypes => [...prevTypes, type]);
  };

  const handleEditType = (type: IssueType) => {
    setSelectedType(type);
    editModal.openModal();
  };

  const handleTypeUpdated = (updated: IssueType) => {
    setTypes(prevTypes => 
      prevTypes.map(type => type.id === updated.id ? updated : type)
    );
  };

  const handleTypeDeleted = (id: number) => {
    setTypes(prevTypes => prevTypes.filter(type => type.id !== id));
  };

  if (loading && types.length === 0) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <Container className="it-container">
      <Typography 
        variant="h4" 
        component="h1" 
        className="it-title"
      >
        Issue Type Management
      </Typography>

      <Box className="it-header-container">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateType}
          className="it-create-btn"
        >
          Add New Type
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        className="it-table-container"
      >
        <Table sx={{ minWidth: 650 }} aria-label="issue types table">
          <TableHead>
            <TableRow>
              <TableCell className="it-table-header">
                Name
              </TableCell>
              <TableCell className="it-table-header">
                Description
              </TableCell>
              <TableCell 
                align="right"
                className="it-table-header"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.length === 0 ? (
              <TableRow>
                <TableCell className="it-table-cell" colSpan={3} align="center"><EmptyState message="No issue types found" /></TableCell>
              </TableRow>
            ) : (
              types.map((type) => (
                <TableRow key={type.id}>
                  <TableCell className="it-table-cell">
                    {type.name}
                  </TableCell>
                  <TableCell className="it-table-cell">
                    {type.description}
                  </TableCell>
                  <TableCell 
                    align="right"
                    className="it-table-cell"
                  >
                    <Button
                      size="small"
                      onClick={() => handleEditType(type)}
                      className="it-edit-btn"
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

      <CreateIssueTypeModal
        open={createModal.open}
        onClose={createModal.closeModal}
        onTypeCreated={handleTypeCreated}
      />

      {selectedType && (
        <EditIssueTypeModal
          open={editModal.open}
          onClose={editModal.closeModal}
          type={selectedType}
          onTypeUpdated={handleTypeUpdated}
          onTypeDeleted={handleTypeDeleted}
        />
      )}
    </Container>
  );
}

export default IssueTypeList;