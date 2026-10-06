import { money } from "../utils";
import { ProductVisual } from "./ui";

export default function ProductCard({ product, browse, onSelect, onEdit, onDetails }) {
    const p = product;

    return (
        <article className="card">
            <div className="cardvisual">
                <ProductVisual name={p.name} />
                {browse && (
                    <span className="badge">
            {p.existing ? "Existing" : p.stock === 0 ? "Out of stock" : "Available"}
          </span>
                )}
            </div>

            <div className="cardbody">
                <div className="sub">{p.cat}</div>
                <h3>{p.name}</h3>
                <div className="sub">ID {p.id}</div>

                <div className="pricerow">
                    <span className="price">{money(p.price)}</span>
                    <span className="sub">{p.stock} units</span>
                </div>

                <div className="cardfoot">
                    {browse ? (
                        p.existing ? (
                            <button disabled>Already added</button>
                        ) : (
                            <button
                                className="primary"
                                disabled={p.stock === 0}
                                onClick={() => onSelect(p.id)}
                            >
                                ＋ Select
                            </button>
                        )
                    ) : (
                        <button onClick={() => onEdit(p)}>Edit product</button>
                    )}
                    <button onClick={() => onDetails(p)}>Details ↗</button>
                </div>
            </div>
        </article>
    );
}