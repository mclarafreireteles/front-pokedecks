import { useEffect, useState } from 'react';
import * as cardService from '../../../services/cardService';
import { Navbar } from '../../../components/Navbar/Navbar';
import { Footer } from '../../../components/Footer/Footer';
import { CardFormDialog } from '../CardFormDialog/CardFormDialog';
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
  Chip,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { FiEdit, FiTrash2, FiPlus, FiAlertCircle } from 'react-icons/fi';

export function Cards() {
  const { showNotification } = useNotification();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    setIsLoading(true);
    try {
      const data = await cardService.getAllCards();
      setCards(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedCard(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = async (cardId) => {
    setIsFetchingDetails(true);
    try {
      const fullCardData = await cardService.getCardById(cardId);

      setSelectedCard(fullCardData);

      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching card details:', error);
      showNotification('Could not load data for editing.', 'error');
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleSaveFromModal = async (formData, isEditing) => {
    try {
      if (isEditing) {
        await cardService.updateCard(formData.id, formData);
        showNotification('Card updated!', 'success');
      } else {
        await cardService.createCard(formData);
        showNotification('Card created!', 'success');
      }
      setIsModalOpen(false);
      loadCards();
    } catch (error) {
      console.error(error);
      showNotification('Error saving.', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      try {
        await cardService.deleteCard(id);
        setCards((prev) => prev.filter((c) => c.id !== id));
      } catch {
        showNotification('Error deleting', 'error');
      }
    }
  };

  return (
    <main>
      <Navbar isLogged={true} />
      <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            Manage Cards
          </Typography>
          <Button variant="contained" startIcon={<FiPlus />} onClick={handleOpenCreate}>
            New Card
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
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((card) => (
                  <TableRow key={card.id} hover>
                    <TableCell>
                      <img
                        src={card.imageUrl ? `${card.imageUrl}/high.webp` : ''}
                        style={{ width: 40 }}
                        alt=""
                      />
                    </TableCell>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.id}</TableCell>
                    <TableCell>{card.stockQuantity}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEdit(card.id)}
                        disabled={isFetchingDetails}
                      >
                        <FiEdit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(card.id, card.name)}>
                        <FiTrash2 />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <CardFormDialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFromModal}
          cardToEdit={selectedCard}
        />
      </Container>
      <Footer />
    </main>
  );
}
