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

  useEffect(() => {
    fetchVendorData();
  }, []);

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
        setAllData({
          fullName: data.name || '',
          number: data.phone || '',
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          country: data.country || '',
          state: data.state || '',
          city: data.city || '',
          pincode: data.postalCode || '',
          vendorType: data.vendorType || '',
          additionalInformation: data.additionalInformation || [],
          files: data.files || {},
          email: data.email || '',
          userName: data.userName || ''
        });

        // Set the vendor type selection based on existing type
        if (data.vendorType) {
          setLabelChanges(data.vendorType);
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
          setTimeout(() => {
            navigate('/vendor');
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
      <Box sx={{ height: '100%', width: '100%',backgroundColor:'#f2f3f5',padding:'4% 0' }}>
        <Box sx={{ border: 'solid 1.5px #fff', height: 'auto', margin: '0% auto', backgroundColor: '#fff', borderRadius: '15px', width: '65%' }}>
          <Stack direction='column'>
            <Typography variant='p' sx={{ margin: '2% auto', textTransform: 'capitalize',fontSize:'2rem' }}>Edit Vendor Details</Typography>
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
              {allData.vendorType === "manufacturing" && (
                <>
                  <Grid item size={6}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>MDM License</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                      <div >
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
                            accept="
                      image/png,
                      image/jpeg,
                      application/pdf,
                      application/msword,
                      application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                      application/vnd.ms-excel,
                      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                      " // Restrict file types to PNG, JPEG, PDF, DOC, DOCX, XLS, XLSX
                            onChange={(e) => handleFileChange(e, 'mdmLicense')}
                          />
                        </Button>
                      </div>
                      <div>
                        {manufacturingImage.mdmLicense && (
                          <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                            <img src={imageType?.mdmLicense === "pdf" ? PDFIcon : imageType?.mdmLicense === "docx" ? WordIcon : imageType?.mdmLicense === "png" ? PngIcon : imageType?.mdmLicense === "jpeg" ? JpegIcon : imageType.mdmLicense === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                            <a
                              href={URL.createObjectURL(manufacturingImageFile.mdmLicense)}
                              download={manufacturingImageFile.mdmLicense.name}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                            >
                              {manufacturingImageFile.mdmLicense.name}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Grid>
                  <Grid item size={6}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>GST</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                      <div >
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
                            accept="
                      image/png,
                      image/jpeg,
                      application/pdf,
                      application/msword,
                      application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                      application/vnd.ms-excel,
                      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                      " // Restrict file types to PNG, JPEG, PDF, DOC, DOCX, XLS, XLSX
                            onChange={(e) => handleFileChange(e, 'gst')}
                          />
                        </Button>
                      </div>
                      <div>
                        {manufacturingImage.gst && (
                          <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                            <img src={imageType?.gst === "pdf" ? PDFIcon : imageType?.gst === "docx" ? WordIcon : imageType?.gst === "png" ? PngIcon : imageType?.gst === "jpeg" ? JpegIcon : imageType.gst === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '30px', width: '30px' }} />
                            <a
                              href={URL.createObjectURL(manufacturingImageFile.gst)}
                              download={manufacturingImageFile.gst.name}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                            >
                              {manufacturingImageFile.gst.name}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Grid>
                  {/* Add other manufacturing fields similar to Details.jsx */}
                </>
              )}
              {/* Add OEM and Dealer sections similar to Details.jsx */}
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