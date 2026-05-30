/* AddCostPanel.jsx - Panel for adding new cost items */
import { useState, useCallback } from 'react';
import { Panel, Field, Btn } from './Components.jsx';
import { C, getMessageStyle } from './styles.js';
import { CURRENCIES, CATEGORIES } from './constants.js';
import { costsDB } from './db.js';

export default function AddCostPanel() {
  // State for each form field and the feedback message
  const [sum, setSum] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);

  /*
  Validates the form inputs and adds a new cost item to the database.
  Shows a success or error message based on the result.
  */
  const handleAdd = useCallback(() => {
    const parsedSum = Number(sum);
    // Validate that the amount is a positive number
    if (!parsedSum || parsedSum <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid positive amount.' });
      return;
    }
    // Validate that description is not empty
    if (!description.trim()) {
      setMessage({ type: 'error', text: 'Description is required.' });
      return;
    }
    // Save the new cost item to localStorage via costsDB
    costsDB.addCost({ sum: parsedSum, currency, category, description: description.trim() });
    setMessage({ type: 'success', text: `✓ Added ${parsedSum} ${currency} — ${description}` });
    // Reset input fields after successful submission
    setSum('');
    setDescription('');
  }, [sum, currency, category, description]);

  return (
      <Panel title="Add New Cost" icon="➕">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Sum" value={sum} onChange={setSum} type="number" />
          <Field label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES} />
        </div>
        <Field label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
        <Field label="Description" value={description} onChange={setDescription} />
        <Btn onClick={handleAdd}>Add Cost Item</Btn>
        {message && <div style={getMessageStyle(message.type)}>{message.text}</div>}
      </Panel>
  );
}