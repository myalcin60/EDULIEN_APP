import React, { useState } from 'react';
import { config, endpoints, headers, frontendMessages } from '../../config';
import { showToast, handleError } from '../../utils/Helpers';

function UpdateClass({ classData, currentUserId, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newClassName, setNewClassName] = useState(classData.className);

const handleSave = async () => {
  try {
    const response = await fetch(
      `${config.API_BASE_URL}/teachers/classes/${classData.classId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: newClassName,
          teacherId: currentUserId,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      showToast(frontendMessages.success.updateClass, 'success');
      setIsEditing(false);
      onUpdate(); // sınıf listesini güncelle
    } else {
      showToast(data.message || frontendMessages.error.update, 'error');
    }
  } catch (error) {
    handleError(error, frontendMessages.error.error);
  }
};


  if (classData.teacherId !== currentUserId) return null;

  return (
    <>
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)} >
          Update
        </button>
      ) : (
        <span>
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            style={{ marginRight: '6px' }}
          />
          <button onClick={handleSave}>Save</button>
        </span>
      )}
    </>
  );
}

export default UpdateClass;
