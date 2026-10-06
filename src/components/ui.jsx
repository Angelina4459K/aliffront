import { ICONS } from "../data";
import { iconKey } from "../utils";

export function ProductVisual({ name }) {
    return (
        <svg
            className="product-photo"
            viewBox="0 0 48 48"
            role="img"
            aria-label={name}
            dangerouslySetInnerHTML={{ __html: ICONS[iconKey(name)] }}
        />
    );
}

export function Badge({ status }) {
    const cls =
        ["COMPLETED", "ACTIVE"].includes(status) ? "good"
            : ["NEW", "LOW STOCK"].includes(status) ? "warn"
                : ["OUT OF STOCK", "INACTIVE"].includes(status) ? "bad"
                    : "accent";
    return <span className={`badge ${cls}`}>{status}</span>;
}

export function StockBadge({ product }) {
    if (product.stock === 0) return <Badge status="OUT OF STOCK" />;
    if (product.stock < 5) return <Badge status="LOW STOCK" />;
    return <>{product.stock} units</>;
}

export function PageHead({ title, desc, actions }) {
    return (
        <div className="head">
            <div>
                <div className="eyebrow">Tredops workspace</div>
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
            <div className="actions">{actions}</div>
        </div>
    );
}

export function EmptyState({ title, text, onReset, nested, icon }) {
    return (
        <div className={nested ? "empty" : "panel empty"} style={nested ? undefined : { gridColumn: "1/-1" }}>
            {icon === "cart" ? (
                <div className="big">🛒</div>
            ) : (
                <svg className="emptyico" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m20 20-4.2-4.2" />
                </svg>
            )}
            <h3>{title}</h3>
            <p>{text}</p>
            {onReset && <button onClick={onReset}>Reset filters</button>}
        </div>
    );
}