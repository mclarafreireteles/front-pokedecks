import './marketplace.style.css'
import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from "react";
import * as cardService from '../../services/cardService';
import { useSearchParams } from 'react-router-dom';

export function Marketplace() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [searchParams] = useSearchParams();
    
    const searchTerm = searchParams.get('name') || "";

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await cardService.getAllCards();
                const mappedProducts = data.map(card => ({
                    ...card,
                    price: Number(card.price) || 0,
                    description: `Carta oficial ${card.name}. Quantidade em estoque: ${card.stockQuantity}`
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error("Erro ao buscar cartas:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredProducts = products.filter((product) => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main>
            <Navbar isLogged={true} />
            <div className="page-content">
                {searchTerm && (
                    <div style={{ textAlign: 'center', marginBottom: '54px' }}>
                        <p>Showing results for: <strong>{searchTerm}</strong></p>
                    </div>
                )}

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <p>Loading cards...</p>
                    </div>
                ) : (
                    <div className="cards-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="no-results" style={{ width: '100%', textAlign: 'center' }}>
                                <p>No cards found :/</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    )
}