import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { getUserInfoFromToken } from '../../utils/jwtUtils';
import { 
  updateCustomer, 
  getCustomerById,
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getAllOrders
} from '../../utils/Service';

// Import tab components
import ProfileTab from './profileTabs/ProfileTab';
import OrdersTab from './profileTabs/OrdersTab';
import AddressesTab from './profileTabs/AddressesTab';
import AddressDialog from './profileTabs/AddressDialog';
import OrderDetailsDialog from './profileTabs/OrderDetailsDialog';

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [showMessage, setShowMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Address management states
  const [addresses, setAddresses] = useState([]);
  const [fetchingAddresses, setFetchingAddresses] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  });
  
  // Orders management states
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const [orderPagination, setOrderPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [orderFilters, setOrderFilters] = useState({
    status: '',
    search: ''
  });
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  });

  const [originalData, setOriginalData] = useState({});

  // Fetch customer details from API
  const fetchCustomerDetails = async (customerId) => {
    try {
      console.log('Fetching customer details for ID:', customerId);
      const response = await getCustomerById(customerId);
      console.log('Customer details API response:', response);
      
      if (response.data && response.data.success) {
        const customerData = response.data.data || response.data;
        console.log('Customer data received:', customerData);
        
        const profileDataObj = {
          id: customerData.id || customerData._id || customerId,
          name: customerData.name || '',
          email: customerData.email || '',
          phone: customerData.phone || '',
          address: customerData.address || '',
          city: customerData.city || '',
          state: customerData.state || '',
          country: customerData.country || '',
          postalCode: customerData.postalCode || ''
        };
        
        console.log('Setting profile data from API:', profileDataObj);
        setProfileData(profileDataObj);
        setOriginalData(profileDataObj);
      } else {
        console.warn('Failed to fetch customer details:', response.data);
        // Fallback to JWT data if API fails
        loadUserDataFromJWT();
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      // Fallback to JWT data if API fails
      loadUserDataFromJWT();
    } finally {
      setFetchingData(false);
    }
  };

  // Fetch addresses for customer
  const fetchAddresses = async (customerId) => {
    try {
      setFetchingAddresses(true);
      console.log('Fetching addresses for customer ID:', customerId);
      const response = await getAllAddresses({ customerId });
      console.log('Addresses API response:', response);
      
      if (response.data && response.data.success) {
        const addressesData = response.data.data || response.data.addresses || [];
        console.log('Addresses data received:', addressesData);
        setAddresses(addressesData);
      } else {
        console.warn('Failed to fetch addresses:', response.data);
        setAddresses([]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setAddresses([]);
    } finally {
      setFetchingAddresses(false);
    }
  };

  // Fetch orders for customer
  const fetchOrders = async (customerId, page = 1, filters = {}) => {
    try {
      setFetchingOrders(true);
      console.log('Fetching orders for customer ID:', customerId);
      console.log('Page:', page);
      console.log('Filters:', filters);
      
      const params = {
        customerId,
        page,
        limit: orderPagination.limit,
        ...filters
      };
      
      console.log('API params being sent:', params);
      const response = await getAllOrders(params);
      console.log('Orders API response:', response);
      
      if (response.data && response.data.success) {
        const ordersData = response.data.data || [];
        const paginationData = response.data.pagination || {};
        
        console.log('Orders data received:', ordersData);
        console.log('Pagination data:', paginationData);
        
        setOrders(ordersData);
        setOrderPagination({
          total: paginationData.total || 0,
          page: paginationData.page || 1,
          limit: paginationData.limit || 10,
          totalPages: paginationData.totalPages || 0
        });
      } else {
        console.warn('Failed to fetch orders:', response.data);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setFetchingOrders(false);
    }
  };

  // Load user data from JWT token (fallback)
  const loadUserDataFromJWT = () => {
    const userInfo = getUserInfoFromToken();
    console.log('Loading user data from JWT (fallback):', userInfo);
    
    if (userInfo) {
      const profileDataObj = {
        id: userInfo.id || userInfo._id || '',
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        city: userInfo.city || '',
        state: userInfo.state || '',
        country: userInfo.country || '',
        postalCode: userInfo.postalCode || ''
      };
      
      console.log('Setting profile data from JWT:', profileDataObj);
      setProfileData(profileDataObj);
      setOriginalData(profileDataObj);
    } else {
      console.warn('No user info found in JWT token');
    }
    setFetchingData(false);
  };

  // Get user info and fetch customer details
  useEffect(() => {
    const userInfo = getUserInfoFromToken();
    console.log('Profile component - User info from JWT:', userInfo);
    
    if (userInfo && (userInfo.id || userInfo._id)) {
      const customerId = userInfo.id || userInfo._id;
      console.log('Customer ID found, fetching details:', customerId);
      fetchCustomerDetails(customerId);
      fetchAddresses(customerId);
      fetchOrders(customerId);
    } else {
      console.warn('No customer ID found in JWT, using fallback data');
      loadUserDataFromJWT();
    }
  }, []);

  // Auto-apply search filter with debounce
  useEffect(() => {
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    
    if (customerId && orderFilters.search !== undefined) {
      const timeoutId = setTimeout(() => {
        fetchOrders(customerId, 1, orderFilters);
      }, 500); // 500ms delay
      
      return () => clearTimeout(timeoutId);
    }
  }, [orderFilters.search]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressInputChange = (field, value) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updateCustomer(profileData);
      console.log('Update customer response:', response);
      
      if (response.data && response.data.success) {
        setMessage('Profile updated successfully!');
        setSeverity('success');
        setIsEditing(false);
        setOriginalData({ ...profileData });
        
        // Update the stored user data
        const updatedUserData = { ...originalData, ...profileData };
        sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
      } else {
        setMessage(response.data?.message || 'Failed to update profile');
        setSeverity('error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage(error.response?.data?.message || 'An error occurred while updating profile');
      setSeverity('error');
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const handleCancel = () => {
    setProfileData({ ...originalData });
    setIsEditing(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('userType');
    navigate('/');
  };

  const handleSectionChange = (section) => {
    if (section === 'logout') {
      handleLogout();
    } else {
      setActiveSection(section);
    }
  };

  // Address management functions
  const openAddressDialog = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        address: address.address || '',
        city: address.city || '',
        state: address.state || '',
        country: address.country || '',
        postalCode: address.postalCode || ''
      });
    } else {
      setEditingAddress(null);
      setAddressForm({
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
      });
    }
    setAddressDialogOpen(true);
  };

  const closeAddressDialog = () => {
    setAddressDialogOpen(false);
    setEditingAddress(null);
    setAddressForm({
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    });
  };

  const handleSaveAddress = async () => {
    try {
      const userInfo = getUserInfoFromToken();
      const customerId = userInfo?.id || userInfo?._id;
      
      if (editingAddress) {
        // Update existing address
        const response = await updateAddress({
          id: editingAddress.id || editingAddress._id,
          ...addressForm
        });
        
        if (response.data && response.data.success) {
          setMessage('Address updated successfully!');
          setSeverity('success');
          fetchAddresses(customerId); // Refresh addresses
        } else {
          setMessage(response.data?.message || 'Failed to update address');
          setSeverity('error');
        }
      } else {
        // Create new address
        const response = await createAddress({
          customerId,
          ...addressForm
        });
        
        if (response.data && response.data.success) {
          setMessage('Address added successfully!');
          setSeverity('success');
          fetchAddresses(customerId); // Refresh addresses
        } else {
          setMessage(response.data?.message || 'Failed to add address');
          setSeverity('error');
        }
      }
      
      closeAddressDialog();
      setShowMessage(true);
    } catch (error) {
      console.error('Error saving address:', error);
      setMessage(error.response?.data?.message || 'An error occurred while saving address');
      setSeverity('error');
      setShowMessage(true);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const response = await deleteAddress(addressId);
        
        if (response.data && response.data.success) {
          setMessage('Address deleted successfully!');
          setSeverity('success');
          
          // Refresh addresses
          const userInfo = getUserInfoFromToken();
          const customerId = userInfo?.id || userInfo?._id;
          fetchAddresses(customerId);
        } else {
          setMessage(response.data?.message || 'Failed to delete address');
          setSeverity('error');
        }
        setShowMessage(true);
      } catch (error) {
        console.error('Error deleting address:', error);
        setMessage(error.response?.data?.message || 'An error occurred while deleting address');
        setSeverity('error');
        setShowMessage(true);
      }
    }
  };

  // Order management functions
  const handleOrderFilterChange = (field, value) => {
    const newFilters = {
      ...orderFilters,
      [field]: value
    };
    setOrderFilters(newFilters);
    
    // Apply status filter immediately, search will be handled by useEffect
    if (field === 'status') {
      const userInfo = getUserInfoFromToken();
      const customerId = userInfo?.id || userInfo?._id;
      fetchOrders(customerId, 1, newFilters);
    }
  };

  const handleOrderSearch = () => {
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    fetchOrders(customerId, 1, orderFilters);
  };

  // Handle search input with debounce
  const handleSearchInputChange = (value) => {
    setOrderFilters(prev => ({
      ...prev,
      search: value
    }));
  };

  // Apply search with Enter key or button click
  const handleSearchSubmit = () => {
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    fetchOrders(customerId, 1, orderFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      search: ''
    };
    setOrderFilters(clearedFilters);
    
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    fetchOrders(customerId, 1, clearedFilters);
  };

  const handleOrderPageChange = (newPage) => {
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    fetchOrders(customerId, newPage, orderFilters);
  };

  const openOrderDialog = (order) => {
    setSelectedOrder(order);
    setOrderDialogOpen(true);
  };

  const closeOrderDialog = () => {
    setOrderDialogOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const renderProfileContent = () => (
    <ProfileTab
      fetchingData={fetchingData}
      profileData={profileData}
      isEditing={isEditing}
      loading={loading}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      handleCancel={handleCancel}
      setIsEditing={setIsEditing}
    />
  );

  const renderOrdersContent = () => (
    <OrdersTab
      orders={orders}
      fetchingOrders={fetchingOrders}
      orderFilters={orderFilters}
      orderPagination={orderPagination}
      handleOrderFilterChange={handleOrderFilterChange}
      handleSearchInputChange={handleSearchInputChange}
      handleSearchSubmit={handleSearchSubmit}
      handleClearFilters={handleClearFilters}
      handleOrderPageChange={handleOrderPageChange}
      openOrderDialog={openOrderDialog}
      getStatusColor={getStatusColor}
      formatDate={formatDate}
      formatCurrency={formatCurrency}
    />
  );

  const renderAddressesContent = () => (
    <AddressesTab
      addresses={addresses}
      fetchingAddresses={fetchingAddresses}
      openAddressDialog={openAddressDialog}
      handleDeleteAddress={handleDeleteAddress}
    />
  );

  return (
    <div className={styles.profileContainer}>
      <div className={styles.layout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* User Info Section */}
          <div className={styles.userInfo}>
            <div className={styles.userInfoContent}>
              <div className={styles.userAvatar}>
                <svg className={styles.userAvatarIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div>
                <p className={styles.welcomeText}>Welcome back,</p>
                <p className={styles.userEmail}>{profileData.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <button 
                className={`${styles.navButton} ${activeSection === 'profile' ? styles.active : ''}`}
                onClick={() => handleSectionChange('profile')}
              >
                <span className={styles.navText}>Dashboard</span>
              </button>
            </li>
            
            <li className={styles.navItem}>
              <button 
                className={`${styles.navButton} ${activeSection === 'orders' ? styles.active : ''}`}
                onClick={() => handleSectionChange('orders')}
              >
                <span className={styles.navText}>Orders</span>
              </button>
            </li>
            
            <li className={styles.navItem}>
              <button 
                className={`${styles.navButton} ${activeSection === 'addresses' ? styles.active : ''}`}
                onClick={() => handleSectionChange('addresses')}
              >
                <span className={styles.navText}>Addresses</span>
              </button>
            </li>
            
            <div className={styles.divider}></div>
            
            <li className={styles.navItem}>
              <button 
                className={styles.logoutButton}
                onClick={() => handleSectionChange('logout')}
              >
                <svg className={styles.logoutIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                <span className={styles.navText}>Log out</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.contentContainer}>
            {activeSection === 'profile' && renderProfileContent()}
            {activeSection === 'orders' && renderOrdersContent()}
            {activeSection === 'addresses' && renderAddressesContent()}
          </div>
        </div>
      </div>

      {/* Snackbar for messages */}
      {showMessage && (
        <div className={styles.snackbar}>
          <div className={`${styles.alert} ${styles[severity]}`}>
            <span>{message}</span>
            <button 
              className={styles.closeButton}
              onClick={() => setShowMessage(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Address Dialog */}
      <AddressDialog
        addressDialogOpen={addressDialogOpen}
        closeAddressDialog={closeAddressDialog}
        editingAddress={editingAddress}
        addressForm={addressForm}
        handleAddressInputChange={handleAddressInputChange}
        handleSaveAddress={handleSaveAddress}
      />

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        orderDialogOpen={orderDialogOpen}
        closeOrderDialog={closeOrderDialog}
        selectedOrder={selectedOrder}
        getStatusColor={getStatusColor}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
      />

    </div>
  );
};

export default Profile; 