import React, { useState, useEffect } from 'react';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton
} from '@mui/material';
import {
  Dashboard,
  Folder,
  ExpandLess,
  ExpandMore,
  People,
} from '@mui/icons-material';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../core/auth/store/authSlice';

interface MenuItem {
  id: string;
  text: string;
  icon: React.ReactNode;
  path: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { id: 'projects', text: 'Projects',  icon: <Folder />,    path: '/projects'  },
  { 
    id: 'users',
    text: 'Users',  
    icon: <People />,   
    path: '/users',
    children:[
      { id: 'roles', text: 'Roles', path: '/roles', icon: <SecurityIcon/>},
      { id: 'permissions', text: 'Permissions', path: '/permissions', icon: <LockIcon/>}
    ]
  },
];

interface SidebarProps {
  drawerWidth?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth = 240 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  
  useEffect(() => {
    const currentPath = location.pathname;
    
    menuItems.forEach(item => {
      if (item.children) {
        const childMatches = item.children.some(child => child.path === currentPath);
        
        if (childMatches || item.path === currentPath) {
          setOpenMenus(prev => ({...prev, [item.id]: true}));
        }
      }
    });

  }, [location.pathname]);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleSubmenu = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    setOpenMenus(prev => ({...prev, [itemId]: !prev[itemId]}));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#2C3E50',
          color: '#F5F5F5',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography variant="h6" component="div" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
          Issue Tracker
        </Typography>
      </Toolbar>
      
      <Box sx={{ overflow: 'auto', py: 2 }}>
        <List>
          {menuItems.map(item => (
            <React.Fragment key={item.id}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{ 
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                  borderRadius: '4px',
                  mx: 1,
                  bgcolor: location.pathname === item.path ? 'rgba(78, 205, 196, 0.1)' : 'transparent',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon sx={{ color: '#4ECDC4', minWidth: '40px' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </Box>
                
                {item.children && (
                  <IconButton 
                    size="small" 
                    onClick={(e) => toggleSubmenu(item.id, e)}
                    sx={{ color: '#4ECDC4' }}
>
                    {openMenus[item.id] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                )}
              </ListItemButton>
              
              {item.children && (
                <Collapse in={openMenus[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map(child => (
                      <ListItemButton
                        key={child.id}
                        component={Link}
                        to={child.path}
                        sx={{ 
                          pl: 4,
                          mx: 1,
                          borderRadius: '4px',
                          bgcolor: location.pathname === child.path ? 'rgba(78, 205, 196, 0.1)' : 'transparent',
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                        }}
                      >
                        <ListItemIcon sx={{ color: '#4ECDC4', minWidth: '40px' }}>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText primary={child.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
        
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{ 
                '&:hover': { bgcolor: 'rgba(249, 89, 89, 0.1)' },
                color: '#F95959',
              }}
            >
              <ListItemIcon sx={{ color: '#F95959' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;