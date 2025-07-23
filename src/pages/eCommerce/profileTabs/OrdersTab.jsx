import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Profile.module.css';

const OrdersTab = ({
  orders,
  fetchingOrders,
  orderFilters,
  orderPagination,
  handleOrderFilterChange,
  handleSearchInputChange,
  handleSearchSubmit,
  handleClearFilters,
  handleOrderPageChange,
  openOrderDialog,
  getStatusColor,
  formatDate,
  formatCurrency
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.ordersContainer}>
      {/* Header */}
      <div className={styles.contentHeader}>
        <h1 className={styles.contentTitle}>Orders</h1>
        <p className={styles.contentSubtitle}>View and manage your order history</p>
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersGrid}>
          <div className={styles.searchGroup}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search orders..."
              value={orderFilters.search}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            <button
              className={styles.searchButton}
              onClick={handleSearchSubmit}
              disabled={fetchingOrders}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.searchIcon}>
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>

          <select
            className={styles.statusFilter}
            value={orderFilters.status}
            onChange={(e) => handleOrderFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className={styles.filterButtons}>
            <button
              className={styles.filterButton}
              onClick={handleSearchSubmit}
              disabled={fetchingOrders}
            >
              Apply
            </button>
            <button
              className={`${styles.filterButton} ${styles.clearButton}`}
              onClick={handleClearFilters}
              disabled={fetchingOrders}
            >
              Clear
            </button>
          </div>

          <div className={styles.orderCount}>
            <span>{orderPagination.total} orders</span>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className={styles.ordersList}>
        {fetchingOrders ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <h3 className={styles.loadingText}>Loading Orders...</h3>
          </div>
        ) : orders.length === 0 ? (
          <div className={styles.emptyContainer}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.emptyIcon}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <h3 className={styles.emptyTitle}>No Orders Found</h3>
            <p className={styles.emptyText}>
              {orderFilters.search || orderFilters.status 
                ? 'No orders match your current filters. Try adjusting your search criteria.'
                : 'Your order history will appear here once you make your first purchase.'
              }
            </p>
            {!orderFilters.search && !orderFilters.status && (
              <button 
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={() => navigate('/ecommerceDashboard')}
              >
                Start Shopping
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={styles.ordersTable}>
              <div className={styles.tableHeader}>
                <div className={styles.headerCell}>Order ID</div>
                <div className={styles.headerCell}>Date</div>
                <div className={styles.headerCell}>Products</div>
                <div className={styles.headerCell}>Total</div>
                <div className={styles.headerCell}>Status</div>
                <div className={styles.headerCell}>Actions</div>
              </div>
              
              <div className={styles.tableBody}>
                {orders.map((order, index) => (
                  <div key={order.id} className={styles.tableRow} style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className={styles.tableCell}>
                      <span className={styles.orderId}>#{order.id}</span>
                    </div>
                    <div className={styles.tableCell}>
                      <span className={styles.orderDate}>{formatDate(order.createdAt)}</span>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.productsList}>
                        {order.productInfo?.slice(0, 2).map((product, idx) => (
                          <div key={idx} className={styles.productItem}>
                            {product.name} (x{product.quantity})
                          </div>
                        ))}
                        {order.productInfo?.length > 2 && (
                          <div className={styles.moreItems}>
                            +{order.productInfo.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <span className={styles.orderTotal}>{formatCurrency(order.totalCost)}</span>
                    </div>
                    <div className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${styles[getStatusColor(order.status)]}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className={styles.tableCell}>
                      <button
                        className={styles.viewButton}
                        onClick={() => openOrderDialog(order)}
                        title="View Order Details"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.viewIcon}>
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {orderPagination.totalPages > 1 && (
              <div className={styles.pagination}>
                <div className={styles.paginationInfo}>
                  Showing {((orderPagination.page - 1) * orderPagination.limit) + 1} to{' '}
                  {Math.min(orderPagination.page * orderPagination.limit, orderPagination.total)} of{' '}
                  {orderPagination.total} orders
                </div>
                
                <div className={styles.paginationControls}>
                  <button
                    className={styles.paginationButton}
                    onClick={() => handleOrderPageChange(1)}
                    disabled={orderPagination.page === 1}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>
                    </svg>
                  </button>
                  <button
                    className={styles.paginationButton}
                    onClick={() => handleOrderPageChange(orderPagination.page - 1)}
                    disabled={orderPagination.page === 1}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  
                  <span className={styles.pageInfo}>
                    Page {orderPagination.page} of {orderPagination.totalPages}
                  </span>
                  
                  <button
                    className={styles.paginationButton}
                    onClick={() => handleOrderPageChange(orderPagination.page + 1)}
                    disabled={orderPagination.page === orderPagination.totalPages}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                  </button>
                  <button
                    className={styles.paginationButton}
                    onClick={() => handleOrderPageChange(orderPagination.totalPages)}
                    disabled={orderPagination.page === orderPagination.totalPages}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersTab; 