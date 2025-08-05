import React, { useState } from 'react';
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import styles from '../AddressDialog.module.css';


const AddressDialog = ({
  addressDialogOpen,
  closeAddressDialog,
  editingAddress,
  addressForm,
  handleAddressInputChange,
  handleSaveAddress
}) => {
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);

  const handleCountryChange = (_country) => {
    setCountry(_country);
    handleAddressInputChange('country', _country?.name || "");
    setCurrentState(null);
    setCurrentCity(null);
    handleAddressInputChange('state', "");
    handleAddressInputChange('city', "");
  };

  const handleStateChange = (_state) => {
    setCurrentState(_state);
    handleAddressInputChange('state', _state?.name || "");
    setCurrentCity(null);
    handleAddressInputChange('city', "");
  };

  const handleCityChange = (_city) => {
    setCurrentCity(_city);
    handleAddressInputChange('city', _city?.name || "");
  };

  return (
    <>
      {addressDialogOpen && (
        <div className={styles.modalOverlay} onClick={closeAddressDialog}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <svg viewBox="0 0 24 24" className={styles.locationIcon}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{editingAddress ? 'Edit Address' : 'Add New Address'}</span>
              </div>
              <button className={styles.closeButton} onClick={closeAddressDialog}>
                <svg viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.addressForm}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.formLabel}>
                    Street Address <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    className={styles.formTextarea}
                    value={addressForm.address}
                    onChange={(e) => handleAddressInputChange('address', e.target.value)}
                    rows={3}
                    placeholder="Enter street address"
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Country <span className={styles.required}>*</span>
                    </label>
                    <CountrySelect
                      containerClassName={styles.dropdownContainer}
                      inputClassName={styles.dropdownInput}
                      onChange={handleCountryChange}
                      placeHolder="Select Country"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      State <span className={styles.required}>*</span>
                    </label>
                    <StateSelect
                      countryid={country?.id}
                      containerClassName={styles.dropdownContainer}
                      inputClassName={styles.dropdownInput}
                      onChange={handleStateChange}
                      defaultValue={currentState}
                      placeHolder="Select State"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      City <span className={styles.required}>*</span>
                    </label>
                    <CitySelect
                      countryid={country?.id}
                      stateid={currentState?.id}
                      onChange={handleCityChange}
                      defaultValue={currentCity}
                      placeHolder="Select City"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Postal Code <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={addressForm.postalCode}
                      onChange={(e) => handleAddressInputChange('postalCode', e.target.value)}
                      placeholder="Enter postal code"
                      required
                    />
                  </div>
                </div>

                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="defaultAddress"
                    className={styles.checkbox}
                    checked={addressForm.isDefault}
                    onChange={(e) => handleAddressInputChange('isDefault', e.target.checked)}
                  />
                  <label htmlFor="defaultAddress" className={styles.checkboxLabel}>
                    Set as default shipping address
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={closeAddressDialog}>
                Cancel
              </button>
              <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleSaveAddress}>
                {editingAddress ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressDialog;