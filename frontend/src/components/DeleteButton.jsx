/**
 * delete button component
 *
 * this button deletes specified item by first looking for
 * the item description with type and id then it pops a message
 * confirming the user is sure it wants to delete specified item.
 */
import api from '../api'; // Axios instance
import { useState } from 'react';

const DeleteButton = ({ type, id, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleDelete = async () => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    setIsDeleting(true);

    try {
      // Call the delete API endpoint based on type and id
      await api.delete(`/api/${type}s/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      // Call the onDelete callback to update parent state
      onDelete(type, id);
      alert('Deleted successfully!');
    } catch (error) {
      console.error(`Failed to delete ${type} with id ${id}:`, error);
      alert('Failed to delete the account.');
    } finally {
      setIsDeleting(false);
      setShowPopup(false); // Close popup after operation
    }
  };

  const openPopup = () => setShowPopup(true); // Open the confirmation popup
  const closePopup = () => setShowPopup(false); // Close the popup without deleting

  return (
    <>
      {/* Delete button that triggers the popup */}
      <button
        onClick={openPopup}
        className="mt-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
      >
        Delete
      </button>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">Do you really want to delete this {type}?</p>

            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded ${
                  isDeleting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
