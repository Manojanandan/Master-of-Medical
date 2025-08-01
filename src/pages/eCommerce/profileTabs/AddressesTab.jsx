import React from 'react';
import styles from '../AddressesTab.module.css';
const AddressesTab = ({
  addresses,
  fetchingAddresses,
  openAddressDialog,
  handleDeleteAddress
}) => {
  return (
    <div className={styles.addressesContainer}>
      <div className={styles.contentHeader}>
        <h1 className={styles.contentTitle}>Saved Addresses</h1>
        <p className={styles.contentSubtitle}>Manage your delivery addresses</p>
      </div>
      
      <div className={styles.addAddressSection}>
        <button
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={() => openAddressDialog()}
        >
          <svg viewBox="0 0 24 24" className={styles.addIcon}>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add New Address
        </button>
      </div>

      <div className={styles.addressesList}>
        {fetchingAddresses ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <h3 className={styles.loadingText}>Loading Addresses...</h3>
          </div>
        ) : addresses.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIllustration}>
              <svg viewBox="0 0 200 200" fill="none">
                <path d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z" fill="#F5F5F5"/>
                <path d="M150 150C150 177.614 127.614 200 100 200C72.3858 200 50 177.614 50 150C50 122.386 72.3858 100 100 100C127.614 100 150 122.386 150 150Z" fill="#F5F5F5"/>
                <path d="M50 50L150 150M50 150L150 50" stroke="#E0E0E0" strokeWidth="4"/>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No Addresses Found</h3>
            <p className={styles.emptyText}>
              You haven't added any addresses yet. Add your first address to get started.
            </p>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={() => openAddressDialog()}
            >
              <svg viewBox="0 0 24 24" className={styles.addIcon}>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className={styles.addressesGrid}>
            {addresses.map((address, index) => (
              <div 
                key={address.id || address._id || index} 
                className={styles.addressCard}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles.addressHeader}>
                  <div className={styles.addressTitle}>
                    <svg viewBox="0 0 24 24" className={styles.locationIcon}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>Address {index + 1}</span>
                    {address.isDefault && (
                      <span className={styles.defaultBadge}>Default</span>
                    )}
                  </div>
                  <div className={styles.addressActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => openAddressDialog(address)}
                      title="Edit Address"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => handleDeleteAddress(address.id || address._id)}
                      title="Delete Address"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className={styles.addressContent}>
                  <div className={styles.addressLine} title={address.address}>
                    {address.address}
                  </div>
                  <div className={styles.addressLine} title={`${address.city}, ${address.state}`}>
                    {address.city}, {address.state}
                  </div>
                  <div className={styles.addressLine} title={address.country}>
                    {address.country}
                  </div>
                  <div className={styles.addressLine} title={address.postalCode}>
                    {address.postalCode}
                  </div>
                </div>
                
                <div className={styles.addressFooter}>
                  {!address.isDefault && (
                    <button
                      className={styles.setDefaultButton}
                      onClick={() => console.log('Set as default')}
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesTab;