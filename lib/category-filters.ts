import type { CategoryFilterField } from "./api/categories";

const ELECTRONICS_BRANDS: Record<string, string[]> = {
  phones: ["Samsung", "Apple", "Tecno", "Infinix", "Oppo", "Xiaomi", "Itel", "Vivo", "Realme", "Nokia", "Huawei", "Honor", "OnePlus", "Google", "Sony", "Motorola", "Nothing", "ZTE", "HMD"],
  "laptops-tablets": ["HP", "Lenovo", "Dell", "Apple", "Asus", "Acer", "Microsoft", "Huawei", "MSI", "Samsung", "Toshiba", "Razer"],
  tablets: ["Apple", "Samsung", "Lenovo", "Huawei", "Xiaomi", "Microsoft", "Amazon", "Nokia", "Tecno", "Infinix"],
  tvs: ["Samsung", "LG", "Hisense", "TCL", "Sony", "Skyworth", "Vitron", "Vision Plus", "Bruhm", "Haier", "Philips"],
  audio: ["JBL", "Sony", "Samsung", "LG", "Bose", "Harman Kardon", "Oraimo", "Anker", "Marshall", "Philips"],
  wearables: ["Apple", "Samsung", "Xiaomi", "Huawei", "Garmin", "Fitbit", "Amazfit", "Haylou", "Oraimo"],
  cameras: ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic", "GoPro", "DJI", "Insta360"],
  "solar-power-backup": ["Deye", "Victron", "Felicity Solar", "Must", "Growatt", "Sako", "SolarMax"],
  "printers-scanners": ["HP", "Canon", "Epson", "Brother", "Ricoh", "Kyocera", "Xerox", "Pantum"],
  "computer-components": ["Intel", "AMD", "NVIDIA", "Asus", "Gigabyte", "MSI", "Corsair", "Kingston", "Crucial", "Samsung", "Western Digital", "Seagate"],
  networking: ["TP-Link", "Tenda", "Huawei", "ZTE", "D-Link", "MikroTik", "Cisco", "Ubiquiti"],
  gaming: ["Sony", "Microsoft", "Nintendo", "Valve", "Meta", "Razer", "Logitech", "Thrustmaster"],
  accessories: ["Apple", "Samsung", "Anker", "Oraimo", "Baseus", "UGREEN", "Xiaomi", "JBL", "Logitech", "Belkin"],
};

const AUTOMOBILE_MAKES: Record<string, string[]> = {
  cars: ["Toyota", "Nissan", "Subaru", "Mazda", "Honda", "Suzuki", "Mitsubishi", "Isuzu", "Mercedes-Benz", "BMW", "Volkswagen", "Hyundai", "Kia", "Ford", "Land Rover", "Lexus", "Peugeot", "Volvo", "Audi", "Jeep"],
  "motorcycles-and-boda-bodas": ["Bajaj", "TVS", "Honda", "Yamaha", "Suzuki", "Haojue", "Kibo"],
  pickups: ["Toyota", "Isuzu", "Ford", "Nissan", "Mitsubishi", "Mazda", "Volkswagen"],
  "buses-and-matatus": ["Isuzu", "Toyota", "Nissan", "Mercedes-Benz", "Scania", "Volvo", "Hino", "Ashok Leyland"],
  trucks: ["Isuzu", "Hino", "Mitsubishi Fuso", "Mercedes-Benz", "Volvo", "Scania", "MAN", "UD Trucks", "Tata", "Sinotruk"],
  vans: ["Toyota", "Nissan", "Mercedes-Benz", "Volkswagen", "Ford", "Hyundai", "Kia", "Renault"],
  "tuk-tuks-and-three-wheelers": ["Bajaj", "TVS", "Piaggio", "Dayun"],
  "agricultural-vehicles": ["Massey Ferguson", "New Holland", "John Deere", "Kubota", "Mahindra", "Case IH", "Deutz-Fahr"],
};

