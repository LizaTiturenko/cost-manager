/* Components.jsx - Shared reusable UI components */
import { C, inputStyle, labelStyle, cardStyle, panelWrapperStyle, getBtnStyle, badgeStyle } from './styles.js';

/*
Renders a labeled input field or select dropdown.
If options are provided, renders a select element, otherwise renders a text/number input.
*/
export function Field({ label, value, onChange, type = 'text', options }) {
  return (
      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>{label}</label>
        {options ? (
            <select value={value} onChange={e => onChange(e.target.value)} style={inputStyle}>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        ) : (
            <input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
        )}
      </div>
  );
}

/*
Wraps content in a styled card with an optional title and icon.
Used as the outer container for all panel screens in the app.
*/
export function Panel({ children, title, icon }) {
  return (
      <div style={panelWrapperStyle}>
        {title && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
              <h2 style={{ fontSize: 19, fontWeight: 700, color: C.textPrimary, margin: 0 }}>{title}</h2>
            </div>
        )}
        <div style={cardStyle}>{children}</div>
      </div>
  );
}

// Primary action button - visually disabled when disabled prop is true
export function Btn({ children, onClick, disabled }) {
  return (
      <button onClick={onClick} disabled={disabled} style={getBtnStyle(disabled)}>
        {children}
      </button>
  );
}

// Displays a category name as a styled badge tag
export function CategoryBadge({ category }) {
  return <span style={badgeStyle}>{category}</span>;
}