import { useState } from "react";
import { useApp } from "../context";
import { PageHead, Badge } from "../components/ui";

export default function Staff() {
    const { staff, setStaff, toast } = useApp();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Staff (orders only)");

    const submit = (e) => {
        e.preventDefault();
        const trimmed = email.trim();
        if (staff.some((s) => s.email.toLowerCase() === trimmed.toLowerCase())) {
            return toast("This email already has a staff login.");
        }
        setStaff((list) => [
            ...list,
            { name, email: trimmed, role, status: "ACTIVE", last: "Never logged in" },
        ]);
        setName("");
        setEmail("");
        setPassword("");
        toast("Staff login added to demo.");
    };

    const toggleAccess = (i) =>
        setStaff((list) =>
            list.map((s, idx) =>
                idx === i
                    ? { ...s, status: s.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
                    : s
            )
        );

    return (
        <>
            <PageHead
                title="Staff Logins"
                desc="Give teammates their own login without sharing admin credentials."
            />

            <div className="notice">
                Staff can only view orders. Admin sub-users have the same access as you, including
                managing products, categories and other staff logins.
            </div>

            <div className="panel" style={{ marginBottom: 17 }}>
                <div className="panelhead">
                    <div>
                        <h2>Add staff login</h2>
                        <p>Create a separate account for a teammate.</p>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <div className="formgrid">
                        <div className="field">
                            <label>Name</label>
                            <input
                                required
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                placeholder="Temporary password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <small>At least 8 characters.</small>
                        </div>
                        <div className="field">
                            <label>Role</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option>Staff (orders only)</option>
                                <option>Admin sub-user</option>
                            </select>
                            <small>
                                {role === "Admin sub-user"
                                    ? "Same access as business admin, including products, categories and staff logins."
                                    : "Can view orders only."}
                            </small>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="primary" type="submit">＋ Create staff login</button>
                    </div>
                </form>
            </div>

            <div className="panel">
                <div className="panelhead">
                    <div>
                        <h2>Existing logins</h2>
                        <p>{staff.length} staff accounts</p>
                    </div>
                </div>

                <div className="tablewrap">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {staff.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    style={{ textAlign: "center", padding: 28, color: "var(--muted)" }}
                                >
                                    No staff logins yet.
                                </td>
                            </tr>
                        ) : (
                            staff.map((s, i) => (
                                <tr key={s.email}>
                                    <td><b>{s.name}</b></td>
                                    <td>{s.email}</td>
                                    <td>{s.role}</td>
                                    <td><Badge status={s.status} /></td>
                                    <td>{s.last}</td>
                                    <td><button onClick={() => toggleAccess(i)}>Toggle access</button></td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}