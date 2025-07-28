import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
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
  CircularProgress,
  TextField,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearError, clearSuccess, updateProductData } from '../reducers/ProductReducer';
import { useNavigate, useParams } from 'react-router-dom';

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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { currentProduct, loading, error, success, message } = useSelector((state) => state.productReducer);

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
  const [thumbnail, setThumbnail] = useState(null);
  const [fileError, setFileError] = useState('');
  const [thumbnailError, setThumbnailError] = useState('');
  const [formError, setFormError] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef();
  const thumbnailInputRef = useRef();

  // Fetch product data on component mount
  useEffect(() => {
    if (id) {
      console.log('Fetching product with ID:', id);
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  // Populate form when product data is loaded
  useEffect(() => {
    if (currentProduct) {
      console.log('Product data loaded:', currentProduct);
      setCategory(currentProduct.category || '');
      setSubcategory(currentProduct.subCategory || '');
      setProductName(currentProduct.name || '');
      setPrice(currentProduct.price || '');
      setPriceLabel(currentProduct.priceLable || '');
      setDescription(currentProduct.description || '');
      setBrandName(currentProduct.brandName || '');
      setBenefits(currentProduct.benefits || '');
      setExpiresOn(currentProduct.expiresOn || '');
      
      // Handle additional information
      if (currentProduct.additionalInformation) {
        const additionalInfo = typeof currentProduct.additionalInformation === 'string' 
          ? JSON.parse(currentProduct.additionalInformation) 
          : currentProduct.additionalInformation;
        
        setShelfLife(additionalInfo.shelfLife || '');
        setCountry(additionalInfo.country || '');
        setHowToUse(additionalInfo.howToUse || '');
        setSideEffects(additionalInfo.sideEffects || '');
        setManufacturer(additionalInfo.manufacturer || '');
      }
    }
  }, [currentProduct]);

  // Handle success and error messages
  useEffect(() => {
    if (success && message) {
      setSnackbar({ open: true, message, severity: 'success' });
      dispatch(clearSuccess());
      // If we were editing and the update was successful, exit edit mode
      if (isEditing) {
        setIsEditing(false);
      }
    } else if (error) {
      const errorMessage = error.message || 'An error occurred';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      dispatch(clearError());
    }
  }, [success, error, message, dispatch, isEditing]);

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

  // Thumbnail handling
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setThumbnailError('Only image files are allowed for thumbnail.');
      setSnackbar({ open: true, message: 'Only image files are allowed for thumbnail.', severity: 'error' });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setThumbnailError('Thumbnail must be less than 5MB.');
      setSnackbar({ open: true, message: 'Thumbnail must be less than 5MB.', severity: 'error' });
      return;
    }

    setThumbnail(file);
    setThumbnailError('');
    e.target.value = '';
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setThumbnailError('');
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
    if (!thumbnail && !currentProduct?.thumbnailImage) errors.thumbnail = 'Thumbnail image is required';
    if (files.length === 0 && (!currentProduct?.galleryImage || currentProduct.galleryImage.length === 0)) {
      errors.files = 'At least one gallery image is required';
    }
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

    // Prepare product data for Redux
    const productData = {
      id: currentProduct.id,
      name: productName,
      description: description,
      category: category,
      subcategory: subcategory,
      price: price,
      priceLabel: priceLabel,
      brandName: brandName,
      benefits: benefits,
      expiresOn: expiresOn,
      shelfLife: shelfLife,
      country: country,
      howToUse: howToUse,
      sideEffects: sideEffects,
      manufacturer: manufacturer,
      files: files,
      thumbnail: thumbnail
    };

    // Dispatch update action
    dispatch(updateProductData(productData));
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original data
    if (currentProduct) {
      setCategory(currentProduct.category || '');
      setSubcategory(currentProduct.subCategory || '');
      setProductName(currentProduct.name || '');
      setPrice(currentProduct.price || '');
      setPriceLabel(currentProduct.priceLable || '');
      setDescription(currentProduct.description || '');
      setBrandName(currentProduct.brandName || '');
      setBenefits(currentProduct.benefits || '');
      setExpiresOn(currentProduct.expiresOn || '');
      
      if (currentProduct.additionalInformation) {
        const additionalInfo = typeof currentProduct.additionalInformation === 'string' 
          ? JSON.parse(currentProduct.additionalInformation) 
          : currentProduct.additionalInformation;
        
        setShelfLife(additionalInfo.shelfLife || '');
        setCountry(additionalInfo.country || '');
        setHowToUse(additionalInfo.howToUse || '');
        setSideEffects(additionalInfo.sideEffects || '');
        setManufacturer(additionalInfo.manufacturer || '');
      }
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  // Loading state
  if (loading && !currentProduct) {
    console.log('Loading state: loading =', loading, 'currentProduct =', currentProduct);
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  console.log('Render state: loading =', loading, 'currentProduct =', currentProduct, 'id =', id);

  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', p: { xs: 1, sm: 3 }, width: '100%' }}>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button 
          startIcon={<ArrowBackIosNewIcon />} 
          sx={{ color: '#222', fontWeight: 600, textTransform: 'uppercase', fontSize: 13, pl: 0 }}
          onClick={() => navigate('/vendor/products')}
        >
          Back
        </Button>
      </Box>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4, md: 6 }, width: '100%', borderRadius: 3, boxShadow: 2, background: '#fff' }}>
          {/* Header with Edit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#222' }}>
              {isEditing ? 'Edit Product' : 'Product Details'}
            </Typography>
            {!isEditing && currentProduct && (
              <Button
                variant="contained"
                sx={{ background: '#13bfa6', fontWeight: 600, px: 3, py: 1 }}
                onClick={() => setIsEditing(true)}
              >
                Edit Product
              </Button>
            )}
          </Box>

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
                  disabled={!isEditing}
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
                  disabled={!category || !isEditing}
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
            <TextField 
              fullWidth 
              size="small" 
              value={productName} 
              onChange={e => setProductName(e.target.value)} 
              placeholder="3-Ply Disposable Surgical Face Mask (Pack of 100)" 
              sx={{ mb: 2 }} 
              error={!!formError.productName} 
              helperText={formError.productName}
              disabled={!isEditing}
            />
          </Box>
          {/* Price and Price Label side by side */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%' }, minWidth: 180 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Price</InputLabel>
              <TextField 
                fullWidth 
                size="small" 
                value={price} 
                onChange={e => setPrice(e.target.value.replace(/[^0-9.]/g, ''))} 
                placeholder="1170" 
                sx={{ mb: 2 }} 
                error={!!formError.price} 
                helperText={formError.price}
                disabled={!isEditing}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%' }, minWidth: 180 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Price Label</InputLabel>
              <TextField 
                fullWidth 
                size="small" 
                value={priceLabel} 
                onChange={e => setPriceLabel(e.target.value)} 
                placeholder="Pack of 100 masks" 
                sx={{ mb: 2 }} 
                error={!!formError.priceLabel} 
                helperText={formError.priceLabel}
                disabled={!isEditing}
              />
            </Box>
          </Box>
          {/* The rest of the form fields */}
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Product Description</InputLabel>
            <TextareaAutosize 
              minRows={3} 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              style={{ 
                width: '100%', 
                marginBottom: 8, 
                borderRadius: 6, 
                border: '1px solid #e0e0e0', 
                padding: 10, 
                fontFamily: 'inherit', 
                fontSize: 16, 
                background: '#f8fafc',
                opacity: isEditing ? 1 : 0.7,
                pointerEvents: isEditing ? 'auto' : 'none'
              }} 
            />
            {formError.description && <Typography color="error" fontSize={13}>{formError.description}</Typography>}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 32%' }, minWidth: 160 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Shelf Life</InputLabel>
              <TextField 
                fullWidth 
                size="small" 
                value={shelfLife} 
                onChange={e => setShelfLife(e.target.value)} 
                sx={{ mb: 2 }} 
                error={!!formError.shelfLife} 
                helperText={formError.shelfLife}
                disabled={!isEditing}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 32%' }, minWidth: 160 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Brand Name</InputLabel>
              <TextField 
                fullWidth 
                size="small" 
                value={brandName} 
                onChange={e => setBrandName(e.target.value)} 
                sx={{ mb: 2 }} 
                error={!!formError.brandName} 
                helperText={formError.brandName}
                disabled={!isEditing}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 32%' }, minWidth: 160 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Expires On or After</InputLabel>
              <TextField 
                fullWidth 
                size="small" 
                value={expiresOn} 
                onChange={e => setExpiresOn(e.target.value)} 
                sx={{ mb: 2 }} 
                error={!!formError.expiresOn} 
                helperText={formError.expiresOn}
                disabled={!isEditing}
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 32%' }, minWidth: 160 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Country of Origin</InputLabel>
              <TextField 
                fullWidth 
                size="small" 
                value={country} 
                onChange={e => setCountry(e.target.value)} 
                sx={{ mb: 2 }} 
                error={!!formError.country} 
                helperText={formError.country}
                disabled={!isEditing}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>How to Use:</InputLabel>
            <TextareaAutosize 
              minRows={2} 
              value={howToUse} 
              onChange={e => setHowToUse(e.target.value)} 
              style={{ 
                width: '100%', 
                marginBottom: 8, 
                borderRadius: 6, 
                border: '1px solid #e0e0e0', 
                padding: 10, 
                fontFamily: 'inherit', 
                fontSize: 16, 
                background: '#f8fafc',
                opacity: isEditing ? 1 : 0.7,
                pointerEvents: isEditing ? 'auto' : 'none'
              }} 
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Benefits</InputLabel>
            <TextareaAutosize 
              minRows={2} 
              value={benefits} 
              onChange={e => setBenefits(e.target.value)} 
              style={{ 
                width: '100%', 
                marginBottom: 8, 
                borderRadius: 6, 
                border: '1px solid #e0e0e0', 
                padding: 10, 
                fontFamily: 'inherit', 
                fontSize: 16, 
                background: '#f8fafc',
                opacity: isEditing ? 1 : 0.7,
                pointerEvents: isEditing ? 'auto' : 'none'
              }} 
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Side Effects</InputLabel>
            <TextareaAutosize 
              minRows={2} 
              value={sideEffects} 
              onChange={e => setSideEffects(e.target.value)} 
              style={{ 
                width: '100%', 
                marginBottom: 8, 
                borderRadius: 6, 
                border: '1px solid #e0e0e0', 
                padding: 10, 
                fontFamily: 'inherit', 
                fontSize: 16, 
                background: '#f8fafc',
                opacity: isEditing ? 1 : 0.7,
                pointerEvents: isEditing ? 'auto' : 'none'
              }} 
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Manufacturer Details:</InputLabel>
            <TextareaAutosize 
              minRows={2} 
              value={manufacturer} 
              onChange={e => setManufacturer(e.target.value)} 
              style={{ 
                width: '100%', 
                marginBottom: 8, 
                borderRadius: 6, 
                border: '1px solid #e0e0e0', 
                padding: 10, 
                fontFamily: 'inherit', 
                fontSize: 16, 
                background: '#f8fafc',
                opacity: isEditing ? 1 : 0.7,
                pointerEvents: isEditing ? 'auto' : 'none'
              }} 
            />
            {formError.manufacturer && <Typography color="error" fontSize={13}>{formError.manufacturer}</Typography>}
          </Box>

          {/* Display Current Thumbnail - Only show when not editing */}
          {!isEditing && currentProduct?.thumbnailImage && (
            <Box sx={{ mb: 2 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Product Thumbnail</InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, background: '#f8fafc', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <img 
                  src={currentProduct.thumbnailImage} 
                  alt="Product thumbnail" 
                  style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '8px' }} 
                />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#666' }}>
                  Current thumbnail image
                </Typography>
              </Box>
            </Box>
          )}

          {/* Display Current Gallery Images - Only show when not editing */}
          {!isEditing && currentProduct?.galleryImage && currentProduct.galleryImage.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Product Gallery Images</InputLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2, background: '#f8fafc', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                {currentProduct.galleryImage.map((imageUrl, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <img 
                      src={imageUrl} 
                      alt={`Gallery image ${index + 1}`} 
                      style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '8px' }} 
                    />
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Image {index + 1}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Thumbnail Upload - Only show in edit mode */}
          {isEditing && (
            <Box sx={{ mb: 2 }}>
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem' }} shrink>Product Thumbnail</InputLabel>
              <Box
                sx={{ border: '2px dashed #13bfa6', borderRadius: 3, p: { xs: 4, md: 6 }, textAlign: 'center', background: '#f8fafc', mb: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 120 }}
                onClick={() => thumbnailInputRef.current.click()}
                style={{ cursor: 'pointer' }}
              >
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  hidden
                  onChange={handleThumbnailChange}
                />
                {thumbnail ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <img 
                      src={URL.createObjectURL(thumbnail)} 
                      alt="Thumbnail preview" 
                      style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', borderRadius: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {thumbnail.name}
                      </Typography>
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleRemoveThumbnail(); }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ) : currentProduct?.thumbnailImage ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <img 
                      src={currentProduct.thumbnailImage} 
                      alt="Current thumbnail" 
                      style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', borderRadius: '8px' }} 
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Current thumbnail
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CloudUploadIcon sx={{ fontSize: 40, color: '#13bfa6', mb: 1 }} />
                    <Typography variant="h6" color="#13bfa6" sx={{ fontWeight: 600, mb: 1 }}>Upload Thumbnail</Typography>
                    <Button variant="contained" sx={{ background: '#13bfa6', fontWeight: 600 }} onClick={e => { e.stopPropagation(); thumbnailInputRef.current.click(); }}>Browse</Button>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>Note: Only image files allowed. Max 5MB.</Typography>
                  </Box>
                )}
              </Box>
              {formError.thumbnail && <Typography color="error" fontSize={13}>{formError.thumbnail}</Typography>}
              {thumbnailError && <Typography color="error" fontSize={13}>{thumbnailError}</Typography>}
            </Box>
          )}

          {/* File Upload - Only show in edit mode */}
          {isEditing && (
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
          )}

          {/* Action Buttons */}
          {isEditing ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button 
                variant="outlined" 
                sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: 18, borderRadius: 2 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ background: '#13bfa6', fontWeight: 600, px: 4, py: 1.5, fontSize: 18, borderRadius: 2 }}
              >
                Update Product
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button 
                variant="contained" 
                sx={{ background: '#13bfa6', fontWeight: 600, px: 4, py: 1.5, fontSize: 18, borderRadius: 2 }}
                onClick={() => setIsEditing(true)}
              >
                Edit Product
              </Button>
            </Box>
          )}
        </Paper>
      </form>
    </Box>
  );
};

export default ProductDetail; 