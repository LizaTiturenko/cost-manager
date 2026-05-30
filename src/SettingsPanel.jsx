/* SettingsPanel.jsx - Settings panel for exchange rates URL */
import { useState, useEffect, useCallback } from 'react';
import { Panel, Field, Btn } from './Components.jsx';
import { C, infoBoxStyle } from './styles.js';
import { RATES_URL_KEY } from './constants.js';
import { loadRates, exchangeRates } from './db.js';

export default function SettingsPanel() {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState(null);

    // Load the previously saved URL from localStorage when the component mounts
    useEffect(() => {
        const saved = localStorage.getItem(RATES_URL_KEY);
        if (saved) setUrl(saved);
    }, []);

    /*
    Saves the URL to localStorage and attempts to fetch exchange rates from it.
    If the URL is invalid or unreachable, falls back to the default server and
    shows an error message to inform the user.
    */
    const handleSave = useCallback(async () => {
        localStorage.setItem(RATES_URL_KEY, url);
        setStatus({ type: 'loading', text: 'Fetching exchange rates...' });
        const { data: rates, usedDefault } = await loadRates(url);
        if (usedDefault) {
            // Provided URL failed - default rates were used as fallback
            setStatus({ type: 'error', text: `Invalid URL — using default rates. USD: 1 · ILS: ${rates.ILS} · GBP: ${rates.GBP} · EURO: ${rates.EURO}` });
        } else {
            setStatus({ type: 'success', text: `Rates loaded — USD: 1 · ILS: ${rates.ILS} · GBP: ${rates.GBP} · EURO: ${rates.EURO}` });
        }
    }, [url]);

    return (
        <Panel title="Settings" icon="⚙️">
            <div style={infoBoxStyle}>
                Provide a URL that returns exchange rates as JSON.<br />
            </div>
            <Field label="Exchange Rates URL" value={url} onChange={setUrl} />
            <Btn onClick={handleSave} disabled={!url.trim()}>Save & Load Rates</Btn>
            {status && (
                <div style={{
                    marginTop: 14, padding: '10px 16px', borderRadius: 10,
                    background: status.type === 'success' ? C.lightest : C.bgSurface,
                    color: status.type === 'success' ? C.success : status.type === 'error' ? C.error : C.textSecondary,
                    fontSize: 13, fontWeight: 500
                }}>
                    {status.text}
                </div>
            )}
        </Panel>
    );
}