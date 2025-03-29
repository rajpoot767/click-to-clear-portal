
import React from "react";
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
import DeleteIcon from "./DeleteIcon";
import { toast } from "sonner";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmationDialogProps) => {
  const handleDelete = () => {
    onDelete();
    toast.success("File deleted successfully");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md rounded-lg p-6 bg-white">
        <AlertDialogHeader className="text-center space-y-4">
          <AlertDialogTitle className="text-xl font-medium text-gray-800">
            Do you really want to delete the file?
          </AlertDialogTitle>
          <div className="py-2">
            <DeleteIcon />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-center pt-2">
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
          >
            Yes delete the file
          </AlertDialogAction>
          <AlertDialogCancel className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full sm:w-auto">
            Cancel this time
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
