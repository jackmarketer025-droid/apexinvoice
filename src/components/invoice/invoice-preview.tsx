"use client"

import React, { useState, useEffect } from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateLineTotals, formatCurrency, numberToWords } from '@/lib/invoice-utils';
import Image from 'next/image';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }));
  }, []);

  const totals = data.productLines.reduce((acc, line) => {
    const { totalTp, totalVat, totalPrice, totalUnitDis } = calculateLineTotals(line);
    return {
      totalTp: acc.totalTp + totalTp,
      totalVat: acc.totalVat + totalVat,
      totalPrice: acc.totalPrice + totalPrice,
      specialDis: acc.specialDis + (Number(line.specialDis) || 0)
    };
  }, { totalTp: 0, totalVat: 0, totalPrice: 0, specialDis: 0 });

  return (
    <div className="invoice-a4 font-body text-[11px] leading-tight text-gray-900 flex flex-col min-h-[297mm] bg-white relative shadow-2xl" id="print-area">
      {/* Header Section */}
      <div className="flex justify-between items-start pt-4 px-4">
        <div className="w-1/4">
          <Image 
            src="https://res.cloudinary.com/dd3eekw7h/image/upload/v1773604830/Apex_logo_p5tupb.png" 
            alt="Apex Logo" 
            width={140} 
            height={45}
            className="object-contain"
            priority
          />
          <p className="text-[9px] font-bold text-gray-900 uppercase tracking-tighter leading-none mt-2">A SEED MARINE FLAKE ENTERPRISE</p>
        </div>
        <div className="w-2/4 text-center">
          <h2 className="text-[32px] font-black text-[#E31E24] whitespace-nowrap leading-none mb-1 uppercase">Apex Pharma Ltd.</h2>
          <p className="text-[11px] font-medium">House # 06, Road # 137, Block # SE(D) Gulshan-1, Dhaka-1212, Bangladesh.</p>
          <p className="text-[11px] font-medium">Tel: +88(02)55044834-37, Fax: 880-2-55044839</p>
        </div>
        <div className="w-1/4 text-right pt-1 font-bold">
          <p className="text-[11px] uppercase">Customer Copy</p>
        </div>
      </div>

      {/* Invoice Box */}
      <div className="relative text-center mt-4 mb-8">
        <p className="text-[11px] font-medium italic mb-2">Plot No - 19, Block - 1, Sadar, Dinajpur. Mobile No: 01755573378</p>
        <div className="inline-block bg-[#E31E24] text-white px-12 py-1.5 rounded-full font-black uppercase text-[14px] tracking-widest shadow-sm">
          INVOICE
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-8 mb-6 px-4 border-b border-gray-200 pb-4">
        <div className="space-y-1">
          <p><span className="w-20 inline-block">Cust ID</span>: {data.customer.customerId}</p>
          <p className="font-bold"><span className="w-20 inline-block">Name</span>: {data.customer.name}</p>
          <p><span className="w-20 inline-block">Address</span>: {data.customer.address}</p>
          <p><span className="w-20 inline-block">Phone</span>: {data.customer.phone}</p>
          <p className="font-bold"><span className="w-20 inline-block">Route</span>: {data.customer.route}</p>
        </div>
        <div className="space-y-1">
          <p><span className="w-20 inline-block">Depot</span>: {data.mpo.depot}</p>
          <p><span className="w-20 inline-block">MPO ID</span>: {data.mpo.mpoId}</p>
          <p className="font-bold"><span className="w-20 inline-block">Name</span>: {data.mpo.name}</p>
          <p><span className="w-20 inline-block">Summary</span>: {data.mpo.summary}</p>
          <p><span className="w-20 inline-block">Sum Date</span>: {data.mpo.sumDate}</p>
        </div>
        <div className="space-y-1 text-right">
          <p><span className="inline-block w-24 text-left">Category</span>: {data.header.category}</p>
          <p><span className="inline-block w-24 text-left">Invoice No.</span>: {data.header.invoiceNo}</p>
          <p><span className="inline-block w-24 text-left">Invoice Date</span>: {data.header.invoiceDate}</p>
          <p><span className="inline-block w-24 text-left">Order Book No.</span>: {data.header.orderBookNo}</p>
          <p><span className="inline-block w-24 text-left">Delivery Date</span>: {data.header.deliveryDate}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-2 flex-grow">
        <table className="w-full text-[10.5px] border-collapse table-fixed">
          <thead>
            <tr className="border-y-2 border-gray-900 font-black bg-gray-50 text-[10px] uppercase">
              <th className="p-1.5 text-left w-[6%]">P Id</th>
              <th className="p-1.5 text-left w-[18%]">Description</th>
              <th className="p-1.5 text-center w-[8%]">Pack Size</th>
              <th className="p-1.5 text-center w-[7%]">Unit TP</th>
              <th className="p-1.5 text-center w-[7%]">VAT Rate%</th>
              <th className="p-1.5 text-center w-[7%]">Unit VAT</th>
              <th className="p-1.5 text-center w-[7%]">Unit Dis</th>
              <th className="p-1.5 text-center w-[5%]">QTY</th>
              <th className="p-1.5 text-center w-[5%]">Bonus</th>
              <th className="p-1.5 text-center w-[8%]">Total TP</th>
              <th className="p-1.5 text-center w-[8%]">Total VAT</th>
              <th className="p-1.5 text-center w-[7%]">Spec. Dis</th>
              <th className="p-1.5 text-right w-[9%]">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.productLines.map((line, idx) => {
              const { unitVat, totalTp, totalVat, totalPrice } = calculateLineTotals(line);
              return (
                <tr key={idx} className="border-b border-gray-100 align-top hover:bg-gray-50/50">
                  <td className="p-1.5">{line.productId}</td>
                  <td className="p-1.5 font-bold text-gray-800">{line.description}</td>
                  <td className="p-1.5 text-center">{line.packSize}</td>
                  <td className="p-1.5 text-center">{formatCurrency(line.unitTp)}</td>
                  <td className="p-1.5 text-center">{line.vatRate}</td>
                  <td className="p-1.5 text-center">{formatCurrency(unitVat)}</td>
                  <td className="p-1.5 text-center">{formatCurrency(line.unitDis)}</td>
                  <td className="p-1.5 text-center font-bold">{line.quantity}</td>
                  <td className="p-1.5 text-center">{line.bonus || 0}</td>
                  <td className="p-1.5 text-center">{formatCurrency(totalTp)}</td>
                  <td className="p-1.5 text-center">{formatCurrency(totalVat)}</td>
                  <td className="p-1.5 text-center">{formatCurrency(line.specialDis)}</td>
                  <td className="p-1.5 text-right font-black text-black">{formatCurrency(totalPrice)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-900 font-black bg-gray-100 text-[12px]">
              <td colSpan={9} className="p-2 text-left uppercase">Total Amount :</td>
              <td className="p-2 text-center">{formatCurrency(totals.totalTp)}</td>
              <td className="p-2 text-center">{formatCurrency(totals.totalVat)}</td>
              <td className="p-2 text-center">{formatCurrency(totals.specialDis)}</td>
              <td className="p-2 text-right text-[13px] text-primary">{formatCurrency(totals.totalPrice)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Note and Discount Area */}
        <div className="mt-6 px-4 space-y-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-black text-[12px] uppercase">Note :</p>
              <p className="text-[12px] font-bold uppercase tracking-tight">FIFTY BRAND OFFER, PAYMENT OPTION: CASH/CHEQUE</p>
            </div>
            <div className="w-72 space-y-2">
              <div className="flex justify-between border-b-2 border-gray-300 pb-1.5">
                <span className="font-black uppercase">Discount On TP :</span>
                <span className="font-bold">0 %</span>
                <span className="font-bold">0.00</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-black text-[14px] uppercase">Net Payable Amount</span>
                <span className="font-black text-[18px] border-[3px] border-black px-4 py-1 bg-white shadow-sm">
                  {Math.round(totals.totalPrice).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* In Words */}
        <div className="mt-6 px-4">
          <p className="font-black uppercase text-[12px] bg-gray-50 p-2 border border-gray-200 inline-block rounded">
            IN WORD: {numberToWords(totals.totalPrice)}
          </p>
        </div>

        {/* Bengali Special Note */}
        <div className="mt-8 px-4">
          <p className="font-black text-[14px] py-2 border-y-2 border-gray-300 bg-gray-50 text-center italic text-primary">
            বিশেষ দ্রষ্টব্য : আপনার স্বাক্ষরিত রিসিভ ইনভয়েস ব্যতীত কাউকে টাকা / ঔষধ প্রদান করবেন না।
          </p>
        </div>
      </div>

      {/* Footer Area - Signatures */}
      <div className="mt-auto px-4 pb-8">
        <div className="flex justify-between items-end mb-10 pt-16">
          <div className="grid grid-cols-5 gap-4 flex-1 text-[12px] text-center font-black uppercase">
            <div className="flex flex-col">
              <div className="border-t-2 border-black pt-2">Prepared By</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t-2 border-black pt-2">Authorised by</div>
              <div className="text-[10px] font-bold mt-1">Date:....................</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t-2 border-black pt-2">Delivered by</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t-2 border-black pt-2">Collection by</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t-2 border-black pt-2">Customer's Signature</div>
            </div>
          </div>
        </div>

        {/* Final Warranty Section */}
        <div className="border-t-[3px] border-black pt-3 space-y-2">
          <p className="text-[12.5px] leading-snug font-bold">
            <span className="font-black uppercase">Warranty :</span> We do hereby give this warranty that products sold under this invoice do not contravene to any provisions of section 18 of the drugs act 1940
          </p>
          <p className="text-[12.5px] leading-snug font-bold">
            <span className="font-black uppercase">Note :</span> Received the goods in full and good condition.
          </p>
        </div>
      </div>
    </div>
  );
}
