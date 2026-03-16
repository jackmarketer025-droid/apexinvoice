
"use client"

import React, { useState } from 'react';
import { InvoiceData, ProductLine } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Search, Check, Save } from 'lucide-react';
import { AIDraftDialog } from './ai-draft-dialog';
import { PREDEFINED_PRODUCTS } from '@/lib/invoice-utils';
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface InvoiceEditorProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const EMPTY_LINE: ProductLine = {
  productId: '',
  description: '',
  packSize: '',
  unitTp: 0,
  vatRate: 17.4,
  unitDis: 0,
  quantity: 1,
  bonus: 0,
  specialDis: 0
};

export function InvoiceEditor({ data, onChange }: InvoiceEditorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [draftItem, setDraftItem] = useState<ProductLine>({ ...EMPTY_LINE });

  const handleCustomerChange = (field: keyof InvoiceData['customer'], value: string) => {
    onChange({
      ...data,
      customer: { ...data.customer, [field]: value }
    });
  };

  const handleMpoChange = (field: keyof InvoiceData['mpo'], value: string) => {
    onChange({
      ...data,
      mpo: { ...data.mpo, [field]: value }
    });
  };

  const handleHeaderChange = (field: keyof InvoiceData['header'], value: string) => {
    onChange({
      ...data,
      header: { ...data.header, [field]: value }
    });
  };

  const removeLine = (index: number) => {
    const newLines = data.productLines.filter((_, i) => i !== index);
    onChange({ ...data, productLines: newLines });
  };

  const handleProductSelect = (productId: string) => {
    const product = PREDEFINED_PRODUCTS.find(p => p.id === productId);
    if (product) {
      setDraftItem({
        ...draftItem,
        productId: product.id,
        description: product.name,
        packSize: product.packSize,
        unitTp: product.tpVat / (1 + 17.4 / 100),
        vatRate: 17.4,
      });
    }
    setSearchQuery("");
  };

  const addToInvoice = () => {
    if (!draftItem.productId) return;
    onChange({
      ...data,
      productLines: [...data.productLines, { ...draftItem }]
    });
    setDraftItem({ ...EMPTY_LINE });
  };

  const filteredProducts = PREDEFINED_PRODUCTS.filter(p => 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col min-w-0">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center py-2 z-10 border-b no-print">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary">Editor</h2>
          <AIDraftDialog onDraft={(draft) => onChange(draft)} currentData={data} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-20 px-1 custom-scrollbar">
        {/* Customer Section */}
        <Card className="shadow-sm border-none bg-gray-50/50">
          <CardHeader className="py-2 px-4 border-b">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Customer Info</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Cust ID</Label>
              <Input className="h-8 text-sm" value={data.customer.customerId} onChange={(e) => handleCustomerChange('customerId', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Name</Label>
              <Input className="h-8 text-sm font-bold" value={data.customer.name} onChange={(e) => handleCustomerChange('name', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Address</Label>
              <Input className="h-8 text-sm" value={data.customer.address} onChange={(e) => handleCustomerChange('address', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Phone</Label>
              <Input className="h-8 text-sm" value={data.customer.phone} onChange={(e) => handleCustomerChange('phone', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Route</Label>
              <Input className="h-8 text-sm font-bold" value={data.customer.route} onChange={(e) => handleCustomerChange('route', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* MPO Info Section */}
        <Card className="shadow-sm border-none bg-gray-50/50">
          <CardHeader className="py-2 px-4 border-b">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">MPO & Invoice Info</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Summary</Label>
              <Input className="h-8 text-sm font-bold" value={data.mpo.summary} onChange={(e) => handleMpoChange('summary', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Sum Date</Label>
              <Input className="h-8 text-sm font-bold text-red-600" value={data.mpo.sumDate} onChange={(e) => handleMpoChange('sumDate', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">MPO Name</Label>
              <Input className="h-8 text-sm font-bold" value={data.mpo.name} onChange={(e) => handleMpoChange('name', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Depot</Label>
              <Input className="h-8 text-sm" value={data.mpo.depot} onChange={(e) => handleMpoChange('depot', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Invoice No</Label>
              <Input className="h-8 text-sm font-bold" value={data.header.invoiceNo} onChange={(e) => handleHeaderChange('invoiceNo', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Invoice Date</Label>
              <Input className="h-8 text-sm" value={data.header.invoiceDate} onChange={(e) => handleHeaderChange('invoiceDate', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Add Product Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <h3 className="font-black text-lg text-secondary uppercase tracking-tight">Add New Product</h3>
          </div>
          
          <Card className="border-2 border-primary/20 shadow-md">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-primary uppercase">1. Search & Select Product</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between h-10 text-left bg-white border-primary/30">
                      {draftItem.productId ? `${draftItem.productId} - ${draftItem.description}` : "Find product by ID or Name..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[calc(100vw-32px)] sm:w-[450px] p-0" align="start">
                    <div className="flex items-center border-b px-3">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <input
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                        placeholder="Type ID or Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <ScrollArea className="h-72">
                      <div className="p-1">
                        {filteredProducts.map((p) => (
                          <button
                            key={p.id}
                            className={cn(
                              "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-3 text-sm outline-none hover:bg-primary/10 border-b last:border-0",
                              draftItem.productId === p.id && "bg-primary/5"
                            )}
                            onClick={() => handleProductSelect(p.id)}
                          >
                            <div className="flex flex-col items-start gap-0.5 text-left w-full">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-primary">{p.id}</span>
                                <span className="font-semibold">{p.name}</span>
                              </div>
                              <span className="text-[10px] text-muted-foreground uppercase">{p.packSize}</span>
                            </div>
                            {draftItem.productId === p.id && <Check className="ml-auto h-4 w-4 text-primary" />}
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>

              {draftItem.productId && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold">UNIT TP</Label>
                    <Input className="h-9" type="number" step="0.01" value={draftItem.unitTp} onChange={(e) => setDraftItem({...draftItem, unitTp: parseFloat(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold">QTY</Label>
                    <Input className="h-9 font-bold" type="number" value={draftItem.quantity} onChange={(e) => setDraftItem({...draftItem, quantity: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold">BONUS</Label>
                    <Input className="h-9" type="number" value={draftItem.bonus} onChange={(e) => setDraftItem({...draftItem, bonus: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold">SPEC. DIS</Label>
                    <Input className="h-9" type="number" step="0.01" value={draftItem.specialDis} onChange={(e) => setDraftItem({...draftItem, specialDis: parseFloat(e.target.value) || 0})} />
                  </div>
                  <div className="col-span-2 sm:col-span-4 pt-2">
                    <Button onClick={addToInvoice} className="w-full bg-primary hover:bg-primary/90 font-bold uppercase tracking-wider">
                      <Save className="w-4 h-4 mr-2" /> Add to Invoice
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Existing Items List */}
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-black text-lg text-secondary uppercase tracking-tight">Invoice Items ({data.productLines.length})</h3>
          </div>
          <div className="space-y-2">
            {data.productLines.map((line, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm group hover:border-primary/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-primary">{line.productId}</span>
                  <span className="font-bold text-sm">{line.description}</span>
                  <div className="flex gap-4 text-[10px] text-muted-foreground mt-1">
                    <span>QTY: <b className="text-gray-900">{line.quantity}</b></span>
                    <span>BONUS: <b className="text-gray-900">{line.bonus}</b></span>
                    <span>TP: <b className="text-gray-900">{line.unitTp.toFixed(2)}</b></span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeLine(idx)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
