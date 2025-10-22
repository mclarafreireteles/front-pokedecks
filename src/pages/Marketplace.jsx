import { Navbar } from "../components/Navbar/Navbar"
import { Footer } from "../components/Footer/Footer"

export function Marketplace(){
    return(
        <main>
            <Navbar isLogged="" />
            <div className="page-content">
                {/* <Collection /> */}
            </div>
            <Footer/>
        </main>
    )
}