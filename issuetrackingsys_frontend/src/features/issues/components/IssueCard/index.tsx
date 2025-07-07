import React from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  IconButton, 
  Card,
  CardContent
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import type { Issue } from '../../services/IssueAPI';

interface Props {
  issue: Issue;
  onClick?: (issueId: string) => void;
  onMoreClick?: (event: React.MouseEvent, issueId: string) => void;
}

const IssueCard = ({ issue, onClick, onMoreClick } : Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick(issue.id);
    }
  };
  
  const handleMoreClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onMoreClick) {
      onMoreClick(event, issue.id);
    }
  };
  
  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 2,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <CardContent sx={{ 
        p: 3,
        '&:last-child': { pb: 3 }
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ color: '#F1F5F9', fontWeight: 500 }}>
              {issue.title}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={issue.issueStatus.name}
              size="small"
              sx={{ 
                bgcolor: 'rgba(96, 165, 250, 0.1)',
                color: '#60A5FA',
                borderRadius: '4px',
                textTransform: 'capitalize'
              }}
            />
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor: `${issue.issuePriority.color}20`,
              }}
            >
              <Box 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: issue.issuePriority.color,
                  mr: 1
                }} 
              />
              <Typography 
                variant="caption"
                sx={{ 
                  color: issue.issuePriority.color,
                  fontWeight: 500,
                  textTransform: 'capitalize'
                }}
              >
                {issue.issuePriority.name}
              </Typography>
            </Box>
            
            <IconButton 
              size="small" 
              sx={{ color: '#94A3B8' }}
              onClick={handleMoreClick}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#94A3B8',
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {issue.description}
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 1,
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={issue.issueType.name}
              size="small"
              sx={{ 
                height: 20,
                fontSize: '0.625rem',
                bgcolor: 'rgba(96, 165, 250, 0.1)',
                color: '#93C5FD',
              }}
            />
            
            <Typography 
              variant="caption" 
              sx={{ color: '#64748B' }}
            >
              Reported by: {issue.reporter.username}
            </Typography>
          </Box>
          
          {issue.assignee ? (
            <Typography 
              variant="caption" 
              sx={{ color: '#64748B' }}
            >
              Assigned to: {issue.assignee.username}
            </Typography>
          ) : (
            <Chip
              label="Unassigned"
              size="small"
              sx={{ 
                height: 20,
                fontSize: '0.625rem',
                bgcolor: 'rgba(100, 116, 139, 0.1)',
                color: '#94A3B8',
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default IssueCard;