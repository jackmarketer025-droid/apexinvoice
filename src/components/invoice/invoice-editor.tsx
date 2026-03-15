"use client"

import React from 'react';
import { InvoiceData, ProductLine } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Search } from 'lucide-react';
import { AIDraftDialog } from './ai-draft-dialog';
import { PREDEFINED_PRODUCTS } from '@/lib/invoice-utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InvoiceEditorProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export function InvoiceEditor({ data, onChange }: InvoiceEditorProps) {
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
        { productId: '', description: '', packSize: '', unitTp: 0, vatRate: 17.4, quantity: 1 }
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
  };

  return (
    <div className="space-y-6 max-h-full overflow-y-auto pb-10 px-1 custom-scrollbar">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center sticky top-0 bg-[#FAF8F8] py-2 z-10 border-b mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-secondary">Edit Invoice</h2>
        <AIDraftDialog onDraft={(draft) => onChange(draft)} currentData={data} />
      </div>

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
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-secondary">Product Line Items</h3>
          <Button onClick={addLine} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>
        
        <div className="space-y-4">
          {data.productLines.map((line, idx) => (
            <Card key={idx} className="relative overflow-hidden group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                onClick={() => removeLine(idx)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <CardContent className="p-4 pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-4 space-y-1">
                    <Label className="text-[10px]">Select Product (Quick Add)</Label>
                    <Select onValueChange={(val) => handleProductSelect(idx, val)} value={line.productId}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Quick select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {PREDEFINED_PRODUCTS.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.id} - {p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <Label className="text-[10px]">P Id</Label>
                    <Input className="h-8 text-xs" value={line.productId} onChange={(e) => handleLineChange(idx, 'productId', e.target.value)} />
                  </div>
                  <div className="sm:col-span-6 space-y-1">
                    <Label className="text-[10px]">Description</Label>
                    <Input className="h-8 text-xs" value={line.description} onChange={(e) => handleLineChange(idx, 'description', e.target.value)} />
                  </div>
                  <div className="sm:col-span-4 space-y-1">
                    <Label className="text-[10px]">Pack Size</Label>
                    <Input className="h-8 text-xs" value={line.packSize} onChange={(e) => handleLineChange(idx, 'packSize', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <Label className="text-[10px]">Qty</Label>
                    <Input className="h-8 text-xs" type="number" value={line.quantity} onChange={(e) => handleLineChange(idx, 'quantity', parseInt(e.target.value) || 0)} />
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <Label className="text-[10px]">Unit TP</Label>
                    <Input className="h-8 text-xs" type="number" step="0.01" value={line.unitTp} onChange={(e) => handleLineChange(idx, 'unitTp', parseFloat(e.target.value) || 0)} />
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <Label className="text-[10px]">VAT %</Label>
                    <Input className="h-8 text-xs" type="number" step="0.1" value={line.vatRate} onChange={(e) => handleLineChange(idx, 'vatRate', parseFloat(e.target.value) || 0)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
