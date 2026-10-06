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
  return filters;
}
