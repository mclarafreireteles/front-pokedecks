import { useEffect, useState } from "react";
import * as setService from "../../../services/setService";
import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";
import { SetFormDialog } from "./SetFormDialog";

import {
    Container, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Button, IconButton, Box, CircularProgress
} from "@mui/material";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export function Sets() {
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
            console.error("Erro ao buscar detalhes do set:", error);
            alert("Erro ao carregar dados para edição.");
        } finally {
            setIsFetchingDetails(false);
        }
    };

    const handleSaveFromModal = async (formData, isEditing) => {
        try {
            if (isEditing) {
                await setService.updateSet(formData.id, formData);
                alert("Set atualizado!");
            } else {
                await setService.createSet(formData);
                alert("Set criado!");
            }
            setIsModalOpen(false);
            loadSets();
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar.");
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Excluir coleção "${name}"?`)) {
            try {
                await setService.deleteSet(id);
                setSets(prev => prev.filter(s => s.id !== id));
            } catch (error) { 
                console.error(error);
                alert("Erro ao excluir (verifique se há cartas vinculadas)."); 
            }
        }
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
                    <Typography variant="h4" fontWeight="bold">Manage Sets</Typography>
                    <Button variant="contained" startIcon={<FiPlus />} onClick={handleOpenCreate}>
                        New Set
                    </Button>
                </Box>

                {isLoading ? <Box display="flex" justifyContent="center"><CircularProgress /></Box> : (
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                <TableRow>
                                    {/* <TableCell>Logo</TableCell> */}
                                    <TableCell>Name</TableCell>
                                    <TableCell>ID</TableCell>
                                    {/* <TableCell>Series ID</TableCell> */}
                                    <TableCell>Release Date</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sets.map((set) => (
                                    <TableRow key={set.id} hover>
                                        {/* <TableCell>
                                            <img 
                                                src={set.logoUrl || ""} 
                                                style={{ height: 30, maxWidth: 80, objectFit: 'contain' }} 
                                                alt="" 
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        </TableCell> */}
                                        <TableCell sx={{ fontWeight: 500 }}>{set.name}</TableCell>
                                        <TableCell sx={{ fontFamily: 'monospace' }}>{set.id}</TableCell>
                                        {/* <TableCell>{set.serieId || "-"}</TableCell> */}
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