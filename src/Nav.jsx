// Nav.jsx - Top navigation bar component
import { C, getNavTabStyle } from './styles.js';

// List of all navigation tabs in display order
const TABS = ['Add Cost', 'Report', 'Pie Chart', 'Bar Chart', 'Settings'];

/*
Renders a horizontal navigation bar with a button for each tab.
The active tab is highlighted using getNavTabStyle.
Clicking a tab calls onChange with the tab name.
*/
export default function Nav({ active, onChange }) {
  return (
      <nav style={{ display: 'flex', gap: 4, padding: '0 32px', background: C.dark, flexWrap: 'wrap' }}>
        {TABS.map(tab => (
            <button key={tab} onClick={() => onChange(tab)} style={getNavTabStyle(active === tab, C)}>
              {tab}
            </button>
        ))}
      </nav>
  );
}
