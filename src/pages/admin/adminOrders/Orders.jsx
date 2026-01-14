
import React, { useState, useEffect } from 'react';
import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";
import * as setService from "../../../services/setService"; // Importando o novo serviço

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Menu, MenuItem, Button, Typography, Box,
  ListItemIcon, ListItemText, CircularProgress
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';;

export function Orders(){
 const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const open = Boolean(anchorEl);

  // Busca os dados reais da API ao carregar a página
  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    setIsLoading(true);
    try {
      const data = await setService.getAllSets();
      setCollections(data);
    } catch (error) {
      console.error("Erro ao carregar coleções:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta coleção?")) {
      try {
        await setService.deleteSet(selectedRowId);
        setCollections(prev => prev.filter(item => item.id !== selectedRowId));
        handleMenuClose();
      } catch (error) {
        alert("Erro ao excluir coleção.");
      }
    }
  };

  return (
    <main>
      <Navbar isLogged={true} />
      <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto', minHeight: '80vh' }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">Coleções</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#2563EB',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#1d4ed8', boxShadow: 'none' }
            }}
            onClick={() => console.log("Abrir modal de criação")}
          >
            Adicionar Coleção
          </Button>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>
        ) : (
          <TableContainer 
            component={Paper} 
            elevation={0} 
            sx={{ border: '1px solid #E0E0E0', borderRadius: 3, overflow: 'hidden' }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#FAFAFA' }}>
                  {/* Cabeçalhos atualizados para os dados de uma Coleção */}
                  <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Nome da Coleção</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Descrição</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>Ações</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {collections.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ color: '#424242' }}>{row.id}</TableCell>
                    <TableCell sx={{ color: '#424242', fontWeight: 500 }}>{row.name}</TableCell>
                    <TableCell sx={{ color: '#757575' }}>{row.description || "Sem descrição"}</TableCell>
                    
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuClick(e, row.id)}>
                        <MoreHorizIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Menu de Ações */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={() => console.log("Editar", selectedRowId)}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>

      <Footer />
    </main>
  );
}