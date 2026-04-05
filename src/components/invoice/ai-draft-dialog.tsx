"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";
import { draftInvoice } from "@/ai/flows/ai-assisted-invoice-drafting";
import { InvoiceData, ProductLine } from '@/types/invoice';
import { useToast } from '@/hooks/use-toast';

interface AIDraftDialogProps {
  onDraft: (data: InvoiceData) => void;
  currentData: InvoiceData;
}

export function AIDraftDialog({ onDraft, currentData }: AIDraftDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAIDraft = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await draftInvoice(prompt);
      
      const mergedData: InvoiceData = {
        customer: {
          customerId: result.customer?.customerId || currentData.customer.customerId,
          name: result.customer?.name || currentData.customer.name,
          address: result.customer?.address || currentData.customer.address,
          phone: result.customer?.phone || currentData.customer.phone,
          route: result.customer?.route || currentData.customer.route,
        },
        mpo: {
          depot: result.mpo?.depot || currentData.mpo.depot,
          mpoId: result.mpo?.mpoId || currentData.mpo.mpoId,
          name: result.mpo?.name || currentData.mpo.name,
          summary: result.mpo?.summary || currentData.mpo.summary,
          sumDate: result.mpo?.sumDate || currentData.mpo.sumDate,
        },
        header: {
          category: result.invoice?.category || currentData.header.category,
          invoiceNo: result.invoice?.invoiceNo || currentData.header.invoiceNo,
          invoiceDate: result.invoice?.invoiceDate || currentData.header.invoiceDate,
          orderBookNo: result.invoice?.orderBookNo || currentData.header.orderBookNo,
          deliveryDate: result.invoice?.deliveryDate || currentData.header.deliveryDate,
        },
        productLines: result.productLines?.map((p: any) => ({
          productId: p.productId || '',
          description: p.description || '',
          packSize: p.packSize || '',
          unitTp: p.unitTpVat ? p.unitTpVat / (1 + 17.4/100) : 0,
          vatRate: 17.4,
          unitDis: 0,
          quantity: p.quantity || 0,
          bonus: 0,
          specialDis: 0
        })) || currentData.productLines,
        discountRate: currentData.discountRate,
      };

      onDraft(mergedData);
      setOpen(false);
      setPrompt("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: "There was an error generating the invoice. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <Wand2 className="w-4 h-4" /> AI Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>AI Invoice Drafting</DialogTitle>
          <DialogDescription>
            Describe the invoice details in natural language (e.g., "Create an invoice for Parvez Pharmacy at Bazar Road for 20 Apocal-D tablets").
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea 
            placeholder="Type your invoice description here..." 
            className="min-h-[150px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAIDraft} disabled={loading || !prompt.trim()}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
            Generate Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
