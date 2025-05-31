import React from 'react';
import { config, endpoints, frontendMessages } from '../../config/index';
import { showToast, handleError, confirmDialog} from '../../utils/helpers';


function DeleteClass({ classId, teacherId, currentUserId, onDelete }) {
  const handleDelete = async () => {
    if (teacherId !== currentUserId) {
      showToast(frontendMessages.confirm.delete_permission, 'error');
      return;
    }

    const confirmed = confirmDialog(frontendMessages.confirm.delete_confirmation);
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${config.API_BASE_URL}${endpoints.CLASS.DELETE.replace(':id', classId)}?teacherId=${teacherId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (response.ok) {
        showToast(frontendMessages.success.deleteClass, 'success');
        onDelete(); // sınıf listesini güncelle
      } else {
        showToast(data.message || frontendMessages.error.deletion, 'error');
      }
    } catch (err) {
      handleError(err, frontendMessages.error.delete_class);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteClass;
