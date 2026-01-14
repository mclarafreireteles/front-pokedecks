import { useEffect, useState } from "react";
// Importação dos serviços
import * as orderService from "../../../services/orderService";
import * as reportService from "../../../services/reportService";

// Componentes de Layout
import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";

// Material UI
import {
    Container, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, IconButton, Box, CircularProgress, 
    Grid, Divider
} from "@mui/material";

// Ícones
import { FiTrash2, FiEye, FiAlertCircle, FiTrendingUp, FiUsers } from "react-icons/fi";

export function AdminDashboard() {
    // Estados para Pedidos
    const [orders, setOrders] = useState([]);
    // Estados para Relatórios
    const [reports, setReports] = useState({ outOfStock: [], revenue: null, customers: [] });
    // Estado de Carregamento Único
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            // Busca todos os dados em paralelo para melhor performance
            const [ordersData, stock, rev, cust] = await Promise.all([
                orderService.getAllOrders(),
                reportService.getOutOfStockReport(),
                reportService.getDailyRevenueReport(),
                reportService.getCustomerPurchasesReport()
            ]);

            setOrders(ordersData);
            setReports({ outOfStock: stock, revenue: rev, customers: cust });
        } catch (error) {
            console.error("Erro ao carregar dados do dashboard:", error);
        } finally {
            setIsLoading(false);
        }
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
                
                {/* --- SEÇÃO DE RELATÓRIOS --- */}
                <Typography variant="h4" fontWeight="bold" mb={4}>Dashboard Administrativo</Typography>
                
                <Grid container spacing={3} mb={6}>
                    {/* Receita Diária */}
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

                    {/* Produtos Sem Estoque */}
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

                    {/* Compras por Cliente */}
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
                                    <TableCell>#{order.id}</TableCell>
                                    <TableCell>{order.customerName || "Cliente"}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>R$ {order.totalAmount?.toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" title="Visualizar Detalhes"><FiEye /></IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteOrder(order.id)} title="Excluir Pedido"><FiTrash2 /></IconButton>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        Nenhum pedido encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
            <Footer />
        </main>
    );
}