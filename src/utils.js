export const money = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export function iconKey(name) {
    const n = (name || "").toLowerCase();
    if (/headphone|airbeat/.test(n)) return "headphones";
    if (/speaker|minisound/.test(n)) return "speaker";
    if (/hub/.test(n)) return "hub";
    if (/organizer|storage/.test(n)) return "organizer";
    if (/phone/.test(n)) return "phone";
    if (/cup|thermo/.test(n)) return "cup";
    if (/backpack|daypack/.test(n)) return "backpack";
    if (/charger/.test(n)) return "charger";
    if (/ceramic|plate|table/.test(n)) return "plates";
    return "box";
}