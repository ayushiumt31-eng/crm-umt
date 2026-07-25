import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import type { Campaign } from "../types/campaign";

interface DeleteCampaignDialogProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteCampaignDialog({
  campaign,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteCampaignDialogProps) {
  if (!campaign) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-500">
            <Trash2 className="h-5 w-5" />
            Delete Campaign
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-0">
            Are you sure you want to delete the campaign{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {campaign.name}
            </strong>
            ?<br />
            This will permanently remove this campaign record. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? "Deleting..." : "Delete Campaign"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

