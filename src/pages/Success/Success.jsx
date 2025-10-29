import './success.style.css'

import { Button } from '../../components/Button/Button'

export function Success(){
    return (
        <main className="success-container">
            <div className="success-content-container">
                <h2 className='Principal_text_introduction'>Your account has been <br /> successfully created!</h2>
                <p className='Secondary_text_introduction'>Time to explore and complete your Poké-collection</p>
                <Button typeColor="secondary">Catch ’Em Now</Button>
            </div>
        </main>
    )
}