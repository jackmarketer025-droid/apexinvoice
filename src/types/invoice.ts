export interface ProductLine {
  productId: string;
  description: string;
  packSize: string;
  unitTp: number;       // Unit Trade Price
  vatRate: number;      // VAT Rate in %
  unitDis: number;      // Unit Discount
  quantity: number;
  bonus: number;        // Bonus quantity
  specialDis: number;   // Special Discount (Total for the line)
}

export interface CustomerData {
  customerId: string;
  name: string;
  address: string;
  phone: string;
  route: string;
}

export interface MpoData {
  depot: string;
  mpoId: string;
  name: string;
  summary: string;
  sumDate: string;
}

export interface InvoiceHeaderData {
  category: string;
  invoiceNo: string;
  invoiceDate: string;
  orderBookNo: string;
  deliveryDate: string;
}

export interface InvoiceData {
  customer: CustomerData;
  mpo: MpoData;
  header: InvoiceHeaderData;
  productLines: ProductLine[];
  discountRate: number;
}
