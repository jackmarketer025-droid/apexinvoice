"use client"

import React, { useState } from 'react';
import { InvoiceData, ProductLine } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Search, Check } from 'lucide-react';
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

export function InvoiceEditor({ data, onChange }: InvoiceEditorProps) {
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleLineChange = (index: number, field: keyof ProductLine, value: string | number) => {
    const newLines = [...data.productLines];
    newLines[index] = { ...newLines[index], [field]: value };
    onChange({ ...data, productLines: newLines });
  };

  const addLine = () => {
    onChange({
      ...data,
      productLines: [
        ...data.productLines,
        { productId: '', description: '', packSize: '', unitTp: 0, vatRate: 17.4, unitDis: 0, quantity: 1, specialDis: 0 }
      ]
    });
  };

  const removeLine = (index: number) => {
    const newLines = data.productLines.filter((_, i) => i !== index);
    onChange({ ...data, productLines: newLines });
  };

  const handleProductSelect = (index: number, productId: string) => {
    const product = PREDEFINED_PRODUCTS.find(p => p.id === productId);
    if (product) {
      const newLines = [...data.productLines];
      newLines[index] = {
        ...newLines[index],
        productId: product.id,
        description: product.name,
        packSize: product.packSize,
        unitTp: product.unitTp,
        vatRate: product.vatRate,
      };
      onChange({ ...data, productLines: newLines });
    }
    setSearchQuery("");
  };

  const filteredProducts = PREDEFINED_PRODUCTS.filter(p => 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col min-w-0">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center py-2 z-10 border-b no-print">
        <h2 className="text-xl md:text-2xl font-bold text-secondary">Edit Invoice</h2>
        <AIDraftDialog onDraft={(draft) => onChange(draft)} currentData={data} />
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-10 px-1 custom-scrollbar">
        {/* Customer Section */}
        <Card className="shadow-sm">
          <CardHeader className="py-3 px-4 border-b">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            <div className="space-y-1">
              <Label className="text-xs">Customer ID</Label>
              <Input className="h-9" value={data.customer.customerId} onChange={(e) => handleCustomerChange('customerId', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Name</Label>
              <Input className="h-9" value={data.customer.name} onChange={(e) => handleCustomerChange('name', e.target.value)} />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-xs">Address</Label>
              <Input className="h-9" value={data.customer.address} onChange={(e) => handleCustomerChange('address', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Route</Label>
              <Input className="h-9" value={data.customer.route} onChange={(e) => handleCustomerChange('route', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Metadata Section */}
        <Card className="shadow-sm">
          <CardHeader className="py-3 px-4 border-b">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Depot & MPO Info</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            <div className="space-y-1">
              <Label className="text-xs">Depot</Label>
              <Input className="h-9" value={data.mpo.depot} onChange={(e) => handleMpoChange('depot', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">MPO Name</Label>
              <Input className="h-9" value={data.mpo.name} onChange={(e) => handleMpoChange('name', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Invoice No</Label>
              <Input className="h-9" value={data.header.invoiceNo} onChange={(e) => handleHeaderChange('invoiceNo', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Invoice Date</Label>
              <Input className="h-9" placeholder="DD-MM-YYYY" value={data.header.invoiceDate} onChange={(e) => handleHeaderChange('invoiceDate', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Product List Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center sticky top-0 bg-[#FAF8F8] z-20 py-2 border-b">
            <h3 className="font-bold text-lg text-secondary">Product Line Items</h3>
            <Button onClick={addLine} size="sm" variant="default" className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> Add New Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {data.productLines.map((line, idx) => (
              <Card key={idx} className="relative overflow-visible group border-l-4 border-l-primary shadow-sm">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-destructive hover:bg-destructive/10 z-10"
                  onClick={() => removeLine(idx)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <CardContent className="p-4 pt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-12 space-y-1.5">
                      <Label className="text-[10px] font-bold text-gray-500 uppercase">Search and Select Product (Code or Name)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" role="combobox" className="w-full justify-between h-10 font-medium text-left">
                            {line.productId ? `${line.productId} - ${line.description}` : "Find product by code or name..."}
                            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[calc(100vw-32px)] sm:w-[450px] p-0" align="start">
                          <div className="flex items-center border-b px-3">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <input
                              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                              placeholder="Type ID (e.g. 10023) or Name (e.g. Acorex)..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <ScrollArea className="h-72">
                            <div className="p-1">
                              {filteredProducts.length === 0 && (
                                <p className="p-4 text-center text-sm text-muted-foreground">No product matched your search.</p>
                              )}
                              {filteredProducts.map((p) => (
                                <button
                                  key={p.id}
                                  className={cn(
                                    "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-3 text-sm outline-none hover:bg-accent hover:text-accent-foreground border-b last:border-0",
                                    line.productId === p.id && "bg-accent/50"
                                  )}
                                  onClick={() => handleProductSelect(idx, p.id)}
                                >
                                  <div className="flex flex-col items-start gap-0.5 text-left w-full">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-primary">{p.id}</span>
                                      <span className="font-semibold">{p.name}</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground uppercase">{p.packSize} • {p.unitTp} TP • {p.vatRate}% VAT</span>
                                  </div>
                                  {line.productId === p.id && <Check className="ml-auto h-4 w-4 text-primary" />}
                                </button>
                              ))}
                            </div>
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="sm:col-span-3 space-y-1">
                      <Label className="text-[10px] font-bold">UNIT TP</Label>
                      <Input className="h-9 text-sm" type="number" step="0.01" value={line.unitTp} onChange={(e) => handleLineChange(idx, 'unitTp', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="sm:col-span-3 space-y-1">
                      <Label className="text-[10px] font-bold">VAT RATE %</Label>
                      <Input className="h-9 text-sm" type="number" step="0.1" value={line.vatRate} onChange={(e) => handleLineChange(idx, 'vatRate', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="sm:col-span-3 space-y-1">
                      <Label className="text-[10px] font-bold">UNIT DIS</Label>
                      <Input className="h-9 text-sm" type="number" step="0.01" value={line.unitDis} onChange={(e) => handleLineChange(idx, 'unitDis', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="sm:col-span-3 space-y-1">
                      <Label className="text-[10px] font-bold">QTY</Label>
                      <Input className="h-9 text-sm" type="number" min="1" value={line.quantity} onChange={(e) => handleLineChange(idx, 'quantity', parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="sm:col-span-12 space-y-1">
                      <Label className="text-[10px] font-bold text-blue-600">SPECIAL DISCOUNT (Total for line)</Label>
                      <Input className="h-9 text-sm border-blue-200" type="number" step="0.01" value={line.specialDis} onChange={(e) => handleLineChange(idx, 'specialDis', parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
