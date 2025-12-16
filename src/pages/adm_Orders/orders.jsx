import React, { useState, useEffect } from 'react';
import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Box,
  ListItemIcon,
  ListItemText
} from '@mui/material';

// Ícones
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Os 3 pontinhos horizontais
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function Orders(){
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const open = Boolean(anchorEl);

  // Simulação da API
  useEffect(() => {
    // Aqui virá o seu fetch/axios
    const mockData = [
      { id: 'Body', name: 'Body', customer: 'Body', total: 'Body' }, // Dados placeholder como na imagem
      { id: '001', name: 'Macbook Pro', customer: 'João Silva', total: 'R$ 12.000' },
      { id: '002', name: 'Iphone 15', customer: 'Maria Souza', total: 'R$ 8.500' },
      { id: '003', name: 'Monitor Dell', customer: 'Carlos A.', total: 'R$ 1.200' },
      { id: '004', name: 'Teclado Mec.', customer: 'Ana P.', total: 'R$ 450' },
    ];
    setOrders(mockData);
  }, []);

  // Handlers do Menu
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleAdd = () => {
    //colocar função de adicionar na tabela
    console.log('adicionar')

  }
  const handleEdit = () => {
    //colocar a funução de edit
    console.log('editando');
    handleMenuClose();
  };

  const handleDelete = () => {
    //colocar a função de delete
    handleMenuClose();
  };

  return (
    <main>
        <Navbar isLogged="" />
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      
      {/* 1. Botão de Adicionar (Topo Direito) */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#2563EB', // Azul similar ao da imagem
            textTransform: 'none', // Remove o CAPS LOCK padrão do MUI
            fontWeight: 600,
            borderRadius: 2, // Bordas arredondadas no botão
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#1d4ed8', boxShadow: 'none' }
          }}
          onClick={handleAdd}
        >
          add order 
        </Button>
      </Box>

      {/* 2. Container da Tabela (Card Branco) */}
      <TableContainer 
        component={Paper} 
        elevation={0} // Remove sombra alta para ficar flat
        sx={{ 
          border: '1px solid #E0E0E0', // Borda cinza suave
          borderRadius: 3, // Arredondamento do card (conforme imagem)
          overflow: 'hidden' // Garante que o conteúdo respeite a borda redonda
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="tabela de pedidos">
          
          {/* Cabeçalho */}
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FAFAFA', borderBottom: '2px solid #F0F0F0' }}>
              {['ID', 'Name', 'Customer', 'Total'].map((head) => (
                <TableCell 
                  key={head}
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#9E9E9E', // Cinza claro para os títulos (conforme imagem)
                    borderBottom: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  {head}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ borderBottom: 'none' }} />
            </TableRow>
          </TableHead>

          {/* Corpo da Tabela */}
          <TableBody>
            {orders.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: '#424242' }}>
                  {row.id}
                </TableCell>
                <TableCell sx={{ color: '#424242' }}>{row.name}</TableCell>
                <TableCell sx={{ color: '#424242' }}>{row.customer}</TableCell>
                <TableCell sx={{ color: '#424242' }}>{row.total}</TableCell>
                
                {/* Botão de Ações (...) */}
                <TableCell align="right">
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleMenuClick(e, row.id)}
                    size="small"
                  >
                    <MoreHorizIcon fontSize="small" /> 
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 3. Pop-up de Menu (Edit/Delete) */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            minWidth: 150,
            marginTop: 1
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEdit} disableRipple>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleDelete} disableRipple sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
    <Footer />
    </main>
    
  )
};

