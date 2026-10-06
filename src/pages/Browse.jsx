import { useApp } from "../context";
import ProductCard from "../components/ProductCard";
import { ProductDetailsModal } from "../components/Modal";
import { PageHead, EmptyState } from "../components/ui";

export default function Browse() {
    const { master, filters, setFilters, go, cart, addToCart, setModal } = useApp();
    const { bs, bc } = filters;

    const list = master.filter(
        (p) =>
            `${p.name} ${p.cat} ${p.id}`.toLowerCase().includes(bs.toLowerCase()) &&
            (bc === "All Categories" || p.cat === bc)
    );

    const cats = [...new Set(master.map((p) => p.cat))];
    const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

    return (
        <>
            <PageHead
                title="Browse & Add Products"
                desc="Explore the master catalog and select products for your shop."
                actions={
                    <>
                        <button onClick={() => go("products")}>← Back to Products</button>
                        <button className="primary" onClick={() => go("cart")}>
                            Selection Cart ({cartCount})
                        </button>
                    </>
                }
            />

            <div className="notice">
                Master catalog details are centrally managed. Select available products, review
                quantities, then continue the existing import flow.
            </div>

            <div className="toolbar">
                <input
                    placeholder="Search master catalog…"
                    value={bs}
                    onChange={(e) => setFilters((f) => ({ ...f, bs: e.target.value }))}
                />
                <select
                    value={bc}
                    onChange={(e) => setFilters((f) => ({ ...f, bc: e.target.value }))}
                >
                    <option>All Categories</option>
                    {cats.map((c) => <option key={c}>{c}</option>)}
                </select>
            </div>

            <p className="sub">{list.length} catalog products</p>

            {list.length === 0 ? (
                <EmptyState
                    title="No matching products"
                    text="Try changing the search or filters."
                    onReset={() => setFilters((f) => ({ ...f, bs: "", bc: "All Categories" }))}
                />
            ) : (
                <div className="grid">
                    {list.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            browse
                            onSelect={addToCart}
                            onDetails={() => setModal(<ProductDetailsModal product={p} from="browse" />)}
                        />
                    ))}
                </div>
            )}
        </>
    );
}