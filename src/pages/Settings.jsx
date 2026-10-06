import { useState } from "react";
import { useApp } from "../context";
import { PageHead, Badge } from "../components/ui";

export default function Settings() {
    const { toast } = useApp();
    const [business, setBusiness] = useState("Demo Store");
    const [showKey, setShowKey] = useState(false);
    const keyValue = "tdp_demo_placeholder_not_real";

    const copyKey = async () => {
        try {
            await navigator.clipboard.writeText(keyValue);
            toast("Placeholder copied.");
        } catch {
            toast("Clipboard unavailable in this browser.");
        }
    };

    return (
        <>
            <PageHead
                title="Account Settings"
                desc="Business account information and product/order synchronization settings."
            />

            <div className="twocol">
                <div className="panel">
                    <div className="panelhead">
                        <div>
                            <h2>Business profile</h2>
                            <p>Account details available in the current interface.</p>
                        </div>
                        <Badge status="ACTIVE" />
                    </div>

                    <div className="formgrid">
                        <div className="field">
                            <label>Business Name</label>
                            <input value={business} onChange={(e) => setBusiness(e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Account Status</label>
                            <input value="Active" disabled />
                        </div>
                        <div className="field">
                            <label>Email Address</label>
                            <input value="demo@example.com" disabled />
                            <small>Editing not shown in current UI.</small>
                        </div>
                        <div className="field">
                            <label>Member Since</label>
                            <input value="September 29, 2026" disabled />
                        </div>
                    </div>

                    <div className="footer">
                        <button
                            className="primary"
                            onClick={() => toast("Business profile saved in this prototype.")}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="panel">
                    <div className="panelhead">
                        <div>
                            <h2>API Key</h2>
                            <p>Used to sync products and orders with Admin API.</p>
                        </div>
                        <span className="badge accent">Sensitive</span>
                    </div>

                    <div style={{ padding: 18 }}>
                        <div className="field">
                            <label>API Key</label>
                            <div className="actions">
                                <input
                                    style={{ flex: 1, width: "100%" }}
                                    type={showKey ? "text" : "password"}
                                    readOnly
                                    value={keyValue}
                                />
                                <button onClick={() => setShowKey((v) => !v)}>Show</button>
                                <button onClick={copyKey}>Copy</button>
                            </div>
                            <small>Fictional placeholder only, not a real credential.</small>
                        </div>

                        <div className="notice" style={{ marginTop: 16 }}>
                            The key is hidden by default. Keep real API credentials private.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}