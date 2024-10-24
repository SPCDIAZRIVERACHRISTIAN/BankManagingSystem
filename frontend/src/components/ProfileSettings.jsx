/**
 * Profile settings
 *
 * its a form that lets the user edit any attribute it wants
 * specifically username first and last name email and password.
 * 
 */
import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/userdata/');
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/api/userdata/', formData);
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      try {
        await api.delete('/api/profile');
        alert('Account deleted successfully');
        navigate('/login');
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto my-8 p-6 max-w-lg bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {!isEditing ? (
        <>
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Account
            </button>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
              <small className="text-gray-500">
                Leave blank if you don't want to change the password.
              </small>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
