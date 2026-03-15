
"use client"

import React, { useState, useEffect } from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateLineTotals, formatCurrency, numberToWords } from '@/lib/invoice-utils';
import Image from 'next/image';
import { cn } from "@/lib/utils";

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

      {/* Info Grid - Aligned colons and fixed one line */}
      <div className="grid grid-cols-3 gap-6 mb-4 px-1 border-b-[1px] border-gray-300 pb-2">
        {/* Customer Column */}
        <div className="space-y-0.5 text-[10.5px]">
          {[
            { label: 'Cust ID', value: data.customer.customerId, bold: false },
            { label: 'Name', value: data.customer.name, bold: true },
            { label: 'Address', value: data.customer.address, bold: false },
            { label: 'Phone', value: data.customer.phone, bold: false },
            { label: 'Route', value: data.customer.route, bold: true },
          ].map((item, i) => (
            <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
              <span className="w-[50px] font-bold shrink-0">{item.label}</span>
              <span className="w-[10px] text-center shrink-0">:</span>
              <span className={cn("flex-1 whitespace-nowrap overflow-hidden", item.bold && "font-bold uppercase")}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* MPO Column */}
        <div className="space-y-0.5 text-[10.5px]">
          {[
            { label: 'Depot', value: data.mpo.depot, bold: false },
            { label: 'MPO ID', value: data.mpo.mpoId, bold: false },
            { label: 'Name', value: data.mpo.name, bold: true },
            { label: 'Summary', value: data.mpo.summary, bold: false },
            { label: 'Sum Date', value: data.mpo.sumDate, bold: false },
          ].map((item, i) => (
            <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
              <span className="w-[55px] font-bold shrink-0">{item.label}</span>
              <span className="w-[10px] text-center shrink-0">:</span>
              <span className={cn("flex-1 whitespace-nowrap overflow-hidden", item.bold && "font-bold uppercase")}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Invoice Column */}
        <div className="space-y-0.5 text-[10.5px]">
          {[
            { label: 'Category', value: data.header.category, bold: false },
            { label: 'Invoice No.', value: data.header.invoiceNo, bold: true },
            { label: 'Invoice Date', value: data.header.invoiceDate, bold: false },
            { label: 'Order Book No.', value: data.header.orderBookNo, bold: false },
            { label: 'Delivery Date', value: data.header.deliveryDate, bold: false },
          ].map((item, i) => (
            <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
              <span className="w-[80px] font-bold shrink-0">{item.label}</span>
              <span className="w-[10px] text-center shrink-0">:</span>
              <span className={cn("flex-1 whitespace-nowrap overflow-hidden", item.bold && "font-bold uppercase")}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="px-0.5 flex-grow">
        <table className="w-full text-[11.2px] border-collapse table-fixed">
          <thead>
            <tr className="border-y-[1px] border-gray-900 bg-gray-50 text-[10.5px] uppercase">
              <th className="p-1 text-left w-[5%] font-bold">P Id</th>
              <th className="p-1 text-left w-[18%] font-bold">Description</th>
              <th className="p-1 text-center w-[8%] font-bold">Pack Size</th>
              <th className="p-1 text-center w-[7%] font-bold">Unit TP</th>
              <th className="p-1 text-center w-[7%] font-bold">VAT Rate%</th>
              <th className="p-1 text-center w-[7%] font-bold">Unit VAT</th>
              <th className="p-1 text-center w-[7%] font-bold">Unit Dis</th>
              <th className="p-1 text-center w-[5%] font-bold">QTY</th>
              <th className="p-1 text-center w-[5%] font-bold">Bonus</th>
              <th className="p-1 text-center w-[8%] font-bold">Total TP</th>
              <th className="p-1 text-center w-[8%] font-bold">Total VAT</th>
              <th className="p-1 text-center w-[7%] font-bold">Spec. Dis</th>
              <th className="p-1 text-right w-[10%] font-bold">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.productLines.map((line, idx) => {
              const { unitVat, totalTp, totalVat, totalPrice } = calculateLineTotals(line);
              return (
                <tr key={idx} className="border-b border-gray-200 align-top">
                  <td className="p-1.5">{line.productId}</td>
                  <td className="p-1.5 leading-tight font-bold">{line.description}</td>
                  <td className="p-1.5 text-center">{line.packSize}</td>
                  <td className="p-1.5 text-center">{formatCurrency(line.unitTp)}</td>
                  <td className="p-1.5 text-center">{line.vatRate}</td>
                  <td className="p-1.5 text-center">{formatCurrency(unitVat)}</td>
                  <td className="p-1.5 text-center">{formatCurrency(line.unitDis)}</td>
                  <td className="p-1.5 text-center">{line.quantity}</td>
                  <td className="p-1.5 text-center">{line.bonus || 0}</td>
                  <td className="p-1.5 text-center">{formatCurrency(totalTp)}</td>
                  <td className="p-1.5 text-center">{formatCurrency(totalVat)}</td>
                  <td className="p-1.5 text-center">{formatCurrency(line.specialDis)}</td>
                  <td className="p-1.5 text-right font-bold text-black">{formatCurrency(totalPrice)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-white text-[12px]">
              <td colSpan={7} className="p-0"></td>
              <td colSpan={2} className="p-2 text-right border-t-[1.5px] border-gray-900 pr-4">
                <span className="font-bold uppercase inline-block whitespace-nowrap">TOTAL AMOUNT :</span>
              </td>
              <td className="p-2 text-center font-bold text-gray-900 border-t-[1.5px] border-gray-900">{formatCurrency(totals.totalTp)}</td>
              <td className="p-2 text-center font-bold text-gray-900 border-t-[1.5px] border-gray-900">{formatCurrency(totals.totalVat)}</td>
              <td className="p-2 text-center font-bold text-gray-900 border-t-[1.5px] border-gray-900">{formatCurrency(totals.specialDis)}</td>
              <td className="p-2 text-right text-[12.5px] font-bold text-gray-900 border-t-[1.5px] border-gray-900">{formatCurrency(totals.totalPrice)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Note and Discount Area */}
        <div className="mt-2 px-1">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase">Note :</p>
              <p className="text-[11px] font-bold uppercase tracking-tight text-gray-900">FIFTY BRAND OFFER, PAYMENT OPTION: CASH/CHEQUE</p>
            </div>
            <div className="w-72">
              <div className="flex justify-between border-t border-gray-400 py-1 text-[12px]">
                <span className="font-bold">Discount On TP :</span>
                <span>0%</span>
                <span className="font-bold">0.00</span>
              </div>
              <div className="flex justify-between pt-0.5 border-t-[1px] border-gray-200">
                <span className="text-[13px] font-bold">Net Payable Amount</span>
                <span className="text-[14px] font-bold text-black">
                  {totals.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* In Words */}
        <div className="mt-6 px-1">
          <p className="font-bold uppercase text-[12px] text-black leading-tight">
            IN WORD: {numberToWords(totals.totalPrice)}
          </p>
        </div>

        {/* Bengali Special Note - Corrected and Sized down */}
        <div className="mt-4 px-1 text-left">
          <p className="text-[10px] font-bold border-b-[0.5px] border-black text-black inline-block leading-tight">
            বিশেষ দ্রষ্টব্য : আপনার স্বাক্ষরিত রিসিভ ইনভয়েস ব্যতীত কাউকে টাকা / ঔষধ প্রদান করবেন না।
          </p>
        </div>
      </div>

      {/* Footer Area - Signatures */}
      <div className="mt-auto px-1 pb-6">
        <div className="flex justify-between items-end mb-8 pt-16">
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

        {/* Final Warranty Section - Now Bolded and Adjusted size */}
        <div className="border-t-[0.5px] border-black pt-3 space-y-1.5">
          <p className="text-[10.8px] leading-none whitespace-nowrap tracking-tighter font-bold text-gray-900 w-full">
            Warranty : We do hereby give this warranty that products sold under this invoice do not contravene to any provisions of section 18 of the drugs act 1940
          </p>
          <p className="text-[10.8px] leading-none whitespace-nowrap tracking-tighter font-bold text-gray-900 w-full">
            Note : Received the goods in full and good condition.
          </p>
        </div>
      </div>
    </div>
  );
}
