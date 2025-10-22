import './landingpage.style.css'
import { Button } from "../../components/Button/Button"

export function LandingPage(){
    return (
        <main className="landingpage-container">
            <div className="lp-content-column">
                <h1 className='lp-logo'>poke<span>decks</span></h1>
                <div className="text-content">
                    <h2 className='text-content-title'>Catch 'Em All: Explore Our Pokemon Card Catalog!</h2>
                    <p className='text-content-text'>Discover a world of Pokemon cards, from rare gems to classic favorites. Start your collection or find that missing card in our premier Pokemon card shop.</p>
                    <div className="lp-btn-container">
                        <Button text="Sign In" type="primary" onClick=""/> 
                        <Button text="Register" type="secondary" onClick=""/> 
                    </div>
                </div>
            </div>
            <div className="lp-image-column">
                <img src="/images/poke-cards-landing.png" alt="Descrição visual do produto" />
            </div>
        </main>
    )
}