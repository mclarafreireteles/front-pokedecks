import { useCart } from "../../contexts/CartContext";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as orderService from "../../services/orderService";
import * as userService from "../../services/userService";
import { useState } from "react";

import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    IconButton,
    Button,
    Divider,
    Avatar,
    CircularProgress
} from "@mui/material";

import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { PageName } from "../../components/PageName/PageName";

export function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            alert("Você precisa estar logado para finalizar a compra.");
            navigate('/login'); 
            return;
        }

        setIsCheckingOut(true);
        try {
            const userProfile = await userService.getUserProfile();

            console.log("Perfil do usuário recuperado:", userProfile);

            if (!userProfile.id) {
                throw new Error("ID do usuário não encontrado no perfil.");
            }

            const payload = {
                userId: userProfile.id,
                orderTime: new Date().toISOString(),
                orderItems: cartItems.map(item => ({
                    cardId: item.id,
                    quantity: item.quantity
                }))
            };

            console.log("Enviando pedido (JSON):", payload);

            await orderService.createOrder(payload);

            alert("Pedido realizado com sucesso!");
            clearCart(); 
            navigate('/my-orders');

        } catch (error) {
            console.error("Erro ao finalizar compra:", error);
            alert("Erro ao processar o pedido. Verifique o console para detalhes.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <main>
            <Navbar isLogged={true} />
            
            <Container maxWidth="lg" sx={{ py: 5, minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                <PageName>
                    My Cart
                </PageName>

                {cartItems.length === 0 ? (
                    // --- ESTADO VAZIO ---
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        alignItems="center" 
                        justifyContent="center" 
                        py={10}
                    >
                        <FiShoppingBag size={60} color="#ccc" />
                        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                            Your cart is empty
                        </Typography>
                        <Button 
                            variant="contained" 
                            sx={{ mt: 3 }}
                            onClick={() => navigate('/marketplace')}
                        >
                            See products
                        </Button>
                    </Box>
                ) : (

                    <Grid container spacing={4} justifyContent="space-between" sx={{ mt: 2 }}>
                        <Grid item xs={12} md={8} flexGrow={1} pr={8}>
                            {cartItems.map((item) => (
                                <Paper 
                                    key={item.id} 
                                    elevation={1} 
                                    sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', borderRadius: 2, width: '100%', maxHeight: '100px'}}
                                >
                                    <Avatar 
                                        src={item.imageUrl ? `${item.imageUrl}/high.webp` : ""} 
                                        variant="rounded"
                                        sx={{ width: 80, height: 110, mr: 2, bgcolor: '#f0f0f0' }}
                                    />

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Unitário: {formatCurrency(item.price)}
                                        </Typography>
                                        <Typography variant="body2" color="primary" fontWeight="bold">
                                            Total: {formatCurrency(item.price * item.quantity)}
                                        </Typography>
                                    </Box>

                                    {/* Controles de Quantidade */}
                                    <Box display="flex" alignItems="center" sx={{ border: '1px solid #ddd', borderRadius: 1, mr: 2 }}>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => updateQuantity(item.id, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <FiMinus size={14} />
                                        </IconButton>
                                        <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center' }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            <FiPlus size={14} />
                                        </IconButton>
                                    </Box>

                                    <IconButton 
                                        color="error" 
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <FiTrash2 />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Resumo do Pedido
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography color="text.secondary">Subtotal</Typography>
                                    <Typography fontWeight="bold">{formatCurrency(cartTotal)}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mb={3}>
                                    <Typography color="text.secondary">Frete</Typography>
                                    <Typography color="success.main">Grátis</Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box display="flex" justifyContent="space-between" mb={3}>
                                    <Typography variant="h5" fontWeight="bold">Total</Typography>
                                    <Typography variant="h5" fontWeight="bold" color="primary">
                                        {formatCurrency(cartTotal)}
                                    </Typography>
                                </Box>

                                <Button 
                                    variant="contained" 
                                    color="success" 
                                    fullWidth 
                                    size="large"
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                >
                                    {isCheckingOut ? <CircularProgress size={24} color="inherit" /> : "Finalizar Compra"}
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Container>

            <Footer />
        </main>
    );
}