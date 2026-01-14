import { useEffect, useState } from "react";
import * as serieService from "../../../services/seriesService";
import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";
import { SeriesFormDialog } from "./SeriesFormDialog";

import {
    Container, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Button, IconButton, Box, CircularProgress
} from "@mui/material";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export function Series() {
    const [seriesList, setSeriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Estados do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [isFetchingDetails, setIsFetchingDetails] = useState(false);

    useEffect(() => {
        loadSeries();
    }, []);

    const loadSeries = async () => {
        setIsLoading(true);
        try {
            const data = await serieService.getAllSeries();
            setSeriesList(data);
        } catch (error) { 
            console.error("Erro ao carregar séries:", error); 
        } finally { 
            setIsLoading(false); 
        }
    };

    const handleOpenCreate = () => {
        setSelectedSeries(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = async (seriesId) => {
        setIsFetchingDetails(true);
        try {
            const fullData = await serieService.getSeriesById(seriesId);
            setSelectedSeries(fullData);
            setIsModalOpen(true);
        } catch (error) {
            alert("Erro ao carregar dados da série.", error);
        } finally {
            setIsFetchingDetails(false);
        }
    };

    const handleSaveFromModal = async (formData, isEditing) => {
        try {
            if (isEditing) {
                await serieService.updateSeries(formData.id, formData);
            } else {
                await serieService.createSeries(formData);
            }
            setIsModalOpen(false);
            loadSeries();
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar série.");
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Excluir a série "${name}"? Todas as coleções vinculadas podem ser afetadas.`)) {
            try {
                await serieService.deleteSeries(id);
                setSeriesList(prev => prev.filter(s => s.id !== id));
            } catch (error) { 
                alert("Erro ao excluir. Certifique-se de que não existem coleções vinculadas a esta série.", error); 
            }
        }
    };

    return (
        <main>
            <Navbar isLogged={true} />
            <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" fontWeight="bold">Manage Series</Typography>
                    <Button variant="contained" startIcon={<FiPlus />} onClick={handleOpenCreate}>
                        New Serie
                    </Button>
                </Box>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" py={5}><CircularProgress /></Box>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {seriesList.map((serie) => (
                                    <TableRow key={serie.id} hover>
                                        <TableCell sx={{ fontWeight: 500 }}>{serie.name}</TableCell>
                                        <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                            {serie.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton 
                                                color="primary" 
                                                onClick={() => handleOpenEdit(serie.id)}
                                                disabled={isFetchingDetails}
                                            >
                                                <FiEdit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(serie.id, serie.name)}>
                                                <FiTrash2 />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <SeriesFormDialog 
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveFromModal}
                    seriesToEdit={selectedSeries}
                />
            </Container>
            <Footer />
        </main>
    );
}