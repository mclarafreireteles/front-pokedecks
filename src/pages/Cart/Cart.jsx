import { useCart } from "../../contexts/CartContext";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

// Material UI
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    IconButton,
    Button,
    Divider,
    Avatar
} from "@mui/material";

// Icons
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

export function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <main>
            <Navbar isLogged={true} />
            
            <Container maxWidth="lg" sx={{ py: 5, minHeight: '80vh' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Seu Carrinho
                </Typography>

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
                            Seu carrinho está vazio.
                        </Typography>
                        <Button 
                            variant="contained" 
                            sx={{ mt: 3 }}
                            onClick={() => navigate('/marketplace')}
                        >
                            Ver Produtos
                        </Button>
                    </Box>
                ) : (
                    // --- LISTA DE ITENS ---
                    <Grid container spacing={4}>
                        {/* COLUNA ESQUERDA: ITENS */}
                        <Grid item xs={12} md={8}>
                            {cartItems.map((item) => (
                                <Paper 
                                    key={item.id} 
                                    elevation={1} 
                                    sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', borderRadius: 2 }}
                                >
                                    {/* Imagem */}
                                    <Avatar 
                                        src={item.imageUrl ? `${item.imageUrl}/high.webp` : ""} 
                                        variant="rounded"
                                        sx={{ width: 80, height: 110, mr: 2, bgcolor: '#f0f0f0' }}
                                    />

                                    {/* Detalhes do Produto */}
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

                                    {/* Botão Remover */}
                                    <IconButton 
                                        color="error" 
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <FiTrash2 />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Grid>

                        {/* COLUNA DIREITA: RESUMO */}
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
                                    onClick={() => alert("Ir para Checkout!")}
                                >
                                    Finalizar Compra
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