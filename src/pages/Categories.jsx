import { useApp } from "../context";
import { PageHead } from "../components/ui";

export default function Categories() {
    const { catrows, setCatrows, filters, setFilters, go, toast } = useApp();
    const { cs } = filters;

    const rows = catrows.filter((c) => c.name.toLowerCase().includes(cs.toLowerCase()));
    const selected = catrows.filter((c) => c.checked).length;

    const toggle = (name, checked) =>
        setCatrows((rs) => rs.map((c) => (c.name === name ? { ...c, checked } : c)));

    return (
        <>
            <PageHead
                title="Allowed Categories"
                desc="Choose which master-catalog categories can be browsed and imported into this shop."
            />

            <div className="notice">
                Existing products stay in your catalog; this controls future browsing and availability.
                Parent and child categories can be selected separately.
            </div>

            <div className="panel">
                <div className="panelhead">
                    <div>
                        <h2>Category access</h2>
                        <p>Choose available categories.</p>
                    </div>
                    <span className="badge accent">{selected} selected</span>
                </div>

                <div className="toolbar" style={{ padding: "14px 18px 0" }}>
                    <input
                        placeholder="Search categories…"
                        value={cs}
                        onChange={(e) => setFilters((f) => ({ ...f, cs: e.target.value }))}
                    />
                    <button
                        onClick={() =>
                            setCatrows((rs) => rs.map((c) => ({ ...c, checked: true })))
                        }
                    >
                        Select all
                    </button>
                    <button
                        onClick={() =>
                            setCatrows((rs) => rs.map((c) => ({ ...c, checked: false })))
                        }
                    >
                        Clear
                    </button>
                </div>

                <div className="tree">
                    {rows.length === 0 && "No categories found."}
                    {rows.map((c) => (
                        <label key={c.name} className={c.type === "Child" ? "child" : ""}>
                            <input
                                type="checkbox"
                                checked={c.checked}
                                onChange={(e) => toggle(c.name, e.target.checked)}
                            />
                            <span style={{ flex: 1 }}>
                {c.type === "Child" ? "↳ " : ""}
                                {c.name}
              </span>
                            <span className="sub">{c.type}</span>
                        </label>
                    ))}
                </div>

                <div className="footer">
                    <button
                        className="primary"
                        onClick={() => toast("Category access saved in this prototype.")}
                    >
                        Save Category Access
                    </button>
                    <button onClick={() => go("browse")}>Browse Products →</button>
                </div>
            </div>
        </>
    );
}