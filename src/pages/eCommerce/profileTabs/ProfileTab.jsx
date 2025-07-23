import React, { useState } from 'react';
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import styles from '../Profile.module.css';

const ProfileTab = ({
  fetchingData,
  profileData,
  isEditing,
  loading,
  handleInputChange,
  handleSave,
  handleCancel,
  setIsEditing
}) => {
  // Country, State, City dropdown states
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);

  // Handle country selection
  const handleCountryChange = (_country) => {
    setCountry(_country);
    handleInputChange('country', _country?.name || "");
    // Reset state and city when country changes
    setCurrentState(null);
    setCurrentCity(null);
    handleInputChange('state', "");
    handleInputChange('city', "");
  };

  // Handle state selection
  const handleStateChange = (_state) => {
    setCurrentState(_state);
    handleInputChange('state', _state?.name || "");
    // Reset city when state changes
    setCurrentCity(null);
    handleInputChange('city', "");
  };

  // Handle city selection
  const handleCityChange = (_city) => {
    setCurrentCity(_city);
    handleInputChange('city', _city?.name || "");
  };
  return (
    <div className={styles.formContainer}>
      {fetchingData ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3 className={styles.loadingText}>Loading Profile Data...</h3>
          <p className={styles.loadingSubtext}>
            Please wait while we fetch your profile information.
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className={styles.contentHeader}>
            <h1 className={styles.contentTitle}>Account Details</h1>
          </div>

          {/* Profile Form */}
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                First Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={profileData.name ? profileData.name.split(' ')[0] : ''}
                onChange={(e) => {
                  const lastName = profileData.name ? profileData.name.split(' ').slice(1).join(' ') : '';
                  handleInputChange('name', `${e.target.value} ${lastName}`.trim());
                }}
                disabled={!isEditing}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Last Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={profileData.name ? profileData.name.split(' ').slice(1).join(' ') : ''}
                onChange={(e) => {
                  const firstName = profileData.name ? profileData.name.split(' ')[0] : '';
                  handleInputChange('name', `${firstName} ${e.target.value}`.trim());
                }}
                disabled={!isEditing}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                className={styles.formInput}
                value={profileData.email}
                disabled={true}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Phone Number <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                className={styles.formInput}
                value={profileData.phone}
                disabled={true}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Street Address
              </label>
              <textarea
                className={`${styles.formInput} ${styles.formTextarea}`}
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Country
              </label>
              {isEditing ? (
                <CountrySelect
                  containerClassName={styles.dropdownContainer}
                  inputClassName={styles.dropdownInput}
                  onChange={handleCountryChange}
                  placeHolder="Select Country"
                />
              ) : (
                <input
                  type="text"
                  className={styles.formInput}
                  value={profileData.country}
                  disabled={true}
                />
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                State/Province
              </label>
              {isEditing ? (
                <StateSelect
                  countryid={country?.id}
                  containerClassName={styles.dropdownContainer}
                  inputClassName={styles.dropdownInput}
                  onChange={handleStateChange}
                  defaultValue={currentState}
                  placeHolder="Select State"
                />
              ) : (
                <input
                  type="text"
                  className={styles.formInput}
                  value={profileData.state}
                  disabled={true}
                />
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                City
              </label>
              {isEditing ? (
                <CitySelect
                  countryid={country?.id}
                  stateid={currentState?.id}
                  onChange={handleCityChange}
                  defaultValue={currentCity}
                  placeHolder="Select City"
                />
              ) : (
                <input
                  type="text"
                  className={styles.formInput}
                  value={profileData.city}
                  disabled={true}
                />
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Postal Code
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={profileData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonContainer}>
              {!isEditing ? (
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileTab; 