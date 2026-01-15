import { useEffect, useState } from 'react';
import * as setService from '../../../services/setService';
import { Navbar } from '../../../components/Navbar/Navbar';
import { Footer } from '../../../components/Footer/Footer';
import { SetFormDialog } from './SetFormDialog';
import { useNotification } from '../../../contexts/NotificationContext';

import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export function Sets() {
  const { showNotification } = useNotification();
  const [sets, setSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = async () => {
    setIsLoading(true);
    try {
      const data = await setService.getAllSets();
      setSets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedSet(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = async (setId) => {
    setIsFetchingDetails(true);
    try {
      const fullSetData = await setService.getSetById(setId);

      setSelectedSet(fullSetData);

      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching set details:', error);
      showNotification('Error loading data for editing.', 'error');
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleSaveFromModal = async (formData, isEditing) => {
    try {
      if (isEditing) {
        await setService.updateSet(formData.id, formData);
        showNotification('Set updated!', 'success');
      } else {
        await setService.createSet(formData);
        showNotification('Set created!', 'success');
      }
      setIsModalOpen(false);
      loadSets();
    } catch (error) {
      console.error(error);
      showNotification('Error saving.', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete collection "${name}"?`)) {
      try {
        await setService.deleteSet(id);
        setSets((prev) => prev.filter((s) => s.id !== id));
      } catch (error) {
        console.error(error);
        showNotification('Error deleting (check if there are linked cards).', 'error');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US');
  };

  return (
    <main>
      <Navbar isLogged={true} />
      <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            Manage Sets
          </Typography>
          <Button variant="contained" startIcon={<FiPlus />} onClick={handleOpenCreate}>
            New Set
          </Button>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Release Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sets.map((set) => (
                  <TableRow key={set.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{set.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{set.id}</TableCell>
                    <TableCell>{formatDate(set.releaseDate)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEdit(set.id)}
                        disabled={isFetchingDetails}
                      >
                        <FiEdit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(set.id, set.name)}>
                        <FiTrash2 />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <SetFormDialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFromModal}
          setToEdit={selectedSet}
        />
      </Container>
      <Footer />
    </main>
  );
}
