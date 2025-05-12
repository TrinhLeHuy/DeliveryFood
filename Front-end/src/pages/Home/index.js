import React, { useState, useRef } from 'react';
import './HomePage.scss';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';

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

// Sản phẩm thủ công, mỗi sản phẩm gán đúng category, ảnh, tên, giá
const products = [
    { id: 1, name: 'Hamburger', price: 123, category: 'Sea Food', img: require('../../assets/images/seafood.jpg') },
    {
        id: 2,
        name: 'Grilled squid satay',
        price: 123,
        category: 'Sea Food',
        img: require('../../assets/images/seafood (2).jpg'),
    },
    {
        id: 3,
        name: 'Grilled squid satay',
        price: 123,
        category: 'Sea Food',
        img: require('../../assets/images/meat.jpg'),
    },
    {
        id: 4,
        name: 'Grilled squid satay',
        price: 123,
        category: 'Sea Food',
        img: require('../../assets/images/soup.jpg'),
    },
    {
        id: 5,
        name: 'Grilled squid satay',
        price: 123,
        category: 'Sea Food',
        img: require('../../assets/images/noddle.jpg'),
    },
    { id: 6, name: 'Fresh Cupcake', price: 60, category: 'Cupcake', img: require('../../assets/images/cake.jpg') },
    { id: 7, name: 'Chocolate Cake', price: 80, category: 'Cupcake', img: require('../../assets/images/cake (2).jpg') },
    {
        id: 8,
        name: 'Orange Juice',
        price: 50,
        category: 'Orange Juice',
        img: require('../../assets/images/orangejuice.jpg'),
    },
    { id: 9, name: 'Coca Cola', price: 40, category: 'Coca', img: require('../../assets/images/fries.jpg') },
    { id: 10, name: 'Apple Juice', price: 55, category: 'Juice', img: require('../../assets/images/orangejuice.jpg') },
    { id: 11, name: 'Steak', price: 150, category: 'Meat', img: require('../../assets/images/steak.jpg') },
    { id: 12, name: 'French Fries', price: 45, category: 'Fries', img: require('../../assets/images/fries.jpg') },
    // Có thể thêm sản phẩm mới ở đây
];

function Home() {
    const [selectedCategory, setSelectedCategory] = useState(categories[1].name); // Sea Food mặc định
    const [cart, setCart] = useState([]);
    const categoriesRef = useRef(null);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalQty, setModalQty] = useState(1);
    const [cartOpen, setCartOpen] = useState(false);

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

    // Lọc sản phẩm theo danh mục
    const filteredProducts = products.filter((prod) => prod.category === selectedCategory);

    return (
        <>
            <div className="menu-header-row">
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
                        {filteredProducts.map((prod, idx) => (
                            <div
                                className="menu-product"
                                key={prod.id}
                                onClick={() => openModal(prod)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={prod.img} alt={prod.name} />
                                <div className="menu-product-name">
                                    {idx + 1}. {prod.name}
                                </div>
                                <div className="menu-product-price">Kr {prod.price},00</div>
                                <button
                                    className="add-cart-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(prod);
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
                        onClick={() => navigate('/payment', { state: { cartTotal: total } })}
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
