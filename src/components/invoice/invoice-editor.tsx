
"use client"

import React, { useState } from 'react';
import { InvoiceData, ProductLine } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Search, Check, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { AIDraftDialog } from './ai-draft-dialog';
import { PREDEFINED_PRODUCTS } from '@/lib/invoice-utils';
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useFirestore } from '@/firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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

const EMPTY_MANUAL_ITEM = {
  pid: '',
  name: '',
  packSize: '',
  tpVat: 0,
  quantity: 1,
  bonus: 0,
};

export function InvoiceEditor({ data, onChange }: InvoiceEditorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [draftItem, setDraftItem] = useState<ProductLine & { isPriceEditable?: boolean, updateDb?: boolean }>({ ...EMPTY_LINE });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isManualAddOpen, setIsManualAddOpen] = useState(false);
  const [manualItem, setManualItem] = useState(EMPTY_MANUAL_ITEM);
  const db = useFirestore();
  const { toast } = useToast();

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

  const handleHeaderChange = (field: keyof InvoiceData['header'], value: string | Date) => {
    onChange({
      ...data,
      header: { ...data.header, [field]: value }
    });
  };

  const removeLine = (index: number) => {
    const newLines = data.productLines.filter((_, i) => i !== index);
    onChange({ ...data, productLines: newLines });
  };

  const handleProductSelect = (pid: string) => {
    const product = PREDEFINED_PRODUCTS.find(p => p.pid === pid);
    if (product) {
      const isPriceEditable = product.tpVat === 0;
      setDraftItem({
        ...draftItem,
        productId: product.pid,
        description: product.name,
        packSize: product.packSize,
        unitTp: product.tpVat / (1 + 17.4 / 100),
        vatRate: 17.4,
        isPriceEditable,
        updateDb: false
      });
    }
    setSearchQuery("");
    setPopoverOpen(false);
  };

  const addToInvoice = async () => {
    if (!draftItem.productId) return;

    // Handle Database Update if price was manually entered and checkbox is checked
    if (draftItem.isPriceEditable && draftItem.updateDb && draftItem.productId) {
      try {
        const tpVat = draftItem.unitTp * (1 + 17.4 / 100);
        await setDoc(doc(db, "products", draftItem.productId), {
          pid: draftItem.productId,
          name: draftItem.description,
          tpVat: tpVat,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        toast({ title: "Database Updated", description: "Product price has been saved." });
      } catch (e) {
        console.error("Failed to update database", e);
      }
    }

    onChange({
      ...data,
      productLines: [...data.productLines, { ...draftItem }]
    });
    setDraftItem({ ...EMPTY_LINE });
  };

  const handleOpenManualAdd = () => {
    setManualItem({ ...EMPTY_MANUAL_ITEM, pid: searchQuery });
    setPopoverOpen(false);
    setIsManualAddOpen(true);
  };

  const handleManualAdd = () => {
    if (!manualItem.name.trim() || manualItem.tpVat <= 0) {
      return;
    }
    const newLine: ProductLine = {
      productId: manualItem.pid || `MANUAL-${Date.now()}`,
      description: manualItem.name,
      packSize: manualItem.packSize,
      unitTp: manualItem.tpVat / (1 + 17.4 / 100),
      vatRate: 17.4,
      unitDis: 0,
      quantity: manualItem.quantity,
      bonus: manualItem.bonus,
      specialDis: 0,
    };
    onChange({
      ...data,
      productLines: [...data.productLines, newLine]
    });
    setIsManualAddOpen(false);
    setManualItem(EMPTY_MANUAL_ITEM);
  };

  // Hybrid Search Logic: Searches by PID OR Name
  const filteredProducts = PREDEFINED_PRODUCTS.filter(p => {
    const query = (searchQuery || "").toLowerCase();
    const pid = String(p.pid || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
    return pid.includes(query) || name.includes(query);
  });

  return (
    <div className="space-y-6 h-full flex flex-col min-w-0">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center py-2 z-10 border-b no-print">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary">Invoice Editor</h2>
          <AIDraftDialog onDraft={(draft) => onChange(draft)} currentData={data} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-20 px-1 custom-scrollbar">
        <Card className="shadow-sm border-none bg-gray-50/50">
          <CardHeader className="py-2 px-4 border-b">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Customer ID</Label>
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

        <Card className="shadow-sm border-none bg-gray-50/50">
          <CardHeader className="py-2 px-4 border-b">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Invoice No</Label>
              <Input className="h-8 text-sm font-bold" value={data.header.invoiceNo} onChange={(e) => handleHeaderChange('invoiceNo', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Order Book No</Label>
              <Input className="h-8 text-sm font-bold" value={data.header.orderBookNo} onChange={(e) => handleHeaderChange('orderBookNo', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-gray-500">Category</Label>
              <Input className="h-8 text-sm" value={data.header.category} onChange={(e) => handleHeaderChange('category', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-primary">Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-8 text-sm font-black border-primary/50 text-primary",
                      !data.header.deliveryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.header.deliveryDate ? format(new Date(data.header.deliveryDate), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(data.header.deliveryDate)}
                    onSelect={(date) => handleHeaderChange('deliveryDate', date ? format(date, 'yyyy-MM-dd') : '')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <h3 className="font-black text-lg text-secondary uppercase tracking-tight">Product Selection (ID or Name)</h3>
          </div>
          
          <Card className="border-2 border-primary/20 shadow-md">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-primary uppercase">Search PID or Drug Name</Label>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between h-10 text-left bg-white border-primary/30">
                      {draftItem.productId ? `${draftItem.productId} - ${draftItem.description}` : "Type ID or Name..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[calc(100vw-32px)] sm:w-[450px] p-0 shadow-xl" align="start">
                    <div className="flex items-center border-b px-3 bg-gray-50">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <input
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                        placeholder="Search by PID or Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <ScrollArea className="h-72">
                      <div className="p-1">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((p) => (
                            <button
                              key={p.pid}
                              className={cn(
                                "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-3 text-sm outline-none hover:bg-primary/10 border-b last:border-0",
                                draftItem.productId === p.pid && "bg-primary/5"
                              )}
                              onClick={() => handleProductSelect(p.pid)}
                            >
                              <div className="flex flex-col items-start gap-0.5 text-left w-full">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-primary min-w-[50px]">{p.pid}</span>
                                  <span className="font-semibold text-gray-900">{p.name}</span>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase">
                                  <span>{p.packSize}</span>
                                  <span>TP+VAT: {p.tpVat.toFixed(2)}</span>
                                </div>
                              </div>
                              {draftItem.productId === p.pid && <Check className="ml-auto h-4 w-4 text-primary" />}
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-sm text-muted-foreground">No matches found for "{searchQuery}".</p>
                            <Button 
                              variant="link" 
                              onClick={handleOpenManualAdd}
                              className="text-primary mt-2 flex items-center gap-1 mx-auto"
                            >
                              <Plus className="w-4 h-4" /> Manually add data
                            </Button>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>

              {draftItem.productId && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold">QTY</Label>
                      <Input className="h-9 font-bold" type="number" value={draftItem.quantity} onChange={(e) => setDraftItem({...draftItem, quantity: parseInt(e.target.value) || 0})} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold">BONUS</Label>
                      <Input className="h-9" type="number" value={draftItem.bonus} onChange={(e) => setDraftItem({...draftItem, bonus: parseInt(e.target.value) || 0})} />
                    </div>
                    {draftItem.isPriceEditable ? (
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-primary">TP + VAT (Required)</Label>
                        <Input 
                          className="h-9 border-primary/50 font-bold" 
                          type="number" 
                          placeholder="Enter Price"
                          onChange={(e) => {
                            const tpVat = parseFloat(e.target.value) || 0;
                            setDraftItem({
                              ...draftItem, 
                              unitTp: tpVat / (1 + 17.4 / 100)
                            });
                          }} 
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-muted-foreground">Unit TP (Auto)</Label>
                        <div className="h-9 flex items-center px-3 bg-gray-100 rounded-md text-sm font-semibold">
                          {((draftItem.unitTp || 0) * (1 + (draftItem.vatRate || 17.4) / 100)).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  {draftItem.isPriceEditable && (
                    <div className="flex items-center space-x-2 bg-primary/5 p-2 rounded-md border border-primary/20">
                      <Checkbox 
                        id="update-db" 
                        checked={draftItem.updateDb} 
                        onCheckedChange={(checked) => setDraftItem({...draftItem, updateDb: !!checked})} 
                      />
                      <label htmlFor="update-db" className="text-xs font-bold text-primary cursor-pointer">
                        Update this price in database?
                      </label>
                    </div>
                  )}

                  <Button onClick={addToInvoice} className="w-full bg-primary hover:bg-primary/90 font-bold uppercase tracking-wider h-11">
                    Add Product to List
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Dialog open={isManualAddOpen} onOpenChange={setIsManualAddOpen}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-lg">ম্যানুয়ালি প্রোডাক্ট যোগ করুন</DialogTitle>
                    <DialogDescription className="text-xs">
                        নতুন প্রোডাক্টের তথ্য দিন।
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-2">
                    <div className="space-y-1">
                        <Label htmlFor="pid" className="text-[10px] uppercase font-bold text-gray-500">Product ID</Label>
                        <Input id="pid" value={manualItem.pid} onChange={(e) => setManualItem({...manualItem, pid: e.target.value })} className="h-8 text-sm" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-[10px] uppercase font-bold text-gray-500">Product Name</Label>
                        <Input id="name" value={manualItem.name} onChange={(e) => setManualItem({...manualItem, name: e.target.value })} className="h-8 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                            <Label htmlFor="packSize" className="text-[10px] uppercase font-bold text-gray-500">Pack Size</Label>
                            <Input id="packSize" value={manualItem.packSize} onChange={(e) => setManualItem({...manualItem, packSize: e.target.value })} className="h-8 text-sm" />
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="tpVat" className="text-[10px] uppercase font-bold text-gray-500">TP + VAT</Label>
                            <Input id="tpVat" type="number" value={manualItem.tpVat} onChange={(e) => setManualItem({...manualItem, tpVat: parseFloat(e.target.value) || 0 })} className="h-8 text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="quantity" className="text-[10px] uppercase font-bold text-gray-500">Quantity</Label>
                            <Input id="quantity" type="number" value={manualItem.quantity} onChange={(e) => setManualItem({...manualItem, quantity: parseInt(e.target.value) || 1 })} className="h-8 text-sm" />
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="bonus" className="text-[10px] uppercase font-bold text-gray-500">Bonus</Label>
                            <Input id="bonus" type="number" value={manualItem.bonus} onChange={(e) => setManualItem({...manualItem, bonus: parseInt(e.target.value) || 0 })} className="h-8 text-sm" />
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-2">
                    <Button onClick={handleManualAdd} className="w-full h-9 text-xs font-bold uppercase tracking-wider">Add to list</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

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
                    <span>TP: <b className="text-gray-900">{((line.unitTp || 0) * (1 + (line.vatRate || 0)/100)).toFixed(2)}</b></span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeLine(idx)}>
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
