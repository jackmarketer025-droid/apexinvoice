
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
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-'));
    
    setCurrentTime(now.toLocaleTimeString('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).replace(/\s/g, ''));
  }, []);

  const totals = data.productLines.reduce((acc, line) => {
    const { totalTp, totalVat, totalPrice } = calculateLineTotals(line);
    return {
      totalTp: acc.totalTp + totalTp,
      totalVat: acc.totalVat + totalVat,
      totalPrice: acc.totalPrice + totalPrice,
      specialDis: acc.specialDis + (Number(line.specialDis) || 0)
    };
  }, { totalTp: 0, totalVat: 0, totalPrice: 0, specialDis: 0 });

  return (
    <div className="invoice-a4 font-body text-[11px] leading-tight text-gray-900 flex flex-col min-h-[297mm] bg-white relative" id="print-area">
      {/* Header Section */}
      <div className="flex justify-between items-start pt-4 px-1">
        <div className="w-[30%]">
          <Image 
            src="https://res.cloudinary.com/dd3eekw7h/image/upload/v1773604830/Apex_logo_p5tupb.png" 
            alt="Apex Logo" 
            width={160} 
            height={52}
            className="object-contain"
            priority
          />
          <p className="text-[9.5px] font-black text-gray-900 uppercase tracking-tighter leading-none mt-2">A SEED MARINE FLAKE ENTERPRISE</p>
        </div>
        <div className="w-[50%] text-center">
          <h2 className="text-[38px] font-black text-[#E31E24] whitespace-nowrap leading-none mb-1 uppercase tracking-tighter">Apex Pharma Ltd.</h2>
          <p className="text-[12px] font-bold">House # 06, Road # 137, Block # SE(D) Gulshan-1, Dhaka-1212, Bangladesh.</p>
          <p className="text-[12px] font-bold">Tel: +88(02)55044834-37, Fax: 880-2-55044839</p>
        </div>
        <div className="w-[20%] text-right pt-1 font-black">
          <p className="text-[12.5px] uppercase">Customer Copy</p>
        </div>
      </div>

      {/* Invoice Box */}
      <div className="relative text-center mt-5 mb-8">
        <p className="text-[12.5px] font-bold italic mb-2">Plot No - 19, Block - 1, Sadar, Dinajpur. Mobile No: 01755573378</p>
        <div className="inline-block bg-[#E31E24] text-white px-16 py-2.5 rounded-full font-black uppercase text-[16px] tracking-[0.2em] shadow-sm">
          INVOICE
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-8 mb-6 px-1 border-b-[1.5px] border-gray-300 pb-4">
        <div className="space-y-1.5 text-[11.8px]">
          <p><span className="w-22 inline-block font-bold">Cust ID</span>: {data.customer.customerId}</p>
          <p className="font-black text-[12.5px]"><span className="w-22 inline-block">Name</span>: {data.customer.name}</p>
          <p><span className="w-22 inline-block font-bold">Address</span>: {data.customer.address}</p>
          <p><span className="w-22 inline-block font-bold">Phone</span>: {data.customer.phone}</p>
          <p className="font-black"><span className="w-22 inline-block">Route</span>: {data.customer.route}</p>
        </div>
        <div className="space-y-1.5 text-[11.8px]">
          <p><span className="w-22 inline-block font-bold">Depot</span>: {data.mpo.depot}</p>
          <p><span className="w-22 inline-block font-bold">MPO ID</span>: {data.mpo.mpoId}</p>
          <p className="font-black text-[12.5px]"><span className="w-22 inline-block">Name</span>: {data.mpo.name}</p>
          <p><span className="w-22 inline-block font-bold">Summary</span>: {data.mpo.summary}</p>
          <p><span className="w-22 inline-block font-bold">Sum Date</span>: {data.mpo.sumDate}</p>
        </div>
        <div className="space-y-1.5 text-right text-[11.8px]">
          <p><span className="inline-block w-28 text-left font-bold">Category</span>: {data.header.category}</p>
          <p><span className="inline-block w-28 text-left font-bold">Invoice No.</span>: <span className="font-black">{data.header.invoiceNo}</span></p>
          <p><span className="inline-block w-28 text-left font-bold">Invoice Date</span>: {data.header.invoiceDate}</p>
          <p><span className="inline-block w-28 text-left font-bold">Order Book No.</span>: {data.header.orderBookNo}</p>
          <p><span className="inline-block w-28 text-left font-bold">Delivery Date</span>: {data.header.deliveryDate}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-0.5 flex-grow">
        <table className="w-full text-[11.2px] border-collapse table-fixed">
          <thead>
            <tr className="border-y-[1px] border-gray-900 font-black bg-gray-50 text-[10.5px] uppercase">
              <th className="p-1 text-left w-[5%]">P Id</th>
              <th className="p-1 text-left w-[18%]">Description</th>
              <th className="p-1 text-center w-[8%]">Pack Size</th>
              <th className="p-1 text-center w-[7%]">Unit TP</th>
              <th className="p-1 text-center w-[7%]">VAT Rate%</th>
              <th className="p-1 text-center w-[7%]">Unit VAT</th>
              <th className="p-1 text-center w-[7%]">Unit Dis</th>
              <th className="p-1 text-center w-[5%]">QTY</th>
              <th className="p-1 text-center w-[5%]">Bonus</th>
              <th className="p-1 text-center w-[8%]">Total TP</th>
              <th className="p-1 text-center w-[8%]">Total VAT</th>
              <th className="p-1 text-center w-[7%]">Spec. Dis</th>
              <th className="p-1 text-right w-[10%]">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.productLines.map((line, idx) => {
              const { unitVat, totalTp, totalVat, totalPrice } = calculateLineTotals(line);
              return (
                <tr key={idx} className="border-b border-gray-200 align-top hover:bg-gray-50/50">
                  <td className="p-1.5">{line.productId}</td>
                  <td className="p-1.5 font-black text-gray-900 leading-tight">{line.description}</td>
                  <td className="p-1.5 text-center">{line.packSize}</td>
                  <td className="p-1.5 text-center">{formatCurrency(line.unitTp)}</td>
                  <td className="p-1.5 text-center">{line.vatRate}</td>
                  <td className="p-1.5 text-center">{formatCurrency(unitVat)}</td>
                  <td className="p-1.5 text-center">{formatCurrency(line.unitDis)}</td>
                  <td className="p-1.5 text-center font-black">{line.quantity}</td>
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
            <tr className="border-t-[1.5px] border-gray-900 font-black bg-gray-50 text-[13px]">
              <td colSpan={9} className="p-2.5 text-left uppercase">Total Amount :</td>
              <td className="p-2.5 text-center">{formatCurrency(totals.totalTp)}</td>
              <td className="p-2.5 text-center">{formatCurrency(totals.totalVat)}</td>
              <td className="p-2.5 text-center">{formatCurrency(totals.specialDis)}</td>
              <td className="p-2.5 text-right text-[15px] text-[#E31E24]">{formatCurrency(totals.totalPrice)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Note and Discount Area */}
        <div className="mt-8 px-1 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <p className="font-black text-[14px] uppercase">Note :</p>
              <p className="text-[14px] font-black uppercase tracking-tight text-gray-900">FIFTY BRAND OFFER, PAYMENT OPTION: CASH/CHEQUE</p>
            </div>
            <div className="w-80 space-y-3">
              <div className="flex justify-between border-b-[1.5px] border-gray-400 pb-2">
                <span className="font-black text-[13px] uppercase">Discount On TP :</span>
                <span className="font-bold text-[13px]">0 %</span>
                <span className="font-bold text-[13px]">0.00</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-black text-[16px] uppercase">Net Payable Amount</span>
                <span className="font-black text-[24px] border-[2.5px] border-black px-8 py-2 bg-white shadow-sm min-w-[150px] text-center">
                  {Math.round(totals.totalPrice).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* In Words */}
        <div className="mt-8 px-1">
          <p className="font-black uppercase text-[12.5px] text-black">
            IN WORD: {numberToWords(totals.totalPrice)}
          </p>
        </div>

        {/* Bengali Special Note */}
        <div className="mt-10 px-1">
          <p className="font-black text-[15.5px] py-3 border-b-[1px] border-black text-center italic text-black">
            বিশেষ দ্রষ্টব্য : আপনার স্বাক্ষরিত রিসিভ ইনভয়েস ব্যতীত কাউকে টাকা / ঔষধ প্রদান করবেন না।
          </p>
        </div>
      </div>

      {/* Footer Area - Signatures */}
      <div className="mt-auto px-1 pb-6">
        <div className="flex justify-between items-end mb-8 pt-20">
          <div className="grid grid-cols-6 gap-6 flex-1 text-[9.5px] font-medium text-gray-900">
            <div className="flex flex-col">
              <div className="border-t-[0.5px] border-black pt-1.5">Prepared By</div>
              <div className="text-[9px] mt-0.5">razzak</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t-[0.5px] border-black pt-1.5">Authorised by</div>
              <div className="text-[9px] mt-0.5">Date:....................</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t-[0.5px] border-black pt-1.5">Delivered by</div>
              <div className="text-[9px] mt-0.5 uppercase">MAHEDY HASAN</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t-[0.5px] border-black pt-1.5">Collection by</div>
            </div>
            <div className="flex flex-col">
              <div className="border-t-[0.5px] border-black pt-1.5">Customer's Signature</div>
            </div>
            <div className="flex flex-col text-right justify-end font-bold text-[9px]">
              <p>{currentDate}</p>
              <p>{currentTime}</p>
            </div>
          </div>
        </div>

        {/* Final Warranty Section */}
        <div className="border-t-[1px] border-black pt-4 space-y-1.5">
          <p className="text-[10.5px] leading-none whitespace-nowrap tracking-tighter font-medium text-gray-900">
            <span className="font-bold">Warranty :</span> We do hereby give this warranty that products sold under this invoice do not contravene to any provisions of section 18 of the drugs act 1940
          </p>
          <p className="text-[10.5px] leading-none whitespace-nowrap tracking-tighter font-medium text-gray-900">
            <span className="font-bold">Note :</span> Received the goods in full and good condition.
          </p>
        </div>
      </div>
    </div>
  );
}
