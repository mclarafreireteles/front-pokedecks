import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as orderService from '../../services/orderService';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { useAuth } from '../../contexts/AuthContext';

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Divider,
  Button,
  Chip,
} from '@mui/material';

import { FiChevronDown, FiPackage, FiShoppingBag, FiAlertCircle } from 'react-icons/fi';
import { PageName } from '../../components/PageName/PageName';

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const dateValue = dateString.endsWith('Z') ? dateString : dateString + 'Z';

    return new Date(dateValue).toLocaleString('pt-BR');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadOrders();
  }, [isAuthenticated, navigate]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getMyOrders();
      const safeData = Array.isArray(data) ? data : [];
      const sortedOrders = safeData.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Navbar isLogged={true} />
      <Container maxWidth="md" sx={{ py: 5, minHeight: '80vh' }}>
        <PageName>My Orders</PageName>

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : orders.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={8}>
            <FiShoppingBag size={50} color="#ccc" />
            <Typography variant="h6" color="text.secondary" mt={2}>
              You haven't made any orders yet.
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/marketplace')}>
              Go Shopping
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 3 }}>
            {orders.map((order) => (
              <Accordion
                key={order.id}
                sx={{
                  mb: 2,
                  borderRadius: '8px !important',
                  boxShadow: 2,
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<FiChevronDown />}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2,
                      pr: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Pedido{' '}
                        <span style={{ fontFamily: 'monospace', color: '#666' }}>#{order.id}</span>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(order.orderTime)}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary">
                        {order.totalItems || 0} {order.totalItems === 1 ? 'item' : 'items'}
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {formatCurrency(order.totalPrice)}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
                  <Divider sx={{ mb: 2 }} />

                  {!order.orderItems || order.orderItems.length === 0 ? (
                    <Box display="flex" alignItems="center" gap={1} color="text.secondary" py={2}>
                      <FiAlertCircle />
                      <Typography variant="body2">
                        Item details unavailable for this order.
                      </Typography>
                    </Box>
                  ) : (
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="center">Qty</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.orderItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar
                                src={item.imageUrl ? `${item.imageUrl}/high.webp` : ''}
                                variant="rounded"
                                sx={{ width: 40, height: 55, bgcolor: '#eee' }}
                              >
                                {!item.imageUrl && <FiPackage color="#999" />}
                              </Avatar>

                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {item.name || 'Unnamed Product'}
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                  ID: {item.cardId}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Chip label={`x${item.quantity}`} size="small" />
                            </TableCell>

                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                              {formatCurrency(item.price)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </main>
  );
}
