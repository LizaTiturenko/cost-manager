/* constants.js - Application-wide constants */

// The four supported currencies across the app
export const CURRENCIES = ['USD', 'ILS', 'GBP', 'EURO'];

// Available expense categories for cost items
export const CATEGORIES = ['Food', 'Education', 'Car', 'Health', 'Entertainment', 'Housing', 'Other'];

// Short month names used in the bar chart X axis
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Sage green color palette used for pie and bar charts
export const CHART_COLORS = ['#6b7c5c', '#8a9e76', '#a8b890', '#c4d0ae', '#4a5a3e', '#b8c8a0', '#5a6a4c'];

// Key used to store and retrieve the custom rates URL in localStorage
export const RATES_URL_KEY = 'costmanager_rates_url';

// Fallback URL for fetching exchange rates if no custom URL is set
export const DEFAULT_RATES_URL = 'https://rates-json-c9bn.onrender.com/rates.json';