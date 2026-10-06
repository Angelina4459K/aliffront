import { useApp } from "../context";
import { OrderDetailsModal } from "../components/Modal";
import { PageHead, Badge, EmptyState } from "../components/ui";
import { money } from "../utils";

export default function Orders() {
    const { orders, filters, setFilters, toast, setModal } = useApp();
    const { os, ost } = filters;

    const list = orders.filter(
        (o) =>
            `${o.id} ${o.customer} ${o.phone}`.toLowerCase().includes(os.toLowerCase()) &&
            (ost === "All statuses" || o.status === ost)
    );

    const statuses = [...new Set(orders.map((o) => o.status))];

    const sync = () => {
        toast("Sync started…");
        setTimeout(
            () => toast("Demo sync complete. Connect Admin API for live orders."),
            900
        );
    };

    return (
        <>
            <PageHead
                title="Your Orders"
                desc="Review customer orders, item details and order status."
                actions={<button onClick={sync}>⟳ Sync Orders</button>}
            />

            <div className="toolbar">
                <input
                    placeholder="Search order ID or customer…"
                    value={os}
                    onChange={(e) => setFilters((f) => ({ ...f, os: e.target.value }))}
                />
                <select
                    value={ost}
                    onChange={(e) => setFilters((f) => ({ ...f, ost: e.target.value }))}
                >
                    <option>All statuses</option>
                    {statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button
                    onClick={() => setFilters((f) => ({ ...f, os: "", ost: "All statuses" }))}
                >
                    Reset filters
                </button>
            </div>

            <div className="panel">
                <div className="panelhead">
                    <div>
                        <h2>Orders</h2>
                        <p>{list.length} matching orders</p>
                    </div>
                    <span className="sub">Demo data</span>
                </div>

                {list.length === 0 ? (
                    <EmptyState
                        nested
                        title="No matching orders"
                        text="Try a different order ID, customer or status."
                        onReset={() => setFilters((f) => ({ ...f, os: "", ost: "All statuses" }))}
                    />
                ) : (
                    <div className="tablewrap">
                        <table>
                            <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Order Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.map((o) => (
                                <tr key={o.id}>
                                    <td><b>#{o.id}</b></td>
                                    <td>
                                        <b>{o.customer}</b>
                                        <div className="sub">{o.phone} · {o.email}</div>
                                    </td>
                                    <td><b>{money(o.total)}</b></td>
                                    <td><Badge status={o.status} /></td>
                                    <td>
                                        <button onClick={() => setModal(<OrderDetailsModal order={o} />)}>
                                            View Details ↗
                                        </button>
                                    </td>
                                    <td>{o.date}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="notice" style={{ marginTop: 15 }}>
                Payment confirmation and courier handoff are handled by the administrator. This
                Trader prototype does not add status-changing controls.
            </div>
        </>
    );
}