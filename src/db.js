/* db.js - Database logic and exchange rates management */
import { MONTHS, DEFAULT_RATES_URL } from './constants.js';

// Default rates used as fallback if server is unreachable
export let exchangeRates = { USD: 1, ILS: 3.4, GBP: 0.6, EURO: 0.8 };

/*
Converts an amount from one currency to another.
Uses USD as the base currency for all conversions.
Formula: divide by source rate to get USD, then multiply by target rate.
*/
export function convertAmount(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return amount;
  const inUsd = amount / exchangeRates[fromCurrency];
  return inUsd * exchangeRates[toCurrency];
}

/*
Fetches exchange rates from a given URL.
If the primary URL fails, falls back to DEFAULT_RATES_URL.
If both fail, returns the current hardcoded rates.
Returns { data, usedDefault } to let the caller know which source was used.
*/
export async function loadRates(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Bad response');
    const data = await res.json();
    exchangeRates = data;
    return { data, usedDefault: false };
  } catch (e) {
    // Primary URL failed - try default URL
    try {
      const res = await fetch(DEFAULT_RATES_URL);
      const data = await res.json();
      exchangeRates = data;
      return { data, usedDefault: true };
    } catch (e2) {
      // Both failed - use hardcoded fallback rates
      return { data: exchangeRates, usedDefault: true };
    }
  }
}

/*
CostsDB factory function - represents a named database instance.
Stores all cost items in localStorage under a versioned key.
*/
function CostsDB(name, version) {
  const storageKey = `${name}_v${version}_costs`;

  /* Loads all cost items from localStorage */
  function loadItems() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    return JSON.parse(raw);
  }

  /* Saves all cost items to localStorage */
  function saveItems(items) {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  /*
  Adds a new cost item to the database with today's date.
  Returns the saved item's core fields.
  */
  function addCost(cost) {
    const now = new Date();
    // Auto-generate date and unique id for the new item
    const newItem = {
      ...cost,
      date: { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() },
      id: Date.now()
    };
    const items = loadItems();
    items.push(newItem);
    saveItems(items);
    return { sum: newItem.sum, currency: newItem.currency, category: newItem.category, description: newItem.description };
  }

  /*
  Returns a monthly report in the requested currency.
  Filters items by year and month, converts each to the target currency,
  and calculates the total sum.
  */
  function getReport(currency, year, month) {
    const now = new Date();
    // Default to current month and year if not provided
    const targetYear = year !== undefined ? year : now.getFullYear();
    const targetMonth = month !== undefined ? month : now.getMonth() + 1;
    const all = loadItems();
    const filtered = all.filter(i => i.date.year === targetYear && i.date.month === targetMonth);
    let totalSum = 0;
    filtered.forEach(i => { totalSum += convertAmount(i.sum, i.currency, currency); });
    return {
      year: targetYear,
      month: targetMonth,
      costs: filtered.map(i => ({ sum: i.sum, currency: i.currency, category: i.category, description: i.description, date: { day: i.date.day } })),
      total: { currency, sum: Math.round(totalSum * 100) / 100 }
    };
  }

  /*
  Returns an array of 12 monthly totals for the given year and currency.
  Used to populate the bar chart with one data point per month.
  */
  function getYearlyData(currency, year) {
    const all = loadItems();
    // Initialize all 12 months with zero
    const monthly = Array(12).fill(0);
    all.filter(i => i.date.year === year).forEach(i => {
      const idx = i.date.month - 1;
      monthly[idx] += convertAmount(i.sum, i.currency, currency);
    });
    return monthly.map((sum, idx) => ({ month: MONTHS[idx], total: Math.round(sum * 100) / 100 }));
  }

  /*
  Returns an array of category totals for a given month and currency.
  Used to populate the pie chart with one slice per category.
  */
  function getPieData(currency, year, month) {
    const report = getReport(currency, year, month);
    const catMap = {};
    // Group costs by category and accumulate converted amounts
    report.costs.forEach(c => {
      const converted = convertAmount(c.sum, c.currency, currency);
      catMap[c.category] = (catMap[c.category] || 0) + converted;
    });
    return Object.entries(catMap).map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }));
  }

  return {
    addCost,
    getReport,
    getYearlyData,
    getPieData
  };
}

// Shared DB instance used across the entire app
export const costsDB = CostsDB('costsdb', 1);