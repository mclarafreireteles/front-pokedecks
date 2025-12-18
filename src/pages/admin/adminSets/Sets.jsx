import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import * as setService from "../../../services/setService";

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

export function Sets() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [sets, setSets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'ADMIN') {
            console.warn("Aviso: Usuário não é admin ou não está logado (Bloqueio desativado para testes)");
        } else {
            console.log('usuario é admin')
        }
    }, [isAuthenticated, user, navigate]);

    const loadSets = async () => {
        setIsLoading(true);
        try {
            const data = await setService.getAllSets();
            setSets(data);
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar cartas da API.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSets();
    }, []);

    const handleDelete = async (id, name) => {
        if (window.confirm(`Tem certeza que deseja excluir a carta "${name}"?`)) {
            try {
                await setService.deleteSet(id);

                setSets(currentSets => currentSets.filter(set => set.id !== id));
                alert("Set excluído com sucesso!");

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
        alert("Funcionalidade de CRIAR NOVO SET será implementada quando a rota POST estiver pronta.");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <main>
            <Navbar isLogged={true} />

            <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: '#333' }}>
                        Manage Sets
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FiPlus />}
                        onClick={handleCreate}
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                        New Set
                    </Button>
                </Box>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>
                ) : (
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="tabela de sets">
                            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                <TableRow>
                                    {/* <TableCell sx={{ fontWeight: 'bold' }}>Logo</TableCell> */}
                                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Release</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Cards</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sets.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                            <Box display="flex" alignItems="center" justifyContent="center" gap={1} color="text.secondary">
                                                <FiAlertCircle size={20} />
                                                <Typography>Nenhuma carta encontrada.</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sets.map((set) => (
                                        <TableRow key={set.id} hover>
                                            {/* Coluna 1: Logo */}
                                            {/* <TableCell>
                                                <img
                                                    src={set.logoUrl ? `${set.logoUrl}/high.webp` : "https://via.placeholder.com/300?text=Sem+Imagem"}
                                                    alt={set.name}
                                                    style={{
                                                        height: 30,
                                                        maxWidth: 80,
                                                        objectFit: 'contain' // Mantém a proporção do logo
                                                    }}
                                                />
                                            </TableCell> */}

                                            {/* Coluna 2: Nome */}
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="500">{set.name}</Typography>
                                            </TableCell>

                                            {/* Coluna 3: ID */}
                                            <TableCell>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                                                    {set.id}
                                                </Typography>
                                            </TableCell>

                                            {/* Coluna 4: Data de Lançamento Formatada */}
                                            <TableCell>
                                                {formatDate(set.releaseDate)}
                                            </TableCell>

                                            {/* Coluna 5: Total de Cartas */}
                                            <TableCell>
                                                <Chip
                                                    label={`${set.totalCards} cards`}
                                                    size="small"
                                                    variant="outlined"
                                                    color="default"
                                                />
                                            </TableCell>

                                            {/* Coluna 6: Ações */}
                                            <TableCell align="center">
                                                <Tooltip title="Editar">
                                                    <IconButton color="primary" onClick={() => handleEdit(set.id)} sx={{ mr: 1 }}>
                                                        <FiEdit size={18} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Excluir">
                                                    <IconButton color="error" onClick={() => handleDelete(set.id, set.name)}>
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