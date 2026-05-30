/* BarPanel.jsx - Yearly overview bar chart panel */
import { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Panel, Field, Btn } from './Components.jsx';
import { C } from './styles.js';
import { CURRENCIES } from './constants.js';
import { costsDB } from './db.js';

export default function BarPanel() {
  // Get the current date to set the default year
  const now = new Date();

  // State for selected currency, year, and chart data
  const [currency, setCurrency] = useState('USD');
  const [year, setYear] = useState(String(now.getFullYear()));
  const [data, setData] = useState(null);

  /*
  Fetches total costs per month for the selected year and currency.
  Returns 12 data points, one for each month, used to render the bar chart.
  */
  const handleGet = useCallback(() => {
    const result = costsDB.getYearlyData(currency, Number(year));
    setData(result);
  }, [currency, year]);

  return (
      <Panel title="Yearly Overview" icon="📊">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES} />
          <Field label="Year" value={year} onChange={setYear} type="number" />
        </div>
        <Btn onClick={handleGet}>Show Bar Chart</Btn>
        {data && (
            <div style={{ marginTop: 24 }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data} barSize={28}>
                  <XAxis dataKey="month" stroke={C.border} tick={{ fill: C.textMuted, fontSize: 12 }} />
                  <YAxis stroke={C.border} tick={{ fill: C.textMuted, fontSize: 12 }} />
                  <Tooltip formatter={(val) => `${currency} ${val}`} contentStyle={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10 }} />
                  <Bar dataKey="total" fill={C.primary} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        )}
      </Panel>
  );
}