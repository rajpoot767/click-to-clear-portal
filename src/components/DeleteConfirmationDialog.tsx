
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
import { Trash2 } from "lucide-react";

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
      <AlertDialogContent className="max-w-md rounded-xl p-6 bg-white border-none shadow-lg">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full p-4 shadow-lg">
          <Trash2 className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        
        <AlertDialogHeader className="pt-6 text-center space-y-4">
          <AlertDialogTitle className="text-2xl font-bold text-gray-800">
            Delete File?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            This action cannot be undone. This will permanently delete the file from our servers.
          </AlertDialogDescription>
          <div className="py-2 opacity-80 transition-opacity hover:opacity-100">
            <DeleteIcon />
          </div>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center pt-4 border-t border-gray-100 mt-4">
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-5 rounded-lg transition-all duration-200 font-medium w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-5 rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4" />
            Delete File
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
