import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEditProfileMutation, useDeleteUserMutation } from '../../../redux/features/auth/authApi';
import { setUser, logout } from '../../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const currentUser = user?.user ? user.user : user;

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: currentUser?.username || '',
        profileImage: currentUser?.profileImage || '',
        bio: currentUser?.bio || '',
        profession: currentUser?.profession || '',
    });

    const [editProfile, { isLoading }] = useEditProfileMutation();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();

    const handleDeleteProfile = async () => {
        try {
            await deleteUser(currentUser?._id).unwrap();
            dispatch(logout());
            toast.success('Admin profile deleted successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete profile. Please try again.');
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await editProfile({
                userId: currentUser?._id,
                ...formData,
            }).unwrap();

            const updatedUser = res.user;
            const newState = user?.user ? { ...user, user: updatedUser } : updatedUser;
            dispatch(setUser(newState));

            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    const inputClass = (editable) =>
        `w-full border rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none transition-colors ${
            editable
                ? 'bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-200'
                : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'
        }`;

    return (
        <div className="max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Manage your admin account details</p>
                </div>
                {!isEditing && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-sm bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Profile
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm flex items-center gap-2"
                        >
                            Delete Profile
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold uppercase shadow-inner flex-shrink-0 ring-4 ring-indigo-50">
                        {formData.profileImage ? (
                            <img src={formData.profileImage} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            currentUser?.username?.[0] || 'A'
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{currentUser?.username}</h3>
                        <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full mt-1 capitalize">
                            {currentUser?.role}
                        </span>
                        {currentUser?.profession && (
                            <p className="text-sm text-slate-500 mt-1">{currentUser.profession}</p>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email — always read-only */}
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                        <input
                            disabled
                            value={currentUser?.email || ''}
                            className={inputClass(false)}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Username</label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={inputClass(isEditing)}
                            placeholder="Enter username"
                        />
                    </div>

                    {/* Profile Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Profile Image URL</label>
                        <input
                            name="profileImage"
                            value={formData.profileImage}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={inputClass(isEditing)}
                            placeholder="https://example.com/your-photo.jpg"
                        />
                        {isEditing && formData.profileImage && (
                            <div className="mt-2 flex items-center gap-2">
                                <img
                                    src={formData.profileImage}
                                    alt="Preview"
                                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <span className="text-xs text-slate-400">Preview</span>
                            </div>
                        )}
                    </div>

                    {/* Profession */}
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Profession / Role Title</label>
                        <input
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={inputClass(isEditing)}
                            placeholder="e.g. Store Administrator"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows={3}
                            className={`${inputClass(isEditing)} resize-none`}
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Saving...
                                    </>
                                ) : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({
                                        username: currentUser?.username || '',
                                        profileImage: currentUser?.profileImage || '',
                                        bio: currentUser?.bio || '',
                                        profession: currentUser?.profession || '',
                                    });
                                }}
                                className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-6 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteProfile}
                title="Confirm Deletion"
                message="Are you sure you want to delete your admin profile? This action cannot be undone."
            />
        </div>
    );
};

export default AdminProfile;
