// Utility function to decode JWT token and extract vendor ID
export const decodeJWT = (token) => {
  try {
    if (!token) return null;
    
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Invalid JWT token format');
      return null;
    }
    
    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    console.log('JWT Payload:', payload); // Debug log
    return payload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Get vendor ID from JWT token
export const getVendorIdFromToken = () => {
  const token = sessionStorage.getItem('jwt');
  if (!token) {
    console.warn('No JWT token found in sessionStorage');
    return null;
  }
  
  const payload = decodeJWT(token);
  if (!payload) {
    console.warn('Failed to decode JWT token');
    return null;
  }
  
  // The vendor ID might be stored as 'id', 'vendorId', 'userId', etc.
  // We'll check common field names
  const vendorId = payload.id || payload.vendorId || payload.userId || payload.sub;
  
  if (!vendorId) {
    console.warn('No vendor ID found in JWT token payload:', payload);
    console.log('Available fields in JWT payload:', Object.keys(payload));
  } else {
    console.log('Vendor ID extracted from JWT:', vendorId);
  }
  
  return vendorId;
};

// Get user info from JWT token
export const getUserInfoFromToken = () => {
  const token = sessionStorage.getItem('jwt');
  if (!token) return null;
  
  const payload = decodeJWT(token);
  if (!payload) return null;
  
  return {
    id: payload.id || payload.vendorId || payload.userId || payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role || payload.type,
    status: payload.status || payload.approvalStatus || payload.isApproved,
  };
};

// Check if user status is pending
export const isUserStatusPending = () => {
  const user = getUserInfoFromToken();
  if (!user) return false;
  
  // Also check sessionStorage for additional user data
  const sessionUserData = sessionStorage.getItem('userData');
  let additionalData = null;
  
  if (sessionUserData) {
    try {
      additionalData = JSON.parse(sessionUserData);
    } catch (error) {
      console.error('Error parsing session user data:', error);
    }
  }
  
  // Check status from both sources
  const status = user.status || additionalData?.status || additionalData?.approvalStatus || additionalData?.isApproved;
  
  console.log('User status check:', {
    userStatus: user.status,
    additionalStatus: additionalData?.status,
    finalStatus: status
  });
  
  return status === 'pending' || status === false || status === 'false';
}; 