import React from 'react';
import styles from '../Profile.module.css';

const OrderDetailsDialog = ({
  orderDialogOpen,
  closeOrderDialog,
  selectedOrder,
  getStatusColor,
  formatDate,
  formatCurrency
}) => {
  return (
    <>
      {orderDialogOpen && (
        <div className={styles.modalOverlay} onClick={closeOrderDialog}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.orderIcon}>
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                <span>Order Details - #{selectedOrder?.id}</span>
              </div>
              <button className={styles.closeButton} onClick={closeOrderDialog}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {selectedOrder && (
                <div className={styles.orderDetailsContent}>
                  {/* Order Summary */}
                  <div className={styles.detailSection}>
                    <h3 className={styles.sectionTitle}>Order Summary</h3>
                    <div className={styles.summaryGrid}>
                      <div className={styles.summaryItem}>
                        <label>Order Date</label>
                        <span>{formatDate(selectedOrder.createdAt)}</span>
                      </div>
                      <div className={styles.summaryItem}>
                        <label>Status</label>
                        <span className={`${styles.statusBadge} ${styles[getStatusColor(selectedOrder.status)]}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className={styles.detailSection}>
                    <h3 className={styles.sectionTitle}>Customer Information</h3>
                    <div className={styles.customerGrid}>
                      <div className={styles.customerItem}>
                        <label>Name</label>
                        <span>{selectedOrder.customerInfo?.name}</span>
                      </div>
                      <div className={styles.customerItem}>
                        <label>Email</label>
                        <span>{selectedOrder.customerInfo?.email}</span>
                      </div>
                      <div className={styles.customerItem}>
                        <label>Delivery Address</label>
                        <span>
                          {selectedOrder.customerInfo?.address?.address}, {selectedOrder.customerInfo?.address?.city}, {selectedOrder.customerInfo?.address?.state}, {selectedOrder.customerInfo?.address?.country} - {selectedOrder.customerInfo?.address?.postalCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className={styles.detailSection}>
                    <h3 className={styles.sectionTitle}>Products</h3>
                    <div className={styles.productsTable}>
                      <div className={styles.tableHeader}>
                        <div className={styles.headerCell}>Product</div>
                        <div className={styles.headerCell}>Price</div>
                        <div className={styles.headerCell}>Quantity</div>
                        <div className={styles.headerCell}>Total</div>
                      </div>
                      <div className={styles.tableBody}>
                        {selectedOrder.productInfo?.map((product, index) => (
                          <div key={index} className={styles.tableRow}>
                            <div className={styles.tableCell}>
                              <span className={styles.productName}>{product.name}</span>
                            </div>
                            <div className={styles.tableCell}>
                              <span>{formatCurrency(product.price)}</span>
                            </div>
                            <div className={styles.tableCell}>
                              <span>{product.quantity}</span>
                            </div>
                            <div className={styles.tableCell}>
                              <span className={styles.productTotal}>{formatCurrency(product.total)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className={styles.detailSection}>
                    <h3 className={styles.sectionTitle}>Order Total</h3>
                    <div className={styles.totalGrid}>
                      <div className={styles.totalItem}>
                        <label>Subtotal</label>
                        <span>{formatCurrency(selectedOrder.subTotal)}</span>
                      </div>
                      <div className={styles.totalItem}>
                        <label>GST Amount</label>
                        <span>{formatCurrency(selectedOrder.gstAmount)}</span>
                      </div>
                      <div className={styles.totalDivider}></div>
                      <div className={styles.totalItem}>
                        <label className={styles.finalTotalLabel}>Total Amount</label>
                        <span className={styles.finalTotal}>{formatCurrency(selectedOrder.totalCost)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={closeOrderDialog}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailsDialog; 