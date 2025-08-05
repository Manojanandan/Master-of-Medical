import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

const HelpSupport = () => {
  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', py: 0 }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#de3b6f', mb: 3, textAlign: 'center' }}>
            Help & Support
          </Typography>
          
          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 3 }}>
              We're here to help you with any questions or concerns.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#f49507', mb: 2 }}>
              Quick Contact Options
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Phone Support: Customer Care: +91-1800-123-4567 (Monday to Friday, 9:00 AM - 8:00 PM IST)
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Email Support: General Inquiries: <Typography component="span" sx={{ color: '#873589' }}>support@masterofmedical.com</Typography> (Response within 24 hours)
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Live Chat: Available on our website (Instant support during business hours)
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#f49507', mb: 2 }}>
              Support Categories
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Order Support: Help with placing, tracking, and managing orders - Contact: <Typography component="span" sx={{ color: '#873589' }}>orders@masterofmedical.com</Typography>
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Payment & Billing: Assistance with payments, refunds, and billing issues - Contact: <Typography component="span" sx={{ color: '#873589' }}>billing@masterofmedical.com</Typography>
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Shipping & Delivery: Information about shipping options and delivery tracking - Contact: <Typography component="span" sx={{ color: '#873589' }}>shipping@masterofmedical.com</Typography>
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Account & Security: Help with account access, security, and privacy - Contact: <Typography component="span" sx={{ color: '#873589' }}>security@masterofmedical.com</Typography>
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#f49507', mb: 2 }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              How do I place an order? To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in, provide shipping and payment information, and confirm your order.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              What payment methods do you accept? We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              How long does shipping take? Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for select locations. International shipping takes 7-14 business days depending on the destination.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Can I cancel or modify my order? You can cancel or modify your order within 2 hours of placing it. After that, please contact our customer support team immediately. Once shipped, orders cannot be cancelled.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              What is your return policy? We offer a 30-day return policy for most products. Items must be unused, in original packaging, and accompanied by proof of purchase. Some medical products may have different return policies.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              How do I track my order? You can track your order by logging into your account and visiting the 'My Orders' section, or by using the tracking number sent to your email. You can also contact our support team for assistance.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Are your products authentic and safe? Yes, all our products are 100% authentic and sourced directly from authorized manufacturers. We maintain strict quality control standards and all products comply with relevant safety regulations.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Do you ship internationally? Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please check our shipping calculator for specific details.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#f49507', mb: 2 }}>
              Additional Resources
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Product Information: Detailed product descriptions, usage instructions, and safety information
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Technical Support: Help with website navigation, account issues, and technical problems
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Account Help: Password reset, profile management, and account security assistance
            </Typography>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Need immediate assistance? Call us at <Typography component="span" sx={{ color: '#873589' }}>+91-1800-123-4567</Typography> or use our live chat feature.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HelpSupport;