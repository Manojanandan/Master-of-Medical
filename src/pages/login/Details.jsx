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
                formData.append('state', allData.state);
                formData.append('postalCode', allData.pincode);
                formData.append('name', allData.fullName);
                formData.append('email', allData.email);
                formData.append('password', tempData[0]?.password || ""); // Keep password from tempData for now
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '3% 0 0' }}>Type of users<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                                        {errorMsg.vendorTypeError &&
                                            <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errorMsg.vendorTypeError}</Typography>}
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Hospital Registration Certificate<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Pathology Name<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Lab Registration Certificate<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Identity Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                        accept="image/png, image/jpeg"
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Diagnostic Center Registration Certificate<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'diagnosticRegistrationCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImage.diagnosticRegistrationCertificate && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.diagnosticRegistrationCertificate}
                                                            alt="Diagnostic Registration Certificate"
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Identity Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'diagnosticAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImage.diagnosticAddressProof && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.diagnosticAddressProof}
                                                            alt="Diagnostic Address Proof"
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Registration Certificate<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'physioEstablishmentCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImage.physioEstablishmentCertificate && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.physioEstablishmentCertificate}
                                                            alt="Physio Establishment Certificate"
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Trade License<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'physioTradeLicense')}
                                                    />
                                                </Button>
                                                {manufacturingImage.physioTradeLicense && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.physioTradeLicense}
                                                            alt="Physio Trade License"
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'physioAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImage.physioAddressProof && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.physioAddressProof}
                                                            alt="Physio Address Proof"
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Registration Certificate</Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'rehabEstablishmentCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImage.rehabEstablishmentCertificate && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.rehabEstablishmentCertificate}
                                                            alt="Rehabilitation Establishment Certificate"
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'rehabAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImage.rehabAddressProof && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.rehabAddressProof}
                                                            alt="Rehabilitation Address Proof"
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'polyclinicTradeLicense')}
                                                    />
                                                </Button>
                                                {manufacturingImage.polyclinicTradeLicense && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.polyclinicTradeLicense}
                                                            alt="Polyclinic Trade License"
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Clinical Registration Certificate</Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'polyclinicClinicalCertificate')}
                                                    />
                                                </Button>
                                                {manufacturingImage.polyclinicClinicalCertificate && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.polyclinicClinicalCertificate}
                                                            alt="Polyclinic Clinical Certificate"
                                                            style={{
                                                                width: '200px',
                                                                height: 'auto',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Address Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => handleAdditionalFileChange(e, 'polyclinicAddressProof')}
                                                    />
                                                </Button>
                                                {manufacturingImage.polyclinicAddressProof && (
                                                    <div style={{ marginTop: '5%' }}>
                                                        <img
                                                            src={manufacturingImage.polyclinicAddressProof}
                                                            alt="Polyclinic Address Proof"
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
                                    {labelChanges === "Student" && (
                                        <>
                                            <Grid item size={6}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Student ID<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Student ID Card<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>MDM License<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>GST (Optional)</Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>BIS (Optional)</Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>ISO/FDA/CE (Optional)</Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Loan License<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>D/L (Optional)</Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>ISO/FDA/CE (Optional)</Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>D/L<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Gumasta<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>GST (Optional)</Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Proof<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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
                                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Authorization of Company<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
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