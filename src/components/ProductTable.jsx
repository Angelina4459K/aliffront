import { money } from "../utils";
import { ProductVisual, StockBadge } from "./ui";

export default function ProductTable({ list, onEdit }) {
    return (
        <div className="panel">
            <div className="tablewrap">
                <table>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((p) => (
                        <tr key={p.id}>
                            <td>
                                <div className="prod">
                                    <div className="emoji"><ProductVisual name={p.name} /></div>
                                    <div>
                                        <b>{p.name}</b>
                                        <div className="sub">ID {p.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{p.cat}</td>
                            <td><b>{money(p.price)}</b></td>
                            <td><StockBadge product={p} /></td>
                            <td><button onClick={() => onEdit(p)}>Edit</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}