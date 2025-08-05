import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  CircularProgress,
  Alert,
  Snackbar,
  Backdrop,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import instance from '../../utils/Instance';
import { getVendorProfile, updateVendorProfile } from '../../utils/Service';
import { getUserInfoFromToken } from '../../utils/jwtUtils';
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "../../styles/countryStateCity.css";
import PDFIcon from '../../assets/PDFIcon.png';
import ExcelIcon from '../../assets/ExcelIcon.jpg';
import JpegIcon from '../../assets/JpegIcon.png';
import PngIcon from '../../assets/PngIcon.png';
import WordIcon from '../../assets/WordIcon.jpg';
import JpgIcon from '../../assets/JpgIcon.png';

// Styled file input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [vendorData, setVendorData] = useState(null);

  const [allData, setAllData] = useState({
    addressLine1: "", 
    addressLine2: "", 
    number: "", 
    city: "", 
    state: "", 
    pincode: "", 
    vendorType: "", 
    country: "",
    type: "", // Add type field
    additionalInformation: [], // Add additional information array
    files: {}, // Add files object
    email: "", // Add email field
    userName: "", // Add userName field
    fullName: "" // Add fullName field
  });
  const [errorMsg, setErrorMsg] = useState({ 
    addressLine1Error: '', 
    numberError: "", 
    cityError: "", 
    stateError: "", 
    pincodeError: "", 
    vendorTypeError: "", 
    countryError: "",
    fullNameError: ""
  });
  
  // Country, State, City dropdown states
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [manufacturingImage, setManufacturingImage] = useState({
    mdmLicense: null,
    gst: null,
    bis: null,
    iso: null,
    loanLicense: null,
    establishmentProof: null,
    dl: null,
    fda: null,
    cfDL: null,
    cfGumasta: null,
    cfGst: null,
    cfEstablishmentProof: null,
    cfAuthorization: null,
  });
  const [manufacturingImageFile, setManufacturingImageFile] = useState({
    mdmLicense: null,
    gst: null,
    bis: null,
    iso: null,
    loanLicense: null,
    establishmentProof: null,
    dl: null,
    fda: null,
    cfDL: null,
    cfGumasta: null,
    cfGst: null,
    cfEstablishmentProof: null,
    cfAuthorization: null,
  });
  const [imageType, setImageType] = useState({
    mdmLicense: "",
    gst: "",
    bis: "",
    iso: "",
    loanLicense: "",
    establishmentProof: "",
    dl: "",
    fda: "",
    cfDL: "",
    cfGumasta: "",
    cfGst: "",
    cfEstablishmentProof: "",
    cfAuthorization: "",
  });
  const [featureImage, setFeatureImage] = useState(null);
  const [labelChanges, setLabelChanges] = useState("");
  const type = sessionStorage.getItem("userType");
  
  // Add state variables for prefilling
  const [prefillData, setPrefillData] = useState({
    country: null,
    state: null,
    city: null
  });

  useEffect(() => {
    fetchVendorData();
  }, []);

  // Handle sequential prefilling of country, state, city
  useEffect(() => {
    if (prefillData.country && !country) {
      setCountry(prefillData.country);
    }
  }, [prefillData.country, country]);

  useEffect(() => {
    if (prefillData.state && country && !currentState) {
      setCurrentState(prefillData.state);
    }
  }, [prefillData.state, country, currentState]);

  useEffect(() => {
    if (prefillData.city && currentState && !currentCity) {
      setCurrentCity(prefillData.city);
    }
  }, [prefillData.city, currentState, currentCity]);

  // Debug useEffect to monitor allData changes
  useEffect(() => {
    console.log('allData changed:', allData);
  }, [allData]);

  const fetchVendorData = async () => {
    try {
      setLoading(true);
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        navigate('/');
        return;
      }

      // Debug: Check what's stored in session storage
      const vendorDataFromSession = sessionStorage.getItem('userData');
      console.log('Vendor data from session storage:', vendorDataFromSession);
      if (vendorDataFromSession) {
        try {
          const parsedVendorData = JSON.parse(vendorDataFromSession);
          console.log('Parsed vendor data from session:', parsedVendorData);
        } catch (e) {
          console.error('Error parsing vendor data from session:', e);
        }
      }

      const userInfo = getUserInfoFromToken();
      console.log('Vendor info from JWT:', userInfo);
      console.log('JWT token:', jwt);
      
      if (!userInfo || !userInfo.id) {
        console.error('Vendor information not found in JWT:', userInfo);
        setMessage('Vendor information not found');
        setSeverity('error');
        setShowMessage(true);
        return;
      }
      
      console.log('Fetching vendor data for ID:', userInfo.id);
      const response = await getVendorProfile(userInfo.id);
      console.log('Vendor API response:', response);
      
      if (response.data.success) {
        const data = response.data.data;
        setVendorData(data);
        
        // Parse address into addressLine1 and addressLine2
        const addressParts = data.address ? data.address.split(', ') : ['', ''];
        const addressLine1 = addressParts[0] || '';
        const addressLine2 = addressParts.slice(1).join(', ') || '';
        
        // Populate form with existing data
        const formData = {
          fullName: data.name || '',
          number: data.phone || '',
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          country: data.country || '',
          state: data.state || '',
          city: data.city || '',
          pincode: data.postalCode || '',
          vendorType: data.type || '', // Use data.type instead of data.vendorType
          additionalInformation: data.additionalInformation || [],
          files: data.files || {},
          email: data.email || '',
          userName: data.name || ''
        };
        console.log('Setting form data:', formData);
        setAllData(formData);

        // Set the vendor type selection based on existing type
        if (data.type) {
          console.log('Setting vendor type to:', data.type);
          setLabelChanges(data.type);
        }

        // Store country, state, city data for sequential prefilling
        if (data.country || data.state || data.city) {
          const countryObj = data.country ? { name: data.country, id: 101 } : null; // India has ID 101
          const stateObj = data.state ? { name: data.state, id: 4035 } : null; // Tamil Nadu has ID 4035
          const cityObj = data.city ? { name: data.city, id: 1 } : null;
          
          setPrefillData({
            country: countryObj,
            state: stateObj,
            city: cityObj
          });
          
          // Set the values immediately for immediate display
          if (countryObj) setCountry(countryObj);
          if (stateObj) setCurrentState(stateObj);
          if (cityObj) setCurrentCity(cityObj);
        }

        // Handle existing files if any
        if (data.files && Array.isArray(data.files) && data.files.length > 0) {
          // Convert array of file URLs to object format for display
          const existingFiles = {};
          data.files.forEach((fileUrl, index) => {
            // Extract filename from URL
            const fileName = fileUrl.split('/').pop();
            existingFiles[`file${index}`] = {
              name: fileName,
              url: fileUrl
            };
          });
          setManufacturingImageFile(existingFiles);
          
          // Also set the manufacturing image previews for display
          const imagePreviews = {};
          data.files.forEach((fileUrl, index) => {
            imagePreviews[`file${index}`] = fileUrl;
          });
          setManufacturingImage(imagePreviews);
        }
      } else {
        console.error('API returned error:', response.data);
        setMessage(response.data.message || 'Failed to load vendor data');
        setSeverity('error');
        setShowMessage(true);
      }
    } catch (error) {
      console.error('Error fetching vendor data:', error);
      console.error('Error response:', error.response);
      setMessage('Failed to load vendor data');
      setSeverity('error');
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle vendor type selection
  const handleUserTypeChange = (userType) => {
    setLabelChanges(userType);
    setAllData({ ...allData, vendorType: userType });
  };

  // Handle additional information changes
  const handleAdditionalInfoChange = (fieldName, value) => {
    setAllData(prev => ({
      ...prev,
      additionalInformation: prev.additionalInformation.map(item => 
        item.field === fieldName ? { ...item, value } : item
      )
    }));
  };

  // Handle additional file changes
  const handleAdditionalFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setMessage('File size must be less than 10MB');
        setSeverity('error');
        setShowMessage(true);
        return;
      }
      
      setAllData(prev => ({
        ...prev,
        files: {
          ...prev.files,
          [fieldName]: {
            file: file,
            name: file.name,
            type: file.type,
            size: file.size
          }
        }
      }));
    }
  };

  // Get file type name for display
  const getFileTypeName = (fieldName) => {
    const fileTypeNames = {
      mdmLicense: "MDM License",
      gst: "GST Certificate",
      bis: "BIS Certificate",
      iso: "ISO Certificate",
      loanLicense: "Loan License",
      establishmentProof: "Establishment Proof",
      dl: "Drug License",
      fda: "FDA Certificate",
      cfDL: "CF Drug License",
      cfGumasta: "CF Gumasta",
      cfGst: "CF GST Certificate",
      cfEstablishmentProof: "CF Establishment Proof",
      cfAuthorization: "CF Authorization"
    };
    return fileTypeNames[fieldName] || fieldName;
  };

  // Remove file
  const removeFile = (fieldName) => {
    setAllData(prev => ({
      ...prev,
      files: {
        ...prev.files,
        [fieldName]: null
      }
    }));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleChange = (e) => {
    setAllData({ ...allData, [e.target.id]: e.target.value })
    if (e.target.id === "addressLine1") {
      setErrorMsg({ ...errorMsg, addressLine1Error: "" });
    }
    if (e.target.id === "addressLine2") {
      setErrorMsg({ ...errorMsg, addressLine1Error: "" });
    }
    if (e.target.id === "number") {
      setErrorMsg({ ...errorMsg, numberError: "" });
    }
    if (e.target.id === "pincode") {
      setErrorMsg({ ...errorMsg, pincodeError: "" });
    }
  }

  // Handle country selection
  const handleCountryChange = (_country) => {
    setCountry(_country);
    setAllData({ ...allData, country: _country?.name || "" });
    setErrorMsg({ ...errorMsg, countryError: "" });
    // Reset state and city when country changes
    setCurrentState(null);
    setCurrentCity(null);
    setAllData({ ...allData, country: _country?.name || "", state: "", city: "" });
  };

  // Handle state selection
  const handleStateChange = (_state) => {
    setCurrentState(_state);
    setAllData({ ...allData, state: _state?.name || "" });
    setErrorMsg({ ...errorMsg, stateError: "" });
    // Reset city when state changes
    setCurrentCity(null);
    setAllData({ ...allData, state: _state?.name || "", city: "" });
  };

  // Handle city selection
  const handleCityChange = (_city) => {
    setCurrentCity(_city);
    setAllData({ ...allData, city: _city?.name || "" });
    setErrorMsg({ ...errorMsg, cityError: "" });
  };

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setManufacturingImage({
        ...manufacturingImage,
        [field]: previewUrl,
      });
      setManufacturingImageFile({
        ...manufacturingImageFile,
        [field]: file,
      });
      checkingImageType(field, file)
    } else {
      alert('Please select a PNG or JPEG image.');
      setManufacturingImage({
        ...manufacturingImage,
        [field]: null,
      });
      setManufacturingImageFile({
        ...manufacturingImageFile,
        [field]: null,
      });
    }
  };

  const handleUserFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFeatureImage(URL.createObjectURL(file));
    } else {
      setFeatureImage(null);
    }
  };

  const checkingImageType = (field, file) => {
    if (allData.vendorType === "manufacturing" && file) {
      setImageType({ ...imageType, [field]: file?.name.split('.').pop() })
    } else if (allData.vendorType === "oem" && file) {
      setImageType({ ...imageType, [field]: file?.name.split('.').pop() })
    } else if (allData.vendorType === "dealer" && file) {
      setImageType({ ...imageType, [field]: file?.name.split('.').pop() })
    }
  }

  const handleSubmit = async () => {
    if (allData.fullName === "") {
      setErrorMsg({ ...errorMsg, fullNameError: "Full Name is required" });
    } else if (allData.addressLine1 === "") {
      setErrorMsg({ ...errorMsg, addressLine1Error: "Address Line 1 is required" });
    } else if (allData.number === "") {
      setErrorMsg({ ...errorMsg, numberError: "Contact Number is required" });
    } else if (allData.number.length !== 10 || !/^\d{10}$/.test(allData.number)) {
      setErrorMsg({ ...errorMsg, numberError: "Contact Number must be 10 digits" });
    } else if (!country || allData.country === "") {
      setErrorMsg({ ...errorMsg, countryError: "Country is required" });
    } else if (!currentState || allData.state === "") {
      setErrorMsg({ ...errorMsg, stateError: "State is required" });
    } else if (!currentCity || allData.city === "") {
      setErrorMsg({ ...errorMsg, cityError: "City is required" });
    } else if (allData.pincode === "") {
      setErrorMsg({ ...errorMsg, pincodeError: "Pincode is required" });
    } else if (allData.pincode.length !== 6 || !/^\d{6}$/.test(allData.pincode)) {
      setErrorMsg({ ...errorMsg, pincodeError: "Pincode must be 6 digits" });
    } else if (allData.vendorType === "") {
      setErrorMsg({ ...errorMsg, vendorTypeError: "Vendor type is required" });
    } else {
      // Validate mandatory file uploads for vendors
      let vendorFileError = "";
      
      if (allData.vendorType === "manufacturing") {
        if (!manufacturingImageFile.mdmLicense) {
          vendorFileError = "MDM License is mandatory for Manufacturing vendors";
        }
      } else if (allData.vendorType === "oem") {
        if (!manufacturingImageFile.loanLicense) {
          vendorFileError = "Loan License is mandatory for OEM vendors";
        }
        if (!manufacturingImageFile.establishmentProof) {
          vendorFileError = "Establishment Proof is mandatory for OEM vendors";
        }
      } else if (allData.vendorType === "dealer") {
        if (!manufacturingImageFile.cfDL) {
          vendorFileError = "D/L is mandatory for C&F / Super Stockist / Dealer's vendors";
        }
        if (!manufacturingImageFile.cfGumasta) {
          vendorFileError = "Gumasta is mandatory for C&F / Super Stockist / Dealer's vendors";
        }
        if (!manufacturingImageFile.cfEstablishmentProof) {
          vendorFileError = "Establishment Proof is mandatory for C&F / Super Stockist / Dealer's vendors";
        }
        if (!manufacturingImageFile.cfAuthorization) {
          vendorFileError = "Authorization of Company is mandatory for C&F / Super Stockist / Dealer's vendors";
        }
      }
      
      if (vendorFileError) {
        setErrorMsg({ ...errorMsg, vendorTypeError: vendorFileError });
        return;
      }
      
      setErrorMsg({
        addressLine1Error: '', numberError: "", cityError: "", stateError: "", pincodeError: "", vendorTypeError: "",countryError:"", fullNameError: ""
      });
      
      try {
        setLoading(true);
        
        // Get user info from token
        const userInfo = getUserInfoFromToken();
        if (!userInfo || !userInfo.id) {
          setMessage('Vendor information not found');
          setSeverity('error');
          setShowMessage(true);
          return;
        }
        
        // Prepare form data
        const formData = new FormData();
        const address = `${allData.addressLine1}, ${allData.addressLine2}`;
        
        // Append vendor ID
        formData.append('id', userInfo.id);
        console.log('Sending vendor ID to API:', userInfo.id);
        
        formData.append('address', address);
        formData.append('phone', allData.number);
        formData.append('city', allData.city);
        formData.append('state', allData.state);
        formData.append('postalCode', allData.pincode);
        formData.append('name', allData.fullName);
        formData.append('email', allData.email);
        formData.append('country', allData.country);
        formData.append('type', allData.vendorType);
        
        const fileData = Object.fromEntries(
          Object.entries(manufacturingImageFile).filter(([key, value]) => value !== null)
        );

        // Append each file individually
        Object.entries(fileData).forEach(([key, file]) => {
          formData.append('files', file);
        });

        const response = await updateVendorProfile(formData);
        
        if (response.data.success) {
          setMessage('Profile updated successfully!');
          setSeverity('success');
          setShowMessage(true);
          
          // Update session storage with new data
          const updatedVendorData = response.data.data;
          sessionStorage.setItem('userData', JSON.stringify(updatedVendorData));
          
          // Navigate to vendor dashboard after successful update
          // setTimeout(() => {
          //   navigate('/vendor');
          // }, 2000);
        } else {
          setMessage(response.data.message || 'Failed to update profile');
          setSeverity('error');
          setShowMessage(true);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setMessage(error.response?.data?.message || 'An error occurred while updating profile');
        setSeverity('error');
        setShowMessage(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setShowMessage(false);
  };

  if (loading && !vendorData) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <React.Fragment>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      {message && <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showMessage} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>}
      
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        padding: { xs: '1rem', md: '3%' }
      }}>
        {/* Main Card */}
        <Box sx={{ 
          width: { xs: '100%', md: '85%' },
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          padding: { xs: '1.5rem', md: '2.5rem' }
        }}>
          <Stack spacing={3}>
            {/* Header */}
            <Box textAlign="center">
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 1
              }}>
                Edit Vendor Profile
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Update your vendor information and documents
              </Typography>
            </Box>
            
            {/* Form Content */}
            <Box>
              <Grid container spacing={2.5}>
                {/* Basic Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Username
                  </Typography>
                  <TextField 
                    disabled 
                    fullWidth 
                    id="userName" 
                    size="medium"
                    variant="outlined"
                    value={allData.userName || ''}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Email
                  </Typography>
                  <TextField 
                    disabled 
                    fullWidth 
                    id="email" 
                    size="medium"
                    variant="outlined"
                    value={allData.email || ''}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Full Name <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  {errorMsg.fullNameError && 
                    <Typography variant="caption" sx={{ 
                      color: '#ef4444', 
                      display: 'block',
                      mb: 0.5
                    }}>
                      {errorMsg.fullNameError}
                    </Typography>
                  }
                  <TextField 
                    fullWidth 
                    id="fullName" 
                    disabled
                    size="medium"
                    variant="outlined"
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    value={allData.fullName || ''}
                    error={!!errorMsg.fullNameError}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: errorMsg.fullNameError ? '#ef4444' : '#e2e8f0',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Contact Number <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  {errorMsg.numberError && 
                    <Typography variant="caption" sx={{ 
                      color: '#ef4444', 
                      display: 'block',
                      mb: 0.5
                    }}>
                      {errorMsg.numberError}
                    </Typography>
                  }
                  <TextField 
                    value={allData.number} 
                    autoComplete='off' 
                    fullWidth 
                    id="number" 
                    size="medium"
                    variant="outlined"
                    onChange={handleChange}
                    placeholder="Enter 10-digit contact number"
                    error={!!errorMsg.numberError}
                    inputProps={{
                      maxLength: 10,
                      pattern: "[0-9]{10}"
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: errorMsg.numberError ? '#ef4444' : '#e2e8f0',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Address Line 1 <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  {errorMsg.addressLine1Error && 
                    <Typography variant="caption" sx={{ 
                      color: '#ef4444', 
                      display: 'block',
                      mb: 0.5
                    }}>
                      {errorMsg.addressLine1Error}
                    </Typography>
                  }
                  <TextField 
                    value={allData.addressLine1} 
                    autoComplete='off' 
                    fullWidth 
                    id="addressLine1" 
                    size="medium"
                    variant="outlined"
                    onChange={handleChange}
                    placeholder="Enter address line 1"
                    error={!!errorMsg.addressLine1Error}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: errorMsg.addressLine1Error ? '#ef4444' : '#e2e8f0',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Address Line 2
                  </Typography>
                  <TextField 
                    value={allData.addressLine2} 
                    autoComplete='off' 
                    fullWidth 
                    id="addressLine2" 
                    size="medium"
                    variant="outlined"
                    onChange={handleChange}
                    placeholder="Enter address line 2 (optional)"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Country <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  {errorMsg.countryError && 
                    <Typography variant="caption" sx={{ 
                      color: '#ef4444', 
                      display: 'block',
                      mb: 0.5
                    }}>
                      {errorMsg.countryError}
                    </Typography>
                  }
                  <CountrySelect
                    containerClassName="form-group"
                    inputClassName=""
                    onChange={handleCountryChange}
                    onTextChange={(_txt) => console.log(_txt)}
                    defaultValue={country}
                    placeHolder="Select Country"
                    style={{
                      border: errorMsg.countryError ? '1px solid #ef4444' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      width: '100%'
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    State <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  {errorMsg.stateError && 
                    <Typography variant="caption" sx={{ 
                      color: '#ef4444', 
                      display: 'block',
                      mb: 0.5
                    }}>
                      {errorMsg.stateError}
                    </Typography>
                  }
                  <StateSelect
                    countryid={country?.id}
                    containerClassName="form-group"
                    inputClassName=""
                    onChange={handleStateChange}
                    onTextChange={(_txt) => console.log(_txt)}
                    defaultValue={currentState}
                    placeHolder="Select State"
                    style={{
                      border: errorMsg.stateError ? '1px solid #ef4444' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      width: '100%'
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    City <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  {errorMsg.cityError && 
                    <Typography variant="caption" sx={{ 
                      color: '#ef4444', 
                      display: 'block',
                      mb: 0.5
                    }}>
                      {errorMsg.cityError}
                    </Typography>
                  }
                  <CitySelect
                    countryid={country?.id}
                    stateid={currentState?.id}
                    onChange={handleCityChange}
                    defaultValue={currentCity}
                    placeHolder="Select City"
                    style={{
                      border: errorMsg.cityError ? '1px solid #ef4444' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      width: '100%'
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Pincode <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  {errorMsg.pincodeError && 
                    <Typography variant="caption" sx={{ 
                      color: '#ef4444', 
                      display: 'block',
                      mb: 0.5
                    }}>
                      {errorMsg.pincodeError}
                    </Typography>
                  }
                  <TextField 
                    value={allData.pincode} 
                    autoComplete='off' 
                    fullWidth 
                    id="pincode" 
                    size="medium"
                    variant="outlined"
                    onChange={handleChange}
                    placeholder="Enter 6-digit pincode"
                    error={!!errorMsg.pincodeError}
                    inputProps={{
                      maxLength: 6,
                      pattern: "[0-9]{6}"
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: errorMsg.pincodeError ? '#ef4444' : '#e2e8f0',
                        },
                      }
                    }}
                  />
                </Grid>
                
                {/* Vendor Type Selection */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Type of vendors <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  {errorMsg.vendorTypeError &&
                    <Typography variant="caption" sx={{ 
                      color: '#ef4444', 
                      display: 'block',
                      mb: 0.5
                    }}>
                      {errorMsg.vendorTypeError}
                    </Typography>
                  }
                  <FormControl fullWidth>
                    <RadioGroup
                      row
                      value={allData.vendorType}
                      onChange={e => {
                        setAllData({ ...allData, vendorType: e.target.value })
                        setErrorMsg({ ...errorMsg, vendorTypeError: "" })
                      }}
                      sx={{
                        '& .MuiFormControlLabel-root': {
                          marginRight: '2rem',
                          marginBottom: '0.5rem'
                        },
                        '& .MuiRadio-root': {
                          color: '#cbd5e1',
                          '&.Mui-checked': {
                            color: '#009e92',
                          },
                        },
                        '& .MuiFormControlLabel-label': {
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#475569'
                        }
                      }}
                    >
                      <FormControlLabel value="manufacturing" control={<Radio />} label="Manufacturing" />
                      <FormControlLabel value="oem" control={<Radio />} label="OEM" />
                      <FormControlLabel value="dealer" control={<Radio />} label="C&F / Super Stockist / Dealer's" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              
                {/* Display existing files */}
                {vendorData && vendorData.files && Array.isArray(vendorData.files) && vendorData.files.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Existing Files
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 2, 
                      padding: '1rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8f9fa'
                    }}>
                      {vendorData.files.map((fileUrl, index) => {
                        const fileName = fileUrl.split('/').pop();
                        const fileExtension = fileName.split('.').pop()?.toLowerCase();
                        return (
                          <Box key={index} sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '0.75rem', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '6px',
                            backgroundColor: '#fff',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                          }}>
                            <img 
                              src={
                                fileExtension === "pdf" ? PDFIcon : 
                                fileExtension === "docx" || fileExtension === "doc" ? WordIcon : 
                                fileExtension === "png" ? PngIcon : 
                                fileExtension === "jpeg" || fileExtension === "jpg" ? JpegIcon : 
                                fileExtension === "xlsx" || fileExtension === "xls" ? ExcelIcon : 
                                PngIcon
                              } 
                              alt='' 
                              style={{ height: '20px', width: '20px', marginRight: '8px' }} 
                            />
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ 
                                wordBreak: 'break-all', 
                                fontWeight: '500',
                                color: '#1e293b',
                                textDecoration: 'none',
                                fontSize: '14px'
                              }}
                            >
                              {fileName}
                            </a>
                          </Box>
                        );
                      })}
                    </Box>
                  </Grid>
                )}
              
                {/* Manufacturing Vendor Files */}
                {allData.vendorType === "manufacturing" && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        MDM License <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload MDM License
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'mdmLicense')}
                        />
                      </Button>
                      {manufacturingImage.mdmLicense && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.mdmLicense?.name || 'MDM License Document'}
                              </Typography>
                              {manufacturingImageFile.mdmLicense?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.mdmLicense.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, mdmLicense: null});
                                setManufacturingImageFile({...manufacturingImageFile, mdmLicense: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        GST Certificate
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload GST Certificate
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'gst')}
                        />
                      </Button>
                      {manufacturingImage.gst && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.gst?.name || 'GST Certificate'}
                              </Typography>
                              {manufacturingImageFile.gst?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.gst.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, gst: null});
                                setManufacturingImageFile({...manufacturingImageFile, gst: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </>
                )}
                {/* OEM Vendor Files */}
                {allData.vendorType === "oem" && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Loan License <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload Loan License
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'loanLicense')}
                        />
                      </Button>
                      {manufacturingImage.loanLicense && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.loanLicense?.name || 'Loan License Document'}
                              </Typography>
                              {manufacturingImageFile.loanLicense?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.loanLicense.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, loanLicense: null});
                                setManufacturingImageFile({...manufacturingImageFile, loanLicense: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Establishment Proof <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload Establishment Proof
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'establishmentProof')}
                        />
                      </Button>
                      {manufacturingImage.establishmentProof && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.establishmentProof?.name || 'Establishment Proof Document'}
                              </Typography>
                              {manufacturingImageFile.establishmentProof?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.establishmentProof.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, establishmentProof: null});
                                setManufacturingImageFile({...manufacturingImageFile, establishmentProof: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        D/L (Optional)
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload D/L
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'dl')}
                        />
                      </Button>
                      {manufacturingImage.dl && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.dl?.name || 'D/L Document'}
                              </Typography>
                              {manufacturingImageFile.dl?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.dl.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, dl: null});
                                setManufacturingImageFile({...manufacturingImageFile, dl: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        ISO/FDA/CE (Optional)
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload ISO/FDA/CE
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'fda')}
                        />
                      </Button>
                      {manufacturingImage.fda && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.fda?.name || 'ISO/FDA/CE Document'}
                              </Typography>
                              {manufacturingImageFile.fda?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.fda.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, fda: null});
                                setManufacturingImageFile({...manufacturingImageFile, fda: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </>
                )}
                {/* Dealer Vendor Files */}
                {allData.vendorType === "dealer" && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        D/L <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload D/L
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'cfDL')}
                        />
                      </Button>
                      {manufacturingImage.cfDL && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.cfDL?.name || 'D/L Document'}
                              </Typography>
                              {manufacturingImageFile.cfDL?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.cfDL.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, cfDL: null});
                                setManufacturingImageFile({...manufacturingImageFile, cfDL: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Gumasta <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload Gumasta
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'cfGumasta')}
                        />
                      </Button>
                      {manufacturingImage.cfGumasta && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.cfGumasta?.name || 'Gumasta Document'}
                              </Typography>
                              {manufacturingImageFile.cfGumasta?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.cfGumasta.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, cfGumasta: null});
                                setManufacturingImageFile({...manufacturingImageFile, cfGumasta: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        GST (Optional)
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload GST
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'cfGst')}
                        />
                      </Button>
                      {manufacturingImage.cfGst && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.cfGst?.name || 'GST Document'}
                              </Typography>
                              {manufacturingImageFile.cfGst?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.cfGst.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, cfGst: null});
                                setManufacturingImageFile({...manufacturingImageFile, cfGst: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Establishment Proof <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload Establishment Proof
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'cfEstablishmentProof')}
                        />
                      </Button>
                      {manufacturingImage.cfEstablishmentProof && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.cfEstablishmentProof?.name || 'Establishment Proof Document'}
                              </Typography>
                              {manufacturingImageFile.cfEstablishmentProof?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.cfEstablishmentProof.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, cfEstablishmentProof: null});
                                setManufacturingImageFile({...manufacturingImageFile, cfEstablishmentProof: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Authorization of Company <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Button
                        sx={{ 
                          textTransform: 'none', 
                          fontSize: '14px', 
                          backgroundColor: '#009e92',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          '&:hover': {
                            backgroundColor: '#027a6f'
                          }
                        }}
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        Upload Authorization
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) => handleFileChange(e, 'cfAuthorization')}
                        />
                      </Button>
                      {manufacturingImage.cfAuthorization && (
                        <Box sx={{ 
                          marginTop: '1rem', 
                          border: '1px solid #e2e8f0', 
                          padding: '1rem', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                {manufacturingImageFile.cfAuthorization?.name || 'Authorization Document'}
                              </Typography>
                              {manufacturingImageFile.cfAuthorization?.size && (
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  Size: {formatFileSize(manufacturingImageFile.cfAuthorization.size)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setManufacturingImage({...manufacturingImage, cfAuthorization: null});
                                setManufacturingImageFile({...manufacturingImageFile, cfAuthorization: null});
                              }}
                              sx={{ 
                                minWidth: 'auto', 
                                padding: '0.5rem 1rem',
                                borderRadius: '6px'
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </>
                )}
            </Grid>
          </Box>
          
          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            variant='contained' 
            fullWidth
            size="large"
            sx={{ 
              borderRadius: '8px',
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: '#009e92',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#027a6f',
                boxShadow: 'none'
              }
            }}
          >
            Update Profile
          </Button>
        </Stack>
      </Box>
      
      {/* Footer */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  </React.Fragment>
  );
};

export default EditProfile; 