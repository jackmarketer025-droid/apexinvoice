"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { InvoiceEditor } from '@/components/invoice/invoice-editor';
import { InvoicePreview } from '@/components/invoice/invoice-preview';
import { InvoiceData } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Printer, Download, Save, FileText, Menu, LogOut, Loader2 } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const STORAGE_KEY = 'apex_invoice_draft_v1';

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
      description: "Apocal-D Tab",
      packSize: "15's",
      unitTp: 47.91,
      vatRate: 17.4,
      unitDis: 0,
      quantity: 20,
      bonus: 0,
      specialDis: 0
    }
  ],
  discountRate: 0
};

export default function Home() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(DEFAULT_INVOICE);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        setInvoiceData(JSON.parse(savedDraft));
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoiceData));
    toast({
      title: "Draft Saved Successfully!",
      description: "The current invoice has been saved to your local storage.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Preparing PDF Export",
      description: "Please select 'Save as PDF' as the destination in the print window.",
    });
    setTimeout(() => {
      window.print();
    }, 800);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF8F8] flex flex-col">
      {/* App Bar */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 no-print">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold italic text-lg md:text-xl">A</div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tighter uppercase leading-none">Apex <span className="text-primary font-light hidden sm:inline">InvoiceGen</span></h1>
            <span className="text-[10px] text-muted-foreground hidden sm:block">Professional Management</span>
          </div>
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90" onClick={handleExportPDF}>
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Logout
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
                <Button variant="outline" className="w-full justify-start" onClick={handleSaveDraft}>
                  <Save className="w-4 h-4 mr-2" /> Save Draft
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" /> Print Invoice
                </Button>
                <Button className="w-full justify-start bg-secondary" onClick={handleExportPDF}>
                  <Download className="w-4 h-4 mr-2" /> Export PDF
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row no-print overflow-hidden">
        {/* Editor Section */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 lg:border-r overflow-y-auto bg-white lg:bg-transparent">
          <div className="max-w-2xl mx-auto">
             <InvoiceEditor 
              data={invoiceData} 
              onChange={setInvoiceData} 
            />
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="w-full lg:w-1/2 bg-gray-100 flex flex-col p-4 md:p-6 overflow-hidden">
          <div className="mb-4 flex items-center justify-between px-2 max-w-2xl mx-auto w-full">
            <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
              <FileText className="w-4 h-4" /> Live Preview
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground bg-white px-2 py-1 rounded-full border shadow-sm">A4 Pro Layout</span>
          </div>
          
          <div className="flex-1 overflow-auto flex justify-center custom-scrollbar">
            <div className="h-fit py-4">
               <div className="origin-top scale-[0.35] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] transition-transform duration-300">
                <InvoicePreview data={invoiceData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="print-only hidden">
        <InvoicePreview data={invoiceData} />
      </div>

      <Toaster />
    </div>
  );
}
