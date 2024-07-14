import React, { useState } from 'react';
import './App.css';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' }
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [newSchema, setNewSchema] = useState('');

  const handleSaveSegmentClick = () => {
    setIsOpen(true);
  };

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleNewSchemaChange = (e) => {
    setNewSchema(e.target.value);
  };

  const handleAddNewSchema = () => {
    const selectedOption = schemaOptions.find(option => option.value === newSchema);
    if (selectedOption) {
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableSchemas(availableSchemas.filter(option => option.value !== newSchema));
      setNewSchema('');
    }
  };

  const handleSave = () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map(option => ({ [option.value]: option.label }))
    };
    console.log(payload);
    // Here you can send the payload to the server
    setIsOpen(false);
  };

  return (
    <div className="App">
      <button className="save-segment-button" onClick={handleSaveSegmentClick}>Save segment</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Saving Segment</h2>
            <label className="segment-label">
              Enter the Name of the Segment:
              <input className="segment-input" type="text" value={segmentName} onChange={handleSegmentNameChange} placeholder="Name of the segment" />
            </label>
            <p>To save your segment, you need to add the schemas to build the query</p>
            <div className="legend">
              <div><span className="legend-dot user-trait"></span> User Traits</div>
              <div><span className="legend-dot group-trait"></span> Group Traits</div>
            </div>
            <div className="blue-box">
              {selectedSchemas.map((option, index) => (
                <div key={index} className="schema-row">
                  <select
                    value={option.value}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      const updatedSchemas = [...selectedSchemas];
                      updatedSchemas[index] = schemaOptions.find(opt => opt.value === newValue);
                      setSelectedSchemas(updatedSchemas);
                      setAvailableSchemas(schemaOptions.filter(opt => !updatedSchemas.includes(opt)));
                    }}
                  >
                    {schemaOptions.map(opt => (
                      <option key={opt.value} value={opt.value} disabled={selectedSchemas.some(s => s.value === opt.value)}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <button className="remove-schema" onClick={() => {
                    const updatedSchemas = selectedSchemas.filter((_, i) => i !== index);
                    setSelectedSchemas(updatedSchemas);
                    setAvailableSchemas(schemaOptions.filter(opt => !updatedSchemas.includes(opt)));
                  }}>–</button>
                </div>
              ))}
              <div className="schema-row">
                <select value={newSchema} onChange={handleNewSchemaChange}>
                  <option value="">Add schema to segment</option>
                  {availableSchemas.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button className="add-new-schema" onClick={handleAddNewSchema}>+Add new schema</button>
              </div>
            </div>
            <div className="actions">
              <button className="save-button" onClick={handleSave}>Save the Segment</button>
              <button className="cancel-button" onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
