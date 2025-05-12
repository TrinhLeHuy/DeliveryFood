import React from 'react';
import './ProductModal.scss';

function ProductModal({ open, onClose, product, quantity, setQuantity, onAddToCart }) {
  if (!open || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">ADD TO CART</div>
        <div className="modal-body">
          <div className="modal-img-block">
            <img src={product.img} alt={product.name} className="modal-img" />
          </div>
          <div className="modal-info-block">
            <div className="modal-row">
              <div><b>SKU</b><div>{product.id}</div></div>
              <div><b>{product.name}</b><div>{product.category}</div></div>
              <div className="modal-price-block">
                <div>Unit Price</div>
                <div className="modal-price">kr {product.price},00</div>
              </div>
            </div>
            <div className="modal-row modal-qty-row">
              <b>Quantity</b>
              <div className="modal-qty-block">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="modal-qty-btn">-</button>
                <span className="modal-qty">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="modal-qty-btn">+</button>
              </div>
            </div>
            {/* Các thuộc tính khác có thể thêm ở đây */}
            <div className="modal-row modal-attr-row">
              <b>Protein:</b> <span>What is Lorem ipsum?</span>
            </div>
            <div className="modal-row modal-attr-row">
              <b>Additives:</b> <span>03</span>
            </div>
            <div className="modal-row modal-attr-row">
              <b>Baking material:</b> <span>040</span>
            </div>
            <div className="modal-row modal-attr-row">
              <b>Food decoration:</b> <span>04</span>
            </div>
            <div className="modal-row modal-attr-row">
              <b>Side dishes <span style={{color: 'red'}}>*</span>:</b> <span>Vegetables</span>
            </div>
          </div>
        </div>
        <button className="modal-add-btn" onClick={() => onAddToCart(product, quantity)}>
          <span role="img" aria-label="cart">🛒</span>  Kr {(product.price * quantity).toLocaleString('en-US')},00
        </button>
      </div>
    </div>
  );
}

export default ProductModal; 