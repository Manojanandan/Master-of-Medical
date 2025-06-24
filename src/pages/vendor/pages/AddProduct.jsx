import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  TextareaAutosize,
  Paper,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Close';

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

const SUBCATEGORY_OPTIONS = {
  medical: [
    { value: 'bandages', label: 'Bandages' },
    { value: 'masks', label: 'Masks' },
    { value: 'syringes', label: 'Syringes' },
  ],
  surgical: [
    { value: 'gloves', label: 'Gloves' },
    { value: 'scissors', label: 'Scissors' },
    { value: 'forceps', label: 'Forceps' },
  ],
  equipment: [
    { value: 'monitor', label: 'Monitor' },
    { value: 'stethoscope', label: 'Stethoscope' },
    { value: 'thermometer', label: 'Thermometer' },
  ],
};

const getFileIcon = (type) => {
  if (type === 'application/pdf') return <PictureAsPdfIcon sx={{ color: '#e53935' }} />;
  if (type.startsWith('image/')) return <ImageIcon sx={{ color: '#1976d2' }} />;
  return <InsertDriveFileIcon sx={{ color: '#757575' }} />;
};

const AddProduct = () => {
  // Form state
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [priceLabel, setPriceLabel] = useState('');
  const [description, setDescription] = useState('');
  const [shelfLife, setShelfLife] = useState('');
  const [brandName, setBrandName] = useState('');
  const [expiresOn, setExpiresOn] = useState('');
  const [country, setCountry] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [benefits, setBenefits] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [formError, setFormError] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const fileInputRef = useRef();

  // File handling
  const handleFileChange = (e) => {
    let selected = Array.from(e.target.files);
    let newFiles = [...files];
    let error = '';
    selected.forEach(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        error = 'Only PDF and image files are allowed.';
      } else if (file.size > MAX_FILE_SIZE) {
        error = 'Each file must be less than 5MB.';
      } else if (newFiles.length < MAX_FILES && !newFiles.some(f => f.name === file.name && f.size === file.size)) {
        newFiles.push(file);
      }
    });
    if (newFiles.length > MAX_FILES) {
      error = `You can upload up to ${MAX_FILES} files.`;
      newFiles = newFiles.slice(0, MAX_FILES);
    }
    setFiles(newFiles);
    setFileError(error);
    if (error) setSnackbar({ open: true, message: error, severity: 'error' });
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const handleRemoveFile = (idx) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  // Validation
  const validate = () => {
    const errors = {};
    if (!category) errors.category = 'Category is required';
    if (!subcategory) errors.subcategory = 'Subcategory is required';
    if (!productName) errors.productName = 'Product name is required';
    if (!price) errors.price = 'Price is required';
    if (!priceLabel) errors.priceLabel = 'Price label is required';
    if (!description) errors.description = 'Description is required';
    if (!shelfLife) errors.shelfLife = 'Shelf life is required';
    if (!brandName) errors.brandName = 'Brand name is required';
    if (!expiresOn) errors.expiresOn = 'Expiry date is required';
    if (!country) errors.country = 'Country is required';
    if (!manufacturer) errors.manufacturer = 'Manufacturer details required';
    if (files.length === 0) errors.files = 'At least one file is required';
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'error' });
      return;
    }
    // Submit logic here (API call, etc.)
    setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success' });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', p: { xs: 1, sm: 3 }, width: '100%' }}>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button startIcon={<ArrowBackIosNewIcon />} sx={{ color: '#222', fontWeight: 600, textTransform: 'uppercase', fontSize: 13, pl: 0 }}>
          Back
        </Button>
      </Box>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4, md: 6 }, width: '100%', borderRadius: 3, boxShadow: 2, background: '#fff' }}>
          {/* Top Section: Category, Subcategory, Product Name, Price, Price Label */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {/* Category */}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%' }, minWidth: 220 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                  error={!!formError.category}
                >
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value="medical">Medical</MenuItem>
                  <MenuItem value="surgical">Surgical</MenuItem>
                  <MenuItem value="equipment">Equipment</MenuItem>
                </Select>
                {formError.category && <Typography color="error" fontSize={13}>{formError.category}</Typography>}
              </FormControl>
            </Box>
            {/* Subcategory */}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%' }, minWidth: 220 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} id="subcategory-label">Subcategory</InputLabel>
                <Select
                  labelId="subcategory-label"
                  value={subcategory}
                  label="Subcategory"
                  onChange={e => setSubcategory(e.target.value)}
                  error={!!formError.subcategory}
                  disabled={!category}
                >
                  <MenuItem value="">Select Subcategory</MenuItem>
                  {category && SUBCATEGORY_OPTIONS[category].map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
                {formError.subcategory && <Typography color="error" fontSize={13}>{formError.subcategory}</Typography>}
              </FormControl>
            </Box>
          </Box>
          {/* Product Name full width */}
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Product name</InputLabel>
            <TextField fullWidth size="small" value={productName} onChange={e => setProductName(e.target.value)} placeholder="3-Ply Disposable Surgical Face Mask (Pack of 100)" sx={{ mb: 2 }} error={!!formError.productName} helperText={formError.productName} />
          </Box>
          {/* Price and Price Label side by side */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%' }, minWidth: 180 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Price</InputLabel>
              <TextField fullWidth size="small" value={price} onChange={e => setPrice(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="1170" sx={{ mb: 2 }} error={!!formError.price} helperText={formError.price} />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%' }, minWidth: 180 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Price Label</InputLabel>
              <TextField fullWidth size="small" value={priceLabel} onChange={e => setPriceLabel(e.target.value)} placeholder="Pack of 100 masks" sx={{ mb: 2 }} error={!!formError.priceLabel} helperText={formError.priceLabel} />
            </Box>
          </Box>
          {/* The rest of the form fields */}
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Product Description</InputLabel>
            <TextareaAutosize minRows={3} value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: '1px solid #e0e0e0', padding: 10, fontFamily: 'inherit', fontSize: 16, background: '#f8fafc' }} />
            {formError.description && <Typography color="error" fontSize={13}>{formError.description}</Typography>}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 32%' }, minWidth: 160 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Shelf Life</InputLabel>
              <TextField fullWidth size="small" value={shelfLife} onChange={e => setShelfLife(e.target.value)} sx={{ mb: 2 }} error={!!formError.shelfLife} helperText={formError.shelfLife} />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 32%' }, minWidth: 160 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Brand Name</InputLabel>
              <TextField fullWidth size="small" value={brandName} onChange={e => setBrandName(e.target.value)} sx={{ mb: 2 }} error={!!formError.brandName} helperText={formError.brandName} />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 32%' }, minWidth: 160 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Expires On or After</InputLabel>
              <TextField fullWidth size="small" value={expiresOn} onChange={e => setExpiresOn(e.target.value)} sx={{ mb: 2 }} error={!!formError.expiresOn} helperText={formError.expiresOn} />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 32%' }, minWidth: 160 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Country of Origin</InputLabel>
              <TextField fullWidth size="small" value={country} onChange={e => setCountry(e.target.value)} sx={{ mb: 2 }} error={!!formError.country} helperText={formError.country} />
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>How to Use:</InputLabel>
            <TextareaAutosize minRows={2} value={howToUse} onChange={e => setHowToUse(e.target.value)} style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: '1px solid #e0e0e0', padding: 10, fontFamily: 'inherit', fontSize: 16, background: '#f8fafc' }} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Benefits</InputLabel>
            <TextareaAutosize minRows={2} value={benefits} onChange={e => setBenefits(e.target.value)} style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: '1px solid #e0e0e0', padding: 10, fontFamily: 'inherit', fontSize: 16, background: '#f8fafc' }} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Side Effects</InputLabel>
            <TextareaAutosize minRows={2} value={sideEffects} onChange={e => setSideEffects(e.target.value)} style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: '1px solid #e0e0e0', padding: 10, fontFamily: 'inherit', fontSize: 16, background: '#f8fafc' }} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Manufacturer Details:</InputLabel>
            <TextareaAutosize minRows={2} value={manufacturer} onChange={e => setManufacturer(e.target.value)} style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: '1px solid #e0e0e0', padding: 10, fontFamily: 'inherit', fontSize: 16, background: '#f8fafc' }} />
            {formError.manufacturer && <Typography color="error" fontSize={13}>{formError.manufacturer}</Typography>}
          </Box>
          {/* File Upload */}
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Product Images</InputLabel>
            <Box
              sx={{ border: '2px dashed #13bfa6', borderRadius: 3, p: { xs: 4, md: 8 }, textAlign: 'center', background: '#f8fafc', mb: 2, width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 180 }}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: 'pointer' }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/jpeg,image/png,image/jpg"
                multiple
                hidden
                onChange={handleFileChange}
              />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CloudUploadIcon sx={{ fontSize: 60, color: '#13bfa6', mb: 1 }} />
                <Typography variant="h6" color="#13bfa6" sx={{ fontWeight: 600 }}>Drag and Drop file</Typography>
                <Button variant="contained" sx={{ mt: 1, background: '#13bfa6', fontWeight: 600 }} onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}>Browse</Button>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>Note: Image dimensions should be 600 x 600. Max 5 files, 5MB each.</Typography>
                {formError.files && <Typography color="error" fontSize={13}>{formError.files}</Typography>}
              </Box>
              {/* File List */}
              {files.length > 0 && (
                <Box sx={{ flex: 1, width: '100%', maxWidth: 320, background: '#fff', borderRadius: 2, boxShadow: 1, p: 2, minHeight: 120 }}>
                  {files.map((file, idx) => (
                    <Box key={file.name + idx} sx={{ display: 'flex', alignItems: 'center', mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
                      {getFileIcon(file.type)}
                      <Typography sx={{ ml: 1, flex: 1, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</Typography>
                      <IconButton size="small" onClick={e => { e.stopPropagation(); handleRemoveFile(idx); }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button type="submit" variant="contained" sx={{ background: '#13bfa6', fontWeight: 600, px: 4, py: 1.5, fontSize: 18, borderRadius: 2 }}>
              + Add Product
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default AddProduct; 