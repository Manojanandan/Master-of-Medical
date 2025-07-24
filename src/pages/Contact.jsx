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
      const res = await createSupportQuery({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      if (res.ok) {
        setSuccess('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Failed to send message.');
      }
    } catch (err) {
      setError('Network error.');
    }
    setLoading(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      {/* Top Heading Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
          Contact With Us
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mt: 1, mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
        >
          You can ask us questions
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Contact us for all your questions and opinions, or you can solve your
          problems in a shorter time with our contact offices.
        </Typography>
      </Box>

      {/* Main Grid */}
      <Grid container spacing={6} marginLeft={10}>
        {/* Left Column: Office Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Our Offices
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', maxWidth: 700, mb: 4 }}
          >
            On dekande myrdutard mora även om skurkstat. Semirade tinaheten rena. Radiogen pasam inte loba även om
            prerade i garanterad traditionell specialitet till bebel.
          </Typography>

          {/* United States Office */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
            <LocationOnIcon color="primary" sx={{ mt: 0.5 }} />
            <Box>
              <Typography variant="caption" fontWeight={500} color="text.secondary">
                United States
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                United States Office
              </Typography>
              <Typography variant="body2" color="text.secondary">
                205 Middle Road, 2nd Floor, New York
              </Typography>
              <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                +02 1234 567 88
              </Typography>
              <Link href="mailto:info@example.com" underline="hover" color="primary">
                info@example.com
              </Link>
            </Box>
          </Box>

          {/* Munich Office */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <LocationOnIcon color="primary" sx={{ mt: 0.5 }} />
            <Box>
              <Typography variant="caption" fontWeight={500} color="text.secondary">
                Munich
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Munich Office
              </Typography>
              <Typography variant="body2" color="text.secondary">
                205 Middle Road, 2nd Floor, New York
              </Typography>
              <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                +5 456 123 22
              </Typography>
              <Link href="mailto:contact@example.com" underline="hover" color="primary">
                contact@example.com
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Right Column: Contact Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
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
                variant="outlined"
                fullWidth
                value={form.name}
                onChange={handleChange}
              />
              <TextField
              
                label="Email *"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={form.email}
                onChange={handleChange}
              />
            </Box>

            <TextField
              
              label="Subject *"
              name="subject"
              variant="outlined"
              fullWidth
              value={form.subject}
              onChange={handleChange}
            />

            <TextField
              label="Message"
              name="message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={form.message}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ alignSelf: 'flex-start', mt: 1 }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Social Media Footer */}
      <Box
        sx={{
          mt: 8,
          pt: 3,
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

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Link href="#" color="inherit" target="_blank">
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              sx={{ width: 24, height: 24, '&:hover': { opacity: 0.7 } }}
            />
          </Link>
          <Link href="#" color="inherit" target="_blank">
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              sx={{ width: 24, height: 24, '&:hover': { opacity: 0.7 } }}
            />
          </Link>
          <Link href="#" color="inherit" target="_blank">
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              sx={{ width: 24, height: 24, '&:hover': { opacity: 0.7 } }}
            />
          </Link>
          <Link href="#" color="inherit" target="_blank">
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
              alt="LinkedIn"
              sx={{ width: 24, height: 24, '&:hover': { opacity: 0.7 } }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
