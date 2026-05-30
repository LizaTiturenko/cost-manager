/* ReportPanel.jsx - Monthly report panel */
import { useState, useCallback, useEffect } from 'react';
import { Panel, Field, Btn, CategoryBadge } from './Components.jsx';
import { C, thStyle, getRowStyle, totalCardStyle, convertedBadgeStyle } from './styles.js';
import { CURRENCIES, MONTHS } from './constants.js';
import { costsDB, convertAmount } from './db.js';

export default function ReportPanel() {
  // Default to current month and year
  const now = new Date();
  const [currency, setCurrency] = useState('USD');
  const [year, setYear] = useState(String(now.getFullYear()));
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [report, setReport] = useState(null);

  /*
  Fetches the monthly report from the database for the selected
  year, month, and currency, then updates the report state.
  */
  const handleGet = useCallback(() => {
    const result = costsDB.getReport(currency, Number(year), Number(month));
    setReport(result);
  }, [currency, year, month]);

  // Re-fetch the report whenever the currency changes so totals stay up to date
  useEffect(() => {
    if (report) {
      const result = costsDB.getReport(currency, Number(year), Number(month));
      setReport(result);
    }
  }, [currency]);

  return (
      <Panel title="Monthly Report" icon="📋">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Field label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES} />
          <Field label="Year" value={year} onChange={setYear} type="number" />
          <Field label="Month" value={month} onChange={setMonth} options={Array.from({ length: 12 }, (_, i) => String(i + 1))} />
        </div>
        <Btn onClick={handleGet}>Generate Report</Btn>
        {report && (
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 14, fontWeight: 500 }}>
                {MONTHS[report.month - 1]} {report.year} · {report.costs.length} items
              </p>
              {report.costs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: C.textMuted }}>
                    No costs recorded for this period.
                  </div>
              ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                    <tr style={{ background: C.bgSurface }}>
                      {['Day', 'Category', 'Description', 'Amount', 'Currency', `In ${currency}`].map(h => (
                          <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                    </thead>
                    <tbody>
                    {report.costs.map((c, i) => {
                      // Show converted amount only when the item currency differs from selected
                      const converted = convertAmount(c.sum, c.currency, currency);
                      const isSameCurrency = c.currency === currency;
                      return (
                          <tr key={i} style={getRowStyle(i)}>
                            <td style={{ padding: '11px 14px', color: C.textMuted }}>{c.date.day}</td>
                            <td style={{ padding: '11px 14px' }}><CategoryBadge category={c.category} /></td>
                            <td style={{ padding: '11px 14px', color: C.textPrimary }}>{c.description}</td>
                            <td style={{ padding: '11px 14px', fontWeight: 600, color: C.textPrimary }}>{c.sum}</td>
                            <td style={{ padding: '11px 14px', color: C.primary, fontWeight: 600, fontSize: 12 }}>{c.currency}</td>
                            <td style={{ padding: '11px 14px' }}>
                              {isSameCurrency
                                  ? <span style={{ color: C.textMuted, fontSize: 12 }}>—</span>
                                  : <span style={convertedBadgeStyle}>{converted.toFixed(2)} {currency}</span>
                              }
                            </td>
                          </tr>
                      );
                    })}
                    </tbody>
                  </table>
              )}
              <div style={totalCardStyle}>
                <span style={{ fontSize: 13, color: C.textSecondary, fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: C.dark }}>
              {report.total.currency} {report.total.sum.toFixed(2)}
            </span>
              </div>
            </div>
        )}
      </Panel>
  );
}