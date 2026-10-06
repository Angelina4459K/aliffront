import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "./context";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Browse from "./pages/Browse";
import Cart from "./pages/Cart";
import Progress from "./pages/Progress";
import Categories from "./pages/Categories";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";

import {
    initialProducts,
    catalogExtras,
    initialOrders,
    initialCatrows,
} from "./data";

const PAGES = {
    products: Products,
    orders: Orders,
    browse: Browse,
    cart: Cart,
    progress: Progress,
    categories: Categories,
    staff: Staff,
    settings: Settings,
};

const readSavedTheme = () => {
    try {
        const saved = localStorage.getItem("tredops-theme");
        if (saved) return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "rose";
};

export default function App() {
    const [page, setPage] = useState("products");
    const [view, setView] = useState("table");

    const [products, setProducts] = useState(initialProducts);
    const [orders] = useState(initialOrders);
    const [staff, setStaff] = useState([]);
    const [cart, setCart] = useState({});
    const [catrows, setCatrows] = useState(initialCatrows);

    const [filters, setFilters] = useState({
        ps: "",
        pc: "All Categories",
        bs: "",
        bc: "All Categories",
        os: "",
        ost: "All statuses",
        cs: "",
    });

    const [theme, setTheme] = useState(readSavedTheme);
    const [toastMsg, setToastMsg] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const toastTimer = useRef(null);

    const master = useMemo(
        () => [
            ...products.map((p) => ({ ...p, existing: true })),
            ...catalogExtras.map((p) => ({ ...p, existing: false })),
        ],
        [products]
    );

    useEffect(() => {
        document.body.dataset.theme = theme;
        try {
            localStorage.setItem("tredops-theme", theme);
        } catch {}
    }, [theme]);

    useEffect(() => {
        document.body.style.overflow = modalContent ? "hidden" : "";
    }, [modalContent]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setModalContent(null);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        const onMove = (e) => {
            const t = e.target.closest?.(
                ".sidebar,.topbar,.panel,.stat,.card,button,.modal,.nav button"
            );
            if (!t) return;
            const r = t.getBoundingClientRect();
            t.style.setProperty("--mx", e.clientX - r.left + "px");
            t.style.setProperty("--my", e.clientY - r.top + "px");
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    const toast = useCallback((msg) => {
        setToastMsg(msg);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToastMsg(""), 2600);
    }, []);

    const go = useCallback((p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const closeModal = useCallback(() => setModalContent(null), []);

    const addToCart = useCallback(
        (id) => {
            const p = master.find((x) => x.id === id);
            if (!p) return;
            if (p.existing) return toast("This product is already in your shop.");
            if (!p.stock) return toast("This item is out of stock.");
            setCart((c) => ({ ...c, [id]: Math.min(p.stock, (c[id] || 0) + 1) }));
            toast("Added to selection.");
        },
        [master, toast]
    );

    const changeQty = useCallback(
        (id, delta) => {
            const p = master.find((x) => x.id === id);
            if (!p) return;
            setCart((c) => {
                const next = Math.min(p.stock, Math.max(0, (c[id] || 0) + delta));
                const copy = { ...c };
                if (!next) delete copy[id];
                else copy[id] = next;
                return copy;
            });
        },
        [master]
    );

    const value = {
        page,
        go,
        view,
        setView,
        products,
        setProducts,
        master,
        orders,
        staff,
        setStaff,
        cart,
        setCart,
        addToCart,
        changeQty,
        catrows,
        setCatrows,
        filters,
        setFilters,
        theme,
        setTheme,
        toast,
        modalContent,
        setModal: setModalContent,
        closeModal,
    };

    const Page = PAGES[page] || Products;

    return (
        <AppContext.Provider value={value}>
            <div className="app">
                <Sidebar />
                <main className="main">
                    <Topbar />
                    <div className="content">
                        <Page />
                    </div>
                </main>
            </div>
            <Modal />
            <Toast message={toastMsg} />
        </AppContext.Provider>
    );
}