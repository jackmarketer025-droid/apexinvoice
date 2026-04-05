
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
    const lineSpecialDis = Number(line.specialDis) || 0;
    return {
      totalTp: acc.totalTp + totalTp,
      totalVat: acc.totalVat + totalVat,
      totalPrice: acc.totalPrice + totalPrice,
      specialDis: acc.specialDis + lineSpecialDis
    };
  }, { totalTp: 0, totalVat: 0, totalPrice: 0, specialDis: 0 });

  // The final net payable is Gross Total - (All Line Special Discounts) - (Any Global Discount)
  // Rounding to nearest integer as seen in pharmaceutical invoices (e.g., 5233 in image)
  const finalNetPayable = Math.round(totals.totalPrice - totals.specialDis - (data.totalDiscount || 0));

  return (
    <div className="invoice-a4 font-body text-[9px] leading-tight text-gray-900 flex flex-col w-[210mm] min-h-[297mm] mx-auto bg-white relative overflow-hidden" id="print-area">
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
              <p className="text-[9px] font-black text-gray-900 uppercase tracking-tighter leading-none mt-1">A SEED MARINE FLAKE ENTERPRISE</p>
            </div>

            <div className="flex-1 text-center mt-2">
              <h2 className="text-[36px] font-black text-[#E31E24] whitespace-nowrap leading-none mb-1 uppercase tracking-tighter">Apex Pharma Ltd.</h2>
              <p className="text-[9px] font-bold text-gray-800 leading-tight">House # 06, Road # 137, Block # SE(D) Gulshan-1, Dhaka-1212, Bangladesh.</p>
              <p className="text-[9px] font-bold text-gray-800 leading-tight">Tel: +88(02)55044834-37, Fax: 880-2-55044839</p>
            </div>

            <div className="w-[200px] text-right pt-2">
              <p className="text-[9px] font-black uppercase text-gray-900 leading-tight">Customer Copy</p>
            </div>
          </div>
          
          <div className="relative text-center mt-6">
            <p className="text-[9px] font-bold italic mb-2 text-gray-700">Plot No - 19, Block - 1, Sadar, Dinajpur. Mobile No: 01755573378</p>
            <div className="inline-block bg-[#E31E24] text-white px-12 py-1.5 rounded-full font-black uppercase text-[9px] tracking-[0.1em] shadow-sm">
              INVOICE
            </div>
            <div className="mt-4 border-b-[2px] border-[#E31E24] mx-1"></div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-3 gap-6 mb-4 px-1 mt-4 border-b-[1px] border-gray-300 pb-2">
          <div className="space-y-0.5 text-[9px]">
            {[
              { label: 'Cust ID', value: data.customer.customerId },
              { label: 'Name', value: data.customer.name },
              { label: 'Address', value: data.customer.address },
              { label: 'Phone', value: data.customer.phone },
              { label: 'Route', value: data.customer.route },
            ].map((item, i) => (
              <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
                <span className="w-[50px] shrink-0 font-normal">{item.label}</span>
                <span className="w-[10px] text-center shrink-0">:</span>
                <span className="flex-1 whitespace-nowrap overflow-hidden font-normal uppercase">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-0.5 text-[9px]">
            {[
              { label: 'Depot', value: data.mpo.depot },
              { label: 'MPO ID', value: data.mpo.mpoId },
              { label: 'Name', value: data.mpo.name },
              { label: 'Summary', value: data.mpo.summary },
              { label: 'Sum Date', value: data.mpo.sumDate },
            ].map((item, i) => (
              <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
                <span className="w-[65px] shrink-0 font-normal">{item.label}</span>
                <span className="w-[10px] text-center shrink-0">:</span>
                <span className="flex-1 whitespace-nowrap overflow-hidden font-normal uppercase">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-0.5 text-[9px]">
            {[
              { label: 'Category', value: data.header.category },
              { label: 'Invoice No.', value: data.header.invoiceNo },
              { label: 'Invoice Date', value: data.header.invoiceDate },
              { label: 'Order Book No.', value: data.header.orderBookNo },
              { label: 'Delivery Date', value: data.header.deliveryDate },
            ].map((item, i) => (
              <div key={i} className="flex leading-tight py-[0.5px] items-baseline">
                <span className="w-[90px] shrink-0 font-normal">{item.label}</span>
                <span className="w-[10px] text-center shrink-0">:</span>
                <span className="flex-1 whitespace-nowrap overflow-hidden font-normal uppercase">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="px-0.5 flex-grow">
          <table className="w-full text-[9px] border-collapse table-fixed bg-transparent">
            <thead>
              <tr className="border-y-[1px] border-gray-900 bg-transparent text-[9px]">
                <th className="p-1 text-left w-[6.5%] font-normal">P<br />Id</th>
                <th className="p-1 text-left w-[20%] font-normal">Description</th>
                <th className="p-1 text-center w-[8%] font-normal">Pack<br />Size</th>
                <th className="p-1 text-center w-[7%] font-normal leading-none">Unit<br />TP</th>
                <th className="p-1 text-center w-[6%] font-normal leading-none">VAT<br />Rate%</th>
                <th className="p-1 text-center w-[6.5%] font-normal leading-none">Unit<br />VAT</th>
                <th className="p-1 text-center w-[6.5%] font-normal leading-none">Unit<br />Dis</th>
                <th className="p-1 text-center w-[5%] font-normal">QTY</th>
                <th className="p-1 text-center w-[5%] font-normal">Bonus</th>
                <th className="p-1 text-center w-[8%] font-normal leading-none">Total<br />TP</th>
                <th className="p-1 text-center w-[8%] font-normal leading-none">Total<br />VAT</th>
                <th className="p-1 text-center w-[6%] font-normal leading-none">Special<br />Discount</th>
                <th className="p-1 text-center w-[10.5%] font-normal leading-none text-black">
                  <span className="text-[9px] block whitespace-nowrap">Total Amount</span>
                  <span className="text-[9px] block">(TP+Vat)</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {data.productLines.map((line, idx) => {
                const { unitVat, totalTp, totalVat, totalPrice } = calculateLineTotals(line);
                return (
                  <tr key={idx} className="border-b border-gray-200 align-top bg-transparent text-[9px]">
                    <td className="p-2 whitespace-nowrap">{line.productId}</td>
                    <td className="p-2 leading-tight font-normal whitespace-nowrap">{line.description}</td>
                    <td className="p-2 text-center whitespace-nowrap">{line.packSize}</td>
                    <td className="p-2 text-center">{formatCurrency(line.unitTp)}</td>
                    <td className="p-2 text-center">{line.vatRate}</td>
                    <td className="p-2 text-center">{formatCurrency(unitVat)}</td>
                    <td className="p-2 text-center">{formatCurrency(line.unitDis)}</td>
                    <td className="p-2 text-center">{line.quantity}</td>
                    <td className="p-2 text-center">{line.bonus || 0}</td>
                    <td className="p-2 text-center">{formatCurrency(totalTp)}</td>
                    <td className="p-2 text-center">{formatCurrency(totalVat)}</td>
                    <td className="p-2 text-center">{formatCurrency(line.specialDis)}</td>
                    <td className="p-2 text-center font-normal text-black">{formatCurrency(totalPrice)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-transparent">
              <tr className="bg-transparent text-[9px] font-bold">
                <td colSpan={9} className="p-1 text-right border-t border-gray-900 pr-4">
                  <span className="uppercase inline-block">Total Amount</span>
                </td>
                <td className="p-1 text-center border-t border-gray-900">{formatCurrency(totals.totalTp)}</td>
                <td className="p-1 text-center border-t border-gray-900">{formatCurrency(totals.totalVat)}</td>
                <td className="p-1 text-center border-t border-gray-900">{formatCurrency(totals.specialDis)}</td>
                <td className="p-1 text-center border-t border-gray-900">{formatCurrency(totals.totalPrice)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-2 px-1 flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-normal uppercase">Note :</p>
              <p className="text-[9px] font-normal uppercase tracking-tight text-gray-900">{data.header.category === 'GENERAL' ? 'FIFTY BRAND OFFER, PAYMENT OPTION: CASH/CHEQUE' : 'Fifty Brand 10% Special Discount offer for Doctors'}</p>
            </div>
            <div className="w-[300px] text-[9px] space-y-1">
              <div className="flex justify-between border-b border-gray-200 py-0.5">
                <span className="font-normal uppercase">G.Discount On TP %</span>
                <div className="flex gap-8">
                  <span>{data.discountRate || 0}%</span>
                  <span>0.00</span>
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-0.5">
                <span className="font-normal uppercase">Special Discount Amount</span>
                <span>{formatCurrency(totals.specialDis + (data.totalDiscount || 0))}</span>
              </div>
              <div className="flex justify-between pt-1 border-b-[3px] border-double border-gray-900 font-bold">
                <span className="uppercase">Net Payable Amount :</span>
                <span>{Math.round(finalNetPayable).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-2 px-1">
      
          </div>

          <div className="mt-6 px-1">
            <p className="font-normal uppercase text-[9px] text-black leading-tight">
              IN WORD: {numberToWords(finalNetPayable)}
            </p>
          </div>

          <div className="mt-4 px-1 text-left">
            <p className="text-[9px] font-normal border-b-[0.5px] border-black text-black inline-block leading-tight">
              বিশেষ দ্রষ্টব্য : আপনার স্বাক্ষরিত রিসিভ ইনভয়েস ব্যতীত কাউকে টাকা / ঔষধ প্রদান করবেন না।
            </p>
          </div>
        </div>

        {/* Signature Area */}
        <div className="mt-auto px-1 pb-6">
          <div className="flex justify-between items-end mb-8 pt-16">
            <div className="grid grid-cols-6 gap-6 flex-1 text-[9px] font-normal text-gray-900">
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Prepared By</div>
                <div className="text-[9px] mt-0.5 font-medium">razzak</div>
              </div>
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Authorised by</div>
                <div className="text-[9px] mt-0.5 font-medium">Date:....................</div>
              </div>
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Delivered by</div>
                <div className="text-[9px] mt-0.5 uppercase font-medium">MAHEDY HASAN</div>
              </div>
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Collection by</div>
              </div>
              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-black pt-1.5">Customer's Signature</div>
              </div>
              <div className="flex flex-col text-right justify-end font-normal text-[9px]">
                <p>{currentDate}</p>
                <p>{currentTime}</p>
              </div>
            </div>
          </div>

          <div className="border-t-[0.5px] border-black pt-3 space-y-1.5">
            <p className="text-[9px] font-normal text-gray-900 w-full">
              Warranty : We do hereby give this warranty that products sold under this invoice do not contravene to any provisions of section 18 of the drugs act 1940
            </p>
            <p className="text-[9px] font-normal text-gray-900 w-full">
              Note : Received the goods in full and good condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
