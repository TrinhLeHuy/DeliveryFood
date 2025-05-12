import React, { useState } from 'react';
import './AccountManagement.scss';

function AccountManagement() {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin',
            status: 'active',
            lastLogin: '2024-03-15 10:30',
        },
        {
            id: 2,
            username: 'staff1',
            email: 'staff1@example.com',
            role: 'staff',
            status: 'active',
            lastLogin: '2024-03-15 09:15',
        },
        {
            id: 3,
            username: 'user1',
            email: 'user1@example.com',
            role: 'user',
            status: 'inactive',
            lastLogin: '2024-03-14 15:45',
        },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleAddUser = (user) => {
        setUsers([...users, { ...user, id: users.length + 1 }]);
        setShowAddModal(false);
    };

    const handleEditUser = (user) => {
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
        setEditingUser(null);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            setUsers(users.filter((u) => u.id !== id));
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return '#f44336';
            case 'staff':
                return '#2196f3';
            case 'user':
                return '#4caf50';
            default:
                return '#757575';
        }
    };

    const getRoleText = (role) => {
        switch (role) {
            case 'admin':
                return 'Quản trị viên';
            case 'staff':
                return 'Nhân viên';
            case 'user':
                return 'Người dùng';
            default:
                return role;
        }
    };

    return (
        <div className="account-management">
            <div className="management-header">
                <div className="search-bar">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Tìm kiếm tài khoản..." />
                </div>
                <button className="add-btn" onClick={() => setShowAddModal(true)}>
                    <span className="material-symbols-outlined">person_add</span>
                    Thêm tài khoản
                </button>
            </div>

            <div className="accounts-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên đăng nhập</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th>Trạng thái</th>
                            <th>Đăng nhập cuối</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>#{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className="role-badge" style={{ backgroundColor: getRoleColor(user.role) }}>
                                        {getRoleText(user.role)}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.status}`}>
                                        {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                                </td>
                                <td>{user.lastLogin}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => setEditingUser(user)}>
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
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
                        <h2>Thêm tài khoản mới</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleAddUser({
                                    username: formData.get('username'),
                                    email: formData.get('email'),
                                    role: formData.get('role'),
                                    status: 'active',
                                    lastLogin: new Date().toLocaleString(),
                                });
                            }}
                        >
                            <div className="form-group">
                                <label>Tên đăng nhập</label>
                                <input type="text" name="username" required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label>Vai trò</label>
                                <select name="role" required>
                                    <option value="admin">Quản trị viên</option>
                                    <option value="staff">Nhân viên</option>
                                    <option value="user">Người dùng</option>
                                </select>
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

            {editingUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Chỉnh sửa tài khoản</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleEditUser({
                                    ...editingUser,
                                    username: formData.get('username'),
                                    email: formData.get('email'),
                                    role: formData.get('role'),
                                    status: formData.get('status'),
                                });
                            }}
                        >
                            <div className="form-group">
                                <label>Tên đăng nhập</label>
                                <input type="text" name="username" defaultValue={editingUser.username} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" defaultValue={editingUser.email} required />
                            </div>
                            <div className="form-group">
                                <label>Vai trò</label>
                                <select name="role" defaultValue={editingUser.role} required>
                                    <option value="admin">Quản trị viên</option>
                                    <option value="staff">Nhân viên</option>
                                    <option value="user">Người dùng</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Trạng thái</label>
                                <select name="status" defaultValue={editingUser.status} required>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setEditingUser(null)}>
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

export default AccountManagement;
