'use server';
/**
 * @fileOverview This file defines a Genkit flow for drafting an invoice based on a natural language description.
 *
 * - draftInvoice: A function that takes a natural language description and returns a structured invoice draft.
 * - DraftInvoiceInput: The input type for the draftInvoice function (a string description).
 * - DraftInvoiceOutput: The return type for the draftInvoice function (structured invoice data).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Define Input Schema
const DraftInvoiceInputSchema = z
  .string()
  .describe('A natural language description of the invoice to be drafted.');
export type DraftInvoiceInput = z.infer<typeof DraftInvoiceInputSchema>;

// 2. Define Output Schema
const ProductLineSchema = z.object({
  description: z.string().describe("The name and specific details of the product (e.g., \"Apocal-D Tablet (15's)\")."),
  packSize: z.string().optional().describe("The package size of the product (e.g., \"15's\")."),
  unitTp: z.number().describe('The Unit Trade Price (TP) of the product.'),
  vatRate: z.number().optional().describe('The VAT Rate in percentage (e.g., 17.4).'),
  quantity: z.number().int().positive().describe('The quantity of the product being purchased.'),
  productId: z.string().optional().describe('The product ID, if specified.'),
});

const DraftInvoiceOutputSchema = z.object({
  customer: z.object({
    customerId: z.string().optional().describe('The customer ID.'),
    name: z.string().optional().describe("The customer's name (e.g., \"PARVEZ PHARMACY\")."),
    address: z.string().optional().describe("The customer's address (e.g., \"NOSRATPUR\")."),
    phone: z.string().optional().describe("The customer's phone number."),
    route: z.string().optional().describe("The customer's sales route (e.g., \"BAZAR ROAD\")."),
  }).optional().describe('Details about the customer.'),

  mpo: z.object({
    depot: z.string().optional().describe('The depot name (e.g., "Dinajpur Depot").'),
    mpoId: z.string().optional().describe('The MPO ID.'),
    name: z.string().optional().describe("The MPO's name (e.g., \"KHAYRUL ISLAM\")."),
    summary: z.string().optional().describe('MPO summary/code.'),
    sumDate: z.string().optional().describe('MPO summary date in DD-MM-YYYY format.'),
  }).optional().describe('Details about the Medical Promotion Officer (MPO).'),

  invoice: z.object({
    category: z.string().optional().describe('The invoice category (e.g., "General").'),
    invoiceNo: z.string().optional().describe('The invoice number.'),
    invoiceDate: z.string().optional().describe('The invoice date in DD-MM-YYYY format.'),
    orderBookNo: z.string().optional().describe('The order book number.'),
    deliveryDate: z.string().optional().describe('The delivery date in DD-MM-YYYY format.'),
  }).optional().describe('General invoice details.'),

  productLines: z.array(ProductLineSchema).optional().describe('A list of product line items for the invoice.'),
}).describe('Structured data representing a draft invoice based on natural language input.');

export type DraftInvoiceOutput = z.infer<typeof DraftInvoiceOutputSchema>;

// 3. Define Prompt
const draftInvoicePrompt = ai.definePrompt({
  name: 'draftInvoicePrompt',
  input: { schema: DraftInvoiceInputSchema },
  output: { schema: DraftInvoiceOutputSchema },
  prompt: `You are an AI assistant tasked with drafting an invoice based on a natural language description.
Your goal is to extract all relevant information from the user's request and structure it into a JSON object according to the provided schema.

The invoice details typically include:
- Customer information (ID, Name, Address, Phone, Route)
- MPO (Medical Promotion Officer) information (Depot, MPO ID, Name, Summary, Summary Date)
- General invoice details (Category, Invoice Number, Invoice Date, Order Book Number, Delivery Date)
- A list of product line items, each with: Description, Pack Size, Unit Trade Price (TP), VAT Rate (as a percentage), Quantity, and optionally Product ID.

Dates should be extracted in DD-MM-YYYY format.
If a piece of information is not explicitly mentioned in the description, you should omit that field from the output JSON or provide an empty string/null if the schema allows it. Do NOT make up information.
Focus on extracting the numerical values for prices, VAT rates, and quantities.
For product lines, always try to extract 'description', 'unitTp', and 'quantity'. 'packSize', 'vatRate', and 'productId' are optional.

Natural language invoice description: {{{this}}}`,
});

// 4. Define Flow
const draftInvoiceFlow = ai.defineFlow(
  {
    name: 'draftInvoiceFlow',
    inputSchema: DraftInvoiceInputSchema,
    outputSchema: DraftInvoiceOutputSchema,
  },
  async (input) => {
    const {output} = await draftInvoicePrompt(input);
    return output!;
  }
);

export async function draftInvoice(input: DraftInvoiceInput): Promise<DraftInvoiceOutput> {
  return draftInvoiceFlow(input);
}
