"use client"

import React, { useState } from 'react';
import { InvoiceEditor } from '@/components/invoice/invoice-editor';
import { InvoicePreview } from '@/components/invoice/invoice-preview';
import { InvoiceData } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Printer, Download, Save, FileText, Menu } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DEFAULT_INVOICE: InvoiceData = {
  customer: {
    customerId: '28010487',
    name: 'PARVEZ PHARMACY',
    address: 'NOSRATPUR',
    phone: '',
    route: 'BAZAR ROAD'
  },
  mpo: {
    depot: 'Dinajpur Depot',
    mpoId: '28010471',
    name: 'KHAYRUL ISLAM',
    summary: '23531',
    sumDate: '03-03-2026'
  },
  header: {
    category: 'General',
    invoiceNo: '183859',
    invoiceDate: '03-03-2026',
    orderBookNo: '541',
    deliveryDate: '03-03-2026'
  },
  productLines: [
    {
      productId: '10729',
      description: "Apocal-D Tablet (15's)",
      packSize: "15's",
      unitTp: 56.25,
      vatRate: 17.4,
      quantity: 20
    }
  ],
  discountRate: 0
};

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(DEFAULT_INVOICE);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F8] flex flex-col">
      {/* App Bar */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 no-print">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold italic text-lg md:text-xl">A</div>
          <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tighter uppercase">Apex <span className="text-primary font-light hidden sm:inline">InvoiceGen</span></h1>
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => console.log('Saving...')}>
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
        </div>

        {/* Mobile Actions Drawer */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Invoice Actions</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Saving...')}>
                  <Save className="w-4 h-4 mr-2" /> Save Draft
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" /> Print Invoice
                </Button>
                <Button className="w-full justify-start bg-secondary" onClick={() => console.log('Exporting...')}>
                  <Download className="w-4 h-4 mr-2" /> Export PDF
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 no-print overflow-hidden">
        {/* Editor Section */}
        <div className="h-full overflow-hidden flex flex-col">
          <InvoiceEditor 
            data={invoiceData} 
            onChange={setInvoiceData} 
          />
        </div>

        {/* Live Preview Section */}
        <div className="flex flex-col items-center overflow-auto lg:overflow-visible">
          <div className="mb-4 w-full flex items-center justify-between px-2">
            <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
              <FileText className="w-4 h-4" /> Live Preview
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground">A4 Professional Layout</span>
          </div>
          
          {/* Scaling logic for preview on smaller screens */}
          <div className="w-full flex justify-center pb-20">
            <div className="origin-top scale-[0.45] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.8] xl:scale-100 transition-transform duration-300">
              <InvoicePreview data={invoiceData} />
            </div>
          </div>
        </div>
      </main>

      {/* Hidden for screen, shown for print */}
      <div className="print-only hidden">
        <InvoicePreview data={invoiceData} />
      </div>

      <Toaster />
    </div>
  );
}
