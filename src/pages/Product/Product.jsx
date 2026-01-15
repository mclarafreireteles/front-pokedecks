import './product.style.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as cardService from '../../services/cardService';

import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Button } from '../../components/Button/Button';

import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';

import {
  Container,
  Grid,
  Box,
  Typography,
  Chip,
  Paper,
  Divider,
  CircularProgress,
  Stack,
} from '@mui/material';

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchCardData() {
      try {
        const data = await cardService.getCardById(id);

        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCardData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      console.log(`Adicionado ao carrinho: ${product.name}`);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!product)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Product not found.
      </Typography>
    );

  return (
    <main>
      <Navbar isLogged={true} />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} className="productContainer">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.imageUrl ? `${product.imageUrl}/high.png` : '/images/no-card-image.png'}
              alt={product.name}
              sx={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '600px',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box className="rightContainer">
                <Chip
                  label={product.rarity}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 2, fontWeight: 'bold' }}
                />
                <Typography variant="h3" component="h1" fontWeight={700} color="text.primary">
                  {product.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Illustrator: {product.illustrator}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h3" component="span" fontWeight={700} color="success.main">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    product.price
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Stock: {product.stockQuantity} available
                </Typography>
              </Box>

              <Divider />

              <Box sx={{ width: '100%' }}>
                <Button
                  typeColor="primary"
                  onClick={handleAddToCart}
                  icon={FiShoppingCart}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Add to Cart
                </Button>
              </Box>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Specifications
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      COLEÇÃO (ID)
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {product.id}
                    </Typography>
                  </Grid>

                  {product.metadata && (
                    <>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          TIPO
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {product.metadata.types?.join(', ') || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          HP
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {product.metadata.hp || '-'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          ESTÁGIO
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {product.metadata.stage || '-'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          DEX ID
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          #{product.metadata.dexId}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </main>
  );
}
