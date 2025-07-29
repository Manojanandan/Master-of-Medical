import React, { useState } from 'react';
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import styles from '../ProfileTab.module.css';


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
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);

  const handleCountryChange = (_country) => {
    setCountry(_country);
    handleInputChange('country', _country?.name || "");
    setCurrentState(null);
    setCurrentCity(null);
    handleInputChange('state', "");
    handleInputChange('city', "");
  };

  const handleStateChange = (_state) => {
    setCurrentState(_state);
    handleInputChange('state', _state?.name || "");
    setCurrentCity(null);
    handleInputChange('city', "");
  };

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
          <div className={styles.contentHeader}>
            <h1 className={styles.contentTitle}>Account Details</h1>
            <p className={styles.contentSubtitle}>Manage your personal information and preferences</p>
          </div>

          <div className={styles.formGrid}>
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
              <div className={styles.inputWithIcon}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <input
                  type="email"
                  className={styles.formInput}
                  value={profileData.email}
                  disabled={true}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Phone Number <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWithIcon}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <input
                  type="tel"
                  className={styles.formInput}
                  value={profileData.phone}
                  disabled={true}
                  required
                />
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
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
          </div>

          <div className={styles.buttonContainer}>
            {!isEditing ? (
              <button
                type="button"
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={() => setIsEditing(true)}
              >
                <svg className={styles.buttonIcon} viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
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
                  {loading ? (
                    <>
                      <div className={styles.buttonSpinner}></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className={styles.buttonIcon} viewBox="0 0 24 24">
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileTab;