import { useApp } from "../context";
import { ContinueCartModal } from "../components/Modal";
import { PageHead, ProductVisual } from "../components/ui";
import { money } from "../utils";

export default function Cart() {
    const { cart, setCart, master, changeQty, go, setModal } = useApp();

    const list = Object.entries(cart).map(([id, qty]) => ({
        ...master.find((p) => p.id === Number(id)),
        qty,
    }));

    if (!list.length) {
        return (
            <>
                <PageHead title="Selection Cart" desc="Review products selected from the master catalog." />
                <div className="panel empty">
                    <div className="big">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Browse the master catalog to select products for your shop.</p>
                    <button className="primary" onClick={() => go("browse")}>
                        ⌕ Browse Products
                    </button>
                </div>
            </>
        );
    }

    const totalUnits = list.reduce((a, p) => a + p.qty, 0);
    const openContinue = () => setModal(<ContinueCartModal />);

    return (
        <>
            <PageHead
                title="Your Selection Cart"
                desc="Review selected products before continuing."
                actions={<button onClick={() => go("browse")}>← Continue Browsing</button>}
            />

            <div className="twocol">
                <div className="panel">
                    <div className="panelhead">
                        <div>
                            <h2>Selected products</h2>
                            <p>{list.length} product types</p>
                        </div>
                        <button onClick={() => setCart({})}>Clear selection</button>
                    </div>

                    {list.map((p) => (
                        <div className="cartrow" key={p.id}>
                            <div className="emoji"><ProductVisual name={p.name} /></div>
                            <div>
                                <b>{p.name}</b>
                                <div className="sub">{p.cat} · {p.stock} available</div>
                                <div className="sub">{money(p.price)} per unit</div>
                            </div>
                            <div className="qty">
                                <button onClick={() => changeQty(p.id, -1)}>−</button>
                                {p.qty}
                                <button disabled={p.qty >= p.stock} onClick={() => changeQty(p.id, 1)}>
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() =>
                                    setCart((c) => {
                                        const copy = { ...c };
                                        delete copy[p.id];
                                        return copy;
                                    })
                                }
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <div className="footer">
                        <button onClick={() => go("browse")}>Add more products</button>
                        <button className="primary" onClick={openContinue}>Continue</button>
                    </div>
                </div>

                <div className="panel">
                    <div className="panelhead"><h2>Selection summary</h2></div>
                    <div style={{ padding: 18 }}>
                        <p>Product types <b style={{ float: "right" }}>{list.length}</b></p>
                        <p>Total units <b style={{ float: "right" }}>{totalUnits}</b></p>
                        <div className="notice">
                            This is a product selection workflow, not a customer checkout.
                        </div>
                        <button className="primary" style={{ width: "100%" }} onClick={openContinue}>
                            Continue selection
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}