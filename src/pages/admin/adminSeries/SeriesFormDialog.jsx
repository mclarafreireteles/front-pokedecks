import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';

const initialFormState = {
  id: '',
  name: '',
  logoUrl: '',
};

export function SeriesFormDialog({ open, onClose, onSave, seriesToEdit }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (seriesToEdit) {
        setFormData({
          id: seriesToEdit.id,
          name: seriesToEdit.name || '',
          logoUrl: seriesToEdit.logoUrl || '',
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [open, seriesToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave(formData, !!seriesToEdit);
    setIsSaving(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{seriesToEdit ? 'Editar Série' : 'Nova Série'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="ID da Série"
              name="id"
              fullWidth
              value={formData.id}
              onChange={handleChange}
              disabled={!!seriesToEdit}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome da Série"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} /> : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
