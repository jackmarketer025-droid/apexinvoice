
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
    <div className="invoice-a4 font-body text-[11px] leading-tight text-gray-900 flex flex-col min-h-[297mm] bg-white relative overflow-hidden" id="print-area">
      {/* Full Page Watermark Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="https://res.cloudinary.com/dd3eekw7h/image/upload/v1773674231/Watermark_d4fnsl.jpg" 
          alt="Watermark" 
          fill
          className="object-fill opacity-[0.4]"
          priority
          unoptimized
        />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        {/* Header Section */}
        <div className="pt-1 px-1">
          <div className="flex justify-between items-start">
            <div className="w-[200px]">
              <Image 
                src="https://res.cloudinary.com/dd3eekw7h/image/upload/v1773604830/Apex_logo_p5tupb.png" 
                alt="Apex Logo" 
                width={160} 
                height={52}
                style={{ height: 'auto' }}
                className="object-contain"
                priority
              />
              <p className="text-[9.5px] font-black text-gray-900 uppercase tracking-tighter leading-none mt-1">A SEED MARINE FLAKE ENTERPRISE</p>
            </div>

            <div className="flex-1 text-center mt-2">
              <h2 className="text-[36px] font-black text-[#E31E24] whitespace-nowrap leading-none mb-1 uppercase tracking-tighter">Apex Pharma Ltd.</h2>
              <p className="text-[12.5px] font-bold text-gray-800 leading-tight">House # 06, Road # 137, Block # SE(D) Gulshan-1, Dhaka-1212, Bangladesh.</p>
              <p className="text-[12.5px] font-bold text-gray-800 leading-tight">Tel: +88(02)55044834-37, Fax: 880-2-55044839</p>
            </div>

            <div className="w-[200px] text-right pt-2">
              <p className="text-[13px] font-black uppercase text-gray-900 leading-tight">Customer Copy</p>
            </div>
          </div>
          
          <div className="relative text-center mt-6">
            <p className="text-[12.5px] font-bold italic mb-2 text-gray-700">Plot No - 19, Block - 1, Sadar, Dinajpur. Mobile No: 01755573378</p>
            <div className="inline-block bg-[#E31E24] text-white px-12 py-1.5 rounded-full font-black uppercase text-[15px] tracking-[0.1em] shadow-sm">
              INVOICE
            </div>
            <div className="mt-4 border-b-[2px] border-[#E31E24] mx-1"></div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-3 gap-6 mb-4 px-1 mt-4 border-b-[1px] border-gray-300 pb-2">
          <div className="space-y-0.5 text-[12px]">
            {[
              { label: 'Cust ID', value: data.customer.customerId },
              { label: 'Name', value: data.customer.name, bold: true },
              { label: 'Address', value: data.customer.address },
              { label: 'Phone', value: data.customer.phone },
              { label: 'Route', value: data.customer.route, bold: true },
            ].map((item, i) => (
              <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
                <span className="w-[50px] font-bold shrink-0">{item.label}</span>
                <span className="w-[10px] text-center shrink-0">:</span>
                <span className={cn("flex-1 whitespace-nowrap overflow-hidden", item.bold && "font-bold uppercase")}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-0.5 text-[12px]">
            {[
              { label: 'Depot', value: data.mpo.depot },
              { label: 'MPO ID', value: data.mpo.mpoId },
              { label: 'Name', value: data.mpo.name, bold: true },
              { label: 'Summary', value: data.mpo.summary },
              { label: 'Sum Date', value: data.mpo.sumDate },
            ].map((item, i) => (
              <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
                <span className="w-[55px] font-bold shrink-0">{item.label}</span>
                <span className="w-[10px] text-center shrink-0">:</span>
                <span className={cn("flex-1 whitespace-nowrap overflow-hidden", item.bold && "font-bold uppercase")}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-0.5 text-[12px]">
            {[
              { label: 'Category', value: data.header.category },
              { label: 'Invoice No.', value: data.header.invoiceNo, bold: true },
              { label: 'Invoice Date', value: data.header.invoiceDate },
              { label: 'Order Book No.', value: data.header.orderBookNo },
              { label: 'Delivery Date', value: data.header.deliveryDate, bold: true },
            ].map((item, i) => (
              <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
                <span className="w-[80px] font-bold shrink-0">{item.label}</span>
                <span className="w-[10px] text-center shrink-0">:</span>
                <span className={cn("flex-1 whitespace-nowrap overflow-hidden", item.bold && "font-bold uppercase")}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="px-0.5 flex-grow">
          <table className="w-full text-[14px] border-collapse table-fixed bg-transparent">
            <thead>
              <tr className="border-y-[1px] border-gray-900 bg-transparent text-[14px]">
                <th className="p-1 text-left w-[6.5%] font-normal">P Id</th>
                <th className="p-1 text-left w-[20%] font-normal">Description</th>
                <th className="p-1 text-center w-[8%] font-normal">Pack Size</th>
                <th className="p-1 text-center w-[7%] font-normal">Unit TP</th>
                <th className="p-1 text-center w-[6%] font-normal">VAT Rate%</th>
                <th className="p-1 text-center w-[6.5%] font-normal">Unit VAT</th>
                <th className="p-1 text-center w-[6.5%] font-normal">Unit Dis</th>
                <th className="p-1 text-center w-[5%] font-normal">QTY</th>
                <th className="p-1 text-center w-[5%] font-normal">Bonus</th>
                <th className="p-1 text-center w-[8%] font-normal">Total TP</th>
                <th className="p-1 text-center w-[8%] font-normal">Total VAT</th>
                <th className="p-1 text-center w-[6%] font-normal">Spec. Dis</th>
                <th className="p-1 text-right w-[10.5%] font-normal">Total Price</th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {data.productLines.map((line, idx) => {
                const { unitVat, totalTp, totalVat, totalPrice } = calculateLineTotals(line);
                return (
                  <tr key={idx} className="border-b border-gray-200 align-top bg-transparent text-[14px]">
                    <td className="p-2">{line.productId}</td>
                    <td className="p-2 leading-tight font-normal">{line.description}</td>
                    <td className="p-2 text-center">{line.packSize}</td>
                    <td className="p-2 text-center">{formatCurrency(line.unitTp)}</td>
                    <td className="p-2 text-center">{line.vatRate}</td>
                    <td className="p-2 text-center">{formatCurrency(unitVat)}</td>
                    <td className="p-2 text-center">{formatCurrency(line.unitDis)}</td>
                    <td className="p-2 text-center">{line.quantity}</td>
                    <td className="p-2 text-center">{line.bonus || 0}</td>
                    <td className="p-2 text-center">{formatCurrency(totalTp)}</td>
                    <td className="p-2 text-center">{formatCurrency(totalVat)}</td>
                    <td className="p-2 text-center">{formatCurrency(line.specialDis)}</td>
                    <td className="p-2 text-right font-normal text-black">{formatCurrency(totalPrice)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-transparent">
              <tr className="bg-transparent text-[14px]">
                <td colSpan={9} className="p-2 text-right border-t-[1.5px] border-gray-900 pr-10">
                  <span className="font-normal uppercase inline-block whitespace-nowrap">TOTAL AMOUNT :</span>
                </td>
                <td className="p-2 text-center font-normal text-gray-900 border-t-[1.5px] border-gray-900">{formatCurrency(totals.totalTp)}</td>
                <td className="p-2 text-center font-normal text-gray-900 border-t-[1.5px] border-gray-900">{formatCurrency(totals.totalVat)}</td>
                <td className="p-2 text-center font-normal text-gray-900 border-t-[1.5px] border-gray-900">{formatCurrency(totals.specialDis)}</td>
                <td className="p-2 text-right text-[14px] font-normal text-gray-900 border-t-[1.5px] border-gray-900">{formatCurrency(totals.totalPrice)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-2 px-1">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[14px] font-normal uppercase">Note :</p>
                <p className="text-[14px] font-normal uppercase tracking-tight text-gray-900">FIFTY BRAND OFFER, PAYMENT OPTION: CASH/CHEQUE</p>
              </div>
              <div className="w-72">
                <div className="flex justify-between border-t border-gray-400 py-1 text-[14px]">
                  <span className="font-normal">Discount On TP :</span>
                  <span>0%</span>
                  <span className="font-normal">0.00</span>
                </div>
                <div className="flex justify-between pt-0.5 border-t-[1px] border-gray-200">
                  <span className="text-[14px] font-normal">Net Payable Amount</span>
                  <span className="text-[14px] font-normal text-black">
                    {totals.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-1">
            <p className="font-bold uppercase text-[12px] text-black leading-tight">
              IN WORD: {numberToWords(totals.totalPrice)}
            </p>
          </div>

          <div className="mt-4 px-1 text-left">
            <p className="text-[13.5px] font-bold border-b-[0.5px] border-black text-black inline-block leading-tight">
              বিশেষ দ্রষ্টব্য : আপনার স্বাক্ষরিত রিসিভ ইনভয়েস ব্যতীত কাউকে টাকা / ঔষধ প্রদান করবেন না।
            </p>
          </div>
        </div>

        {/* Signature Area */}
        <div className="mt-auto px-1 pb-6">
          <div className="flex justify-between items-end mb-8 pt-16">
            <div className="grid grid-cols-6 gap-6 flex-1 text-[13.5px] font-bold text-gray-900">
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Prepared By</div>
                <div className="text-[11px] mt-0.5 font-medium">razzak</div>
              </div>
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Authorised by</div>
                <div className="text-[11px] mt-0.5 font-medium">Date:....................</div>
              </div>
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Delivered by</div>
                <div className="text-[11px] mt-0.5 uppercase font-medium">MAHEDY HASAN</div>
              </div>
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Collection by</div>
              </div>
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Customer's Signature</div>
              </div>
              <div className="flex flex-col text-right justify-end font-bold text-[11px]">
                <p>{currentDate}</p>
                <p>{currentTime}</p>
              </div>
            </div>
          </div>

          <div className="border-t-[0.5px] border-black pt-3 space-y-1.5">
            <p className="text-[10.8px] font-bold text-gray-900 w-full">
              Warranty : We do hereby give this warranty that products sold under this invoice do not contravene to any provisions of section 18 of the drugs act 1940
            </p>
            <p className="text-[10.8px] font-bold text-gray-900 w-full">
              Note : Received the goods in full and good condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
