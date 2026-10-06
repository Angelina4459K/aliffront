import { useApp } from "../context";

const I = ({ children }) => (
    <svg className="ni" viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
);

const NAV = [
    { id: "products",   label: "Products",     icon: <><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></> },
    { id: "orders",     label: "Orders",       icon: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></> },
    { id: "browse",     label: "Browse",       icon: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></> },
    { id: "progress",   label: "In Progress",  icon: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>, badge: true },
    { id: "categories", label: "Categories",   icon: <><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></> },
    { id: "staff",      label: "Staff Logins", icon: <><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20c.8-4 4-6 7.5-6s6.7 2 7.5 6" /></> },
];

export default function Sidebar() {
    const { page, go, master } = useApp();
    const newCount = master.filter((p) => !p.existing).length;

    return (
        <aside className="sidebar" id="sidebar">
            <div className="brand"><span>T</span>TRADEOPS</div>
            <div className="navlabel">WORKSPACE</div>

            <nav className="nav">
                {NAV.map((n) => (
                    <button
                        key={n.id}
                        className={page === n.id ? "active" : ""}
                        onClick={() => go(n.id)}
                        title={n.label}
                        aria-label={n.label}
                    >
                        <I>{n.icon}</I>
                        {n.label}
                        {n.badge && <span className="badge">{newCount}</span>}
                    </button>
                ))}
            </nav>

            <div className="bottom">
                <nav className="nav">
                    <button
                        className={page === "settings" ? "active" : ""}
                        onClick={() => go("settings")}
                        title="Account Settings"
                        aria-label="Account Settings"
                    >
                        <I>
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
                        </I>
                        Account Settings
                    </button>
                </nav>
                <div className="profile">
                    ◉ &nbsp; <b>Demo Store</b>
                    <div className="sub" style={{ marginLeft: 25 }}>Trader account · Active</div>
                </div>
            </div>
        </aside>
    );
}