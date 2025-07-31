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

    // Debug: Log the userType to see what's being retrieved
    console.log("Details page - userType from sessionStorage:", type);
    console.log("Details page - condition check:", type !== "vendor");
    console.log("Details page - should show user types:", type !== "vendor");

    const reducer = useSelector((state) => state.signUpReducer)
    const loader = reducer.loader;
    const message = reducer.message;
    const success = reducer.success;

    const [openModal, setOpenModal] = useState(false);
    const [allData, setAlldata] = useState({
        addressLine1: "", 
        addressLine2: "", 
        number: "", 
        city: "", 
        state: "", 
        pincode: "", 
        password: "",   
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
    })
    const [featureImage, setFeatureImage] = useState(null);
    let tempData = [];
    try {
        const raw = sessionStorage.getItem("tempData");
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                tempData = parsed;
            } else if (parsed && typeof parsed === 'object') {
                tempData = [parsed];
            }
        }
    } catch (e) {
        tempData = [];
    }

    // Load signup data from sessionStorage
    useEffect(() => {
        try {
            const tempUserData = sessionStorage.getItem("tempUserData");
            if (tempUserData) {
                const parsedData = JSON.parse(tempUserData);
                setAlldata(prev => ({
                    ...prev,
                    email: parsedData.email || "",
                    userName: parsedData.userName || "",
                    password: parsedData.password || "",
                }));
            }
        } catch (error) {
            console.error("Error loading signup data:", error);
        }
    }, []);

    // Add useEffect to track success state changes
    useEffect(() => {
        if (success) {
            const jwt = sessionStorage.getItem("jwt");
            if (jwt) {
                // Trigger login success event to check status immediately
                triggerLoginSuccess();
                if (type === "user" || type === "customer") {
                    navigate("/customer");
                } else if (type === "vendor") {
                    navigate("/vendor");
                }
            }
        }
    }, [success, navigate, type]);

    // Handle user type selection
    const handleUserTypeChange = (userType) => {
        setLabelChanges(userType);
        
        // Clear error message when user type is selected
        setErrorMsg({ ...errorMsg, vendorTypeError: "" });
        
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
        setAlldata(prev => ({
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
        setAlldata(prev => {
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
            setAlldata(prev => ({
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
        
        setAlldata(prev => ({
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
        } else if (type === "vendor" && allData.vendorType === "") {
            setErrorMsg({ ...errorMsg, vendorTypeError: "Vendor type is required" });
        } else if ((type === "user" || type === "customer") && allData.type === "") {
            setErrorMsg({ ...errorMsg, vendorTypeError: "User type is required" });
        } else {
            // Validate mandatory file uploads for vendors
            if (type === "vendor") {
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
            }
            
            // Validate mandatory file uploads for users
            if (type === "user" || type === "customer") {
                let userFileError = "";
                let userInputError = "";
                
                // Validate mandatory input fields based on user type
                if (allData.type === "Pathology Labs") {
                    const pathologyName = allData.additionalInformation.find(item => item.name === 'pathologyName')?.value;
                    if (!pathologyName || pathologyName.trim() === "") {
                        userInputError = "Pathology Name is mandatory for Pathology Labs type";
                    }
                    const pathologyIdentityProof = allData.additionalInformation.find(item => item.name === 'pathologyIdentityProof')?.value;
                    if (!pathologyIdentityProof || pathologyIdentityProof.trim() === "") {
                        userInputError = "Identity Proof is mandatory for Pathology Labs type";
                    }
                } else if (allData.type === "Diagnostic Centres") {
                    const diagnosticIdentityProof = allData.additionalInformation.find(item => item.name === 'diagnosticIdentityProof')?.value;
                    if (!diagnosticIdentityProof || diagnosticIdentityProof.trim() === "") {
                        userInputError = "Identity Proof is mandatory for Diagnostic Centres type";
                    }
                } else if (allData.type === "Student") {
                    const studentId = allData.additionalInformation.find(item => item.name === 'studentId')?.value;
                    if (!studentId || studentId.trim() === "") {
                        userInputError = "Student ID is mandatory for Student type";
                    }
                }
                
                if (userInputError) {
                    setErrorMsg({ ...errorMsg, vendorTypeError: userInputError });
                    return;
                }
                
                if (allData.type === "Hospital") {
                    if (!manufacturingImageFile.hospitalRegistrationCertificate) {
                        userFileError = "Hospital Registration Certificate is mandatory for Hospital type";
                    }
                    if (!manufacturingImageFile.hospitalAddressProof) {
                        userFileError = "Hospital Address Proof is mandatory for Hospital type";
                    }
                } else if (allData.type === "Pathology Labs") {
                    if (!manufacturingImageFile.labRegistrationCertificate) {
                        userFileError = "Lab Registration Certificate is mandatory for Pathology Labs type";
                    }
                    if (!manufacturingImageFile.pathologyAddressProof) {
                        userFileError = "Pathology Address Proof is mandatory for Pathology Labs type";
                    }
                } else if (allData.type === "Diagnostic Centres") {
                    if (!manufacturingImageFile.diagnosticRegistrationCertificate) {
                        userFileError = "Diagnostic Registration Certificate is mandatory for Diagnostic Centres type";
                    }
                    if (!manufacturingImageFile.diagnosticAddressProof) {
                        userFileError = "Diagnostic Address Proof is mandatory for Diagnostic Centres type";
                    }
                } else if (allData.type === "Physiotherapist") {
                    if (!manufacturingImageFile.physioEstablishmentCertificate) {
                        userFileError = "Physio Establishment Certificate is mandatory for Physiotherapist type";
                    }
                    if (!manufacturingImageFile.physioTradeLicense) {
                        userFileError = "Physio Trade License is mandatory for Physiotherapist type";
                    }
                    if (!manufacturingImageFile.physioAddressProof) {
                        userFileError = "Physio Address Proof is mandatory for Physiotherapist type";
                    }
                } else if (allData.type === "Rehabilitation") {
                    if (!manufacturingImageFile.rehabEstablishmentCertificate) {
                        userFileError = "Rehabilitation Establishment Certificate is mandatory for Rehabilitation type";
                    }
                    if (!manufacturingImageFile.rehabAddressProof) {
                        userFileError = "Rehabilitation Address Proof is mandatory for Rehabilitation type";
                    }
                } else if (allData.type === "Poly Clinic") {
                    if (!manufacturingImageFile.polyclinicTradeLicense) {
                        userFileError = "Polyclinic Trade License is mandatory for Poly Clinic type";
                    }
                    if (!manufacturingImageFile.polyclinicClinicalCertificate) {
                        userFileError = "Polyclinic Clinical Certificate is mandatory for Poly Clinic type";
                    }
                    if (!manufacturingImageFile.polyclinicAddressProof) {
                        userFileError = "Polyclinic Address Proof is mandatory for Poly Clinic type";
                    }
                } else if (allData.type === "Student") {
                    if (!manufacturingImageFile.studentIdCard) {
                        userFileError = "Student ID Card is mandatory for Student type";
                    }
                }
                
                if (userFileError) {
                    setErrorMsg({ ...errorMsg, vendorTypeError: userFileError });
                    return;
                }
            }
            
            setErrorMsg({
                addressLine1Error: '', numberError: "", cityError: "", stateError: "", pincodeError: "", vendorTypeError: "",countryError:"", fullNameError: ""
            });
            
            if (type === "user" || type === "customer") {
                // Handle customer creation with FormData for file uploads
                const formData = new FormData();
                const address = `${allData.addressLine1}, ${allData.addressLine2}`;
                
                // Append basic user data
                formData.append('name', allData.fullName);
                formData.append('email', allData.email);
                formData.append('phone', allData.number);
                formData.append('userName', allData.fullName)
                formData.append('password', allData.password);
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
                
                dispatch(registerCustomer(formData));
                setOpenModal(true);
            } else {
                // Handle vendor creation
                const formData = new FormData();
                const address = `${allData.addressLine1}, ${allData.addressLine2}`;
                formData.append('address', address);
                formData.append('phone', allData.number);
                formData.append('city', allData.city);
                formData.append('userName', allData.fullName)
                formData.append('state', allData.state);
                formData.append('postalCode', allData.pincode);
                formData.append('name', allData.fullName);
                formData.append('email', allData.email);
                formData.append('password', allData.password); // Keep password from tempData for now
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
            <Box sx={{ 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f8f9fa',
                padding: { xs: '1rem', md: '3%' }
            }}>
                {/* Main Card */}
                <Box sx={{ 
                    width: { xs: '100%', md: '80%', lg: '70%' },
                    maxWidth: '1200px',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    padding: { xs: '1.5rem', md: '2.5rem' },
                    mb: 3
                }}>
                    <Stack spacing={3}>
                        {/* Header */}
                        <Box textAlign="center">
                            <Typography variant="h4" sx={{ 
                                fontWeight: 'bold',
                                color: 'text.primary',
                                mb: 1
                            }}>
                                User Details
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Complete your registration by providing the required information
                            </Typography>
                        </Box>
                        
                        {/* Registration Stepper */}
                        <Box sx={{ width: '100%', mb: 2 }}>
                            <RegistrationStepper currentStep={2} />
                        </Box>
                        
                        {/* Form */}
                        <Box component="form">
                            <Grid container spacing={3}>
                                {/* Username and Email - Read Only */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Username
                                    </Typography>
                                    <TextField 
                                        disabled 
                                        fullWidth 
                                        id="userName" 
                                        size="medium" 
                                        value={allData.userName || ''} 
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                backgroundColor: '#f5f5f5'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Email
                                    </Typography>
                                    <TextField 
                                        disabled 
                                        fullWidth 
                                        id="email" 
                                        size="medium" 
                                        value={allData.email || ''} 
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                backgroundColor: '#f5f5f5'
                                            }
                                        }}
                                    />
                                </Grid>
                                
                                {/* Full Name and Contact Number */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Full Name <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    {errorMsg.fullNameError && (
                                        <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 0.5 }}>
                                            {errorMsg.fullNameError}
                                        </Typography>
                                    )}
                                    <TextField 
                                        fullWidth 
                                        id="fullName" 
                                        size="medium" 
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        value={allData.fullName || ''}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Contact Number <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    {errorMsg.numberError && (
                                        <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 0.5 }}>
                                            {errorMsg.numberError}
                                        </Typography>
                                    )}
                                    <TextField 
                                        value={allData.number} 
                                        autoComplete='off' 
                                        fullWidth 
                                        id="number" 
                                        size="medium" 
                                        onChange={handleChange}
                                        placeholder="Enter 10-digit contact number"
                                        inputProps={{
                                            maxLength: 10,
                                            pattern: "[0-9]{10}"
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />
                                </Grid>
                                
                                {/* Address */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Address <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    {errorMsg.addressLine1Error && (
                                        <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 0.5 }}>
                                            {errorMsg.addressLine1Error}
                                        </Typography>
                                    )}
                                    <Stack spacing={2}>
                                        <TextField 
                                            value={allData.addressLine1} 
                                            autoComplete='off' 
                                            fullWidth 
                                            id="addressLine1" 
                                            size="medium" 
                                            onChange={handleChange}
                                            placeholder="Enter address line 1"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px'
                                                }
                                            }}
                                        />
                                        <TextField 
                                            value={allData.addressLine2} 
                                            autoComplete='off' 
                                            fullWidth 
                                            id="addressLine2" 
                                            size="medium" 
                                            onChange={handleChange}
                                            placeholder="Enter address line 2 (optional)"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px'
                                                }
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                                
                                {/* Country, State, City, Pincode */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Country <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    {errorMsg.countryError && (
                                        <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 0.5 }}>
                                            {errorMsg.countryError}
                                        </Typography>
                                    )}
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
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        State <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    {errorMsg.stateError && (
                                        <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 0.5 }}>
                                            {errorMsg.stateError}
                                        </Typography>
                                    )}
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
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        City <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    {errorMsg.cityError && (
                                        <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 0.5 }}>
                                            {errorMsg.cityError}
                                        </Typography>
                                    )}
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
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Pincode <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    {errorMsg.pincodeError && (
                                        <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 0.5 }}>
                                            {errorMsg.pincodeError}
                                        </Typography>
                                    )}
                                    <TextField 
                                        value={allData.pincode} 
                                        autoComplete='off' 
                                        fullWidth 
                                        id="pincode" 
                                        size="medium" 
                                        onChange={handleChange}
                                        placeholder="Enter 6-digit pincode"
                                        inputProps={{
                                            maxLength: 6,
                                            pattern: "[0-9]{6}"
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />
                                </Grid>
                                
                                {/* User Type Selection */}
                                {type !== "vendor" ? (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                                            Type of users <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        {errorMsg.vendorTypeError && (
                                            <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 1 }}>
                                                {errorMsg.vendorTypeError}
                                            </Typography>
                                        )}
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                name="radio"
                                                value={labelChanges}
                                                onChange={(e) => handleUserTypeChange(e.target.value)}
                                                sx={{
                                                    '& .MuiFormControlLabel-root': {
                                                        marginRight: 3,
                                                        marginBottom: 1
                                                    }
                                                }}
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
                                ) : (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                                            Type of vendors <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        {errorMsg.vendorTypeError && (
                                            <Typography variant="caption" sx={{ color: 'red', display: 'block', mb: 1 }}>
                                                {errorMsg.vendorTypeError}
                                            </Typography>
                                        )}
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
                                                sx={{
                                                    '& .MuiFormControlLabel-root': {
                                                        marginRight: 3,
                                                        marginBottom: 1
                                                    }
                                                }}
                                            >
                                                <FormControlLabel value="manufacturing" control={<Radio />} label="Manufacturing" />
                                                <FormControlLabel value="oem" control={<Radio />} label="OEM" />
                                                <FormControlLabel value="dealer" control={<Radio />} label="C&F / Super Stockist / Dealer's" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                )}
                                
                                {/* Dynamic Fields based on User/Vendor Type */}
                                {/* ... existing dynamic fields code remains the same ... */}
                                {labelChanges === "H" && (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                Hospital Name
                                            </Typography>
                                            <TextField 
                                                fullWidth 
                                                id="hospitalName" 
                                                size="medium"
                                                value={allData.additionalInformation.find(item => item.name === 'hospitalName')?.value || ''}
                                                onChange={(e) => handleAdditionalInfoChange('hospitalName', e.target.value)}
                                                placeholder="Enter hospital name"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                Medical Council License
                                            </Typography>
                                            <TextField 
                                                fullWidth 
                                                id="medicalCouncilLicense" 
                                                size="medium"
                                                value={allData.additionalInformation.find(item => item.name === 'medicalCouncilLicense')?.value || ''}
                                                onChange={(e) => handleAdditionalInfoChange('medicalCouncilLicense', e.target.value)}
                                                placeholder="Enter medical council license number"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                Hospital Registration Certificate <span style={{ color: 'red' }}>*</span>
                                            </Typography>
                                            <Button
                                                sx={{ 
                                                    textTransform: 'none', 
                                                    fontSize: '0.875rem', 
                                                    backgroundColor: '#009e92',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#007a6e'
                                                    }
                                                }}
                                                component="label"
                                                variant="contained"
                                                tabIndex={-1}
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Upload Certificate
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={(e) => handleAdditionalFileChange(e, 'hospitalRegistrationCertificate')}
                                                />
                                            </Button>
                                            {manufacturingImageFile.hospitalRegistrationCertificate && (
                                                <Box sx={{ 
                                                    mt: 2, 
                                                    p: 2, 
                                                    border: '1px solid #e0e0e0', 
                                                    borderRadius: '8px',
                                                    backgroundColor: '#f8f9fa'
                                                }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Box>
                                                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                                {allData.files.hospitalRegistrationCertificate?.fileName || 'Hospital Registration Certificate'}
                                                            </Typography>
                                                            {allData.files.hospitalRegistrationCertificate?.size && (
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                                    Size: {formatFileSize(allData.files.hospitalRegistrationCertificate.size)}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => removeFile('hospitalRegistrationCertificate')}
                                                            sx={{ minWidth: 'auto', px: 2 }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            )}
                                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                                                Note: Maximum file size allowed is 10MB
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                Address Proof <span style={{ color: 'red' }}>*</span>
                                            </Typography>
                                            <Button
                                                sx={{ 
                                                    textTransform: 'none', 
                                                    fontSize: '0.875rem', 
                                                    backgroundColor: '#009e92',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#007a6e'
                                                    }
                                                }}
                                                component="label"
                                                variant="contained"
                                                tabIndex={-1}
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Upload Address Proof
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={(e) => handleAdditionalFileChange(e, 'hospitalAddressProof')}
                                                />
                                            </Button>
                                            {manufacturingImageFile.hospitalAddressProof && (
                                                <Box sx={{ 
                                                    mt: 2, 
                                                    p: 2, 
                                                    border: '1px solid #e0e0e0', 
                                                    borderRadius: '8px',
                                                    backgroundColor: '#f8f9fa'
                                                }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Box>
                                                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                                {allData.files.hospitalAddressProof?.fileName || 'Hospital Address Proof'}
                                                            </Typography>
                                                            {allData.files.hospitalAddressProof?.size && (
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                                    Size: {formatFileSize(allData.files.hospitalAddressProof.size)}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => removeFile('hospitalAddressProof')}
                                                            sx={{ minWidth: 'auto', px: 2 }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            )}
                                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                                                Note: Maximum file size allowed is 10MB
                                            </Typography>
                                        </Grid>
                                    </>
                                )}
                                
                                {/* Continue with other user types... */}
                                {/* ... existing code for other user types remains the same ... */}
                                
                                {/* Vendor specific fields remain the same */}
                                {/* ... existing vendor fields code remains the same ... */}
                            </Grid>
                        </Box>
                        
                        {/* Submit Button */}
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button 
                                onClick={handleSubmit} 
                                variant='contained' 
                                sx={{ 
                                    width: { xs: '100%', sm: '300px' },
                                    textTransform: 'none', 
                                    padding: '12px 32px', 
                                    fontSize: '1rem', 
                                    fontWeight: 'bold',
                                    backgroundColor: '#009e92',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: '#007a6e'
                                    }
                                }}
                            >
                                Confirm Registration
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Details;
// navigate('/ecommerceDashboard')