import { Box, CircularProgress, Paper, Typography} from "@mui/material";
import { useState } from "react";

/**
 * Error display component used across forms
 */
export function ErrorDisplay({ error }: { error: string }) {
  if (!error) return null;
  
  return (
    <Paper elevation={5} sx={{ 
      bgcolor: 'rgba(239, 68, 68, 0.15)', 
      color: '#EF4444', 
      p: 2, 
      borderRadius: 2,
      mb: 3,
      border: '1px solid rgba(239, 68, 68, 0.3)'
    }}>
      <Typography variant="body2">{error}</Typography>
    </Paper>
  );
}

/**
 * Loading indicator component
 */
export function LoadingIndicator() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress sx={{ color: '#4ECDC4' }} size={60} />
    </Box>
  );
}

/**
 * Empty state display component for lists and tables
 */
export function EmptyState({ message }: { message: string }) {
  return (
    <Box sx={{ textAlign: 'center', color: '#94A3B8', my: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {message}
      </Typography>
    </Box>
  );
}