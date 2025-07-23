import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField
} from '@mui/material';

const AddressDialog = ({
  addressDialogOpen,
  closeAddressDialog,
  editingAddress,
  addressForm,
  handleAddressInputChange,
  handleSaveAddress
}) => {
  return (
    <Dialog 
      open={addressDialogOpen} 
      onClose={closeAddressDialog}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {editingAddress ? 'Edit Address' : 'Add New Address'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address"
              value={addressForm.address}
              onChange={(e) => handleAddressInputChange('address', e.target.value)}
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City"
              value={addressForm.city}
              onChange={(e) => handleAddressInputChange('city', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="State/Province"
              value={addressForm.state}
              onChange={(e) => handleAddressInputChange('state', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country"
              value={addressForm.country}
              onChange={(e) => handleAddressInputChange('country', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Postal Code"
              value={addressForm.postalCode}
              onChange={(e) => handleAddressInputChange('postalCode', e.target.value)}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={closeAddressDialog} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSaveAddress} variant="contained">
          {editingAddress ? 'Update Address' : 'Add Address'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog; 