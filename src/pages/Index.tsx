
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

const Index = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    console.log("File deleted");
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to File Manager</h1>
        <p className="text-gray-600 mb-8">
          This is a demonstration of a delete confirmation popup. Click the button below to see it in action.
        </p>
        
        <Button 
          variant="destructive" 
          className="flex items-center gap-2 mx-auto"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash size={18} />
          Delete File
        </Button>
      </div>

      <DeleteConfirmationDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Index;
