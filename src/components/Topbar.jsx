import { useState } from "react";
import { useApp } from "../context";

export default function Topbar() {
    const { page, go, setFilters, toast, theme, setTheme } = useApp();
    const [q, setQ] = useState("");

    const onKeyDown = (e) => {
        if (e.key !== "Enter") return;
        if (page === "orders") {
            setFilters((f) => ({ ...f, os: q }));
        } else {
            setFilters((f) => ({ ...f, ps: q }));
            go("products");
        }
    };

    const themeLabels = { blue: "Blue", rose: "Rose", light: "Light" };

    return (
        <header className="topbar">
            <button className="mobilebtn" id="menu">☰</button>

            <input
                id="global"
                placeholder="Search products, orders…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
            />

            <div className="right">
                <button
                    onClick={() => toast("You’re all caught up.")}
                    title="Notifications"
                    aria-label="Notifications"
                >
                    <svg className="ni" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15z" />
                        <path d="M10 20.5a2 2 0 0 0 4 0" />
                    </svg>
                </button>

                <select
                    className="theme"
                    id="theme"
                    value={theme}
                    aria-label="Theme"
                    onChange={(e) => {
                        setTheme(e.target.value);
                        toast(themeLabels[e.target.value] + " applied");
                    }}
                >
                    <option value="blue">Blue</option>
                    <option value="rose">Rose</option>
                    <option value="light">Light</option>
                </select>

                <span className="userhide">Demo Store · demo@example.com</span>
            </div>
        </header>
    );
}