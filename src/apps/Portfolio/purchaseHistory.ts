export interface PurchaseRecord {
  date: Date
  shares: number
  price: number
}

const createPurchaseDate = (year: number, month: number, day: number) => new Date(year, month - 1, day)

export const purchaseHistory: PurchaseRecord[] = [
  { date: createPurchaseDate(2026, 6, 15), shares: 1.24651, price: 158.843797 },
  { date: createPurchaseDate(2026, 6, 5), shares: 1.26686, price: 157.08188 },
  { date: createPurchaseDate(2026, 5, 26), shares: 1.26458, price: 157.364439 },
  { date: createPurchaseDate(2026, 5, 15), shares: 1.29062, price: 154.189952 },
  { date: createPurchaseDate(2026, 5, 5), shares: 1.30426, price: 151.81001 },
  { date: createPurchaseDate(2026, 4, 27), shares: 1.32279, price: 150.439605 },
  { date: createPurchaseDate(2026, 4, 15), shares: 1.3373, price: 148.059644 },
  { date: createPurchaseDate(2026, 4, 6), shares: 1.4009, price: 139.910013 },
  { date: createPurchaseDate(2026, 3, 27), shares: 1, price: 135.36 },
  { date: createPurchaseDate(2026, 3, 25), shares: 1.40247, price: 139.753241 },
  { date: createPurchaseDate(2026, 3, 20), shares: 1, price: 137.41 },
  { date: createPurchaseDate(2026, 3, 16), shares: 1.38741, price: 141.270487 },
  { date: createPurchaseDate(2026, 3, 9), shares: 1, price: 139.75 },
  { date: createPurchaseDate(2026, 3, 6), shares: 1, price: 142.43 },
  { date: createPurchaseDate(2026, 3, 5), shares: 1.37359, price: 144.147559 },
  { date: createPurchaseDate(2026, 3, 3), shares: 1, price: 142.91 },
  { date: createPurchaseDate(2026, 2, 25), shares: 1.21921, price: 148.457253 },
  { date: createPurchaseDate(2026, 2, 17), shares: 1.24151, price: 145.79 },
  { date: createPurchaseDate(2026, 2, 9), shares: 1.22803, price: 146.575899 },
  { date: createPurchaseDate(2026, 1, 30), shares: 1, price: 146.13 },
  { date: createPurchaseDate(2026, 1, 14), shares: 1, price: 144.57 },
  { date: createPurchaseDate(2026, 1, 8), shares: 1, price: 143.42 },
  { date: createPurchaseDate(2026, 1, 5), shares: 1, price: 142.835 },
]
