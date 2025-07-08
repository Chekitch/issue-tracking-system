import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { IssueAPI, type Issue } from '../../services/issueService';
import { IssueStatusAPI, type IssueStatus } from '../../../issueStatus/services/issueStatusService';
import { IssuePriorityAPI, type IssuePriority } from '../../../issuePriorities/services/issuePriorityService';
import { IssueTypeAPI, type IssueType } from '../../../issueTypes/services/issueTypeService';
import { UserAPI, type User } from '../../../user/service/userService';
import EditIssueModal from '../EditIssue';
import { ErrorDisplay, LoadingIndicator } from '../../../../utils/commonFunctions';

const EditIssuePageWrapper = () => {
  const { issueId, projectId } = useParams<{ issueId: string; projectId: string }>();
  const navigate = useNavigate();
  
  const [issue, setIssue] = useState<Issue | null>(null);
  const [statuses, setStatuses] = useState<IssueStatus[]>([]);
  const [priorities, setPriorities] = useState<IssuePriority[]>([]);
  const [types, setTypes] = useState<IssueType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!issueId) {
        setError('No issue ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [issueData, statusesData, prioritiesData, typesData, usersData] = await Promise.all([
          IssueAPI.getIssueById(issueId),
          IssueStatusAPI.getAllIssueStatuses(),
          IssuePriorityAPI.getAllIssuePriorities(),
          IssueTypeAPI.getAllIssueTypes(),
          UserAPI.getAllUsers()
        ]);
        
        setIssue(issueData);
        setStatuses(statusesData);
        setPriorities(prioritiesData);
        setTypes(typesData);
        setUsers(usersData);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [issueId]);

  const handleClose = () => {
    navigate(`/subprojects/${projectId}/issues/${issueId}`);
  };

  const handleIssueUpdated = (updatedIssue: Issue) => {
    navigate(`/subprojects/${projectId}/issues/${issueId}`);
  };

  const handleIssueDeleted = (deletedIssueId: string) => {
    navigate(`/subprojects/${projectId}/issues`);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error || !issue) {
    return <ErrorDisplay error={error || 'Issue not found'} />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <EditIssueModal
        open={true}
        onClose={handleClose}
        issue={issue}
        statuses={statuses}
        priorities={priorities}
        types={types}
        users={users}
        onIssueUpdated={handleIssueUpdated}
        onIssueDeleted={handleIssueDeleted}
      />
    </Box>
  );
};

export default EditIssuePageWrapper;