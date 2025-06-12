import React, { useState } from 'react'
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    const [labelChanges, setLabelChanges] = useState("")
    const [featureImage, setFeatureImage] = useState(null);
    const [featureImageFile, setFeatureImageFile] = useState(null);
    const useQuery = new URLSearchParams(useLocation().search)
    const type = useQuery.get("type")

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const previewUrl = URL.createObjectURL(file);
            setFeatureImage(previewUrl);
            setFeatureImageFile(file);
        } else {
            alert('Please select a PNG or JPEG image.');
            setFeatureImage(null);
            setFeatureImageFile(null);
        }
    };
    return (
        <React.Fragment>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Box sx={{ border: 'solid 1.5px #d1cbcb', height: 'auto', margin: '2% auto', backgroundColor: '#d8d1d136', borderRadius: '15px', width: '65%' }}>
                    <Stack direction='column'>
                        <Typography variant='h4' sx={{ margin: '2% auto',textTransform:'capitalize' }}>{type} Details</Typography>
                    </Stack>
                    <Box sx={{ width: '95%', margin: '1% auto', }}>
                        <Grid container columnSpacing={2}>
                            <Grid item size={12} >
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '1% 0 1%' }}>Name</Typography>
                                <TextField fullWidth id="name" size="small" />
                            </Grid>
                            <Grid item size={12} >
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '2% 0 1%', }}>Address</Typography>
                                <TextField fullWidth id="addressLine1" size="small" sx={{ marginBottom: '1%' }} />
                                <TextField fullWidth id="addressLine2" size="small" />
                            </Grid>
                            <Grid item size={6} >
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '3% 0 1%' }}>Contact Number</Typography>
                                <TextField fullWidth id="number" size="small" />
                            </Grid>
                            <Grid item size={6} >
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '3% 0 1%' }}>City</Typography>
                                <TextField fullWidth id="city" size="small" />
                            </Grid>
                            <Grid item size={6} >
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '5% 0 1%' }}>State</Typography>
                                <TextField fullWidth id="state" size="small" />
                            </Grid>
                            <Grid item size={6} >
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '5% 0 1%' }}>Pincode</Typography>
                                <TextField fullWidth id="pincode" size="small" />
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
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '3% 0 0' }}>Type of vendors</Typography>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            name="radio"

                                        >
                                            <FormControlLabel value="M" control={<Radio />} label="Manufacturing" onClick={() => setLabelChanges("M")} />
                                            <FormControlLabel value="OEM" control={<Radio />} label="OEM" onClick={() => setLabelChanges("OEM")} />
                                            <FormControlLabel value="C&F" control={<Radio />} label="C&F / Super Stockist / Dealer's" onClick={() => setLabelChanges("C&F")} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {labelChanges === "M" && (
                                <>
                                    <Grid item size={6}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>MDM License</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>GST</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>BIS</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>ISO/FDA/CE </Typography>
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
                                {labelChanges === "OEM" && (
                                <>
                                    <Grid item size={6}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Loan License</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Proof</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>D/L</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>ISO/FDA/CE </Typography>
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
                                {labelChanges === "C&F" && (
                                <>
                                    <Grid item size={6}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>D/L</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Gumasta</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>GST</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Establishment Proof</Typography>
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
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Authorization of Company </Typography>
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
                            )
                        }

                        </Grid>
                    </Box>
                    <Stack direction='column'>
                        <Button onClick={() => navigate('/ecommerceDashboard')} variant='contained' sx={{ width: '400px', margin: '4% auto 4%', borderRadius: '15px', textTransform: 'capitalize', padding: '1%', fontSize: '16px', fontWeight: 'bold' }}>Confirm</Button>
                    </Stack>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Details