const CATEGORY_OPTIONS: Record<string, Record<string, string[]>> = {
  gaming: {
    consoles: ["Sony", "Microsoft", "Nintendo", "Valve"],
    controllers: ["Sony", "Microsoft", "Nintendo", "Logitech", "Razer", "Thrustmaster"],
    "pc-gaming": ["Asus", "MSI", "Lenovo", "HP", "Dell", "Acer", "Razer", "Logitech"],
    accessories: ["Sony", "Microsoft", "Nintendo", "Razer", "Logitech", "Thrustmaster"],
  },
  "home & furniture": {
    "living-room": ["Ashley", "IKEA", "Midas", "Rochester", "Kifaru"],
    "beds & mattresses": ["Slumberland", "Dr. Mattress", "Silentnight", "Midas", "Sealy"],
    appliances: ["Ramtons", "Von Hotpoint", "Bruhm", "LG", "Samsung", "Hisense", "Hotpoint", "Bosch", "Philips", "Kenwood", "Mika"],
    "office-furniture": ["IKEA", "Rochester", "Duraco", "Kifaru"],
    "outdoor & garden": ["IKEA", "Keter", "Midas"],
  },
  fashion: {
    "men-s-clothing": ["Nike", "Adidas", "Puma", "Levi's", "H&M", "Tommy Hilfiger", "Louis Vuitton"],
    "women-s-clothing": ["Nike", "Adidas", "Puma", "H&M", "Zara", "Levi's", "Louis Vuitton"],
    "kids-clothing": ["Nike", "Adidas", "Puma", "H&M", "Carter's", "Mothercare"],
    shoes: ["Nike", "Adidas", "Puma", "New Balance", "Skechers", "Timberland", "Clarks"],
    "bags-accessories": ["Michael Kors", "Coach", "Nike", "Adidas", "Puma", "Louis Vuitton"],
  },
  agriculture: {
    "farm-equipment": ["John Deere", "Massey Ferguson", "New Holland", "Kubota", "Mahindra", "Honda", "Stihl"],
    "farm-tools": ["DeWalt", "Bosch", "Makita", "Stanley", "Black+Decker", "Total"],
    "fertilizers-agrochemicals": ["Yara", "MEA Fertilizers", "Amiran", "Osho Chemical", "Syngenta", "Bayer"],
  },
  "beauty & personal care": {
    skincare: ["Nivea", "Neutrogena", "CeraVe", "Vaseline", "Garnier", "The Ordinary", "Dove"],
    haircare: ["Dove", "L'Oreal", "Pantene", "Tresemme", "Cantu", "Dark & Lovely", "Motions"],
    makeup: ["Maybelline", "L'Oreal", "MAC", "Revlon", "NYX", "Fenty Beauty", "Huda Beauty"],
    fragrances: ["Hugo Boss", "Calvin Klein", "Davidoff", "Lattafa", "Armaf", "Jovan", "Chanel"],
    "men-s-grooming": ["Gillette", "Nivea Men", "Dove Men+Care", "Old Spice", "Beard Gang", "Philips"],
  },
  construction: {
    "hand-power-tools": ["Bosch", "Makita", "DeWalt", "Stanley", "Black+Decker", "Total"],
    "heavy-machinery": ["Caterpillar", "JCB", "Komatsu", "Volvo", "Hitachi"],
    "plumbing-electrical": ["Schneider Electric", "ABB", "Legrand", "MK", "Davis & Shirtliff"],
    "paint-hardware": ["Crown Paints", "Bralo", "Basco", "Sadolin", "Dulux", "Plascon"],
  },
  "sports & fitness": {
    "fitness-equipment": ["Adidas", "Nike", "Reebok", "Decathlon", "York", "Everlast"],
    cycling: ["Giant", "Trek", "Scott", "Specialized", "Cannondale", "Bianchi"],
    sportswear: ["Nike", "Adidas", "Puma", "Under Armour", "Reebok", "New Balance"],
    "outdoor-camping": ["Coleman", "Quechua", "The North Face", "Decathlon", "Kilimanjaro"],
  },
  "music & instruments": {
    guitars: ["Yamaha", "Fender", "Gibson", "Ibanez", "Epiphone", "Cort"],
    "keyboards-pianos": ["Yamaha", "Casio", "Roland", "Korg", "Kawai"],
    "drums-percussion": ["Yamaha", "Pearl", "Tama", "Ludwig", "Mapex"],
    "dj-studio-equipment": ["Pioneer DJ", "Behringer", "Numark", "Focusrite", "M-Audio", "Shure"],
    accessories: ["Yamaha", "Fender", "Gibson", "Roland", "Shure", "Behringer"],
  },
  "pets & animals": {
    "pet-food": ["Royal Canin", "Purina", "Pedigree", "Whiskas", "Hills", "Drools"],
    "pet-supplies-accessories": ["Royal Canin", "Kong", "Trixie", "Whiskas", "Pedigree"],
  },
  "books & education": {
    "stationery-supplies": ["Pilot", "Bic", "Staedtler", "Faber-Castell", "HP", "Paper Mate"],
  },
};

function withCuratedOptions(filters: CategoryFilterField[], options: string[] | undefined, fieldNames: string[]) {
  if (!options?.length) return filters;
  return filters.map((field) => fieldNames.includes(field.field_name.toLowerCase())
    ? { ...field, field_type: "select", options }
    : field);
}

export function filtersForSubcategory(category: string, slug: string, filters: CategoryFilterField[]) {
  const normalizedCategory = category.toLowerCase();
  if (normalizedCategory === "electronics") {
    return withCuratedOptions(filters, ELECTRONICS_BRANDS[slug], ["brand"]);
  }
  if (normalizedCategory === "automobiles") {
    return withCuratedOptions(filters, AUTOMOBILE_MAKES[slug], ["make"]);
  }
  const categoryOptions = CATEGORY_OPTIONS[normalizedCategory]?.[slug];
  return withCuratedOptions(filters, categoryOptions, ["brand"]);
}
