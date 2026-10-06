import { useApp } from "../context";
import { ProductDetailsModal } from "../components/Modal";
import { PageHead, ProductVisual } from "../components/ui";
import { money } from "../utils";

export default function Progress() {
    const { master, go, setModal } = useApp();
    const list = master.filter((p) => !p.existing);

    return (
        <>
            <PageHead
                title="In Progress"
                desc="New master-catalog products not yet added to your shop."
                actions={<button onClick={() => go("browse")}>Browse full catalog</button>}
            />

            <div className="notice">
                This page highlights new items; Browse remains the full searchable master catalog.
            </div>

            <div className="panel">
                <div className="panelhead">
                    <div>
                        <h2>New products</h2>
                        <p>{list.length} items to review</p>
                    </div>
                    <span className="badge accent">{list.length} new</span>
                </div>

                {list.map((p) => (
                    <div
                        className="cartrow"
                        key={p.id}
                        style={{ gridTemplateColumns: "auto 1fr auto" }}
                    >
                        <div className="emoji"><ProductVisual name={p.name} /></div>
                        <div>
                            <b>{p.name}</b>
                            <div className="sub">
                                {p.cat} · {p.stock ? `${p.stock} units available` : "Out of stock"}
                            </div>
                            <b>{money(p.price)}</b>
                        </div>
                        <button
                            onClick={() => setModal(<ProductDetailsModal product={p} from="progress" />)}
                        >
                            View details
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}