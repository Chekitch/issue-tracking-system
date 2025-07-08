import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Stack,
  InputBase,
  Button
} from "@mui/material";
import { IssueAPI, type Issue } from "../../services/issueService";
import CreateIssueModal from "../CreateIssue";
import {Search as SearchIcon} from "@mui/icons-material";
import {Add as AddIcon } from "@mui/icons-material";

import IssueCard from "../IssueCard";
import { IssueStatusAPI, type IssueStatus } from "../../../issueStatus/services/issueStatusService";
import { IssuePriorityAPI, type IssuePriority } from "../../../issuePriorities/services/issuePriorityService";
import { IssueTypeAPI, type IssueType } from "../../../issueTypes/services/issueTypeService";
import { UserAPI, type User } from "../../../user/service/userService";
import EditIssueModal from "../EditIssue";
import { ErrorDisplay, LoadingIndicator, EmptyState } from "../../../../utils/commonFunctions";
import { useModal } from '../../../../utils/hooks';

const IssueList = () => {
    const { projectId : subprojectId } = useParams<{ projectId: string }>();
    
    const [issues, setIssues] = useState<Issue[]>([]);
    const [statuses, setStatuses] = useState<IssueStatus[]>([]);
    const [priorities, setPriorities] = useState<IssuePriority[]>([]);
    const [types, setTypes] = useState<IssueType[]>([]);
    const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const createModal = useModal();
    const editModal = useModal();
    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
    }, [subprojectId]);

    const fetchData = async () => {
        if (!subprojectId) {
            setError('No subproject ID provided');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const issuesResponse = await IssueAPI.getIssuesBySubProject(subprojectId);
            const statusesResponse = await IssueStatusAPI.getAllIssueStatuses();
            const prioritiesResponse = await IssuePriorityAPI.getAllIssuePriorities();
            const typesResponse = await IssueTypeAPI.getAllIssueTypes();
            const usersResponse = await UserAPI.getAllUsers();

            setIssues(issuesResponse);
            setStatuses(statusesResponse);
            setPriorities(prioritiesResponse);
            setTypes(typesResponse);
            setUsers(usersResponse);

            console.log(issuesResponse);
        } catch (error: any) {
            setError(error.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleIssueCreated = (issue: Issue) => {
        setIssues(prev => [issue,...prev]);
    };

    const handleIssueUpdated = (updatedIssue: Issue) => {
        setIssues(prev => prev.map(issue => 
            issue.id === updatedIssue.id ? updatedIssue : issue
        ));
    };

    const handleIssueDeleted = (issueId: string) => {
        setIssues(prev => prev.filter(issue => issue.id !== issueId));
    };

    const handleIssueClick = (issueId: string) => {
       navigate(`/subprojects/${subprojectId}/issues/${issueId}`);
    }
    const handleIssueMoreClick = (event: React.MouseEvent, issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
        if (issue) {
            setCurrentIssue(issue);
            editModal.openModal();
        }
    };

    const filteredIssues = issues.filter(issue => {
        if (!searchQuery) return true;
        
        const query = searchQuery.toLowerCase();

        return issue.title.toLowerCase().includes(query) || issue.description.toLowerCase().includes(query);
    });

    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <ErrorDisplay error={error} />;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3 
            }}>
                <Typography variant="h4" sx={{ color: '#F1F5F9', fontWeight: 600 }}>
                    Issues
                    <Typography 
                        component="span" 
                        variant="body1" 
                        sx={{ 
                            ml: 2,
                            color: '#94A3B8',
                            backgroundColor: 'rgba(148, 163, 184, 0.1)',
                            px: 2,
                            py: 0.5,
                            borderRadius: 5
                        }}
                    >
                        {issues.length} total
                    </Typography>
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Paper sx={{ 
                        p: '2px 4px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: 300,
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <IconButton sx={{ p: '10px', color: '#94A3B8' }}>
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: '#F1F5F9' }}
                            placeholder="Search issues"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Paper>
                    
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => createModal.openModal()}
                        sx={{ 
                            bgcolor: '#2563EB', 
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: 2,
                            '&:hover': { 
                                bgcolor: '#1D4ED8' 
                            }
                        }}
                    >
                        New Issue
                    </Button>
                </Box>
            </Box>
            
            {filteredIssues.length === 0 ? (
                <>
                  <EmptyState message="No issues found" />
                  {searchQuery ? (
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 3, textAlign: 'center' }}>
                      Try changing your search criteria
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="body2" sx={{ color: '#64748B', mb: 3, textAlign: 'center' }}>
                        Create your first issue to get started
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() => createModal.openModal()}
                          sx={{ 
                              color: '#60A5FA',
                              borderColor: 'rgba(96, 165, 250, 0.5)',
                              '&:hover': { 
                                  borderColor: '#60A5FA',
                                  bgcolor: 'rgba(96, 165, 250, 0.08)' 
                              }
                          }}
                        >
                          Create Issue
                        </Button>
                      </Box>
                    </>
                  )}
                </>
            ) : (
                <Stack spacing={2}>
                    {filteredIssues.map((issue) => (
                        <IssueCard
                            key={issue.id}
                            issue={issue}
                            onClick={(issueId) => {
                                handleIssueClick(issueId);
                            }}
                            onMoreClick={(event, issueId) => {
                                handleIssueMoreClick(event, issueId);
                            }}
                        />
                    ))}
                </Stack>
            )}
            
            {subprojectId && (
                <CreateIssueModal
                    open={createModal.open}
                    onClose={createModal.closeModal}
                    onIssueCreated={handleIssueCreated}
                    subprojectId={subprojectId}
                    statuses={statuses}
                    priorities={priorities}
                    types={types}
                    users={users}
                />
            )}

            {currentIssue && (
                <EditIssueModal
                    open={editModal.open}
                    onClose={editModal.closeModal}
                    issue={currentIssue}
                    onIssueUpdated={handleIssueUpdated}
                    onIssueDeleted={handleIssueDeleted}
                    statuses={statuses}
                    priorities={priorities}
                    types={types}
                    users={users}
                />
                )}

        </Box>
    );
};

export default IssueList;