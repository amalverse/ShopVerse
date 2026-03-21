import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useFetchAllProductsQuery,
    useDeleteProductMutation,
    useAddProductMutation,
    useUpdateProductMutation,
} from '../../../redux/features/products/productsApi';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import Spinner from '../../../components/ui/Spinner';

const ProductTable = ({ products, openEditModal, confirmDelete }) => (
    <div className="bg-white rounded-md shadow-sm shadow border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-800 font-bold border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {products.map(p => (
                        <tr key={p._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 flex items-center gap-4">
                                <img src={p.image || 'https://via.placeholder.com/40'} alt={p.name} className="w-12 h-12 rounded-md shadow-sm object-cover border border-gray-300" />
                                <span className="font-bold text-gray-800">{p.name}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md shadow-sm text-xs">{p.category}</span>
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-800">${p.price}</td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => openEditModal(p)} className="text-blue-600 hover:text-blue-800 font-bold px-3 py-1 mr-2">Edit</button>
                                <button onClick={() => confirmDelete(p._id, p.name)} className="text-indigo-600 hover:text-indigo-800 font-bold px-3 py-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {products.length === 0 && <div className="text-center py-12 text-gray-500">No products found. Start by adding one!</div>}
        </div>
    </div>
);

const ProductFormModal = ({ isOpen, closeModal, editingProduct, form, handleChange, handleSubmit, isSaving }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-md shadow-sm shadow-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 font-bold text-xl">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <form id="productForm" onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                                <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter product name" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                <input required type="text" name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="e.g. Electronics" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Color</label>
                                <input type="text" name="color" value={form.color} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="e.g. Black" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Current Price ($)</label>
                                <input required type="number" step="0.01" name="price" value={form.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="0.00" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Old Price ($) <span className="font-normal text-gray-500">(Optional)</span></label>
                                <input type="number" step="0.01" name="oldPrice" value={form.oldPrice} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="0.00" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                                <input type="text" name="image" value={form.image} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="https://..." />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                <textarea required name="description" value={form.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-blue-500 resize-none" placeholder="Enter product description..."></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-100">
                    <button type="button" onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md shadow-sm">Cancel</button>
                    <button type="submit" form="productForm" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm disabled:bg-blue-400">
                        {isSaving ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const EMPTY_FORM = {
    name: '',
    category: '',
    description: '',
    price: '',
    oldPrice: '',
    image: '',
    color: '',
};

const ManageProducts = () => {
    const { user } = useSelector(state => state.auth);
    const currentUser = user?.user ? user.user : user;

    const { data, error, isLoading, refetch } = useFetchAllProductsQuery({
        category: '', color: '', minPrice: '', maxPrice: '', page: 1, limit: 100,
    });
    const products = data?.products || [];

    const [deleteProduct] = useDeleteProductMutation();
    const [addProduct, { isLoading: adding }] = useAddProductMutation();
    const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

    /* Modal state */
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const openAddModal = () => {
        setEditingProduct(null);
        setForm(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setForm({
            name: product.name || '',
            category: product.category || '',
            description: product.description || '',
            price: product.price || '',
            oldPrice: product.oldPrice || '',
            image: product.image || '',
            color: product.color || '',
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
        setForm(EMPTY_FORM);
    };

    const handleChange = (e) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            price: parseFloat(form.price),
            oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : undefined,
            author: currentUser?._id,
        };
        try {
            if (editingProduct) {
                await updateProduct({ id: editingProduct._id, updates: payload }).unwrap();
                toast.success('Product updated!');
            } else {
                await addProduct(payload).unwrap();
                toast.success('Product added!');
            }
            closeModal();
            refetch();
        } catch (err) {
            console.error(err);
            toast.error(editingProduct ? 'Failed to update product.' : 'Failed to add product.');
        }
    };

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const confirmDelete = (id, name) => {
        setProductToDelete({ id, name });
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!productToDelete) return;
        try {
            await deleteProduct(productToDelete.id).unwrap();
            toast.success(`"${productToDelete.name}" deleted.`);
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete product.');
        } finally {
            setDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    if (isLoading) return <Spinner text="Loading products..." />;
    if (error) return <div className="text-indigo-500 py-10 text-center">Error loading products.</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
                    <p className="text-gray-600">{products.length} product{products.length !== 1 ? 's' : ''}</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                </button>
            </div>

            <ProductTable 
                products={products}
                openEditModal={openEditModal}
                confirmDelete={confirmDelete}
            />

            <ProductFormModal
                isOpen={modalOpen}
                closeModal={closeModal}
                editingProduct={editingProduct}
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSaving={adding || updating}
            />

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default ManageProducts;
