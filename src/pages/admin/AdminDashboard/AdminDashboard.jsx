import { useEffect, useState } from 'react';
import * as orderService from '../../../services/orderService';
import * as reportService from '../../../services/reportService';
import { useNotification } from '../../../contexts/NotificationContext';

import { Navbar } from '../../../components/Navbar/Navbar';
import { Footer } from '../../../components/Footer/Footer';

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
  IconButton,
  Box,
  CircularProgress,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';

import { FiTrash2, FiEye, FiAlertCircle, FiTrendingUp, FiUsers } from 'react-icons/fi';

export function AdminDashboard() {
  const { showNotification } = useNotification();
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState({ outOfStock: [], revenue: null, customers: [] });
  const [isLoading, setIsLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const results = await Promise.allSettled([
        orderService.getAllOrders(),
        reportService.getOutOfStockReport(),
        reportService.getDailyRevenueReport(),
        reportService.getCustomerPurchasesReport(),
      ]);

      if (results[0].status === 'fulfilled') setOrders(results[0].value);

      setReports({
        outOfStock: results[1].status === 'fulfilled' ? results[1].value : [],
        revenue: results[2].status === 'fulfilled' ? results[2].value : { total: '0,00' },
        customers: results[3].status === 'fulfilled' ? results[3].value : [],
      });
    } catch (error) {
      console.error('Critical error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDetails = async (orderId) => {
    try {
      const details = await orderService.getOrderById(orderId);
      setSelectedOrder(details);
      setIsDetailsOpen(true);
    } catch (err) {
      console.error('Error fetching order details:', err);
      showNotification('Error fetching order details.', 'error');
    }
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm(`Do you really want to delete order #${id}?`)) {
      try {
        await orderService.deleteOrder(id);
        setOrders((prev) => prev.filter((o) => o.id !== id));
      } catch (err) {
        console.error('Error deleting order:', err);
        showNotification('Error deleting order.', 'error');
      }
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <main>
      <Navbar isLogged={true} />
      <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3} mb={6}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{ p: 3, borderRadius: 3, border: '1px solid #E0E0E0', height: '100%' }}
              elevation={0}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <FiTrendingUp size={24} color="#2563EB" />
                <Typography variant="h6" ml={1}>
                  Daily Revenue
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                R$ {reports.revenue?.total || '0,00'}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper
              sx={{ p: 3, borderRadius: 3, border: '1px solid #E0E0E0', height: '100%' }}
              elevation={0}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <FiAlertCircle size={24} color="#d32f2f" />
                <Typography variant="h6" ml={1}>
                  Out of Stock Products
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
                {reports.outOfStock.length > 0 ? (
                  reports.outOfStock.map((item) => (
                    <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
                      <Typography>{item.name}</Typography>
                      <Typography color="error" variant="body2" fontWeight="bold">
                        OUT OF STOCK
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="textSecondary">Everything in stock!</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 6 }} />

        <Typography variant="h5" fontWeight="bold" mb={3}>
          Manage Customer Orders
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, border: '1px solid #E0E0E0' }}
          elevation={0}
        >
          <Table>
            <TableHead sx={{ bgcolor: '#FAFAFA' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Total</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>#{order.id.substring(0, 8)}...</TableCell>
                    <TableCell>{order.user?.name || 'Customer'}</TableCell>
                    <TableCell>{new Date(order.orderTime).toLocaleDateString('en-US')}</TableCell>
                    <TableCell>
                      {order.totalPrice.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDetails(order.id)}
                        title="View Details"
                      >
                        <FiEye />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteOrder(order.id)}
                        title="Delete Order"
                      >
                        <FiTrash2 />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* --- MODAL DE DETALHES --- */}
        <Dialog open={isDetailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold' }}>
            Order Details #{selectedOrder?.id.substring(0, 8)}...
          </DialogTitle>
          <DialogContent dividers>
            {selectedOrder && (
              <Box>
                <Typography variant="subtitle1">
                  <strong>Customer:</strong> {selectedOrder.user?.name || 'N/A'}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Date:</strong> {new Date(selectedOrder.orderTime).toLocaleString('en-US')}
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Purchase Items:
                </Typography>
                <List sx={{ bgcolor: '#f9f9f9', borderRadius: 2 }}>
                  {selectedOrder.orderItems?.map((item, index) => (
                    <ListItem key={index} divider={index !== selectedOrder.orderItems.length - 1}>
                      <Avatar
                        /* CORREÇÃO DA IMAGEM: Adicionado /high.webp */
                        src={item.imageUrl ? `${item.imageUrl}/high.webp` : ''}
                        variant="rounded"
                        sx={{ width: 60, height: 80, mr: 2, bgcolor: '#eee' }}
                      />
                      <ListItemText
                        primary={item.name || 'Unknown Card'}
                        secondary={`Quantity: ${item.quantity} | ID: ${item.cardId}`}
                      />
                      <Typography variant="body2" fontWeight="bold">
                        {/* Se não houver preço unitário no item, multiplicamos o total se necessário */}
                        {selectedOrder.totalPrice
                          ? (
                              (selectedOrder.totalPrice / selectedOrder.totalItems) *
                              item.quantity
                            ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                          : ''}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Box
                  sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Order Total:
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {selectedOrder.totalPrice.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </main>
  );
}
