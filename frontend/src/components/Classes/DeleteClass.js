import React from 'react';
import { config, endpoints, frontendMessages } from '../../config/index';

function DeleteClass({ classId, teacherId, currentUserId, onDelete }) {
  const handleDelete = async () => {
    if (teacherId !== currentUserId) {
      alert("Bu sınıfı silme yetkiniz yok.");
      return;
    }

    const confirmDelete = window.confirm("Sınıfı silmek istediğinize emin misiniz?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${config.API_BASE_URL}${endpoints.CLASS.DELETE.replace(':id', classId)}?teacherId=${teacherId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(frontendMessages.success.deleteClass);
        onDelete(); // sınıf listesini güncelle
      } else {
        alert(data.message || frontendMessages.error.deletion);
      }
    } catch (err) {
      console.error('Sınıf silinirken hata oluştu:', err);
      alert(frontendMessages.error.error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteClass;
