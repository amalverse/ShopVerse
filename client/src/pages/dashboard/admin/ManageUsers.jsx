import React, { useState } from 'react';
import { useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation } from '../../../redux/features/auth/authApi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import Spinner from '../../../components/ui/Spinner';

const AdminProfileCard = ({ currentUser }) => (
    <div className="bg-white rounded-md shadow-sm shadow border border-gray-200 p-6 mb-6 flex items-center gap-4">
        <img src={currentUser?.profileImage || 'https://via.placeholder.com/150'} alt="Admin" className="w-16 h-16 rounded-full object-cover border-2 border-green-200" />
        <div>
            <h3 className="text-xl font-bold text-gray-800">{currentUser?.username || 'Admin'}</h3>
            <p className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block mt-1">Administrator</p>
        </div>
    </div>
);

const UserTable = ({ users, currentUser, handleRoleChange, updatingId, confirmDelete }) => (
    <div className="bg-white rounded-md shadow-sm shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-800 font-bold border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map(u => (
                        <tr key={u._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 flex items-center gap-3">
                                <img src={u.profileImage || 'https://via.placeholder.com/40'} alt={u.username} className="w-10 h-10 rounded-full object-cover border border-gray-300" />
                                <span className="font-bold text-gray-800">{u.username}</span>
                            </td>
                            <td className="px-6 py-4">{u.email}</td>
                            <td className="px-6 py-4">
                                <select 
                                    value={u.role} 
                                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                    disabled={updatingId === u._id || currentUser?._id === u._id}
                                    className="border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm bg-white disabled:bg-gray-100"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => confirmDelete(u._id, u.username)}
                                    disabled={currentUser?._id === u._id}
                                    className="text-indigo-600 hover:text-indigo-800 disabled:text-gray-400 font-bold px-3 py-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {users.length === 0 && <div className="text-center py-10 text-gray-500">No users found.</div>}
        </div>
    </div>
);

const ManageUsers = () => {
    const { user } = useSelector(state => state.auth);
    const currentUser = user?.user ? user.user : user;

    const { data: users = [], isLoading, isError, refetch } = useGetUserQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [updatingId, setUpdatingId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const confirmDelete = (userId, username) => {
        setUserToDelete({ id: userId, username });
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!userToDelete) return;
        try {
            await deleteUser(userToDelete.id).unwrap();
            toast.success(`User "${userToDelete.username}" deleted.`);
            refetch();
        } catch {
            toast.error('Failed to delete user.');
        } finally {
            setIsModalOpen(false);
            setUserToDelete(null);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        setUpdatingId(userId);
        try {
            await updateUserRole({ userId, role: newRole }).unwrap();
            toast.success('User role updated!');
            refetch();
        } catch {
            toast.error('Failed to update role.');
        } finally {
            setUpdatingId(null);
        }
    };

    if (isLoading) return <Spinner text="Loading users..." />;
    if (isError) return <div className="text-center py-10 text-indigo-500">Failed to load users. Please try again.</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
                    <p className="text-gray-600">{users.length} registered user{users.length !== 1 ? 's' : ''}</p>
                </div>
                {/* Admin's own profile quick link */}
                <Link
                    to="/dashboard/admin/profile"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                </Link>
            </div>

            <AdminProfileCard currentUser={currentUser} />

            <UserTable 
                users={users} 
                currentUser={currentUser} 
                handleRoleChange={handleRoleChange} 
                updatingId={updatingId} 
                confirmDelete={confirmDelete} 
            />

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete User"
                message={`Are you sure you want to delete user "${userToDelete?.username}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default ManageUsers;
