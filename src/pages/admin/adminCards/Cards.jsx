import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import * as cardService from "../../../services/cardService";

import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";

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
    Tooltip
} from "@mui/material";

import { FiEdit, FiTrash2, FiPlus, FiAlertCircle } from "react-icons/fi";

export function Cards() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'ADMIN') {
            console.warn("Aviso: Usuário não é admin ou não está logado (Bloqueio desativado para testes)");
        }
    }, [isAuthenticated, user, navigate]);

    const loadCards = async () => {
        setIsLoading(true);
        try {
            const data = await cardService.getAllCards();
            setCards(data);
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar cartas da API.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCards();
    }, []);

    const handleDelete = async (id, name) => {
        if (window.confirm(`Tem certeza que deseja excluir a carta "${name}"?`)) {
            try {
                await cardService.deleteCard(id);
                setCards(currentCards => currentCards.filter(card => card.id !== id));
                alert("Carta excluída com sucesso!");
                
            } catch (error) {
                console.error(error);
                alert("Erro ao excluir. Verifique se você tem permissão ou se o item existe.");
            }
        }
    };

    const handleEdit = (id) => {
        alert(`Funcionalidade de EDITAR o ID ${id} será implementada quando a rota PUT estiver pronta.`);
    };

    const handleCreate = () => {
        alert("Funcionalidade de CRIAR NOVA CARTA será implementada quando a rota POST estiver pronta.");
    };

    return (
        <main>
            <Navbar isLogged={true} />
            
            <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: '#333' }}>
                        Manage Cards
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<FiPlus />}
                        onClick={handleCreate}
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                        New Card
                    </Button>
                </Box>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>
                ) : (
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="tabela de cartas">
                            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                            <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="text.secondary">
                                                <FiAlertCircle size={20} />
                                                <Typography>Nenhuma carta encontrada.</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cards.map((card) => (
                                        <TableRow key={card.id} hover>
                                            <TableCell>
                                                <img 
                                                    src={card.imageUrl ? `${card.imageUrl}/high.webp` : "https://via.placeholder.com/300?text=Sem+Imagem"} 
                                                    alt={card.name} 
                                                    style={{ width: 60, height: 'auto', borderRadius: 4, border: '1px solid #eee' }} 
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="500">{card.name}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="500">{card.id}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={card.stockQuantity} 
                                                    color={card.stockQuantity > 0 ? "success" : "default"} 
                                                    size="small" 
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Editar (Em breve)">
                                                    <IconButton 
                                                        color="primary" 
                                                        onClick={() => handleEdit(card.id)}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        <FiEdit size={18} />
                                                    </IconButton>
                                                </Tooltip>
                                                
                                                <Tooltip title="Excluir">
                                                    <IconButton 
                                                        color="error" 
                                                        onClick={() => handleDelete(card.id, card.name)}
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>

            <Footer />
        </main>
    );
}