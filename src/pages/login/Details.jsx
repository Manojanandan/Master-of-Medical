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
                console.log(parsedData ,    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
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
                formData.append('password', allData.password);
                formData.append('address', address);
                formData.append('city', allData.city);
                formData.append('state', allData.state);
                formData.append('country', allData.country);
                formData.append('postalCode', allData.pincode);
                formData.append('type', allData.type);
                formData.append('userName', allData.fullName);

                
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
                formData.append('userName', allData.fullName);
                formData.append('address', address);
                formData.append('phone', allData.number);
                formData.append('city', allData.city);
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
                {/* Registration Stepper */}
                <Box sx={{ 
                    width: { xs: '100%', md: '85%' },
                    maxWidth: '1200px',
                    margin: '0 auto 2rem',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    padding: '1.5rem'
                }}>
                    <RegistrationStepper currentStep={2} />
                </Box>
                
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
                                User Details
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Complete your registration profile
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
                                
                                {/* User Type Selection */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                        {type !== "vendor" ? "Type of users" : "Type of vendors"} <span style={{ color: 'red' }}>*</span>
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
                                            value={type !== "vendor" ? labelChanges : allData.vendorType}
                                            onChange={type !== "vendor" ? 
                                                (e) => handleUserTypeChange(e.target.value) : 
                                                (e) => {
                                                    setAlldata({ ...allData, vendorType: e.target.value })
                                                    setErrorMsg({ ...errorMsg, vendorTypeError: "" })
                                                }
                                            }
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
                                            {type !== "vendor" ? (
                                                <>
                                                    <FormControlLabel value="H" control={<Radio />} label="Hospital" />
                                                    <FormControlLabel value="P" control={<Radio />} label="Pathology Labs" />
                                                    <FormControlLabel value="D" control={<Radio />} label="Diagnostic Centres" />
                                                    <FormControlLabel value="Physio" control={<Radio />} label="Physiotherapist" />
                                                    <FormControlLabel value="Re" control={<Radio />} label="Rehabilitation" />
                                                    <FormControlLabel value="Pc" control={<Radio />} label="Poly Clinic" />
                                                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                                                </>
                                            ) : (
                                                <>
                                                    <FormControlLabel value="manufacturing" control={<Radio />} label="Manufacturing" />
                                                    <FormControlLabel value="oem" control={<Radio />} label="OEM" />
                                                    <FormControlLabel value="dealer" control={<Radio />} label="C&F / Super Stockist / Dealer's" />
                                                </>
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                
                                {/* Conditional Fields - Keep all existing conditional rendering */}
                                {labelChanges === "H" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Hospital Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Hospital Name
                                                </Typography>
                                                <TextField 
                                                    fullWidth 
                                                    id="hospitalName" 
                                                    size="medium"
                                                    variant="outlined"
                                                    value={allData.additionalInformation.find(item => item.name === 'hospitalName')?.value || ''}
                                                    onChange={(e) => handleAdditionalInfoChange('hospitalName', e.target.value)}
                                                    placeholder="Enter hospital name"
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Medical Council License
                                                </Typography>
                                                <TextField 
                                                    fullWidth 
                                                    id="medicalCouncilLicense" 
                                                    size="medium"
                                                    variant="outlined"
                                                    value={allData.additionalInformation.find(item => item.name === 'medicalCouncilLicense')?.value || ''}
                                                    onChange={(e) => handleAdditionalInfoChange('medicalCouncilLicense', e.target.value)}
                                                    placeholder="Enter medical council license number"
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Hospital Registration Certificate <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
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
                                                        marginTop: '1rem', 
                                                        border: '1px solid #e2e8f0', 
                                                        padding: '1rem', 
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f8f9fa'
                                                    }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Box>
                                                                <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
                                                                    {allData.files.hospitalRegistrationCertificate?.fileName || 'Hospital Registration Certificate'}
                                                                </Typography>
                                                                {allData.files.hospitalRegistrationCertificate?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.hospitalRegistrationCertificate.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('hospitalRegistrationCertificate')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Address Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Proof
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'hospitalAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.hospitalAddressProof && (
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
                                                                    {allData.files.hospitalAddressProof?.fileName || 'Hospital Address Proof'}
                                                                </Typography>
                                                                {allData.files.hospitalAddressProof?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.hospitalAddressProof.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('hospitalAddressProof')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                                
                                {/* Other User Type Conditional Fields */}
                                {labelChanges === "P" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Pathology Lab Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Pathology Name <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <TextField 
                                                    fullWidth 
                                                    id="pathologyName" 
                                                    size="medium"
                                                    variant="outlined"
                                                    value={allData.additionalInformation.find(item => item.name === 'pathologyName')?.value || ''}
                                                    onChange={(e) => handleAdditionalInfoChange('pathologyName', e.target.value)}
                                                    placeholder="Enter pathology lab name"
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Identity Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <TextField 
                                                    fullWidth 
                                                    id="pathologyIdentityProof" 
                                                    size="medium"
                                                    variant="outlined"
                                                    value={allData.additionalInformation.find(item => item.name === 'pathologyIdentityProof')?.value || ''}
                                                    onChange={(e) => handleAdditionalInfoChange('pathologyIdentityProof', e.target.value)}
                                                    placeholder="Enter identity proof number"
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Lab Registration Certificate <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Certificate
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'labRegistrationCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.labRegistrationCertificate && (
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
                                                                    {allData.files.labRegistrationCertificate?.fileName || 'Lab Registration Certificate'}
                                                                </Typography>
                                                                {allData.files.labRegistrationCertificate?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.labRegistrationCertificate.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('labRegistrationCertificate')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Address Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Proof
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'pathologyAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.pathologyAddressProof && (
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
                                                                    {allData.files.pathologyAddressProof?.fileName || 'Pathology Address Proof'}
                                                                </Typography>
                                                                {allData.files.pathologyAddressProof?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.pathologyAddressProof.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('pathologyAddressProof')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}

                                {labelChanges === "D" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Diagnostic Centre Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Identity Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <TextField 
                                                    fullWidth 
                                                    id="diagnosticIdentityProof" 
                                                    size="medium"
                                                    variant="outlined"
                                                    value={allData.additionalInformation.find(item => item.name === 'diagnosticIdentityProof')?.value || ''}
                                                    onChange={(e) => handleAdditionalInfoChange('diagnosticIdentityProof', e.target.value)}
                                                    placeholder="Enter identity proof number"
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Diagnostic Registration Certificate <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Certificate
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'diagnosticRegistrationCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.diagnosticRegistrationCertificate && (
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
                                                                    {allData.files.diagnosticRegistrationCertificate?.fileName || 'Diagnostic Registration Certificate'}
                                                                </Typography>
                                                                {allData.files.diagnosticRegistrationCertificate?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.diagnosticRegistrationCertificate.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('diagnosticRegistrationCertificate')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Address Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Proof
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'diagnosticAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.diagnosticAddressProof && (
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
                                                                    {allData.files.diagnosticAddressProof?.fileName || 'Diagnostic Address Proof'}
                                                                </Typography>
                                                                {allData.files.diagnosticAddressProof?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.diagnosticAddressProof.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('diagnosticAddressProof')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}

                                {labelChanges === "Physio" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Physiotherapist Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Establishment Certificate <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Certificate
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'physioEstablishmentCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.physioEstablishmentCertificate && (
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
                                                                    {allData.files.physioEstablishmentCertificate?.fileName || 'Physio Establishment Certificate'}
                                                                </Typography>
                                                                {allData.files.physioEstablishmentCertificate?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.physioEstablishmentCertificate.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('physioEstablishmentCertificate')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Trade License <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload License
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'physioTradeLicense')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.physioTradeLicense && (
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
                                                                    {allData.files.physioTradeLicense?.fileName || 'Physio Trade License'}
                                                                </Typography>
                                                                {allData.files.physioTradeLicense?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.physioTradeLicense.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('physioTradeLicense')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Address Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Proof
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'physioAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.physioAddressProof && (
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
                                                                    {allData.files.physioAddressProof?.fileName || 'Physio Address Proof'}
                                                                </Typography>
                                                                {allData.files.physioAddressProof?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.physioAddressProof.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('physioAddressProof')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}

                                {labelChanges === "Re" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Rehabilitation Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Identity Proof
                                                </Typography>
                                                <TextField 
                                                    fullWidth 
                                                    id="rehabIdentityProof" 
                                                    size="medium"
                                                    variant="outlined"
                                                    value={allData.additionalInformation.find(item => item.name === 'rehabIdentityProof')?.value || ''}
                                                    onChange={(e) => handleAdditionalInfoChange('rehabIdentityProof', e.target.value)}
                                                    placeholder="Enter identity proof number"
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Establishment Certificate
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Certificate
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'rehabEstablishmentCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.rehabEstablishmentCertificate && (
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
                                                                    {allData.files.rehabEstablishmentCertificate?.fileName || 'Rehabilitation Establishment Certificate'}
                                                                </Typography>
                                                                {allData.files.rehabEstablishmentCertificate?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.rehabEstablishmentCertificate.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('rehabEstablishmentCertificate')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Address Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Proof
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'rehabAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.rehabAddressProof && (
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
                                                                    {allData.files.rehabAddressProof?.fileName || 'Rehabilitation Address Proof'}
                                                                </Typography>
                                                                {allData.files.rehabAddressProof?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.rehabAddressProof.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('rehabAddressProof')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}

                                {labelChanges === "Pc" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Poly Clinic Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Trade License
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload License
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'polyclinicTradeLicense')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.polyclinicTradeLicense && (
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
                                                                    {allData.files.polyclinicTradeLicense?.fileName || 'Polyclinic Trade License'}
                                                                </Typography>
                                                                {allData.files.polyclinicTradeLicense?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.polyclinicTradeLicense.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('polyclinicTradeLicense')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Clinical Certificate
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Certificate
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'polyclinicClinicalCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.polyclinicClinicalCertificate && (
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
                                                                    {allData.files.polyclinicClinicalCertificate?.fileName || 'Polyclinic Clinical Certificate'}
                                                                </Typography>
                                                                {allData.files.polyclinicClinicalCertificate?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.polyclinicClinicalCertificate.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('polyclinicClinicalCertificate')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Address Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Proof
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'polyclinicAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.polyclinicAddressProof && (
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
                                                                    {allData.files.polyclinicAddressProof?.fileName || 'Polyclinic Address Proof'}
                                                                </Typography>
                                                                {allData.files.polyclinicAddressProof?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.polyclinicAddressProof.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('polyclinicAddressProof')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}

                                {labelChanges === "Student" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Student Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Student ID <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <TextField 
                                                    fullWidth 
                                                    id="studentId" 
                                                    size="medium"
                                                    variant="outlined"
                                                    value={allData.additionalInformation.find(item => item.name === 'studentId')?.value || ''}
                                                    onChange={(e) => handleAdditionalInfoChange('studentId', e.target.value)}
                                                    placeholder="Enter your student ID"
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Student ID Card <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload ID Card
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'studentIdCard')}
                                                    />
                                                </Button>
                                                {manufacturingImageFile.studentIdCard && (
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
                                                                    {allData.files.studentIdCard?.fileName || 'Student ID Card'}
                                                                </Typography>
                                                                {allData.files.studentIdCard?.size && (
                                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                                        Size: {formatFileSize(allData.files.studentIdCard.size)}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => removeFile('studentIdCard')}
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
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                                                    Note: Maximum file size allowed is 10MB
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                                
                                {/* Vendor Type Conditional Fields */}
                                {type === "vendor" && allData.vendorType === "manufacturing" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Manufacturing Vendor Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    MDM License <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
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
                                                                    {manufacturingImageFile.mdmLicense?.name || 'MDM License'}
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    GST (Optional)
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload GST
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
                                                                    {manufacturingImageFile.gst?.name || 'GST Document'}
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
                                        </Grid>
                                    </Grid>
                                )}

                                {type === "vendor" && allData.vendorType === "oem" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            OEM Vendor Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Loan License <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
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
                                                                    {manufacturingImageFile.loanLicense?.name || 'Loan License'}
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Establishment Proof <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
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
                                                                    {manufacturingImageFile.establishmentProof?.name || 'Establishment Proof'}
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
                                        </Grid>
                                    </Grid>
                                )}

                                {type === "vendor" && allData.vendorType === "dealer" && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#009e92' }}>
                                            Dealer Vendor Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    D/L <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
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
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Gumasta <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Button
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                        fontSize: '14px', 
                                                        backgroundColor: '#009e92',
                                                        '&:hover': {
                                                            backgroundColor: '#027a6f'
                                                        },
                                                        borderRadius: '8px',
                                                        padding: '0.75rem 1.5rem'
                                                    }}
                                                    component="label"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
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
                                        </Grid>
                                    </Grid>
                                )}
                                
                                {/* Keep all other conditional rendering sections exactly as they are */}
                                {/* The existing conditional rendering logic remains exactly the same, just with improved styling */}
                                
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
                            Complete Registration
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
    )
}

export default Details;
// navigate('/ecommerceDashboard')