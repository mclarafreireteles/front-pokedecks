import React, { useState, useEffect } from 'react';
import { Navbar } from '../../../components/Navbar/Navbar';
import { Footer } from '../../../components/Footer/Footer';
import * as setService from '../../../services/setService'; // Importando o novo serviço
import { useNotification } from '../../../contexts/NotificationContext';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function Orders() {
  const { showNotification } = useNotification();
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const open = Boolean(anchorEl);

  // Busca os dados reais da API ao carregar a página
  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    setIsLoading(true);
    try {
      const data = await setService.getAllSets();
      setCollections(data);
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await setService.deleteSet(selectedRowId);
        setCollections((prev) => prev.filter((item) => item.id !== selectedRowId));
        handleMenuClose();
      } catch (err) {
        console.error('Error deleting collection:', err);
        showNotification('Error deleting collection.', 'error');
      }
    }
  };

  return (
    <main>
      <Navbar isLogged={true} />
      <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto', minHeight: '80vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            Collections
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#2563EB',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#1d4ed8', boxShadow: 'none' },
            }}
            onClick={() => console.log('Open creation modal')}
          >
            Add Collection
          </Button>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" py={10}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: '1px solid #E0E0E0', borderRadius: 3, overflow: 'hidden' }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#FAFAFA' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>
                    Collection Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Description</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {collections.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ color: '#424242' }}>{row.id}</TableCell>
                    <TableCell sx={{ color: '#424242', fontWeight: 500 }}>{row.name}</TableCell>
                    <TableCell sx={{ color: '#757575' }}>
                      {row.description || 'No description'}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuClick(e, row.id)}>
                        <MoreHorizIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Actions Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={() => console.log('Edit', selectedRowId)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Footer />
    </main>
  );
}
