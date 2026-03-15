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
        { productId: '', description: '', packSize: '', unitTp: 0, vatRate: 0, quantity: 1 }
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
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            <div className="space-y-2">
              <Label>Customer ID</Label>
              <Input value={data.customer.customerId} onChange={(e) => handleCustomerChange('customerId', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={data.customer.name} onChange={(e) => handleCustomerChange('name', e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Address</Label>
              <Input value={data.customer.address} onChange={(e) => handleCustomerChange('address', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Route</Label>
              <Input value={data.customer.route} onChange={(e) => handleCustomerChange('route', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">MPO & Invoice Metadata</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            <div className="space-y-2">
              <Label>Depot</Label>
              <Input value={data.mpo.depot} onChange={(e) => handleMpoChange('depot', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>MPO Name</Label>
              <Input value={data.mpo.name} onChange={(e) => handleMpoChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Invoice No</Label>
              <Input value={data.header.invoiceNo} onChange={(e) => handleHeaderChange('invoiceNo', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Invoice Date</Label>
              <Input type="text" placeholder="DD-MM-YYYY" value={data.header.invoiceDate} onChange={(e) => handleHeaderChange('invoiceDate', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center sticky top-0 bg-[#FAF8F8] z-10 py-2">
            <h3 className="font-bold text-lg text-secondary">Product Line Items</h3>
            <Button onClick={addLine} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {data.productLines.map((line, idx) => (
              <Card key={idx} className="relative overflow-hidden group border-l-4 border-l-primary">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                  onClick={() => removeLine(idx)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <CardContent className="p-4 pt-10">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-12 space-y-1.5">
                      <Label className="text-xs font-bold text-gray-500 uppercase">Search Product (ID or Name)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" role="combobox" className="w-full justify-between h-10 font-normal">
                            {line.productId ? `${line.productId} - ${line.description}` : "Select or search product..."}
                            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0" align="start">
                          <div className="flex items-center border-b px-3">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <input
                              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                              placeholder="Type product name or ID..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <ScrollArea className="h-72">
                            <div className="p-1">
                              {filteredProducts.length === 0 && (
                                <p className="p-4 text-center text-sm text-muted-foreground">No product found.</p>
                              )}
                              {filteredProducts.map((p) => (
                                <button
                                  key={p.id}
                                  className={cn(
                                    "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                    line.productId === p.id && "bg-accent"
                                  )}
                                  onClick={() => handleProductSelect(idx, p.id)}
                                >
                                  <div className="flex flex-col items-start gap-1">
                                    <span className="font-bold text-primary">{p.id}</span>
                                    <span className="text-xs font-medium">{p.name}</span>
                                    <span className="text-[10px] text-muted-foreground">{p.packSize} • {p.unitTp} TP</span>
                                  </div>
                                  {line.productId === p.id && <Check className="ml-auto h-4 w-4" />}
                                </button>
                              ))}
                            </div>
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="sm:col-span-2 space-y-1">
                      <Label className="text-[10px] font-bold">P ID</Label>
                      <Input className="h-9 text-sm" value={line.productId} readOnly disabled />
                    </div>
                    <div className="sm:col-span-6 space-y-1">
                      <Label className="text-[10px] font-bold">DESCRIPTION</Label>
                      <Input className="h-9 text-sm" value={line.description} onChange={(e) => handleLineChange(idx, 'description', e.target.value)} />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <Label className="text-[10px] font-bold">QTY</Label>
                      <Input className="h-9 text-sm" type="number" value={line.quantity} onChange={(e) => handleLineChange(idx, 'quantity', parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <Label className="text-[10px] font-bold">UNIT TP</Label>
                      <Input className="h-9 text-sm font-bold" type="number" step="0.01" value={line.unitTp} onChange={(e) => handleLineChange(idx, 'unitTp', parseFloat(e.target.value) || 0)} />
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
