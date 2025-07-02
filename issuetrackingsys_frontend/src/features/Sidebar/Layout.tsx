import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 200;

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar drawerWidth={DRAWER_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          padding: 3,
          overflow: 'auto'
        }}
      >
        <Box 
          sx={{ 
            maxWidth: { xs: '100%', lg: '1400px' },
            mx: 'auto' 
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;