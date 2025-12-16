import './marketplace.style.css'
import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from "react";
import * as cardService from '../../services/cardService';


export function Marketplace() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await cardService.getAllCards();
                const mappedProducts = data.map(card => ({
                    ...card,
                    price: 50.00 + (card.localId || 0), 
                    description: `Carta oficial ${card.name}. Quantidade em estoque: ${card.stockQuantity}`
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error("Erro ao buscar cartas:", error);
                alert("Não foi possível carregar os produtos.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);


    return (
        <main>
            <Navbar isLogged="" />
            <div className="page-content">
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <p>Carregando cartas...</p>
                    </div>
                ) : (
                    <div className="cards-grid">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    )
}