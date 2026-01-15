import { fetchAuthenticated } from './apiClient';

export const getOutOfStockReport = async () => {
    return fetchAuthenticated('/reports/out-of-stock', { method: 'GET' });
};

export const getDailyRevenueReport = async () => {
    return fetchAuthenticated('/reports/daily-revenue', { method: 'GET' });
};

export const getCustomerPurchasesReport = async () => {
    return fetchAuthenticated('/reports/customer-purchases', { method: 'GET' });
};