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
import { getCustomerById, updateCustomer } from '../../utils/Service';
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
  const [userData, setUserData] = useState(null);
  const [labelChanges, setLabelChanges] = useState("");
  const type = sessionStorage.getItem("userType");

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
    // User-specific file fields
    hospitalRegistrationCertificate: null,
    hospitalAddressProof: null,
    labRegistrationCertificate: null,
    pathologyAddressProof: null,
    diagnosticRegistrationCertificate: null,
    diagnosticAddressProof: null,
    physioEstablishmentCertificate: null,
    physioTradeLicense: null,
    physioAddressProof: null,
    rehabEstablishmentCertificate: null,
    rehabAddressProof: null,
    polyclinicTradeLicense: null,
    polyclinicClinicalCertificate: null,
    polyclinicAddressProof: null,
    studentIdCard: null,
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

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        navigate('/');
        return;
      }

      // Debug: Check what's stored in session storage
      const userDataFromSession = sessionStorage.getItem('userData');
      console.log('User data from session storage:', userDataFromSession);
      if (userDataFromSession) {
        try {
          const parsedUserData = JSON.parse(userDataFromSession);
          console.log('Parsed user data from session:', parsedUserData);
        } catch (e) {
          console.error('Error parsing user data from session:', e);
        }
      }

      const userInfo = getUserInfoFromToken();
      console.log('User info from JWT:', userInfo);
      console.log('JWT token:', jwt);
      
      if (!userInfo || !userInfo.id) {
        console.error('User information not found in JWT:', userInfo);
        setMessage('User information not found');
        setSeverity('error');
        setShowMessage(true);
        return;
      }
      
      console.log('Fetching customer data for ID:', userInfo.id);
      const response = await getCustomerById(userInfo.id);
      console.log('Customer API response:', response);
      
      if (response.data.success) {
        const data = response.data.data;
        setUserData(data);
        
        // Parse address into addressLine1 and addressLine2
        const addressParts = data.address ? data.address.split(', ') : ['', ''];
        const addressLine1 = addressParts[0] || '';
        const addressLine2 = addressParts.slice(1).join(', ') || '';
        
        // Populate form with existing data
        setAllData({
          fullName: data.name || '',
          number: data.phone || '',
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          country: data.country || '',
          state: data.state || '',
          city: data.city || '',
          pincode: data.postalCode || '',
          type: data.type || '',
          additionalInformation: data.additionalInformation || [],
          files: data.files || {},
          email: data.email || '',
          userName: data.userName || ''
        });

        // Set the user type selection based on existing type
        if (data.type) {
          // Map the type back to the radio button value
          const typeMapping = {
            "Hospital": "H",
            "Pathology Labs": "P", 
            "Diagnostic Centres": "D",
            "Physiotherapist": "Physio",
            "Rehabilitation": "Re",
            "Poly Clinic": "Pc",
            "Student": "Student"
          };
          
          const userTypeValue = typeMapping[data.type] || data.type;
          setLabelChanges(userTypeValue);
        }

        // Set country, state, city for dropdowns
        if (data.country) {
          setCountry({ name: data.country });
        }
        if (data.state) {
          setCurrentState({ name: data.state });
        }
        if (data.city) {
          setCurrentCity({ name: data.city });
        }

        // Handle existing files if any
        if (data.files && Object.keys(data.files).length > 0) {
          // Set manufacturing image files for display
          const existingFiles = {};
          Object.keys(data.files).forEach(key => {
            if (data.files[key]) {
              existingFiles[key] = data.files[key];
            }
          });
          setManufacturingImageFile(existingFiles);
        }
      } else {
        console.error('API returned error:', response.data);
        setMessage(response.data.message || 'Failed to load user data');
        setSeverity('error');
        setShowMessage(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      console.error('Error response:', error.response);
      setMessage('Failed to load user data');
      setSeverity('error');
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle user type selection
  const handleUserTypeChange = (userType) => {
    setLabelChanges(userType);
    
    // Map user type values to labels
    const typeLabels = {
      "H": "Hospital",
      "P": "Pathology Labs", 
      "D": "Diagnostic Centres",
      "Physio": "Physiotherapist",
      "Re": "Rehabilitation",
      "Pc": "Poly Clinic",
      "Student": "Student"
    };
    
    const selectedLabel = typeLabels[userType] || userType;
    
    // Clear previous type data
    setAllData(prev => ({
      ...prev,
      type: selectedLabel,
      additionalInformation: [],
      files: {}
    }));
    
    // Clear previous files
    setManufacturingImage({
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
    setManufacturingImageFile({
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
      // User-specific file fields
      hospitalRegistrationCertificate: null,
      hospitalAddressProof: null,
      labRegistrationCertificate: null,
      pathologyAddressProof: null,
      diagnosticRegistrationCertificate: null,
      diagnosticAddressProof: null,
      physioEstablishmentCertificate: null,
      physioTradeLicense: null,
      physioAddressProof: null,
      rehabEstablishmentCertificate: null,
      rehabAddressProof: null,
      polyclinicTradeLicense: null,
      polyclinicClinicalCertificate: null,
      polyclinicAddressProof: null,
      studentIdCard: null,
    });
    setFeatureImage(null);
  };

  // Handle additional information input changes
  const handleAdditionalInfoChange = (fieldName, value) => {
    setAllData(prev => {
      const existingIndex = prev.additionalInformation.findIndex(item => item.name === fieldName);
      let updatedAdditionalInfo = [...prev.additionalInformation];
      
      if (existingIndex >= 0) {
        updatedAdditionalInfo[existingIndex] = { name: fieldName, value };
      } else {
        updatedAdditionalInfo.push({ name: fieldName, value });
      }
      
      return {
        ...prev,
        additionalInformation: updatedAdditionalInfo
      };
    });
  };

  // Handle file uploads for additional information
  const handleAdditionalFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
      }
      
      // Update manufacturing image file
      setManufacturingImageFile(prev => ({
        ...prev,
        [fieldName]: file
      }));
      
      // Update allData files with file metadata
      setAllData(prev => ({
        ...prev,
        files: {
          ...prev.files,
          [fieldName]: {
            file: file,
            type: fieldName,
            name: getFileTypeName(fieldName),
            fileName: file.name,
            size: file.size,
            lastModified: file.lastModified
          }
        }
      }));
      
      checkingImageType(fieldName, file);
    }
  };

  // Function to get human-readable file type names
  const getFileTypeName = (fieldName) => {
    const fileTypeNames = {
      'hospitalRegistrationCertificate': 'Hospital Registration Certificate',
      'hospitalAddressProof': 'Hospital Address Proof',
      'labRegistrationCertificate': 'Lab Registration Certificate',
      'pathologyAddressProof': 'Pathology Address Proof',
      'diagnosticRegistrationCertificate': 'Diagnostic Registration Certificate',
      'diagnosticAddressProof': 'Diagnostic Address Proof',
      'physioEstablishmentCertificate': 'Physio Establishment Certificate',
      'physioTradeLicense': 'Physio Trade License',
      'physioAddressProof': 'Physio Address Proof',
      'rehabEstablishmentCertificate': 'Rehabilitation Establishment Certificate',
      'rehabAddressProof': 'Rehabilitation Address Proof',
      'polyclinicTradeLicense': 'Polyclinic Trade License',
      'polyclinicClinicalCertificate': 'Polyclinic Clinical Certificate',
      'polyclinicAddressProof': 'Polyclinic Address Proof',
      'studentIdCard': 'Student ID Card'
    };
    return fileTypeNames[fieldName] || fieldName;
  };

  // Function to remove uploaded file
  const removeFile = (fieldName) => {
    setManufacturingImage(prev => ({
      ...prev,
      [fieldName]: null
    }));
    
    setManufacturingImageFile(prev => ({
      ...prev,
      [fieldName]: null
    }));
    
    setAllData(prev => ({
      ...prev,
      files: {
        ...prev.files,
        [fieldName]: null
      }
    }));
  };

  // Function to format file size
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
    } else {
      setErrorMsg({
        addressLine1Error: '', numberError: "", cityError: "", stateError: "", pincodeError: "", vendorTypeError: "",countryError:"", fullNameError: ""
      });
      
      try {
        setLoading(true);
        
        // Get user info from token
        const userInfo = getUserInfoFromToken();
        if (!userInfo || !userInfo.id) {
          setMessage('User information not found');
          setSeverity('error');
          setShowMessage(true);
          return;
        }
        
        // Prepare form data
        const formData = new FormData();
        const address = `${allData.addressLine1}, ${allData.addressLine2}`;
        
        // Append user ID
        formData.append('id', userInfo.id);
        console.log('Sending user ID to API:', userInfo.id);
        
        // Append basic user data
        formData.append('name', allData.fullName);
        formData.append('email', allData.email);
        formData.append('phone', allData.number);
        formData.append('address', address);
        formData.append('city', allData.city);
        formData.append('state', allData.state);
        formData.append('country', allData.country);
        formData.append('postalCode', allData.pincode);
        formData.append('type', allData.type);
        
        // Append additional information
        allData.additionalInformation.forEach(item => {
          formData.append('additionalInformation', JSON.stringify(item));
        });
        
        // Append files with proper naming and metadata
        Object.entries(allData.files).forEach(([key, fileData]) => {
          if (fileData && fileData.file) {
            formData.append('files', fileData.file);
            formData.append('fileTypes', fileData.type);
            formData.append('fileNames', fileData.name);
          }
        });

        const response = await updateCustomer(formData);
        
        if (response.data.success) {
          setMessage('Profile updated successfully!');
          setSeverity('success');
          setShowMessage(true);
          
          // Update session storage with new data
          const updatedUserData = response.data.data;
          sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
          
          // Navigate to customer dashboard after successful update
          setTimeout(() => {
            navigate('/customer');
          }, 2000);
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

  if (loading && !userData) {
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
      <Box sx={{ height: '100%', width: '100%',backgroundColor:'#f2f3f5',padding:'4% 0' }}>
        <Box sx={{ border: 'solid 1.5px #fff', height: 'auto', margin: '0% auto', backgroundColor: '#fff', borderRadius: '15px', width: '65%' }}>
          <Stack direction='column'>
            <Typography variant='p' sx={{ margin: '2% auto', textTransform: 'capitalize',fontSize:'2rem' }}>Edit User Details</Typography>
          </Stack>
          
          <Box sx={{ width: '95%', margin: '1% auto', }}>
            <Grid container columnSpacing={2}>
              <Grid item size={6} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '1% 0 1%' }}>Username</Typography>
                <TextField disabled fullWidth id="userName" size="small" value={allData.userName || ''} />
              </Grid>
              <Grid item size={6} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '1% 0 1%' }}>Email</Typography>
                <TextField disabled fullWidth id="email" size="small" value={allData.email || ''} />
              </Grid>
              <Grid item size={6} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '3% 0 1%' }}>Full Name<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                {errorMsg.fullNameError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.fullNameError}</Typography>}
                <TextField 
                  fullWidth 
                  id="fullName" 
                  size="small" 
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  value={allData.fullName || ''}
                />
              </Grid>
               <Grid item size={6} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '3% 0 1%' }}>Contact Number<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                {errorMsg.numberError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.numberError}</Typography>}
                <TextField 
                  value={allData.number} 
                  autoComplete='off' 
                  fullWidth 
                  id="number" 
                  size="small" 
                  onChange={handleChange}
                  placeholder="Enter 10-digit contact number"
                  inputProps={{
                    maxLength: 10,
                    pattern: "[0-9]{10}"
                  }}
                />
              </Grid>
              <Grid item size={12} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '2% 0 1%', }}>Address<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                {errorMsg.addressLine1Error && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.addressLine1Error}</Typography>}
                <TextField 
                  value={allData.addressLine1} 
                  autoComplete='off' 
                  fullWidth 
                  id="addressLine1" 
                  size="small" 
                  sx={{ marginBottom: '1%' }} 
                  onChange={handleChange}
                  placeholder="Enter address line 1"
                />
                <TextField 
                  value={allData.addressLine2} 
                  autoComplete='off' 
                  fullWidth 
                  id="addressLine2" 
                  size="small" 
                  onChange={handleChange}
                  placeholder="Enter address line 2 (optional)"
                />
              </Grid>
             

              <Grid item size={6} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '5% 0 1%' }}>Country<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                {errorMsg.countryError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.countryError}</Typography>}
                <div style={{ marginBottom: '10px' }}>
                  <CountrySelect
                    containerClassName="form-group"
                    inputClassName=""
                    onChange={handleCountryChange}
                    onTextChange={(_txt) => console.log(_txt)}
                    placeHolder="Select Country"
                  />
                </div>
              </Grid>
              <Grid item size={6} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '5% 0 1%' }}>State<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                {errorMsg.stateError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.stateError}</Typography>}
                <div style={{ marginBottom: '10px' }}>
                  <StateSelect
                    countryid={country?.id}
                    containerClassName="form-group"
                    inputClassName=""
                    onChange={handleStateChange}
                    onTextChange={(_txt) => console.log(_txt)}
                    defaultValue={currentState}
                    placeHolder="Select State"
                  />
                </div>
              </Grid>
              <Grid item size={6} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '5% 0 1%' }}>City<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                {errorMsg.cityError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.cityError}</Typography>}
                <div style={{ marginBottom: '10px' }}>
                  <CitySelect
                    countryid={country?.id}
                    stateid={currentState?.id}
                    onChange={handleCityChange}
                    defaultValue={currentCity}
                    placeHolder="Select City"
                  />
                </div>
              </Grid>
              <Grid item size={6} >
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '5% 0 1%' }}>Pincode<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                {errorMsg.pincodeError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.pincodeError}</Typography>}
                <TextField 
                  value={allData.pincode} 
                  autoComplete='off' 
                  fullWidth 
                  id="pincode" 
                  size="small" 
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                  inputProps={{
                    maxLength: 6,
                    pattern: "[0-9]{6}"
                  }}
                />
              </Grid>
              {type !== "vendor" ? (
                <React.Fragment>
                  <Grid item size={12} >
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '3% 0 0' }}>Type of users</Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        name="radio"
                        value={labelChanges}
                        onChange={(e) => handleUserTypeChange(e.target.value)}
                      >
                        <FormControlLabel value="H" control={<Radio />} label="Hospital" />
                        <FormControlLabel value="P" control={<Radio />} label="Pathology Labs" />
                        <FormControlLabel value="D" control={<Radio />} label="Diagnostic Centres" />
                        <FormControlLabel value="Physio" control={<Radio />} label="Physiotherapist" />
                        <FormControlLabel value="Re" control={<Radio />} label="Rehabilitation" />
                        <FormControlLabel value="Pc" control={<Radio />} label="Poly Clinic" />
                        <FormControlLabel value="Student" control={<Radio />} label="Student" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {labelChanges === "H" && (
                    <>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Hospital Name</Typography>
                        <TextField 
                          fullWidth 
                          id="hospitalName" 
                          size="small"
                          value={allData.additionalInformation.find(item => item.name === 'hospitalName')?.value || ''}
                          onChange={(e) => handleAdditionalInfoChange('hospitalName', e.target.value)}
                          placeholder="Enter hospital name"
                        />
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Medical Council License</Typography>
                        <TextField 
                          fullWidth 
                          id="medicalCouncilLicense" 
                          size="small"
                          value={allData.additionalInformation.find(item => item.name === 'medicalCouncilLicense')?.value || ''}
                          onChange={(e) => handleAdditionalInfoChange('medicalCouncilLicense', e.target.value)}
                          placeholder="Enter medical council license number"
                        />
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Hospital Registration Certificate</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'hospitalRegistrationCertificate')}
                          />
                        </Button>
                        {manufacturingImageFile.hospitalRegistrationCertificate && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.hospitalRegistrationCertificate?.fileName || 'Hospital Registration Certificate'}
                                </Typography>
                                {allData.files.hospitalRegistrationCertificate?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.hospitalRegistrationCertificate.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('hospitalRegistrationCertificate')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'hospitalAddressProof')}
                          />
                        </Button>
                        {manufacturingImageFile.hospitalAddressProof && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.hospitalAddressProof?.fileName || 'Hospital Address Proof'}
                                </Typography>
                                {allData.files.hospitalAddressProof?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.hospitalAddressProof.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('hospitalAddressProof')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {labelChanges === "P" && (
                    <>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Pathology Name</Typography>
                        <TextField 
                          fullWidth 
                          id="pathologyName" 
                          size="small"
                          value={allData.additionalInformation.find(item => item.name === 'pathologyName')?.value || ''}
                          onChange={(e) => handleAdditionalInfoChange('pathologyName', e.target.value)}
                          placeholder="Enter pathology lab name"
                        />
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Lab Registration Certificate</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'labRegistrationCertificate')}
                          />
                        </Button>
                        {manufacturingImageFile.labRegistrationCertificate && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.labRegistrationCertificate?.fileName || 'Lab Registration Certificate'}
                                </Typography>
                                {allData.files.labRegistrationCertificate?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.labRegistrationCertificate.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('labRegistrationCertificate')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Identity Proof</Typography>
                        <TextField 
                          fullWidth 
                          id="pathologyIdentityProof" 
                          size="small"
                          value={allData.additionalInformation.find(item => item.name === 'pathologyIdentityProof')?.value || ''}
                          onChange={(e) => handleAdditionalInfoChange('pathologyIdentityProof', e.target.value)}
                          placeholder="Enter identity proof number"
                        />
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'pathologyAddressProof')}
                          />
                        </Button>
                        {manufacturingImageFile.pathologyAddressProof && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.pathologyAddressProof?.fileName || 'Pathology Address Proof'}
                                </Typography>
                                {allData.files.pathologyAddressProof?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.pathologyAddressProof.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('pathologyAddressProof')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {labelChanges === "D" && (
                    <>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Diagnostic Center Registration Certificate</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'diagnosticRegistrationCertificate')}
                          />
                        </Button>
                        {manufacturingImageFile.diagnosticRegistrationCertificate && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.diagnosticRegistrationCertificate?.fileName || 'Diagnostic Registration Certificate'}
                                </Typography>
                                {allData.files.diagnosticRegistrationCertificate?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.diagnosticRegistrationCertificate.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('diagnosticRegistrationCertificate')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Identity Proof</Typography>
                        <TextField 
                          fullWidth 
                          id="diagnosticIdentityProof" 
                          size="small"
                          value={allData.additionalInformation.find(item => item.name === 'diagnosticIdentityProof')?.value || ''}
                          onChange={(e) => handleAdditionalInfoChange('diagnosticIdentityProof', e.target.value)}
                          placeholder="Enter identity proof number"
                        />
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'diagnosticAddressProof')}
                          />
                        </Button>
                        {manufacturingImageFile.diagnosticAddressProof && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.diagnosticAddressProof?.fileName || 'Diagnostic Address Proof'}
                                </Typography>
                                {allData.files.diagnosticAddressProof?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.diagnosticAddressProof.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('diagnosticAddressProof')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {labelChanges === "Physio" && (
                    <>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Registration Certificate</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'physioEstablishmentCertificate')}
                          />
                        </Button>
                        {manufacturingImageFile.physioEstablishmentCertificate && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.physioEstablishmentCertificate?.fileName || 'Physio Establishment Certificate'}
                                </Typography>
                                {allData.files.physioEstablishmentCertificate?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.physioEstablishmentCertificate.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('physioEstablishmentCertificate')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Trade License</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'physioTradeLicense')}
                          />
                        </Button>
                        {manufacturingImageFile.physioTradeLicense && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.physioTradeLicense?.fileName || 'Physio Trade License'}
                                </Typography>
                                {allData.files.physioTradeLicense?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.physioTradeLicense.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('physioTradeLicense')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'physioAddressProof')}
                          />
                        </Button>
                        {manufacturingImageFile.physioAddressProof && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.physioAddressProof?.fileName || 'Physio Address Proof'}
                                </Typography>
                                {allData.files.physioAddressProof?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.physioAddressProof.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('physioAddressProof')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {labelChanges === "Re" && (
                    <>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Registration Certificate</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'rehabEstablishmentCertificate')}
                          />
                        </Button>
                        {manufacturingImageFile.rehabEstablishmentCertificate && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.rehabEstablishmentCertificate?.fileName || 'Rehabilitation Establishment Certificate'}
                                </Typography>
                                {allData.files.rehabEstablishmentCertificate?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.rehabEstablishmentCertificate.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('rehabEstablishmentCertificate')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Identity Proof</Typography>
                        <TextField 
                          fullWidth 
                          id="rehabIdentityProof" 
                          size="small"
                          value={allData.additionalInformation.find(item => item.name === 'rehabIdentityProof')?.value || ''}
                          onChange={(e) => handleAdditionalInfoChange('rehabIdentityProof', e.target.value)}
                          placeholder="Enter identity proof number"
                        />
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'rehabAddressProof')}
                          />
                        </Button>
                        {manufacturingImageFile.rehabAddressProof && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.rehabAddressProof?.fileName || 'Rehabilitation Address Proof'}
                                </Typography>
                                {allData.files.rehabAddressProof?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.rehabAddressProof.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('rehabAddressProof')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {labelChanges === "Pc" && (
                    <>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Trade License</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'polyclinicTradeLicense')}
                          />
                        </Button>
                        {manufacturingImageFile.polyclinicTradeLicense && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.polyclinicTradeLicense?.fileName || 'Polyclinic Trade License'}
                                </Typography>
                                {allData.files.polyclinicTradeLicense?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.polyclinicTradeLicense.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('polyclinicTradeLicense')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Clinical Registration Certificate</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'polyclinicClinicalCertificate')}
                          />
                        </Button>
                        {manufacturingImageFile.polyclinicClinicalCertificate && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.polyclinicClinicalCertificate?.fileName || 'Polyclinic Clinical Certificate'}
                                </Typography>
                                {allData.files.polyclinicClinicalCertificate?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.polyclinicClinicalCertificate.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('polyclinicClinicalCertificate')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'polyclinicAddressProof')}
                          />
                        </Button>
                        {manufacturingImageFile.polyclinicAddressProof && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.polyclinicAddressProof?.fileName || 'Polyclinic Address Proof'}
                                </Typography>
                                {allData.files.polyclinicAddressProof?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.polyclinicAddressProof.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('polyclinicAddressProof')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {labelChanges === "Student" && (
                    <>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Student ID</Typography>
                        <TextField 
                          fullWidth 
                          id="studentId" 
                          size="small"
                          value={allData.additionalInformation.find(item => item.name === 'studentId')?.value || ''}
                          onChange={(e) => handleAdditionalInfoChange('studentId', e.target.value)}
                          placeholder="Enter your student ID"
                        />
                      </Grid>
                      <Grid item size={6}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Student ID Card</Typography>
                        <Button
                          sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleAdditionalFileChange(e, 'studentIdCard')}
                          />
                        </Button>
                        {manufacturingImageFile.studentIdCard && (
                          <div style={{ marginTop: '5%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                  {allData.files.studentIdCard?.fileName || 'Student ID Card'}
                                </Typography>
                                {allData.files.studentIdCard?.size && (
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Size: {formatFileSize(allData.files.studentIdCard.size)}
                                  </Typography>
                                )}
                              </div>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => removeFile('studentIdCard')}
                                sx={{ minWidth: 'auto', padding: '4px 8px' }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: '5px' }}>
                          Note: Maximum file size allowed is 10MB
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {/* Add other user type sections similar to Details.jsx */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Grid item size={12} >
                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '3% 0 0' }}>Type of vendors<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                    {errorMsg.vendorTypeError &&
                      <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errorMsg.vendorTypeError}</Typography>}
                    <FormControl>
                      <RadioGroup
                        row
                        name="radio"
                        id='vendorType'
                        value={allData.vendorType}
                        onChange={e => {
                          setAllData({ ...allData, vendorType: e.target.value })
                          setErrorMsg({ ...errorMsg, vendorTypeError: "" })
                        }}
                      >
                        <FormControlLabel  value="manufacturing" control={<Radio />} label="Manufacturing" />
                        <FormControlLabel value="oem" control={<Radio />} label="OEM" />
                        <FormControlLabel value="dealer" control={<Radio />} label="C&F / Super Stockist / Dealer's" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {/* Add vendor type sections similar to Details.jsx */}
                </React.Fragment>
              )}
            </Grid>
          </Box>
          <Stack direction='column'>
            <Button onClick={handleSubmit} variant='contained' sx={{ width: '400px', margin: '4% auto 4%',textTransform: 'capitalize', padding: '1%', fontSize: '18px', fontWeight: 'bold',backgroundColor:'#009e92',borderRadius:'10px' }}>Update Profile</Button>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default EditProfile; 