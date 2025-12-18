import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    MenuItem,
    Button,
    CircularProgress
} from "@mui/material";

export function CardFormDialog({ open, onClose, onSave, cardToEdit }) {
    const initialFormState = {
        id: "",
        localId: 0,
        name: "",
        imageUrl: "",
        illustrator: "",
        rarity: "Common",
        price: 0,
        stockQuantity: 0,
        category: "POKEMON",
        setId: ""
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (open) {
            if (cardToEdit) {
                setFormData({
                    id: cardToEdit.id,
                    localId: cardToEdit.localId || 0,
                    name: cardToEdit.name || "",
                    imageUrl: cardToEdit.imageUrl || "",
                    illustrator: cardToEdit.illustrator || "",
                    rarity: cardToEdit.rarity || "Common",
                    price: cardToEdit.price || 0,
                    stockQuantity: cardToEdit.stockQuantity || 0,
                    category: cardToEdit.category || "POKEMON",
                    setId: cardToEdit.setId || ""
                });
            } else {
                setFormData(initialFormState);
            }
        }
    }, [open, cardToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        await onSave(formData, !!cardToEdit); 
        setIsSaving(false);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{cardToEdit ? "Edit Card" : "New Card"}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Card ID"
                            name="id"
                            fullWidth
                            value={formData.id}
                            onChange={handleChange}
                            disabled={!!cardToEdit}
                            required
                        />
                    </Grid>
                     <Grid item xs={12} sm={6}>
                        <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Set ID" name="setId" fullWidth value={formData.setId} onChange={handleChange} />
                    </Grid>
                     <Grid item xs={12} sm={6}>
                        <TextField label="Image URL" name="imageUrl" fullWidth value={formData.imageUrl} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                         <TextField label="Price" name="price" type="number" fullWidth value={formData.price} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                         <TextField label="Stock" name="stockQuantity" type="number" fullWidth value={formData.stockQuantity} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="Category" name="category" fullWidth value={formData.category} onChange={handleChange}>
                            <MenuItem value="POKEMON">Pokemon</MenuItem>
                            <MenuItem value="TRAINER">Trainer</MenuItem>
                            <MenuItem value="ENERGY">Energy</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={isSaving}>
                    {isSaving ? <CircularProgress size={24} /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}