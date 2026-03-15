"use client"

import React, { useState, useEffect } from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateLineTotals, formatCurrency, numberToWords } from '@/lib/invoice-utils';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    // Prevent Hydration error by setting dynamic time after mount
    setCurrentTime(new Date().toLocaleString());
  }, []);

  const totalAmount = data.productLines.reduce((acc, line) => {
    const { totalPrice } = calculateLineTotals(line);
    return acc + totalPrice;
  }, 0);

  const netPayable = totalAmount;

  return (
    <div className="invoice-a4 font-body text-[10px] leading-tight text-gray-800 flex flex-col min-h-[297mm] bg-white relative shadow-2xl" id="print-area">
      {/* Top Content Area */}
      <div className="flex-grow p-10 print:p-5">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-2">
          <div className="w-1/4">
            <h1 className="text-4xl font-black text-primary italic tracking-tighter leading-none">Apex<span className="text-xs align-top font-normal">™</span></h1>
            <p className="text-[7.5px] font-bold text-gray-500 uppercase">A Seed Marine Flake Enterprise</p>
          </div>
          <div className="w-2/4 text-center">
            <h2 className="text-3xl font-extrabold text-primary">Apex Pharma Ltd.</h2>
            <p className="text-[9px]">House # 06, Road # 137, Block # SE(D) Gulshan-1, Dhaka-1212, Bangladesh.</p>
            <p className="text-[9px]">Tel: +88(02)55044834-37, Fax: 880-2-55044839</p>
          </div>
          <div className="w-1/4 text-right font-semibold text-gray-600">
            <p>Customer Copy</p>
            <p>Customer Copy</p>
          </div>
        </div>

        {/* Invoice Label Area */}
        <div className="relative text-center mb-6">
          <p className="text-[8px] text-blue-800 italic mb-1">Plot No - 19, Block - 1, Sadar, Dinajpur. Mobile No: 01755573378</p>
          <div className="inline-block bg-primary text-white px-10 py-0.5 rounded-full font-bold uppercase text-sm tracking-widest shadow-sm relative z-10">
            INVOICE
          </div>
          <div className="absolute top-7 left-0 w-full h-[1px] bg-primary opacity-40"></div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-6 mb-4 px-1 border-b border-gray-100 pb-2">
          <div className="space-y-0.5">
            <p><span className="w-14 inline-block">Cust ID</span>: {data.customer.customerId}</p>
            <p className="font-bold"><span className="w-14 inline-block">Name</span>: {data.customer.name}</p>
            <p><span className="w-14 inline-block">Address</span>: {data.customer.address}</p>
            <p className="font-bold"><span className="w-14 inline-block">Route</span>: {data.customer.route}</p>
          </div>
          <div className="space-y-0.5">
            <p><span className="w-16 inline-block">Depot</span>: {data.mpo.depot}</p>
            <p><span className="w-16 inline-block">MPO ID</span>: {data.mpo.mpoId}</p>
            <p className="font-bold"><span className="w-16 inline-block">Name</span>: {data.mpo.name}</p>
          </div>
          <div className="space-y-0.5 text-right">
            <p>Invoice No : {data.header.invoiceNo}</p>
            <p>Invoice Date : {data.header.invoiceDate}</p>
            <p>Delivery Date : {data.header.deliveryDate}</p>
          </div>
        </div>

        {/* Table Section */}
        <table className="w-full text-[9px] border-collapse mb-1">
          <thead>
            <tr className="border-y border-gray-400 font-bold bg-gray-50">
              <th className="p-1 text-left border-r w-16">P Id</th>
              <th className="p-1 text-left border-r">Description</th>
              <th className="p-1 border-r text-center">Pack Size</th>
              <th className="p-1 border-r text-center">Unit TP+VAT</th>
              <th className="p-1 border-r w-14 text-center">QTY</th>
              <th className="p-1 text-right">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.productLines.map((line, idx) => {
              const { totalPrice } = calculateLineTotals(line);
              return (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="p-1">{line.productId}</td>
                  <td className="p-1 font-semibold">{line.description}</td>
                  <td className="p-1 text-center">{line.packSize}</td>
                  <td className="p-1 text-center">{formatCurrency(line.unitTpVat)}</td>
                  <td className="p-1 text-center">{line.quantity}</td>
                  <td className="p-1 text-right font-bold">{formatCurrency(totalPrice)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Summary Area */}
        <div className="flex justify-end mt-4">
          <div className="w-64">
            <div className="flex justify-between font-bold text-sm border-t-2 border-black pt-1">
              <span>Net Payable Amount:</span>
              <span>{formatCurrency(netPayable)}</span>
            </div>
          </div>
        </div>

        {/* In Words */}
        <p className="font-bold uppercase text-[9px] mt-2">In Word: {numberToWords(netPayable)}</p>

        {/* Note Area */}
        <div className="mt-8">
          <p className="font-bold text-[10px] border-l-4 border-primary pl-2 py-1 bg-red-50 italic">
            বিশেষ দ্রষ্টব্য: আপনার স্বাক্ষরিত রিসিভ ইনভয়েস ব্যতীত কাউকে টাকা/ঔষধ প্রদান করবেন না।
          </p>
        </div>
      </div>

      {/* Footer Section - Fixed at the very bottom of A4 */}
      <div className="mt-auto p-10 pt-0 print:p-5">
        {/* Signature Area */}
        <div className="grid grid-cols-5 gap-4 text-[8px] text-center uppercase font-bold mb-10 mt-10">
          <div className="border-t border-black pt-1">Prepared By</div>
          <div className="border-t border-black pt-1">Authorised By</div>
          <div className="border-t border-black pt-1">Delivered By</div>
          <div className="border-t border-black pt-1">Collection By</div>
          <div className="border-t border-black pt-1">Customer Signature</div>
        </div>

        {/* Final Disclaimer */}
        <div className="border-t pt-2 text-[7.5px] text-gray-400 italic flex justify-between">
          <p>Warranty: This product complies with section 18 of the Drugs Act 1940. Received the goods in full and good condition.</p>
          <p>Print Time: {currentTime || '--:--:--'}</p>
        </div>
      </div>
    </div>
  );
}
