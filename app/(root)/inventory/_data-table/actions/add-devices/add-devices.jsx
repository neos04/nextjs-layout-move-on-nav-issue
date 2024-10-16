"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddSingleForm from "./AddSingleForm";
import AddBulkForm from "./AddBulkForm";
import { toast } from "sonner";
import { revalidatePathClient } from "@/lib/server-actions/revalidatePathClient";

export default function AddDevices() {
  let [open, setOpen] = useState(false);

  // If Submission is successful
  const successfulSubmission = () => {
    setOpen(false);

    revalidatePathClient("/inventory");
    revalidatePathClient("/");
    revalidatePathClient("/logs");
    toast.success("Device(s) added succesfully");
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button disabled>
            <Plus size={20} />
            Add Device(s)
          </Button>
        </SheetTrigger>

        <SheetContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <SheetHeader>
            <SheetTitle>Add Device(s)</SheetTitle>
          </SheetHeader>
          {/* Tabs */}
          <Tabs
            defaultValue="single"
            className="flex w-full flex-col items-center overflow-y-hidden"
          >
            <TabsList>
              <TabsTrigger value="single">Single</TabsTrigger>
              <TabsTrigger value="bulk">Bulk</TabsTrigger>
            </TabsList>

            {/* Single */}
            <TabsContent value="single" className="w-full">
              <ScrollArea className="h-[78vh] w-full">
                <AddSingleForm successfulSubmission={successfulSubmission} />
              </ScrollArea>
            </TabsContent>

            {/* ------------------------------------------------------------------------ */}

            {/* Bulk */}
            <TabsContent value="bulk" className="w-full">
              <div>
                {/* Upload Area */}
                <AddBulkForm successfulSubmission={successfulSubmission} />
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
}
