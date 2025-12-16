import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCards } from "../api/scryfallApi";
import "./ScryfallCatalogo.css";

function ScryfallCatalogo() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true);
                // Primeras 100 cartas en orden alfabético                
                const response = await searchCards("lang:en order:name");
                console.log("Scryfall data:", response.data);
                const allCards = response.data.data || [];
                setCards(allCards.slice(0, 100));
            } catch (err) {
                console.error("Error fetching Scryfall cards:", err);
                setError("Error al cargar las cartas de Scryfall.");
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/scryfall-card/${id}`);
    };

    if (loading) {
        return (
            <div className="scryfall-catalogo-container">
                <div className="loading-container">
                    <p>Invocando cartas del multiverso...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="scryfall-catalogo-container">
                <div className="error-container">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="scryfall-catalogo-container">
            <h2 className="scryfall-title">EDHREC Top 100</h2>
            <div className="scryfall-grid">
                {cards.map((card) => {

                    const imageUri = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;

                    if (!imageUri) return null;

                    return (
                        <div
                            key={card.id}
                            className="scryfall-card"
                            onClick={() => handleCardClick(card.id)}
                        >
                            <img
                                src={imageUri}
                                alt={card.name}
                                loading="lazy"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default ScryfallCatalogo;
