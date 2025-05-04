import React, { useState } from 'react';
import { config, endpoints, headers, frontendMessages } from '../../config/index';

function CreateClass() {
  const [className, setClassName] = useState('');
  const [teacherId, setTeacherId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.CREATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': headers.JSON['Content-Type'],
        },
        body: JSON.stringify({
          className,
          teacherId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(frontendMessages.success.createClass);
        setClassName('');
        setTeacherId('');
      } else {
        alert(data.message || frontendMessages.error.creation);
      }
    } catch (error) {
      console.error('Error creating class:', error);
      alert(frontendMessages.error.error);
    }
  };

  return (
    <div className="create-class-container">
      <h2>Create Class</h2>
      <form onSubmit={handleSubmit}>
        <label>Class Name:</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />

        <label>Öğretmen ID:</label>
        <input
          type="number"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          required
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateClass;
