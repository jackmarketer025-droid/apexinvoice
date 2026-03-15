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
      specialDis: acc.specialDis + line.specialDis
    };
  }, { totalTp: 0, totalVat: 0, totalPrice: 0, specialDis: 0 });

  return (
    <div className="invoice-a4 font-body text-[10.5px] leading-tight text-gray-900 flex flex-col min-h-[297mm] bg-white relative shadow-2xl" id="print-area">
      {/* Header Section */}
      <div className="flex justify-between items-start pt-2 px-2">
        <div className="w-1/4">
          <Image 
            src="https://res.cloudinary.com/dd3eekw7h/image/upload/v1773604830/Apex_logo_p5tupb.png" 
            alt="Apex Logo" 
            width={120} 
            height={40}
            className="object-contain"
            priority
          />
          <p className="text-[8px] font-bold text-gray-900 uppercase tracking-tighter leading-none mt-1">A SEED MARINE FLAKE ENTERPRISE</p>
        </div>
        <div className="w-2/4 text-center">
          <h2 className="text-[28px] font-black text-[#E31E24] whitespace-nowrap leading-none mb-1">Apex Pharma Ltd.</h2>
          <p className="text-[10px] font-medium">House # 06, Road # 137, Block # SE(D) Gulshan-1, Dhaka-1212, Bangladesh.</p>
          <p className="text-[10px] font-medium">Tel: +88(02)55044834-37, Fax: 880-2-55044839</p>
        </div>
        <div className="w-1/4 text-right pt-1 font-bold">
          <p className="text-[10px]">Customer Copy</p>
        </div>
      </div>

      {/* Invoice Box */}
      <div className="relative text-center mt-3 mb-6">
        <p className="text-[10px] font-medium italic mb-1.5">Plot No - 19, Block - 1, Sadar, Dinajpur. Mobile No: 01755573378</p>
        <div className="inline-block bg-[#E31E24] text-white px-10 py-1 rounded-full font-bold uppercase text-[12px] tracking-widest shadow-sm">
          INVOICE
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-6 mb-4 px-2 border-b border-gray-200 pb-3">
        <div className="space-y-0.5">
          <p><span className="w-16 inline-block">Cust ID</span>: {data.customer.customerId}</p>
          <p className="font-bold"><span className="w-16 inline-block">Name</span>: {data.customer.name}</p>
          <p><span className="w-16 inline-block">Address</span>: {data.customer.address}</p>
          <p><span className="w-16 inline-block">Phone</span>: {data.customer.phone}</p>
          <p className="font-bold"><span className="w-16 inline-block">Route</span>: {data.customer.route}</p>
        </div>
        <div className="space-y-0.5">
          <p><span className="w-18 inline-block">Depot</span>: {data.mpo.depot}</p>
          <p><span className="w-18 inline-block">MPO ID</span>: {data.mpo.mpoId}</p>
          <p className="font-bold"><span className="w-18 inline-block">Name</span>: {data.mpo.name}</p>
          <p><span className="w-18 inline-block">Summary</span>: {data.mpo.summary}</p>
          <p><span className="w-18 inline-block">Sum Date</span>: {data.mpo.sumDate}</p>
        </div>
        <div className="space-y-0.5 text-right">
          <p><span className="inline-block w-20 text-left">Category</span>: {data.header.category}</p>
          <p><span className="inline-block w-20 text-left">Invoice No.</span>: {data.header.invoiceNo}</p>
          <p><span className="inline-block w-20 text-left">Invoice Date</span>: {data.header.invoiceDate}</p>
          <p><span className="inline-block w-20 text-left">Order Book No.</span>: {data.header.orderBookNo}</p>
          <p><span className="inline-block w-20 text-left">Delivery Date</span>: {data.header.deliveryDate}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-1 flex-grow">
        <table className="w-full text-[10px] border-collapse table-fixed">
          <thead>
            <tr className="border-y border-gray-800 font-bold bg-white text-[9.5px]">
              <th className="p-1 text-left w-[6%]">P Id</th>
              <th className="p-1 text-left w-[20%]">Description</th>
              <th className="p-1 text-center w-[8%]">Pack Size</th>
              <th className="p-1 text-center w-[7%]">Unit TP</th>
              <th className="p-1 text-center w-[7%]">VAT Rate%</th>
              <th className="p-1 text-center w-[7%]">Unit VAT</th>
              <th className="p-1 text-center w-[7%]">Unit Dis</th>
              <th className="p-1 text-center w-[5%]">QTY</th>
              <th className="p-1 text-center w-[5%]">Bonus</th>
              <th className="p-1 text-center w-[8%]">Total TP</th>
              <th className="p-1 text-center w-[8%]">Total VAT</th>
              <th className="p-1 text-center w-[8%]">Special Dis</th>
              <th className="p-1 text-right w-[9%]">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.productLines.map((line, idx) => {
              const { unitVat, totalTp, totalVat, totalPrice } = calculateLineTotals(line);
              return (
                <tr key={idx} className="border-b border-gray-100 align-top">
                  <td className="p-1">{line.productId}</td>
                  <td className="p-1 font-semibold">{line.description}</td>
                  <td className="p-1 text-center">{line.packSize}</td>
                  <td className="p-1 text-center">{formatCurrency(line.unitTp)}</td>
                  <td className="p-1 text-center">{line.vatRate}</td>
                  <td className="p-1 text-center">{formatCurrency(unitVat)}</td>
                  <td className="p-1 text-center">{formatCurrency(line.unitDis)}</td>
                  <td className="p-1 text-center">{line.quantity}</td>
                  <td className="p-1 text-center">{line.bonus || 0}</td>
                  <td className="p-1 text-center">{formatCurrency(totalTp)}</td>
                  <td className="p-1 text-center">{formatCurrency(totalVat)}</td>
                  <td className="p-1 text-center">{formatCurrency(line.specialDis)}</td>
                  <td className="p-1 text-right font-bold">{formatCurrency(totalPrice)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-800 font-bold bg-gray-50">
              <td colSpan={9} className="p-1 text-left text-[11px]">Total Amount :</td>
              <td className="p-1 text-center">{formatCurrency(totals.totalTp)}</td>
              <td className="p-1 text-center">{formatCurrency(totals.totalVat)}</td>
              <td className="p-1 text-center">{formatCurrency(totals.specialDis)}</td>
              <td className="p-1 text-right text-[11px]">{formatCurrency(totals.totalPrice)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Note and Discount Area */}
        <div className="mt-4 px-2 space-y-1">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-bold">Note :</p>
              <p className="text-[10px]">Fifty Brand Offer, Payment option: Cash/Cheque</p>
            </div>
            <div className="w-64 space-y-1">
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Discount On TP :</span>
                <span>0 %</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-bold text-[12px]">Net Payable Amount</span>
                <span className="font-black text-[14px] border-2 border-black px-2">{Math.round(totals.totalPrice).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* In Words */}
        <div className="mt-4 px-2">
          <p className="font-bold uppercase text-[11px]">IN WORD: {numberToWords(totals.totalPrice)}</p>
        </div>

        {/* Bengali Special Note */}
        <div className="mt-6 px-2">
          <p className="font-bold text-[12px] py-1 border-y border-gray-300 bg-gray-50 text-center italic">
            বিশেষ দ্রষ্টব্য : আপনার স্বাক্ষরিত রিসিভ ইনভয়েস ব্যতীত কাউকে টাকা / ঔষধ প্রদান করবেন না।
          </p>
        </div>
      </div>

      {/* Footer Area - Signatures */}
      <div className="mt-auto px-2 pb-6">
        <div className="flex justify-between items-end mb-8 pt-10">
          <div className="grid grid-cols-5 gap-2 flex-1 text-[11px] text-center font-bold">
            <div className="flex flex-col">
              <div className="border-t border-black pt-1">Prepared By</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t border-black pt-1">Authorised by</div>
              <div className="text-[9px] font-normal">Date:....................</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t border-black pt-1">Delivered by</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t border-black pt-1">Collection by</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t border-black pt-1">Customer's Signature</div>
            </div>
          </div>
          
          <div className="text-[10px] text-right font-bold leading-tight pl-4 mb-1">
            <p>{data.header.invoiceDate}</p>
            <p>{currentTime?.split(', ')[1]}</p>
          </div>
        </div>

        {/* Final Warranty Section */}
        <div className="border-t-2 border-black pt-2 space-y-1.5">
          <p className="text-[11.5px] leading-none">
            <span className="font-black">Warranty :</span> We do hereby give this warranty that products sold under this invoice do not contravene to any provisions of section 18 of the drugs act 1940
          </p>
          <p className="text-[11.5px] leading-none">
            <span className="font-black">Note :</span> Received the goods in full and good condition.
          </p>
        </div>
      </div>
    </div>
  );
}
