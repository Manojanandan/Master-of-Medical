import React, { useState } from 'react';
import { createSupportQuery } from '../utils/Service';
import {
  Box,
  Typography,
  Grid,
  Link,
  TextField,
  Button,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    if (!form.name || !form.email || !form.subject) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await createSupportQuery(form);
      if (res.ok) {
        setSuccess('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      {/* Heading */}
      <Box textAlign="center" mb={6}>
        <Typography variant="overline" color="primary" fontWeight="bold">
          Contact With Us
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mt: 1, mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
        >
          You can ask us questions
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: 'auto' }}
        >
          Reach out for questions, feedback, or help. You can also connect with our regional offices for faster assistance.
        </Typography>
      </Box>

      {/* Grid Layout */}
      <Grid container spacing={6}>
        {/* Office Locations */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Our Offices
          </Typography>

          {[{
            title: 'United States Office',
            address: '205 Middle Road, 2nd Floor, New York',
            phone: '+02 1234 567 88',
            email: 'info@example.com',
            city: 'United States'
          }, {
            title: 'Munich Office',
            address: '205 Middle Road, 2nd Floor, Munich',
            phone: '+5 456 123 22',
            email: 'contact@example.com',
            city: 'Munich'
          }].map((office, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <LocationOnIcon color="primary" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="caption" fontWeight={500} color="text.secondary">
                  {office.city}
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  {office.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {office.address}
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                  {office.phone}
                </Typography>
                <Link href={`mailto:${office.email}`} underline="hover" color="primary">
                  {office.email}
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={6} >
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Get In Touch
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <TextField
                label="Name *"
                name="name"
                fullWidth
                variant="outlined"
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                label="Email *"
                name="email"
                fullWidth
                variant="outlined"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </Box>

            <TextField
              label="Subject *"
              name="subject"
              fullWidth
              variant="outlined"
              value={form.subject}
              onChange={handleChange}
            />

            <TextField
              label="Message"
              name="message"
              fullWidth
              variant="outlined"
              multiline
              minRows={4}
              value={form.message}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ width: 'fit-content' }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Social Media Links */}
      <Box
        sx={{
          mt: 8,
          pt: 4,
          borderTop: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Follow us:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {[
            { alt: 'Facebook', src: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' },
            { alt: 'Twitter', src: 'https://cdn-icons-png.flaticon.com/512/733/733579.png' },
            { alt: 'Instagram', src: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png' },
            { alt: 'LinkedIn', src: 'https://cdn-icons-png.flaticon.com/512/145/145807.png' },
          ].map((icon, i) => (
            <Link key={i} href="#" color="inherit" target="_blank">
              <Box
                component="img"
                src={icon.src}
                alt={icon.alt}
                sx={{ width: 24, height: 24, transition: '0.3s', '&:hover': { opacity: 0.6 } }}
              />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
