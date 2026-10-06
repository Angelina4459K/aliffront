import { useState } from "react";
import { useApp } from "../context";
import ProductTable from "../components/ProductTable";
import ProductCard from "../components/ProductCard";
import { ProductDetailsModal, ConfirmDeleteModal } from "../components/Modal";
import { PageHead, EmptyState } from "../components/ui";

function EditProductModal({ product }) {
    const { closeModal, setProducts, toast, setModal } = useApp();
    const [desc, setDesc] = useState(product.desc);
    const [notes, setNotes] = useState(product.notes);
    const [order, setOrder] = useState(product.order);
    const [images, setImages] = useState(product.images);

    const save = (e) => {
        e.preventDefault();
        setProducts((list) =>
            list.map((p) =>
                p.id === product.id ? { ...p, desc, notes, order: +order, images } : p
            )
        );
        closeModal();
        toast("Product customizations saved in this prototype.");
    };

    return (
        <form onSubmit={save}>
            <div className="modalhead">
                <div>
                    <div className="eyebrow">Product editor</div>
                    <h2>Edit Product — {product.name}</h2>
                </div>
                <button type="button" aria-label="Close details" onClick={closeModal}>✕</button>
            </div>

            <div className="modalbody">
                <div className="eyebrow">Product information · Admin controlled</div>
                <div className="formgrid" style={{ padding: "12px 0" }}>
                    <div className="field"><label>Product Name</label><input value={product.name} disabled /></div>
                    <div className="field"><label>Category</label><input value={product.cat} disabled /></div>
                    <div className="field"><label>Price</label><input value={`$${product.price} · Managed by Admin`} disabled /></div>
                    <div className="field"><label>Stock Quantity</label><input value={`${product.stock} units · Managed by Admin`} disabled /></div>
                </div>

                <div className="eyebrow">Your customizations</div>
                <div className="formgrid" style={{ padding: "12px 0" }}>
                    <div className="field full">
                        <label>Product Description</label>
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
                        <small>Add your own product description for your storefront.</small>
                    </div>
                    <div className="field full">
                        <label>Internal Notes</label>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                        <small>Private notes — not visible to customers.</small>
                    </div>
                    <div className="field">
                        <label>Display Order</label>
                        <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
                        <small>Lower numbers appear first.</small>
                    </div>
                    <div className="field">
                        <label>Product Images (URLs)</label>
                        <input
                            value={images}
                            placeholder="https://… , https://…"
                            onChange={(e) => setImages(e.target.value)}
                        />
                        <small>Separate multiple URLs with commas.</small>
                    </div>
                </div>
            </div>

            <div className="modalfoot">
                <button
                    type="button"
                    onClick={() => setModal(<ConfirmDeleteModal productId={product.id} />)}
                >
                    Delete Product
                </button>
                <div className="actions">
                    <button type="button" onClick={closeModal}>Cancel</button>
                    <button className="primary" type="submit">Save Changes</button>
                </div>
            </div>
        </form>
    );
}

export default function Products() {
    const { products, view, setView, filters, setFilters, go, setModal } = useApp();
    const { ps, pc } = filters;

    const list = products.filter(
        (p) =>
            `${p.name} ${p.cat} ${p.id}`.toLowerCase().includes(ps.toLowerCase()) &&
            (pc === "All Categories" || p.cat === pc)
    );

    const cats = [...new Set(products.map((p) => p.cat))];
    const stats = [
        ["Products in shop", products.length, "Current catalog"],
        ["In stock", products.filter((p) => p.stock > 0).length, "Based on catalog data"],
        ["Out of stock", products.filter((p) => p.stock === 0).length, "Zero stock"],
        ["Categories", new Set(products.map((p) => p.cat)).size, "In your shop"],
    ];

    return (
        <>
            <PageHead
                title="Your Products"
                desc="Manage the products currently available in your shop."
                actions={
                    <button className="primary" onClick={() => go("browse")}>
                        ＋ Browse &amp; Add Products
                    </button>
                }
            />

            <div className="stats">
                {stats.map((s) => (
                    <div className="stat" key={s[0]}>
                        <label>{s[0]}</label>
                        <strong>{s[1]}</strong>
                        <small>{s[2]}</small>
                    </div>
                ))}
            </div>

            <div className="toolbar">
                <input
                    placeholder="Search products…"
                    value={ps}
                    onChange={(e) => setFilters((f) => ({ ...f, ps: e.target.value }))}
                />
                <select
                    value={pc}
                    onChange={(e) => setFilters((f) => ({ ...f, pc: e.target.value }))}
                >
                    <option>All Categories</option>
                    {cats.map((c) => <option key={c}>{c}</option>)}
                </select>
                <div className="actions">
                    <button className={view === "table" ? "primary" : ""} onClick={() => setView("table")}>
                        ☷ Table
                    </button>
                    <button className={view === "cards" ? "primary" : ""} onClick={() => setView("cards")}>
                        ▦ Cards
                    </button>
                </div>
            </div>

            <p className="sub">Showing {list.length} of {products.length} products</p>

            {list.length === 0 ? (
                <EmptyState
                    title="No matching products"
                    text="Try changing the search or filters."
                    onReset={() => setFilters((f) => ({ ...f, ps: "", pc: "All Categories" }))}
                />
            ) : view === "table" ? (
                <ProductTable
                    list={list}
                    onEdit={(p) => setModal(<EditProductModal product={p} />)}
                />
            ) : (
                <div className="grid">
                    {list.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onEdit={() => setModal(<EditProductModal product={p} />)}
                            onDetails={() => setModal(<ProductDetailsModal product={p} from="products" />)}
                        />
                    ))}
                </div>
            )}
        </>
    );
}