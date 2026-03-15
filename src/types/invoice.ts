export interface ProductLine {
  productId: string;
  description: string;
  packSize: string;
  unitTp: number;
  vatRate: number;
  quantity: number;
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