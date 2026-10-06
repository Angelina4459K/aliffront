export const initialProducts = [
    { id: 1042, name: "AirBeat Wireless Headphones", cat: "Demo · Electronics", price: 49,   stock: 23, icon: "🎧", desc: "Wireless audio for everyday listening.", notes: "", order: 0, images: "" },
    { id: 1043, name: "MiniSound Speaker",           cat: "Demo · Electronics", price: 34.9, stock: 3,  icon: "🔊", desc: "Compact portable speaker.",             notes: "Check packaging.", order: 1, images: "" },
    { id: 1044, name: "USB-C Hub 7-in-1",            cat: "Demo · Electronics", price: 29.9, stock: 31, icon: "🔌", desc: "", notes: "", order: 2, images: "" },
    { id: 1045, name: "Storage Organizer",           cat: "Demo · For Home",    price: 12.5, stock: 0,  icon: "🧺", desc: "", notes: "", order: 3, images: "" },
    { id: 1046, name: "Nothing Phone 4a",            cat: "Demo · Mobile",      price: 599,  stock: 5,  icon: "📱", desc: "", notes: "", order: 4, images: "" },
    { id: 1047, name: "ThermoCup Steel",             cat: "Demo · For Home",    price: 18,   stock: 15, icon: "☕", desc: "", notes: "", order: 5, images: "" },
    { id: 1048, name: "Travel Backpack",             cat: "Demo · Sport & Outdoor", price: 42, stock: 12, icon: "🎒", desc: "", notes: "", order: 6, images: "" },
];

export const catalogExtras = [
    { id: 2011, name: "AirBeat Pro",         cat: "Demo · Electronics",       price: 69, stock: 18, icon: "🎧" },
    { id: 2012, name: "MiniSound Plus",      cat: "Demo · Electronics",       price: 44, stock: 9,  icon: "🔊" },
    { id: 2013, name: "Ceramic Table Set",   cat: "Demo · For Home",          price: 32, stock: 7,  icon: "🍵" },
    { id: 2014, name: "Active Daypack",      cat: "Demo · Sport & Outdoor",   price: 52, stock: 0,  icon: "🎒" },
    { id: 2015, name: "USB-C Fast Charger",  cat: "Demo · Electronics",       price: 19, stock: 42, icon: "🔋" },
];

export const initialOrders = [
    { id: 439, customer: "N. Abdykaimov", phone: "+996 555 010 180", email: "customer@example.com", total: 24150, status: "COMPLETED", date: "Oct 02, 2026",
        items: [["Nothing Phone 4a", 1, 599], ["AirBeat Wireless Headphones", 2, 49]] },
    { id: 438, customer: "A. Ismailova",  phone: "+996 700 112 233", email: "a.ismailova@example.com", total: 3490, status: "NEW", date: "Oct 01, 2026",
        items: [["MiniSound Speaker", 1, 34.9]] },
    { id: 437, customer: "D. Karimov",    phone: "+996 777 321 456", email: "d.karimov@example.com", total: 1190, status: "PROCESSING", date: "Sep 30, 2026",
        items: [["USB-C Hub 7-in-1", 2, 29.9]] },
];

export const initialCatrows = [
    { name: "Demo · Mobile",           type: "Root",  checked: true },
    { name: "Demo · Electronics",      type: "Root",  checked: true },
    { name: "Demo · Accessories",      type: "Child", checked: true },
    { name: "Demo · For Home",         type: "Root",  checked: true },
    { name: "Demo · Sport & Outdoor",  type: "Root",  checked: true },
];

export const productPhotoMap = {
    "AirBeat Wireless Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
    "MiniSound Speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
    "USB-C Hub 7-in-1": "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&auto=format&fit=crop",
    "Nothing Phone 4a": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
    "Travel Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
    "ThermoCup Steel": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop",
    "Storage Organizer": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop",
    "AirBeat Pro": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
    "MiniSound Plus": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
    "Ceramic Table Set": "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=500&auto=format&fit=crop",
    "Active Daypack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
    "USB-C Fast Charger": "https://images.unsplash.com/photo-1591290619762-c588b5b4a8e4?w=500&auto=format&fit=crop",
};

export const ICONS = {
    headphones: '<path d="M10 29v-5a14 14 0 0 1 28 0v5"/><rect x="8" y="27" width="8" height="13" rx="3.5" class="f"/><rect x="32" y="27" width="8" height="13" rx="3.5" class="f"/>',
    speaker:    '<rect x="14" y="7" width="20" height="34" rx="7" class="f"/><circle cx="24" cy="17" r="3"/><circle cx="24" cy="29" r="6.5"/>',
    hub:        '<rect x="7" y="17" width="34" height="15" rx="4.5" class="f"/><path d="M13 24h4M20 24h4M27 24h4M34 24h1"/><path d="M24 17v-6"/>',
    organizer:  '<rect x="8" y="14" width="32" height="25" rx="5" class="f"/><path d="M8 22h32"/><path d="M20 28h8"/>',
    phone:      '<rect x="14" y="6" width="20" height="36" rx="5.5" class="f"/><path d="M21 11h6"/><circle cx="24" cy="36" r="1.2"/>',
    cup:        '<path d="M12 14h20v18a7 7 0 0 1-7 7h-6a7 7 0 0 1-7-7z" class="f"/><path d="M32 18h2.5a4.5 4.5 0 0 1 0 9H32"/><path d="M18 8v2M24 7v3"/>',
    backpack:   '<path d="M20 14v-2a4 4 0 0 1 8 0v2"/><rect x="11" y="14" width="26" height="26" rx="9" class="f"/><rect x="17" y="27" width="14" height="9" rx="3"/>',
    charger:    '<rect x="13" y="12" width="22" height="18" rx="5" class="f"/><path d="M19 12V6M29 12V6"/><path d="M24 30v5a5 5 0 0 0 5 5h4"/>',
    plates:     '<circle cx="24" cy="24" r="15" class="f"/><circle cx="24" cy="24" r="8.5"/>',
    box:        '<rect x="9" y="9" width="30" height="30" rx="8" class="f"/><path d="M16 29l6-7 4 4 3-3 4 6"/>',
};