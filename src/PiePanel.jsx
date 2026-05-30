/* PiePanel.jsx - Category breakdown pie chart panel */
import { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Panel, Field, Btn } from './Components.jsx';
import { C } from './styles.js';
import { CHART_COLORS, CURRENCIES } from './constants.js';
import { costsDB } from './db.js';

export default function PiePanel() {
  // Default to current month and year
  const now = new Date();
  const [currency, setCurrency] = useState('USD');
  const [year, setYear] = useState(String(now.getFullYear()));
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [data, setData] = useState(null);

  /*
  Fetches cost totals grouped by category for the selected month and currency.
  Each entry in the result becomes one slice in the pie chart.
  */
  const handleGet = useCallback(() => {
    const result = costsDB.getPieData(currency, Number(year), Number(month));
    setData(result);
  }, [currency, year, month]);

  return (
      <Panel title="Category Breakdown" icon="🥧">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Field label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES} />
          <Field label="Year" value={year} onChange={setYear} type="number" />
          <Field label="Month" value={month} onChange={setMonth} options={Array.from({ length: 12 }, (_, i) => String(i + 1))} />
        </div>
        <Btn onClick={handleGet}>Show Pie Chart</Btn>
        {data && (
            <div style={{ marginTop: 24 }}>
              {data.length === 0
                  ? <div style={{ textAlign: 'center', padding: '32px 0', color: C.textMuted }}>No data for this period.</div>
                  : (
                      <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}
                               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                               labelLine={{ stroke: C.borderMid }}>
                            {/* Assign a color from the palette to each slice */}
                            {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip formatter={(val) => `${currency} ${val}`} contentStyle={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10 }} />
                          <Legend wrapperStyle={{ fontSize: 12, color: C.textSecondary }} />
                        </PieChart>
                      </ResponsiveContainer>
                  )
              }
            </div>
        )}
      </Panel>
  );
}