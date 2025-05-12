import React, { useState, useRef, useEffect } from 'react';
import './HomePage.scss';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';
import { getProducts } from '../../services/productService';

// Danh mục cố định như giao diện ban đầu, có thể mở rộng
const categories = [
    { name: 'Cupcake', img: require('../../assets/images/cake.jpg') },
    { name: 'Sea Food', img: require('../../assets/images/seafood.jpg') },
    { name: 'Juice', img: require('../../assets/images/orangejuice.jpg') },
    { name: 'Coca', img: require('../../assets/images/fries.jpg') },
    { name: 'Orange Juice', img: require('../../assets/images/orangejuice.jpg') },
    { name: 'Meat', img: require('../../assets/images/meat.jpg') },
    { name: 'Fries', img: require('../../assets/images/fries.jpg') },
    // Có thể thêm danh mục mới ở đây
];

function Home() {
    const [selectedCategory, setSelectedCategory] = useState('Sea Food');
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const categoriesRef = useRef(null);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalQty, setModalQty] = useState(1);
    const [cartOpen, setCartOpen] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(selectedCategory);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const scrollCategories = (dir) => {
        if (categoriesRef.current) {
            const scrollAmount = 150;
            categoriesRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalQty(1);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };
    const handleAddToCart = (product, qty) => {
        setCart((prev) => {
            const found = prev.find((item) => item.id === product.id);
            if (found) {
                return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item));
            }
            return [...prev, { ...product, qty }];
        });
        closeModal();
    };

    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev
                .map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
                .filter((item) => item.qty > 0),
        );
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Đảm bảo bạn có route /profile
    };

    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
        navigate('/'); // hoặc reload lại trang nếu muốn
    };

    return (
        <>
            <div className="menu-header-row">
                {/* Thêm nút đăng nhập hoặc tên user ở đây */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 16, gap: 12 }}>
                    {username ? (
                        <>
                            <button
                                onClick={handleProfileClick}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ff2967',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: 16,
                                }}
                            >
                                {username}
                            </button>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: '#eee',
                                    color: '#333',
                                    border: 'none',
                                    borderRadius: 4,
                                    padding: '6px 12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                }}
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            style={{
                                background: '#ff2967',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                padding: '8px 16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: 16,
                            }}
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
                <div className="header-left"></div>
                <div className="header-right">
                    <button className="cart-toggle-btn" onClick={() => setCartOpen(true)}>
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="cart-toggle-count">{cart.length}</span>
                    </button>
                </div>
            </div>
            <div className="menu-page">
                <div className="menu-main">
                    <div className="menu-categories-bar">
                        <button className="cat-arrow-btn" onClick={() => scrollCategories('left')}>
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <div className="menu-categories" ref={categoriesRef}>
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    className={selectedCategory === cat.name ? 'active' : ''}
                                    onClick={() => setSelectedCategory(cat.name)}
                                >
                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: '50%',
                                            marginBottom: 4,
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <div style={{ fontSize: 15, fontWeight: 600 }}>{cat.name}</div>
                                </button>
                            ))}
                        </div>
                        <button className="cat-arrow-btn" onClick={() => scrollCategories('right')}>
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                    <div className="menu-products">
                        {products.map((prod, idx) => (
                            <div
                                className="menu-product"
                                key={prod.id}
                                onClick={() => openModal(prod)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={require('../../assets/images/' + prod.imageUrl)}
                                    alt={prod.name}
                                />
                                <div className="menu-product-name">
                                    {idx + 1}. {prod.name}
                                </div>
                                <div className="menu-product-price">Kr {prod.price},00</div>
                                <button
                                    className="add-cart-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(prod, 1);
                                    }}
                                >
                                    <span role="img" aria-label="cart">
                                        🛒
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Overlay for cart sidebar */}
                {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>}
                <div className={`menu-cart${cartOpen ? ' open' : ''}`}>
                    <div className="cart-header">
                        <div className="cart-header-left">
                            <span className="material-symbols-outlined cart-header-icon">shopping_cart</span>
                            <span className="cart-title">Your Cart ({cart.length})</span>
                        </div>
                        <button className="cart-dinein-btn">DINE IN</button>
                        <button className="cart-close-btn" onClick={() => setCartOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <div className="cart-list">
                        {cart.map((item, idx) => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-left">
                                    <img src={item.img} alt={item.name} className="cart-item-img" />
                                </div>
                                <div className="cart-item-main">
                                    <div className="cart-item-title">
                                        <span className="cart-item-index">{idx + 1}.</span>
                                        <span className="cart-item-name">{item.name}</span>
                                    </div>
                                    {item.note && <div className="cart-item-note">{item.note}</div>}
                                </div>
                                <div className="cart-item-qtyblock">
                                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, -1)}>
                                        -
                                    </button>
                                    <span className="cart-item-qty">{item.qty}</span>
                                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, 1)}>
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-priceblock">
                                    <div className="cart-item-price">Kr {item.price},00</div>
                                    <div className="cart-item-tax">
                                        (Incl. tax 10% = Kr {(item.price * 0.1).toFixed(2)})
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total-block">
                        <div className="cart-total-label">Total:</div>
                        <div className="cart-total-value">Kr {total.toFixed(2)}</div>
                    </div>
                    <div className="cart-total-tax">(Incl. tax 10% = Kr {(total * 0.1).toFixed(2)})</div>
                    <button
                        className="cart-pay-btn"
                        onClick={() => {
                            const token = localStorage.getItem('token');
                            if (!token) {
                                alert('Bạn cần đăng nhập để thanh toán!');
                                navigate('/login');
                                return;
                            }
                            // Chuyển sang trang payment, truyền tổng tiền qua state
                            navigate('/payment', { state: { cartTotal: total } });
                        }}
                    >
                        PAYMENT
                    </button>
                </div>
            </div>
            <ProductModal
                open={modalOpen}
                onClose={closeModal}
                product={selectedProduct}
                quantity={modalQty}
                setQuantity={setModalQty}
                onAddToCart={handleAddToCart}
            />
        </>
    );
}

export default Home;
