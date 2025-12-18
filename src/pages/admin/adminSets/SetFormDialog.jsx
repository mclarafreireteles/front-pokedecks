import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Button,
    CircularProgress
} from "@mui/material";

export function SetFormDialog({ open, onClose, onSave, setToEdit }) {
    const initialFormState = {
        id: "",
        name: "",
        logoUrl: "",
        releaseDate: "",
        serieId: ""
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (open) {
            if (setToEdit) {

                let formattedDate = "";
                if (setToEdit.releaseDate) {
                    formattedDate = setToEdit.releaseDate.split('T')[0];
                }

                setFormData({
                    id: setToEdit.id,
                    name: setToEdit.name || "",
                    logoUrl: setToEdit.logoUrl || "",
                    releaseDate: formattedDate, 
                    serieId: setToEdit.serieId || ""
                });
            } else {
                setFormData(initialFormState);
            }
        }
    }, [open, setToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        let isoDate = null;
        if (formData.releaseDate) {
            const dateObj = new Date(formData.releaseDate);
            isoDate = dateObj.toISOString(); 
        }

        const payload = {
            ...formData,
            releaseDate: isoDate 
        };

        await onSave(payload, !!setToEdit); 
        setIsSaving(false);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{setToEdit ? "Edit Set" : "New Set"}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {/* ID e Nome */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Set ID"
                            name="id"
                            fullWidth
                            value={formData.id}
                            onChange={handleChange}
                            disabled={!!setToEdit}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Set Name"
                            name="name"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    {/* Serie ID e Data */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Series ID"
                            name="serieId"
                            fullWidth
                            value={formData.serieId}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Release Date (ISO format or YYYY-MM-DD)"
                            name="releaseDate"
                            fullWidth
                            value={formData.releaseDate}
                            onChange={handleChange}
                            placeholder="2025-12-18"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    {/* Logo URL */}
                    <Grid item xs={12}>
                        <TextField
                            label="Logo URL"
                            name="logoUrl"
                            fullWidth
                            value={formData.logoUrl}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    color="primary"
                    disabled={isSaving}
                >
                    {isSaving ? <CircularProgress size={24} /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}