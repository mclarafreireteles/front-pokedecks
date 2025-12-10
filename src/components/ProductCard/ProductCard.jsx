import './product-card.style.css';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    console.log("Adicionar ao carrinho:", product.id);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        <img 
          src={product.imageUrl || "https://via.placeholder.com/300?text=Sem+Imagem"} 
          alt={product.name} 
          className="product-image" 
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <div className="price-container">
              <span className="current-price">{formatCurrency(product.price)}</span>
          </div>
          {/* importar botao */}
          <button className="add-cart-btn" onClick={handleAddToCart}> 
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}