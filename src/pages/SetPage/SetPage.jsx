import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as setService from '../../services/setService';

import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { ProductCard } from '../../components/ProductCard/ProductCard';

import { Container, Box, Typography, CircularProgress, Avatar, Divider, Chip } from "@mui/material";
import { FiGrid, FiCalendar, FiPackage } from "react-icons/fi";

import './setpage.style.css';

export function SetPage() {
    const { id } = useParams();
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await setService.getSetDetails(id);
                
                const formattedCards = data.cards.map(card => ({
                    ...card,
                    price: Number(card.price),
                    description: `Carta ${card.name} da coleção ${data.set.name}.`
                }));

                setPageData({
                    info: data.set, 
                    cards: formattedCards 
                });

            } catch (error) {
                console.error("Erro ao carregar o set:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return "Data desconhecida";
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <main>
            <Navbar isLogged={true} />
            
            <Box sx={{ minHeight: '80vh', pb: 8, bgcolor: '#f5f5f5' }}>
                
                {isLoading ? (
                    <Box display="flex" justifyContent="center" pt={10}>
                        <CircularProgress />
                    </Box>
                ) : pageData ? (
                    <Container maxWidth="xl">
                        <Box 
                            sx={{ 
                                mt: 4, mb: 4, p: 4, 
                                bgcolor: 'white', 
                                borderRadius: 3,
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                flexWrap: 'wrap'
                            }}
                        >
                            <Box 
                                component="img"
                                src={pageData.info.logoUrl}
                                alt={pageData.info.name}
                                sx={{ 
                                    maxHeight: 100, 
                                    maxWidth: 200, 
                                    objectFit: 'contain' 
                                }}
                            />

                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h4" fontWeight="bold" color="text.primary">
                                    {pageData.info.name}
                                </Typography>
                                
                                <Box display="flex" gap={2} mt={1} flexWrap="wrap">
                                    <Chip 
                                        icon={<FiGrid />} 
                                        label={`${pageData.info.totalCards} Cartas`} 
                                        variant="outlined" 
                                    />
                                    <Chip 
                                        icon={<FiCalendar />} 
                                        label={`Release: ${formatDate(pageData.info.releaseDate)}`} 
                                        variant="outlined" 
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 4 }}>
                            <Chip label="Cartas da Coleção" />
                        </Divider>

                        <div className="cards-grid">
                            {pageData.cards.length > 0 ? (
                                pageData.cards.map(card => (
                                    <ProductCard 
                                        key={card.id} 
                                        product={card} 
                                    />
                                ))
                            ) : (
                                <Box display="flex" flexDirection="column" alignItems="center" width="100%" py={5}>
                                    <FiPackage size={40} color="#ccc" />
                                    <Typography color="text.secondary" mt={2}>
                                        No cards found in this collection.
                                    </Typography>
                                </Box>
                            )}
                        </div>

                    </Container>
                ) : (
                    <Typography variant="h5" align="center" pt={10}>
                        Set not found.
                    </Typography>
                )}
            </Box>

            <Footer />
        </main>
    );
}