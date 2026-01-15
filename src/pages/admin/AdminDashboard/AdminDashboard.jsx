import { useEffect, useState } from "react";
import * as orderService from "../../../services/orderService";
import * as reportService from "../../../services/reportService";

import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";

import {
    Container, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, IconButton, Box, CircularProgress, 
    Grid, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button,
    List, ListItem, ListItemText, Avatar
} from "@mui/material";

import { FiTrash2, FiEye, FiAlertCircle, FiTrendingUp, FiUsers } from "react-icons/fi";

export function AdminDashboard() {
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
                reportService.getCustomerPurchasesReport()
            ]);

            if (results[0].status === 'fulfilled') setOrders(results[0].value);
            
            setReports({
                outOfStock: results[1].status === 'fulfilled' ? results[1].value : [],
                revenue: results[2].status === 'fulfilled' ? results[2].value : { total: "0,00" },
                customers: results[3].status === 'fulfilled' ? results[3].value : []
            });
        } catch (error) {
            console.error("Erro crítico no carregamento:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDetails = async (orderId) => {
        try {
            const details = await orderService.getOrderById(orderId); 
            console.log("Detalhes carregados no modal:", details); // Log para conferência
            setSelectedOrder(details);
            setIsDetailsOpen(true);
        } catch (error) {
            alert("Erro ao buscar detalhes do pedido.");
        }
    };

    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
        setSelectedOrder(null);
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm(`Deseja realmente excluir o pedido #${id}?`)) {
            try {
                await orderService.deleteOrder(id);
                setOrders(prev => prev.filter(o => o.id !== id));
            } catch (error) {
                alert("Erro ao excluir pedido.");
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
                <Typography variant="h4" fontWeight="bold" mb={4}>Dashboard Administrativo</Typography>
                
                {/* --- SEÇÃO DE RELATÓRIOS --- */}
                <Grid container spacing={3} mb={6}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E0E0E0', height: '100%' }} elevation={0}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <FiTrendingUp size={24} color="#2563EB" />
                                <Typography variant="h6" ml={1}>Receita Diária</Typography>
                            </Box>
                            <Typography variant="h4" fontWeight="bold">
                                R$ {reports.revenue?.total || "0,00"}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E0E0E0', height: '100%' }} elevation={0}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <FiAlertCircle size={24} color="#d32f2f" />
                                <Typography variant="h6" ml={1}>Produtos Sem Estoque</Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
                                {reports.outOfStock.length > 0 ? reports.outOfStock.map(item => (
                                    <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
                                        <Typography>{item.name}</Typography>
                                        <Typography color="error" variant="body2" fontWeight="bold">ESGOTADO</Typography>
                                    </Box>
                                )) : <Typography color="textSecondary">Tudo em estoque!</Typography>}
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E0E0E0' }} elevation={0}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <FiUsers size={24} color="#2563EB" />
                                <Typography variant="h6" ml={1}>Compras por Cliente</Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                {reports.customers.map(c => (
                                    <Grid item xs={12} sm={6} md={4} key={c.id}>
                                        <Box p={1} sx={{ bgcolor: '#F9F9F9', borderRadius: 2 }}>
                                            <Typography fontWeight="bold" variant="body2">{c.name}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {c.orderCount} pedidos • Total: R$ {c.totalSpent}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 6 }} />

                {/* --- SEÇÃO DE PEDIDOS --- */}
                <Typography variant="h5" fontWeight="bold" mb={3}>Gerenciar Pedidos de Clientes</Typography>
                
                <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #E0E0E0' }} elevation={0}>
                    <Table>
                        <TableHead sx={{ bgcolor: '#FAFAFA' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Cliente</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Data</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Total</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.length > 0 ? orders.map((order) => (
                                <TableRow key={order.id} hover>
                                    <TableCell>#{order.id.substring(0, 8)}...</TableCell>
                                    <TableCell>{order.user?.name || "Cliente"}</TableCell>
                                    <TableCell>{new Date(order.orderTime).toLocaleDateString("pt-BR")}</TableCell>
                                    <TableCell>
                                        {order.totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleOpenDetails(order.id)} title="Ver Detalhes">
                                            <FiEye />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteOrder(order.id)} title="Excluir Pedido">
                                            <FiTrash2 />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow><TableCell colSpan={5} align="center">Nenhum pedido encontrado.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* --- MODAL DE DETALHES CORRIGIDO --- */}
                <Dialog open={isDetailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>
                        Detalhes do Pedido #{selectedOrder?.id.substring(0, 8)}...
                    </DialogTitle>
                    <DialogContent dividers>
                        {selectedOrder && (
                            <Box>
                                <Typography variant="subtitle1"><strong>Cliente:</strong> {selectedOrder.user?.name || "N/A"}</Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Data:</strong> {new Date(selectedOrder.orderTime).toLocaleString("pt-BR")}
                                </Typography>
                                
                                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Itens da Compra:</Typography>
                                <List sx={{ bgcolor: '#f9f9f9', borderRadius: 2 }}>
                                    {/* MUDANÇA AQUI: de .items para .orderItems conforme seu console.log */}
                                    {selectedOrder.orderItems?.map((item, index) => (
                                        <ListItem key={index} divider={index !== selectedOrder.orderItems.length - 1}>
                                            <Avatar 
                                                src={item.imageUrl} 
                                                variant="rounded" 
                                                sx={{ width: 40, height: 40, mr: 2 }} 
                                            />
                                            <ListItemText 
                                                // MUDANÇA AQUI: item.name direto conforme seu console.log
                                                primary={item.name || "Carta Desconhecida"} 
                                                secondary={`Quantidade: ${item.quantity} | ID: ${item.cardId}`} 
                                            />
                                            <Typography variant="body2" fontWeight="bold">
                                                {/* Preço total do item se disponível, ou lógica de cálculo */}
                                                {item.totalPrice ? item.totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : ""}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>

                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">Total do Pedido:</Typography>
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                        {selectedOrder.totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetails} color="primary" variant="contained">Fechar</Button>
                    </DialogActions>
                </Dialog>

            </Container>
            <Footer />
        </main>
    );
}