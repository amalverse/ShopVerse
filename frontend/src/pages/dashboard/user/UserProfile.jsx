import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEditProfileMutation, useDeleteUserMutation } from '../../../redux/features/auth/authApi';
import { setUser, logout } from '../../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

const ProfileAvatar = ({ formData, currentUser }) => (
    <div className="flex items-center gap-4 mb-6">
        <img 
            src={formData.profileImage || currentUser?.profileImage || 'https://via.placeholder.com/150'} 
            alt="Profile Avatar" 
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
        />
        <div>
            <h3 className="text-xl font-bold text-slate-800">{formData.username || currentUser?.username}</h3>
            <p className="text-slate-500">{currentUser?.email}</p>
        </div>
    </div>
);

const ProfileForm = ({ formData, isEditing, handleChange, inputClass }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Profile Image URL</label>
                <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Profession</label>
                <input type="text" name="profession" value={formData.profession} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} rows="3" className={inputClass(isEditing)}></textarea>
            </div>
        </div>
    </div>
);

const AddressForm = ({ formData, isEditing, handleChange, inputClass }) => (
    <div className="space-y-4 mt-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Address Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
            </div>
        </div>
    </div>
);

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    // Handle both nested and flat user objects
    const currentUser = user?.user ? user.user : user;

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: currentUser?.username || '',
        profileImage: currentUser?.profileImage || '',
        bio: currentUser?.bio || '',
        profession: currentUser?.profession || '',
        address: typeof currentUser?.address === 'string' ? currentUser.address : currentUser?.address?.address || '',
        city: currentUser?.address?.city || '',
        district: currentUser?.address?.district || '',
        state: currentUser?.address?.state || '',
        country: currentUser?.address?.country || '',
        pincode: currentUser?.address?.pincode || '',
    });

    const [editProfile, { isLoading }] = useEditProfileMutation();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();

    const handleDeleteProfile = async () => {
        try {
            await deleteUser(currentUser?._id).unwrap();
            dispatch(logout());
            toast.success('Profile deleted successfully!');
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
            const { address, city, district, state, country, pincode, ...restData } = formData;
            const res = await editProfile({
                userId: currentUser?._id,
                ...restData,
                address: { address, city, district, state, country, pincode }
            }).unwrap();

            // Update Redux + localStorage with the new user data
            const updatedUser = res.user;
            // Preserve the token if it was nested
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
        `w-full border rounded-md shadow-sm px-4 py-2 text-gray-700 ${
            editable
                ? 'bg-white border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none'
                : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
        }`;

    return (
        <div className="bg-white rounded-md shadow-sm shadow border border-gray-200 p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                {!isEditing && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-sm"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-sm"
                        >
                            Delete Profile
                        </button>
                    </div>
                )}
            </div>

            <ProfileAvatar formData={formData} currentUser={currentUser} />

            <form onSubmit={handleSubmit} className="space-y-5">
                <ProfileForm 
                    formData={formData} 
                    currentUser={currentUser} 
                    isEditing={isEditing} 
                    handleChange={handleChange} 
                    inputClass={inputClass} 
                />

                <AddressForm 
                    formData={formData} 
                    isEditing={isEditing} 
                    handleChange={handleChange} 
                    inputClass={inputClass} 
                />

                {/* Action Buttons */}
                {isEditing && (
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md shadow-sm disabled:bg-gray-400"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
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
                                    address: typeof currentUser?.address === 'string' ? currentUser.address : currentUser?.address?.address || '',
                                    city: currentUser?.address?.city || '',
                                    district: currentUser?.address?.district || '',
                                    state: currentUser?.address?.state || '',
                                    country: currentUser?.address?.country || '',
                                    pincode: currentUser?.address?.pincode || '',
                                });
                            }}
                            className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-6 rounded-md shadow-sm"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteProfile}
                title="Confirm Deletion"
                message="Are you sure you want to delete your profile? This action cannot be undone."
            />
        </div>
    );
};

export default UserProfile;
