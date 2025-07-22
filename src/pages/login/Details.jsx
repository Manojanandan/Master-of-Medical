import React, { useEffect, useState } from 'react'
import { Alert, Backdrop, Box, Button, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "../../styles/countryStateCity.css";
import PDFIcon from '../../assets/PDFIcon.png';
import ExcelIcon from '../../assets/ExcelIcon.jpg';
import JpegIcon from '../../assets/JpegIcon.png';
import PngIcon from '../../assets/PngIcon.png';
import WordIcon from '../../assets/WordIcon.jpg';
import JpgIcon from '../../assets/JpgIcon.png';
import { registerVendor, registerCustomer } from './Signup/SignUpReducer';
import { triggerLoginSuccess } from '../../components/StatusCheck';
import RegistrationStepper from '../../components/RegistrationStepper';

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

const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [labelChanges, setLabelChanges] = useState("")
    const type = sessionStorage.getItem("userType")

    const reducer = useSelector((state) => state.signUpReducer)
    const loader = reducer.loader;
    const message = reducer.message;
    const success = reducer.success;

    const [openModal, setOpenModal] = useState(false);
    const [allData, setAlldata] = useState({
        addressLine1: "", addressLine2: "", number: "", city: "", state: "", pincode: "", vendorType: "", country: ""
    });
    const [errorMsg, setErrorMsg] = useState({ addressLine1Error: '', numberError: "", cityError: "", stateError: "", pincodeError: "", vendorTypeError: "",countryError: "" });
    
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
    })
    const [featureImage, setFeatureImage] = useState(null);
    const tempData = JSON.parse(sessionStorage.getItem("tempData"));

    // Add useEffect to track success state changes
    useEffect(() => {
        if (success) {
            const jwt = sessionStorage.getItem("jwt");
            if (jwt) {
                // Trigger login success event to check status immediately
                triggerLoginSuccess();
                if (type === "user" || type === "customer") {
                    navigate("/ecommerceDashboard");
                } else if (type === "vendor") {
                    navigate("/vendorDashboard");
                }
            }
        }
    }, [success, navigate, type]);

    const handleChange = (e) => {
        setAlldata({ ...allData, [e.target.id]: e.target.value })
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
        setAlldata({ ...allData, country: _country?.name || "" });
        setErrorMsg({ ...errorMsg, countryError: "" });
        // Reset state and city when country changes
        setCurrentState(null);
        setCurrentCity(null);
        setAlldata({ ...allData, country: _country?.name || "", state: "", city: "" });
    };

    // Handle state selection
    const handleStateChange = (_state) => {
        setCurrentState(_state);
        setAlldata({ ...allData, state: _state?.name || "" });
        setErrorMsg({ ...errorMsg, stateError: "" });
        // Reset city when state changes
        setCurrentCity(null);
        setAlldata({ ...allData, state: _state?.name || "", city: "" });
    };

    // Handle city selection
    const handleCityChange = (_city) => {
        setCurrentCity(_city);
        setAlldata({ ...allData, city: _city?.name || "" });
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

    const handleSubmit = () => {
        if (allData.addressLine1 === "") {
            setErrorMsg({ ...errorMsg, addressLine1Error: "Address Line 1 is required" });
        } else if (allData.number === "") {
            setErrorMsg({ ...errorMsg, numberError: "Contact Number is required" });
        } else if (!country || allData.country === "") {
            setErrorMsg({ ...errorMsg, countryError: "Country is required" });
        } else if (!currentState || allData.state === "") {
            setErrorMsg({ ...errorMsg, stateError: "State is required" });
        } else if (!currentCity || allData.city === "") {
            setErrorMsg({ ...errorMsg, cityError: "City is required" });
        } else if (allData.pincode === "") {
            setErrorMsg({ ...errorMsg, pincodeError: "Pincode is required" });
        } else if (type === "vendor" && allData.vendorType === "") {
            setErrorMsg({ ...errorMsg, vendorTypeError: "Vendor type is required" });
        } else {
            setErrorMsg({
                addressLine1Error: '', numberError: "", cityError: "", stateError: "", pincodeError: "", vendorTypeError: "",countryError:""
            });
            
            if (type === "user" || type === "customer") {
                // Handle customer creation
                const customerData = {
                    name: tempData[0].userName,
                    email: tempData[0].email,
                    phone: allData.number,
                    password: tempData[0].password,
                    address: `${allData.addressLine1}, ${allData.addressLine2}`,
                    city: allData.city,
                    state: allData.state,
                    country: allData.country,
                    postalCode: allData.pincode
                };
                
                dispatch(registerCustomer(customerData));
                setOpenModal(true);
            } else {
                // Handle vendor creation
                const formData = new FormData();
                const address = `${allData.addressLine1}, ${allData.addressLine2}`;
                formData.append('address', address);
                formData.append('phone', allData.number);
                formData.append('city', allData.city);
                formData.append('state', allData.state);
                formData.append('postalCode', allData.pincode);
                formData.append('name', tempData[0].userName);
                formData.append('email', tempData[0].email);
                formData.append('password', tempData[0].password);
                formData.append('country', allData.country);
                formData.append('type', allData.vendorType);
                const fileData = Object.fromEntries(
                    Object.entries(manufacturingImageFile).filter(([key, value]) => value !== null)
                );

                // Append each file individually
                Object.entries(fileData).forEach(([key, file]) => {
                    formData.append('files', file);
                });

                dispatch(registerVendor(formData));
                setOpenModal(true);
            }
        }
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    return (
        <React.Fragment>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loader}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            {message && <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openModal} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={success ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>}
            <Box sx={{ height: '100%', width: '100%',backgroundColor:'#f2f3f5',padding:'4% 0' }}>
                <Box sx={{ border: 'solid 1.5px #fff', height: 'auto', margin: '0% auto', backgroundColor: '#fff', borderRadius: '15px', width: '65%' }}>
                    <Stack direction='column'>
                        <Typography variant='p' sx={{ margin: '2% auto', textTransform: 'capitalize',fontSize:'2rem' }}>User Details</Typography>
                    </Stack>
                    
                    {/* Registration Stepper */}
                    <Box sx={{ width: '95%', margin: '0 auto 2%' }}>
                        <RegistrationStepper currentStep={2} />
                    </Box>
                    
                    <Box sx={{ width: '95%', margin: '1% auto', }}>
                        <Grid container columnSpacing={2}>
                            <Grid item size={12} >
                                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '1% 0 1%' }}>Name</Typography>
                                <TextField disabled fullWidth id="name" size="small" value={tempData[0].userName} onChange={handleChange} />
                            </Grid>
                            <Grid item size={6} >
                                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '3% 0 1%' }}>Email</Typography>
                                <TextField disabled fullWidth id="email" size="small" value={tempData[0].email} onChange={handleChange} />
                            </Grid>
                             <Grid item size={6} >
                                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '3% 0 1%' }}>Contact Number<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                                {errorMsg.numberError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.numberError}</Typography>}
                                <TextField value={allData.number} autoComplete='off' fullWidth id="number" size="small" onChange={handleChange} />
                            </Grid>
                            <Grid item size={12} >
                                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '2% 0 1%', }}>Address<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                                {errorMsg.addressLine1Error && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.addressLine1Error}</Typography>}
                                <TextField value={allData.addressLine1} autoComplete='off' fullWidth id="addressLine1" size="small" sx={{ marginBottom: '1%' }} onChange={handleChange} />
                                <TextField value={allData.addressLine2} autoComplete='off' fullWidth id="addressLine2" size="small" onChange={handleChange} />
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
                                <TextField value={allData.pincode} autoComplete='off' fullWidth id="pincode" size="small" onChange={handleChange} />
                            </Grid>
                            {type === "user" ? (
                                <React.Fragment>
                                    <Grid item size={12} >
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '3% 0 0' }}>Type of users</Typography>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                name="radio"

                                            >
                                                <FormControlLabel value="H" control={<Radio />} label="Hospital" onClick={() => setLabelChanges("H")} />
                                                <FormControlLabel value="P" control={<Radio />} label="Pathology Labs" onClick={() => setLabelChanges("P")} />
                                                <FormControlLabel value="D" control={<Radio />} label="Diagnostic Centres" onClick={() => setLabelChanges("D")} />
                                                <FormControlLabel value="Physio" control={<Radio />} label="Physiotherapist" onClick={() => setLabelChanges("Physio")} />
                                                <FormControlLabel value="Re" control={<Radio />} label="Rehabilitation" onClick={() => setLabelChanges("Re")} />
                                                <FormControlLabel value="Pc" control={<Radio />} label="Poly Clnic" onClick={() => setLabelChanges("Pc")} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    {labelChanges === "H" && (
                                        <>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Hospital Name</Typography>
                                                <TextField fullWidth id="name" size="small" />
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Medical Council License</Typography>
                                                <TextField fullWidth id="license" size="small" />
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Hospital Registeration Certificate</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleUserFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                        </>
                                    )}
                                    {labelChanges === "P" && (
                                        <>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Pathology Name</Typography>
                                                <TextField fullWidth id="name" size="small" />
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Lab Registeration Certificate</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleUserFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Identity Proof</Typography>
                                                <TextField fullWidth id="license" size="small" />
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                        </>
                                    )}
                                    {labelChanges === "D" && (
                                        <>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Diagnostic Center Registeration Certificate</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Identity Proof</Typography>
                                                <TextField fullWidth id="license" size="small" />
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                        </>
                                    )}
                                    {labelChanges === "Physio" && (
                                        <>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Registeration Certificate</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Trade License</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                        </>
                                    )}
                                    {labelChanges === "Re" && (
                                        <>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Registeration Certificate</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Identity Proof</Typography>
                                                <TextField fullWidth id="license" size="small" />
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
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
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Clinical Registeration Certificate</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof</Typography>
                                                <Button
                                                    sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}

                                                >
                                                    Upload
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg" // Restrict file types to PNG and JPEG
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                {featureImage && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={featureImage}
                                                            alt={featureImage}
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                        </>
                                    )}
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
                                                    setAlldata({ ...allData, vendorType: e.target.value })
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
                                                            startIcon={<CloudUploadIcon />}

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
                                                            startIcon={<CloudUploadIcon />}

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
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>BIS</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'bis')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.bis && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center',color:'#009e92' }}>
                                                                <img src={imageType?.bis === "pdf" ? PDFIcon : imageType?.bis === "docx" ? WordIcon : imageType?.bis === "png" ? PngIcon : imageType?.bis === "jpeg" ? JpegIcon : imageType.bis === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '30px', width: '30px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.bis)}
                                                                    download={manufacturingImageFile.bis.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.bis.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>ISO/FDA/CE </Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'iso')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.iso && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.iso === "pdf" ? PDFIcon : imageType?.iso === "docx" ? WordIcon : imageType?.iso === "png" ? PngIcon : imageType?.iso === "jpeg" ? JpegIcon : imageType.iso === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '30px', width: '30px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.iso)}
                                                                    download={manufacturingImageFile.iso.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.iso.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                        </>
                                    )}
                                    {allData.vendorType === "oem" && (
                                        <>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Loan License</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'loanLicense')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.loanLicense && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.loanLicense === "pdf" ? PDFIcon : imageType?.loanLicense === "docx" ? WordIcon : imageType?.loanLicense === "png" ? PngIcon : imageType?.loanLicense === "jpeg" ? JpegIcon : imageType.loanLicense === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.loanLicense)}
                                                                    download={manufacturingImageFile.loanLicense.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.loanLicense.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Proof</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'establishmentProof')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.establishmentProof && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.establishmentProof === "pdf" ? PDFIcon : imageType?.establishmentProof === "docx" ? WordIcon : imageType?.establishmentProof === "png" ? PngIcon : imageType?.establishmentProof === "jpeg" ? JpegIcon : imageType.establishmentProof === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.establishmentProof)}
                                                                    download={manufacturingImageFile.establishmentProof.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.establishmentProof.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>D/L</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'dl')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.dl && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.dl === "pdf" ? PDFIcon : imageType?.dl === "docx" ? WordIcon : imageType?.dl === "png" ? PngIcon : imageType?.dl === "jpeg" ? JpegIcon : imageType.dl === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.dl)}
                                                                    download={manufacturingImageFile.dl.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.dl.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>ISO/FDA/CE </Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'fda')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.fda && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.fda === "pdf" ? PDFIcon : imageType?.fda === "docx" ? WordIcon : imageType?.fda === "png" ? PngIcon : imageType?.fda === "jpeg" ? JpegIcon : imageType.fda === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.fda)}
                                                                    download={manufacturingImageFile.fda.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.fda.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                        </>
                                    )}
                                    {allData.vendorType === "dealer" && (
                                        <>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>D/L</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'cfDL')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.cfDL && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.cfDL === "pdf" ? PDFIcon : imageType?.cfDL === "docx" ? WordIcon : imageType?.cfDL === "png" ? PngIcon : imageType?.cfDL === "jpeg" ? JpegIcon : imageType.cfDL === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.cfDL)}
                                                                    download={manufacturingImageFile.cfDL.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.cfDL.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Gumasta</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'cfGumasta')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.cfGumasta && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.cfGumasta === "pdf" ? PDFIcon : imageType?.cfGumasta === "docx" ? WordIcon : imageType?.cfGumasta === "png" ? PngIcon : imageType?.cfGumasta === "jpeg" ? JpegIcon : imageType.cfGumasta === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.cfGumasta)}
                                                                    download={manufacturingImageFile.cfGumasta.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.cfGumasta.name}
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
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'cfGst')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.cfGst && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.cfGst === "pdf" ? PDFIcon : imageType?.cfGst === "docx" ? WordIcon : imageType?.cfGst === "png" ? PngIcon : imageType?.cfGst === "jpeg" ? JpegIcon : imageType.cfGst === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.cfGst)}
                                                                    download={manufacturingImageFile.cfGst.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.cfGst.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Proof</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'cfEstablishmentProof')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.cfEstablishmentProof && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.cfEstablishmentProof === "pdf" ? PDFIcon : imageType?.cfEstablishmentProof === "docx" ? WordIcon : imageType?.cfEstablishmentProof === "png" ? PngIcon : imageType?.cfEstablishmentProof === "jpeg" ? JpegIcon : imageType.cfEstablishmentProof === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.cfEstablishmentProof)}
                                                                    download={manufacturingImageFile.cfEstablishmentProof.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.cfEstablishmentProof.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Authorization of Company </Typography>
                                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                                    <div >
                                                        <Button
                                                            sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#02998e' }}
                                                            component="label"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}

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
                                                                onChange={(e) => handleFileChange(e, 'cfAuthorization')}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        {manufacturingImage.cfAuthorization && (
                                                            <div style={{ height: 'auto', width: '95%', marginLeft: '15px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                                                <img src={imageType?.cfAuthorization === "pdf" ? PDFIcon : imageType?.cfAuthorization === "docx" ? WordIcon : imageType?.cfAuthorization === "png" ? PngIcon : imageType?.cfAuthorization === "jpeg" ? JpegIcon : imageType.cfAuthorization === "jpg" ? JpgIcon : ExcelIcon} alt='' style={{ height: '25px', width: '25px' }} />
                                                                <a
                                                                    href={URL.createObjectURL(manufacturingImageFile.cfAuthorization)}
                                                                    download={manufacturingImageFile.cfAuthorization.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{ wordBreak: 'break-all', marginLeft: '10px', fontWeight: 'bold',color:'#1c1c1b' }}
                                                                >
                                                                    {manufacturingImageFile.cfAuthorization.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                        </>
                                    )}
                                </React.Fragment>
                            )
                            }

                        </Grid>
                    </Box>
                    <Stack direction='column'>
                        <Button onClick={handleSubmit} variant='contained' sx={{ width: '400px', margin: '4% auto 4%',textTransform: 'capitalize', padding: '1%', fontSize: '18px', fontWeight: 'bold',backgroundColor:'#009e92',borderRadius:'10px' }}>Confirm</Button>
                    </Stack>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Details;
// navigate('/ecommerceDashboard')