import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../api/scryfallApi";
import { listarProductos } from "../api/productosApi";
import "./ScryfallCardDetail.css";

function ScryfallCardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [matchingBooster, setMatchingBooster] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Fetch card details
                const cardResponse = await getCardById(id);
                const cardData = cardResponse.data;
                setCard(cardData);

                // 2. Fetch local products to find a match
                const productsResponse = await listarProductos();
                const products = productsResponse.data || [];

                // 3. Find booster with matching set
                // The 'set' attribute in products is a comma-separated string
                const cardSetName = cardData.set_name;

                const found = products.find(p => {
                    if (!p.set) return false;
                    const sets = p.set.split(',').map(s => s.trim());
                    return sets.includes(cardSetName);
                });

                if (found) {
                    setMatchingBooster(found);
                }

            } catch (err) {
                console.error("Error fetching details:", err);
                setError("Error al cargar los detalles de la carta.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return <div className="loading-container">Invocando detalles...</div>;
    }

    if (error || !card) {
        return <div className="error-container">{error || "Carta no encontrada"}</div>;
    }

    const imageUri = card.image_uris?.large ||
        card.image_uris?.normal ||
        card.card_faces?.[0]?.image_uris?.large ||
        card.card_faces?.[0]?.image_uris?.normal;

    return (
        <div className="scryfall-detail-container">
            <button className="btn-back" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <div className="scryfall-detail-content">
                <div className="detail-image-wrapper">
                    {imageUri && <img src={imageUri} alt={card.name} className="detail-image" />}
                </div>

                <div className="detail-info">
                    <h1 className="detail-title">{card.name}</h1>
                    <div className="detail-type">{card.type_line}</div>

                    {(card.oracle_text || card.card_faces?.[0]?.oracle_text) && (
                        <div className="detail-text">
                            {card.oracle_text || card.card_faces?.[0]?.oracle_text}
                        </div>
                    )}

                    <div className="detail-meta">
                        <div className="meta-item">
                            <span className="meta-label">Set</span>
                            <span className="meta-value">{card.set_name}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Rareza</span>
                            <span className="meta-value">{card.rarity.toUpperCase()}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Precio Global (USD)</span>
                            <span className="meta-value">
                                {card.prices?.usd ? `$${card.prices.usd}` : "N/A"}
                            </span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Artista</span>
                            <span className="meta-value">{card.artist}</span>
                        </div>
                    </div>

                    <div className="detail-actions">
                        {card.purchase_uris?.tcgplayer && (
                            <a
                                href={card.purchase_uris.tcgplayer}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-comprar"
                                style={{ textDecoration: 'none' }}
                            >
                                Ver en TCGPlayer
                            </a>
                        )}

                        {matchingBooster && (
                            <button
                                className="btn-comprar"
                                style={{ backgroundColor: '#e9bc3f', color: '#000' }}
                                onClick={() => navigate(`/productodetalle/${matchingBooster.id}`)}
                            >
                                ¡Disponible en {matchingBooster.nombre}!
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScryfallCardDetail;
