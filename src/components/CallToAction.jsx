import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';

function CallToAction() {
    return (
        <div className="cta-container">
            <Link to="/catalogobooster" className="cta-link">
                <img
                    src="/images/calltoaction.jpg"
                    alt="Booster Special Offer"
                    className="cta-image"
                />
                <div className="cta-overlay">
                    <h2>¡Consigue tus Boosters!</h2>
                    <button className="cta-button">Ver Catálogo</button>
                </div>
            </Link>
        </div>
    );
}

export default CallToAction;
