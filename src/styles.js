/* styles.js - Design tokens and reusable style objects */

/*
Central color palette for the app using a sage green theme.
All components import from this object to ensure visual consistency.
*/
export const C = {
  bg: '#f0f2e8',
  bgCard: '#ffffff',
  bgSurface: '#e4e9d8',
  bgInput: '#f7f8f2',
  primary: '#6b7c5c',
  primaryHover: '#5a6a4c',
  accent: '#8a9e76',
  accentLight: '#d4dfc4',
  dark: '#4a5a3e',
  light: '#c8d4b4',
  lightest: '#e8eed8',
  border: '#c4d0ae',
  borderMid: '#a8b890',
  textPrimary: '#2e3a28',
  textSecondary: '#4a5a3e',
  textMuted: '#7a8c6a',
  error: '#8b4040',
  success: '#3d6b3a',
  disabled: '#dde5cc',
  disabledText: '#9aaa88',
};

export const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  background: C.bgInput,
  border: `1.5px solid ${C.border}`,
  borderRadius: 10,
  color: C.textPrimary,
  fontFamily: 'DM Sans, sans-serif',
  fontSize: 14,
  outline: 'none',
  marginTop: 6,
  transition: 'border-color 0.2s',
};

export const labelStyle = {
  fontSize: 12,
  letterSpacing: 0.5,
  color: C.textSecondary,
  fontWeight: 600,
};

export const cardStyle = {
  background: C.bgCard,
  borderRadius: 16,
  border: `1px solid ${C.border}`,
  padding: 28,
  boxShadow: '0 2px 16px rgba(74,90,62,0.08)',
};

export const panelWrapperStyle = {
  padding: '32px',
  maxWidth: 720,
  margin: '0 auto',
};

// Returns different background and cursor styles depending on whether the button is disabled
export const getBtnStyle = (disabled) => ({
  padding: '11px 28px',
  background: disabled ? C.disabled : C.primary,
  color: disabled ? C.disabledText : '#fff',
  border: 'none',
  borderRadius: 10,
  cursor: disabled ? 'default' : 'pointer',
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  width: '100%',
  transition: 'background 0.18s',
  letterSpacing: 0.3,
});

export const badgeStyle = {
  background: C.accentLight,
  color: C.dark,
  padding: '3px 10px',
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
};

// Returns red background for errors, light green for success messages
export const getMessageStyle = (type) => ({
  marginTop: 14,
  padding: '10px 16px',
  borderRadius: 10,
  background: type === 'error' ? '#f5eded' : C.lightest,
  color: type === 'error' ? C.error : C.success,
  fontSize: 13,
  fontWeight: 500,
});

export const thStyle = {
  textAlign: 'left',
  padding: '10px 14px',
  color: C.textSecondary,
  fontWeight: 600,
  fontSize: 12,
  borderBottom: `1px solid ${C.border}`,
};

// Alternates row background between white and light green for readability
export const getRowStyle = (index) => ({
  borderBottom: `1px solid ${C.border}`,
  background: index % 2 === 0 ? '#fff' : C.bg,
});

export const totalCardStyle = {
  marginTop: 16,
  padding: '16px 20px',
  background: C.bgSurface,
  borderRadius: 12,
  border: `1px solid ${C.border}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const convertedBadgeStyle = {
  background: C.lightest,
  color: C.dark,
  padding: '3px 10px',
  borderRadius: 20,
  fontWeight: 600,
  fontSize: 12,
  whiteSpace: 'nowrap',
};

// Highlights the active tab with a bottom border and brighter text color
export const getNavTabStyle = (isActive, C) => ({
  padding: '12px 22px',
  border: 'none',
  borderBottom: isActive ? `3px solid ${C.lightest}` : '3px solid transparent',
  background: 'transparent',
  color: isActive ? C.lightest : C.accentLight,
  cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: isActive ? 600 : 400,
  fontSize: 14,
  transition: 'all 0.18s',
  letterSpacing: 0.2,
});

export const infoBoxStyle = {
  padding: '14px 18px',
  background: C.lightest,
  borderRadius: 10,
  marginBottom: 22,
  fontSize: 13,
  color: C.textSecondary,
  lineHeight: 1.7,
};