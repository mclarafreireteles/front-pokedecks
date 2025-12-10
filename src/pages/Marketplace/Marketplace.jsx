import './marketplace.style.css'
import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from "react";

export function Marketplace() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const mockData = [
            {
                id: 1,
                name: "Carta Charizard VMAX",
                description: "Carta ultra rara da coleção Darkness Ablaze. Estado Mint.",
                price: 250.00,
                imageUrl: "https://example.com/charizard.png"
            },
            {
                id: 2,
                name: "Box Pikachu Coleção",
                description: "Caixa especial com pins, cartas promocionais e boosters.",
                price: 120.00,
                imageUrl: null 
            }
        ];
        setProducts(mockData);
    }, []);


    return (
        <main>
            <Navbar isLogged="" />
            <div className="page-content">
                <div className="cards-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}