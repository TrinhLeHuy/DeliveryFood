import React, { useState } from 'react';
import './ProductManagement.scss';

function ProductManagement() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Cơm gà xối mỡ', price: 45000, category: 'Món chính', status: 'active', stock: 50 },
        { id: 2, name: 'Phở bò', price: 55000, category: 'Món chính', status: 'active', stock: 30 },
        { id: 3, name: 'Bún chả', price: 40000, category: 'Món chính', status: 'inactive', stock: 0 },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddProduct = (product) => {
        setProducts([...products, { ...product, id: products.length + 1 }]);
        setShowAddModal(false);
    };

    const handleEditProduct = (product) => {
        setProducts(products.map((p) => (p.id === product.id ? product : p)));
        setEditingProduct(null);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    return (
        <div className="product-management">
            <div className="management-header">
                <div className="search-bar">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                </div>
                <button className="add-btn" onClick={() => setShowAddModal(true)}>
                    <span className="material-symbols-outlined">add</span>
                    Thêm sản phẩm
                </button>
            </div>

            <div className="products-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Danh mục</th>
                            <th>Trạng thái</th>
                            <th>Tồn kho</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>#{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price.toLocaleString('vi-VN')}đ</td>
                                <td>{product.category}</td>
                                <td>
                                    <span className={`status-badge ${product.status}`}>
                                        {product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                                    </span>
                                </td>
                                <td>{product.stock}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => setEditingProduct(product)}>
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Thêm sản phẩm mới</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleAddProduct({
                                    name: formData.get('name'),
                                    price: Number(formData.get('price')),
                                    category: formData.get('category'),
                                    status: 'active',
                                    stock: Number(formData.get('stock')),
                                });
                            }}
                        >
                            <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input type="text" name="name" required />
                            </div>
                            <div className="form-group">
                                <label>Giá</label>
                                <input type="number" name="price" required />
                            </div>
                            <div className="form-group">
                                <label>Danh mục</label>
                                <select name="category" required>
                                    <option value="Món chính">Món chính</option>
                                    <option value="Món phụ">Món phụ</option>
                                    <option value="Đồ uống">Đồ uống</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tồn kho</label>
                                <input type="number" name="stock" required />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowAddModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit">Thêm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Chỉnh sửa sản phẩm</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleEditProduct({
                                    ...editingProduct,
                                    name: formData.get('name'),
                                    price: Number(formData.get('price')),
                                    category: formData.get('category'),
                                    stock: Number(formData.get('stock')),
                                });
                            }}
                        >
                            <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input type="text" name="name" defaultValue={editingProduct.name} required />
                            </div>
                            <div className="form-group">
                                <label>Giá</label>
                                <input type="number" name="price" defaultValue={editingProduct.price} required />
                            </div>
                            <div className="form-group">
                                <label>Danh mục</label>
                                <select name="category" defaultValue={editingProduct.category} required>
                                    <option value="Món chính">Món chính</option>
                                    <option value="Món phụ">Món phụ</option>
                                    <option value="Đồ uống">Đồ uống</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tồn kho</label>
                                <input type="number" name="stock" defaultValue={editingProduct.stock} required />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setEditingProduct(null)}>
                                    Hủy
                                </button>
                                <button type="submit">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManagement;
