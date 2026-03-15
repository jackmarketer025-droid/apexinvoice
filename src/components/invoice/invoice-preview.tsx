"use client"

import React from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateLineTotals, formatCurrency, numberToWords } from '@/lib/invoice-utils';
import { cn } from '@/lib/utils';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const totals = data.productLines.reduce((acc, line) => {
    const { totalTp, totalVat } = calculateLineTotals(line);
    return {
      tp: acc.tp + totalTp,
      vat: acc.vat + totalVat,
    };
  }, { tp: 0, vat: 0 });

  const totalAmount = totals.tp + totals.vat;
  const discountAmount = totals.tp * (data.discountRate / 100);
  const netPayable = totalAmount - discountAmount;

  return (
    <div className="invoice-a4 font-body text-[10px] leading-tight text-gray-800" id="print-area">
      {/* 1. Header Section */}
      <div className="flex justify-between items-start mb-2">
        <div className="w-1/4">
          <h1 className="text-4xl font-black text-primary italic tracking-tighter">Apex<span className="text-xs align-top font-normal">™</span></h1>
          <p className="text-[7.5px] font-bold text-gray-500 -mt-1 uppercase">A Seed Marine Flake Enterprise</p>
        </div>
        <div className="w-2/4 text-center">
          <h2 className="text-3xl font-extrabold text-primary">Apex Pharma Ltd.</h2>
          <p className="text-[9px]">House # 06, Road # 137, Block # SE(D) Gulshan-1, Dhaka-1212, Bangladesh.</p>
          <p className="text-[9px]">Tel: +88(02)55044834-37, Fax: 880-2-55044839</p>
        </div>
        <div className="w-1/4 text-right font-semibold text-gray-600 leading-[1.1]">
          <p>Customer Copy</p>
          <p>Customer Copy</p>
        </div>
      </div>

      {/* 2. Invoice Label Area */}
      <div className="relative text-center mb-6">
        <p className="text-[8px] text-blue-800 italic mb-1">Plot No - 19, Block - 1, Sadar, Dinajpur. Mobile No: 01755573378</p>
        <div className="inline-block bg-primary text-white px-10 py-0.5 rounded-full font-bold uppercase text-sm tracking-widest shadow-sm relative z-10">
          INVOICE
        </div>
        <div className="absolute top-7 left-0 w-full h-[1px] bg-primary opacity-40"></div>
      </div>

      {/* 3. Info Grid */}
      <div className="grid grid-cols-3 gap-8 mb-4 px-1">
        <div className="space-y-0.5">
          <p><span className="w-14 inline-block">Cust ID</span>: {data.customer.customerId}</p>
          <p className="font-bold"><span className="w-14 inline-block">Name</span>: {data.customer.name}</p>
          <p><span className="w-14 inline-block text-gray-600">Address</span>: {data.customer.address}</p>
          <p><span className="w-14 inline-block">Phone</span>: {data.customer.phone}</p>
          <p className="font-bold"><span className="w-14 inline-block">Route</span>: {data.customer.route}</p>
        </div>
        <div className="space-y-0.5 border-l border-gray-100 pl-4">
          <p><span className="w-16 inline-block">Depot</span>: {data.mpo.depot}</p>
          <p><span className="w-16 inline-block">MPO ID</span>: {data.mpo.mpoId}</p>
          <p className="font-bold"><span className="w-16 inline-block">Name</span>: {data.mpo.name}</p>
          <p><span className="w-16 inline-block text-gray-600">Summary</span>: {data.mpo.summary}</p>
          <p><span className="w-16 inline-block">Sum Date</span>: {data.mpo.sumDate}</p>
        </div>
        <div className="space-y-0.5 border-l border-gray-100 pl-4 text-right">
          <p><span className="w-24 inline-block text-left">Category</span>: {data.header.category}</p>
          <p className="font-bold"><span className="w-24 inline-block text-left">Invoice No</span>: {data.header.invoiceNo}</p>
          <p><span className="w-24 inline-block text-left">Invoice Date</span>: {data.header.invoiceDate}</p>
          <p><span className="w-24 inline-block text-left">Order Book No</span>: {data.header.orderBookNo}</p>
          <p><span className="w-24 inline-block text-left text-gray-600">Delivery Date</span>: {data.header.deliveryDate}</p>
        </div>
      </div>

      {/* 4. Table Section */}
      <table className="w-full text-[9px] border-collapse mb-1">
        <thead>
          <tr className="border-y border-gray-400 font-bold text-center">
            <th className="p-1 text-left border-r w-[60px]">P Id</th>
            <th className="p-1 text-left border-r w-[180px]">Description</th>
            <th className="p-1 border-r">Pack Size</th>
            <th className="p-1 border-r">Unit TP</th>
            <th className="p-1 border-r">VAT Rate%</th>
            <th className="p-1 border-r">Unit VAT</th>
            <th className="p-1 border-r">Unit Dis</th>
            <th className="p-1 border-r">QTY</th>
            <th className="p-1 border-r">Total TP</th>
            <th className="p-1 border-r">Total VAT</th>
            <th className="p-1">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {data.productLines.map((line, idx) => {
            const { totalTp, totalVat, totalPrice, unitVat } = calculateLineTotals(line);
            return (
              <tr key={idx} className="border-b border-gray-100 text-center align-middle">
                <td className="p-1 text-left">{line.productId}</td>
                <td className="p-1 text-left font-semibold">{line.description}</td>
                <td className="p-1">{line.packSize}</td>
                <td className="p-1">{formatCurrency(line.unitTp)}</td>
                <td className="p-1">{line.vatRate}</td>
                <td className="p-1">{formatCurrency(unitVat)}</td>
                <td className="p-1">-</td>
                <td className="p-1 font-bold">{line.quantity}</td>
                <td className="p-1 text-right">{formatCurrency(totalTp)}</td>
                <td className="p-1 text-right">{formatCurrency(totalVat)}</td>
                <td className="p-1 text-right font-bold">{formatCurrency(totalPrice)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 5. Summary & Totals */}
      <div className="flex justify-end mb-4">
        <div className="w-72 text-[9px]">
          <div className="flex justify-between border-b py-0.5">
            <span className="font-bold uppercase">Total Amount :</span>
            <span className="font-bold underline underline-offset-2">{formatCurrency(totalAmount)}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="font-semibold text-gray-700">Discount On TP ({data.discountRate}%) :</span>
            <span>{formatCurrency(discountAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-[11px] bg-gray-50 p-1">
            <span>Net Payable Amount :</span>
            <span>{formatCurrency(netPayable)}</span>
          </div>
        </div>
      </div>

      {/* 6. In Words & Note */}
      <div className="mb-12">
        <p className="font-bold uppercase text-[9px]">In Word: {numberToWords(netPayable)}</p>
        <p className="font-bold text-[10px] mt-2 border-l-4 border-primary pl-2 py-1 bg-red-50">
          বিশেষ দ্রষ্টব্য: আপনার স্বাক্ষরিত রিসিভ ইনভয়েস ব্যতীত কাউকে টাকা/ঔষধ প্রদান করবেন না।
        </p>
      </div>

      {/* 7. Footer Signatures */}
      <div className="grid grid-cols-5 gap-4 mt-20 text-[8px] relative">
        <div className="border-t border-black pt-1 text-center">
           <p className="font-bold uppercase">Prepared By</p>
           <p className="mt-1">razzak</p>
        </div>
        <div className="border-t border-black pt-1 text-center">
           <p className="font-bold uppercase">Authorised By</p>
           <p className="mt-1">Date: .................</p>
        </div>
        <div className="border-t border-black pt-1 text-center">
           <p className="font-bold uppercase">Delivered By</p>
           <p className="mt-1 font-semibold uppercase">MAHEDY HASAN</p>
        </div>
        <div className="border-t border-black pt-1 text-center">
           <p className="font-bold uppercase">Collection by</p>
        </div>
        <div className="border-t border-black pt-1 text-center">
           <p className="font-bold uppercase">Customer's Signature</p>
        </div>

        <div className="absolute -bottom-8 right-0 text-right opacity-70">
           <p>{data.header.invoiceDate}</p>
           <p>{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* 8. Bottom Warranty Disclaimer */}
      <div className="mt-16 border-t border-gray-300 pt-2 text-[7.5px] text-gray-500 italic space-y-0.5">
        <p>Warranty: We do hereby give this warranty that products sold under this invoice do not contravene to any provisions of section 18 of the drugs act 1940.</p>
        <p>Note: Received the goods in full and good condition.</p>
      </div>
    </div>
  );
}