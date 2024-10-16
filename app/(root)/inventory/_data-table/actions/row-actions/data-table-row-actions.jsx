// "use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog } from "@/components/ui/dialog";
import { Sheet } from "@/components/ui/sheet";

import { Copy, Eye, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

import { AlertDialog } from "@/components/ui/alert-dialog";
import ViewDeviceDetailsDialog from "./view-device-details/ViewDeviceDetailsDialog";
import EditDevicesSheet from "./edit-devices/edit-device";
import DeleteDeviceAlertDialog from "./delete-device/delete-device";
import { toast } from "sonner";

export default function DataTableRowActions({ deviceInfo }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeSheet = () => {
    setSheetOpen(false);
  };

  return (
    <>
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" disabled>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* Copy ID */}
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(deviceInfo.device_id);
                toast("Copied to clipboard!");
              }}
            >
              <Copy size={16} />
              Copy Device ID
            </DropdownMenuItem>

            {/* View All Details */}
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              <Eye size={16} />
              View All Details
            </DropdownMenuItem>

            {/* Edit */}
            <DropdownMenuItem onClick={() => setSheetOpen(true)}>
              <SquarePen size={16} />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Delete */}
            <DropdownMenuItem
              className="!text-red-700 dark:!text-red-300"
              onClick={() => setAlertDialogOpen(true)}
            >
              <Trash2 size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Edit Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <EditDevicesSheet deviceInfo={deviceInfo} closeSheet={closeSheet} />
      </Sheet>
      {/* View Device Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <ViewDeviceDetailsDialog deviceInfo={deviceInfo} />
      </Dialog>
      {/* Delete Alert */}
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DeleteDeviceAlertDialog deviceInfo={deviceInfo} />
      </AlertDialog>
    </>
  );
}
