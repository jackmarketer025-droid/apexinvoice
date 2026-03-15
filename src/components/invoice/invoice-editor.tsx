"use client"

import React from 'react';
import { InvoiceData, ProductLine } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AIDraftDialog } from './ai-draft-dialog';

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

  return (
    <div className="space-y-6 max-h-[calc(100vh-100px)] overflow-y-auto pr-4 custom-scrollbar">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-headline text-secondary">Edit Invoice</h2>
        <AIDraftDialog onDraft={(draft) => onChange(draft)} currentData={data} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Customer ID</Label>
            <Input value={data.customer.customerId} onChange={(e) => handleCustomerChange('customerId', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.customer.name} onChange={(e) => handleCustomerChange('name', e.target.value)} />
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Address</Label>
            <Input value={data.customer.address} onChange={(e) => handleCustomerChange('address', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={data.customer.phone} onChange={(e) => handleCustomerChange('phone', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Route</Label>
            <Input value={data.customer.route} onChange={(e) => handleCustomerChange('route', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">MPO & Depot</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Depot</Label>
            <Input value={data.mpo.depot} onChange={(e) => handleMpoChange('depot', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>MPO ID</Label>
            <Input value={data.mpo.mpoId} onChange={(e) => handleMpoChange('mpoId', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.mpo.name} onChange={(e) => handleMpoChange('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Summary Code</Label>
            <Input value={data.mpo.summary} onChange={(e) => handleMpoChange('summary', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Invoice Metadata</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Input value={data.header.category} onChange={(e) => handleHeaderChange('category', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Invoice No</Label>
            <Input value={data.header.invoiceNo} onChange={(e) => handleHeaderChange('invoiceNo', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Invoice Date</Label>
            <Input type="text" placeholder="DD-MM-YYYY" value={data.header.invoiceDate} onChange={(e) => handleHeaderChange('invoiceDate', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Order Book No</Label>
            <Input value={data.header.orderBookNo} onChange={(e) => handleHeaderChange('orderBookNo', e.target.value)} />
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
        
        {data.productLines.map((line, idx) => (
          <Card key={idx} className="relative overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
              onClick={() => removeLine(idx)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <CardContent className="p-4 grid grid-cols-12 gap-3 pt-8">
              <div className="col-span-2 space-y-1">
                <Label className="text-[10px]">ID</Label>
                <Input className="h-8 text-xs" value={line.productId} onChange={(e) => handleLineChange(idx, 'productId', e.target.value)} />
              </div>
              <div className="col-span-5 space-y-1">
                <Label className="text-[10px]">Description</Label>
                <Input className="h-8 text-xs" value={line.description} onChange={(e) => handleLineChange(idx, 'description', e.target.value)} />
              </div>
              <div className="col-span-3 space-y-1">
                <Label className="text-[10px]">Pack Size</Label>
                <Input className="h-8 text-xs" value={line.packSize} onChange={(e) => handleLineChange(idx, 'packSize', e.target.value)} />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-[10px]">Qty</Label>
                <Input className="h-8 text-xs" type="number" value={line.quantity} onChange={(e) => handleLineChange(idx, 'quantity', parseInt(e.target.value) || 0)} />
              </div>
              <div className="col-span-3 space-y-1">
                <Label className="text-[10px]">Unit TP</Label>
                <Input className="h-8 text-xs" type="number" step="0.01" value={line.unitTp} onChange={(e) => handleLineChange(idx, 'unitTp', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="col-span-3 space-y-1">
                <Label className="text-[10px]">VAT %</Label>
                <Input className="h-8 text-xs" type="number" step="0.1" value={line.vatRate} onChange={(e) => handleLineChange(idx, 'vatRate', parseFloat(e.target.value) || 0)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Label className="font-bold">Global Discount (%)</Label>
            <Input 
              className="w-24" 
              type="number" 
              value={data.discountRate} 
              onChange={(e) => onChange({ ...data, discountRate: parseFloat(e.target.value) || 0 })} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}