import React, { useState } from 'react';
import './OrderManagement.scss';

function OrderManagement() {
    const [orders, setOrders] = useState([
        {
            id: '1',
            customer: 'Nguyễn Văn A',
            items: [
                { name: 'Cơm gà', quantity: 2, price: 45000 },
                { name: 'Trà sữa', quantity: 1, price: 35000 },
            ],
            total: 125000,
            status: 'pending',
            time: '2024-02-20 12:30',
            paymentMethod: 'Tiền mặt',
        },
        {
            id: 2,
            customer: 'Trần Thị B',
            items: [
                { name: 'Phở bò', quantity: 1, price: 55000 },
                { name: 'Trà sữa', quantity: 1, price: 25000 },
            ],
            total: 80000,
            status: 'processing',
            time: '10:25',
            paymentMethod: 'Chuyển khoản',
        },
        {
            id: 3,
            customer: 'Lê Văn C',
            items: [
                { name: 'Bún chả', quantity: 2, price: 40000 },
                { name: 'Nước cam', quantity: 2, price: 20000 },
            ],
            total: 120000,
            status: 'completed',
            time: '10:20',
            paymentMethod: 'QR Code',
        },
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [newOrder, setNewOrder] = useState({
        customer: '',
        items: [{ name: '', quantity: 1, price: 0 }],
        paymentMethod: 'Tiền mặt',
    });

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
    };

    const handleCreateOrder = () => {
        const order = {
            id: String(orders.length + 1),
            ...newOrder,
            total: newOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: 'pending',
            time: new Date().toLocaleString('vi-VN'),
        };
        setOrders([...orders, order]);
        setShowCreateModal(false);
        setNewOrder({
            customer: '',
            items: [{ name: '', quantity: 1, price: 0 }],
            paymentMethod: 'Tiền mặt',
        });
    };

    const handleEditOrder = () => {
        const updatedOrders = orders.map((order) =>
            order.id === editingOrder.id
                ? {
                      ...editingOrder,
                      total: editingOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                  }
                : order,
        );
        setOrders(updatedOrders);
        setShowEditModal(false);
        setEditingOrder(null);
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            setOrders(orders.filter((order) => order.id !== orderId));
        }
    };

    const startEditOrder = (order) => {
        setEditingOrder({ ...order });
        setShowEditModal(true);
    };

    const addItemField = (isEdit = false) => {
        if (isEdit) {
            setEditingOrder({
                ...editingOrder,
                items: [...editingOrder.items, { name: '', quantity: 1, price: 0 }],
            });
        } else {
            setNewOrder({
                ...newOrder,
                items: [...newOrder.items, { name: '', quantity: 1, price: 0 }],
            });
        }
    };

    const removeItemField = (index, isEdit = false) => {
        if (isEdit) {
            setEditingOrder({
                ...editingOrder,
                items: editingOrder.items.filter((_, i) => i !== index),
            });
        } else {
            setNewOrder({
                ...newOrder,
                items: newOrder.items.filter((_, i) => i !== index),
            });
        }
    };

    const updateItemField = (index, field, value, isEdit = false) => {
        if (isEdit) {
            const updatedItems = [...editingOrder.items];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            setEditingOrder({ ...editingOrder, items: updatedItems });
        } else {
            const updatedItems = [...newOrder.items];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            setNewOrder({ ...newOrder, items: updatedItems });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#ffa726';
            case 'processing':
                return '#29b6f6';
            case 'completed':
                return '#66bb6a';
            case 'cancelled':
                return '#ef5350';
            default:
                return '#666';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Chờ xử lý';
            case 'processing':
                return 'Đang xử lý';
            case 'completed':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    return (
        <div className="order-management">
            <div className="order-header">
                <div className="search-bar">
                    <input type="text" placeholder="Tìm kiếm đơn hàng..." />
                </div>
                <div className="filter-buttons">
                    <button className="active">Tất cả</button>
                    <button>Chờ xử lý</button>
                    <button>Đang xử lý</button>
                    <button>Hoàn thành</button>
                    <button>Đã hủy</button>
                </div>
                <button className="create-order-btn" onClick={() => setShowCreateModal(true)}>
                    <span className="material-symbols-outlined">add</span>
                    Tạo đơn hàng
                </button>
            </div>

            <div className="orders-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                            <th>Thanh toán</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.total.toLocaleString('vi-VN')}đ</td>
                                <td>
                                    <span
                                        className="status-badge"
                                        style={{ backgroundColor: getStatusColor(order.status) }}
                                    >
                                        {getStatusText(order.status)}
                                    </span>
                                </td>
                                <td>{order.time}</td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    <div className="action-buttons">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{ backgroundColor: getStatusColor(order.status) }}
                                        >
                                            <option value="pending">Chờ xử lý</option>
                                            <option value="processing">Đang xử lý</option>
                                            <option value="completed">Hoàn thành</option>
                                            <option value="cancelled">Đã hủy</option>
                                        </select>
                                        <button onClick={() => setSelectedOrder(order)}>
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                        <button onClick={() => startEditOrder(order)}>
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button onClick={() => handleDeleteOrder(order.id)}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <div className="order-details-modal">
                    <div className="modal-content">
                        <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
                        <div className="detail-row">
                            <span>Khách hàng:</span>
                            <span>{selectedOrder.customer}</span>
                        </div>
                        <div className="detail-row">
                            <span>Thời gian:</span>
                            <span>{selectedOrder.time}</span>
                        </div>
                        <div className="detail-row">
                            <span>Phương thức thanh toán:</span>
                            <span>{selectedOrder.paymentMethod}</span>
                        </div>
                        <div className="items-list">
                            <h3>Danh sách sản phẩm</h3>
                            {selectedOrder.items.map((item, index) => (
                                <div key={index} className="item-row">
                                    <span>{item.name}</span>
                                    <span>
                                        {item.quantity} x {item.price.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                            ))}
                            <div className="total-row">
                                <span>Tổng cộng:</span>
                                <span>{selectedOrder.total.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>
                        <button onClick={() => setSelectedOrder(null)}>Đóng</button>
                    </div>
                </div>
            )}

            {showCreateModal && (
                <div className="create-order-modal">
                    <div className="modal-content">
                        <h2>Tạo đơn hàng mới</h2>
                        <div className="form-group">
                            <label>Tên khách hàng:</label>
                            <input
                                type="text"
                                value={newOrder.customer}
                                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                                placeholder="Nhập tên khách hàng"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phương thức thanh toán:</label>
                            <select
                                value={newOrder.paymentMethod}
                                onChange={(e) => setNewOrder({ ...newOrder, paymentMethod: e.target.value })}
                            >
                                <option value="Tiền mặt">Tiền mặt</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                                <option value="Thẻ">Thẻ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Sản phẩm:</label>
                            {newOrder.items.map((item, index) => (
                                <div key={index} className="item-input-group">
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateItemField(index, 'name', e.target.value)}
                                        placeholder="Tên sản phẩm"
                                    />
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItemField(index, 'quantity', parseInt(e.target.value))}
                                        min="1"
                                        placeholder="Số lượng"
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => updateItemField(index, 'price', parseInt(e.target.value))}
                                        min="0"
                                        placeholder="Giá"
                                    />
                                    <button onClick={() => removeItemField(index)}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            ))}
                            <button className="add-item-btn" onClick={() => addItemField()}>
                                <span className="material-symbols-outlined">add</span>
                                Thêm sản phẩm
                            </button>
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                                Hủy
                            </button>
                            <button className="create-btn" onClick={handleCreateOrder}>
                                Tạo đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editingOrder && (
                <div className="edit-order-modal">
                    <div className="modal-content">
                        <h2>Chỉnh sửa đơn hàng #{editingOrder.id}</h2>
                        <div className="form-group">
                            <label>Tên khách hàng:</label>
                            <input
                                type="text"
                                value={editingOrder.customer}
                                onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                                placeholder="Nhập tên khách hàng"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phương thức thanh toán:</label>
                            <select
                                value={editingOrder.paymentMethod}
                                onChange={(e) => setEditingOrder({ ...editingOrder, paymentMethod: e.target.value })}
                            >
                                <option value="Tiền mặt">Tiền mặt</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                                <option value="Thẻ">Thẻ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Trạng thái:</label>
                            <select
                                value={editingOrder.status}
                                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                            >
                                <option value="pending">Chờ xử lý</option>
                                <option value="processing">Đang xử lý</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Đã hủy</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Sản phẩm:</label>
                            {editingOrder.items.map((item, index) => (
                                <div key={index} className="item-input-group">
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateItemField(index, 'name', e.target.value, true)}
                                        placeholder="Tên sản phẩm"
                                    />
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateItemField(index, 'quantity', parseInt(e.target.value), true)
                                        }
                                        min="1"
                                        placeholder="Số lượng"
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) =>
                                            updateItemField(index, 'price', parseInt(e.target.value), true)
                                        }
                                        min="0"
                                        placeholder="Giá"
                                    />
                                    <button onClick={() => removeItemField(index, true)}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            ))}
                            <button className="add-item-btn" onClick={() => addItemField(true)}>
                                <span className="material-symbols-outlined">add</span>
                                Thêm sản phẩm
                            </button>
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                                Hủy
                            </button>
                            <button className="save-btn" onClick={handleEditOrder}>
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderManagement;
