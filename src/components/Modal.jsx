import { useApp } from "../context";
import { money } from "../utils";
import { ProductVisual, StockBadge, Badge } from "./ui";

export default function Modal() {
    const { modalContent, closeModal } = useApp();
    if (!modalContent) return null;

    return (
        <div
            className="modalback open"
            onClick={(e) => {
                if (e.target.classList.contains("modalback")) closeModal();
            }}
        >
            <div className="modal">{modalContent}</div>
        </div>
    );
}

export function ProductDetailsModal({ product, from }) {
    const { closeModal, go, addToCart } = useApp();

    return (
        <>
            <div className="modalhead">
                <div>
                    <div className="eyebrow">Catalog item · ID {product.id}</div>
                    <h2>{product.name}</h2>
                </div>
                <button type="button" aria-label="Close details" onClick={closeModal}>✕</button>
            </div>

            <div className="modalbody">
                <div className="prod">
                    <div className="emoji" style={{ width: 70, height: 70 }}>
                        <ProductVisual name={product.name} />
                    </div>
                    <div>
                        <div className="sub">{product.cat}</div>
                        <h2>{money(product.price)}</h2>
                        <StockBadge product={product} />
                    </div>
                </div>

                <div className="divider" />
                <p>{product.desc || "No description supplied in catalog."}</p>

                <div className="footer">
                    {from === "browse" && !product.existing ? (
                        <button
                            className="primary"
                            onClick={() => {
                                closeModal();
                                addToCart(product.id);
                            }}
                        >
                            ＋ Add to selection
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                closeModal();
                                go(from === "progress" ? "browse" : "products");
                            }}
                        >
                            Back
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export function ConfirmDeleteModal({ productId }) {
    const { closeModal, setProducts, toast } = useApp();

    return (
        <>
            <div className="modalhead">
                <h2>Delete product?</h2>
                <button type="button" aria-label="Close details" onClick={closeModal}>✕</button>
            </div>
            <div className="modalbody">
                This removes the product from this local prototype only. Confirm trader deletion
                rights before implementing this action.
            </div>
            <div className="modalfoot">
                <button onClick={closeModal}>Cancel</button>
                <button
                    className="primary"
                    onClick={() => {
                        setProducts((list) => list.filter((p) => p.id !== productId));
                        closeModal();
                        toast("Removed from demo view.");
                    }}
                >
                    Delete Product
                </button>
            </div>
        </>
    );
}

export function ContinueCartModal() {
    const { closeModal, cart, toast } = useApp();
    const types = Object.keys(cart).length;
    const units = Object.values(cart).reduce((a, b) => a + b, 0);

    return (
        <>
            <div className="modalhead">
                <h2>Continue with selected products?</h2>
                <button type="button" aria-label="Close details" onClick={closeModal}>✕</button>
            </div>
            <div className="modalbody">
                <p>
                    This prototype demonstrates selection only. Connect the final step to the existing
                    import endpoint and its validation rules.
                </p>
                <div className="notice">Product types: {types} · Total units: {units}</div>
            </div>
            <div className="modalfoot">
                <button onClick={closeModal}>Review selection</button>
                <button
                    className="primary"
                    onClick={() => {
                        closeModal();
                        toast("Demo only — connect to existing import flow.");
                    }}
                >
                    Confirm selection (demo)
                </button>
            </div>
        </>
    );
}

export function OrderDetailsModal({ order }) {
    const { closeModal } = useApp();

    return (
        <>
            <div className="modalhead">
                <div>
                    <div className="eyebrow">Order details</div>
                    <h2>Order #{order.id}</h2>
                </div>
                <button type="button" aria-label="Close details" onClick={closeModal}>✕</button>
            </div>

            <div className="modalbody">
                <div className="actions" style={{ justifyContent: "space-between" }}>
                    <b>{order.date}</b>
                    <Badge status={order.status} />
                </div>

                <div className="divider" />
                <h3>Customer</h3>
                <p>
                    <b>{order.customer}</b><br />
                    {order.phone}<br />
                    {order.email}
                </p>

                <h3>Items ordered</h3>
                {order.items.map((i, idx) => (
                    <div
                        key={idx}
                        className="cartrow"
                        style={{ gridTemplateColumns: "1fr auto", padding: "10px 0" }}
                    >
                        <div>
                            {i[0]}
                            <div className="sub">{i[1]} × {money(i[2])}</div>
                        </div>
                        <b>{money(i[1] * i[2])}</b>
                    </div>
                ))}

                <div className="divider" />
                <h2>Total {money(order.total)}</h2>
                <div className="notice">
                    Payment confirmation and courier handoff are managed by the administrator.
                </div>
            </div>

            <div className="modalfoot">
                <button onClick={closeModal}>Close details</button>
            </div>
        </>
    );
}