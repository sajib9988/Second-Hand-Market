"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { toast } from "sonner";
import { createBrand } from "@/service/brand";

interface AddBrandModalProps {
  open: boolean;
  onClose: () => void;
  onBrandAdded: () => void;
}

export default function AddBrandModal({ open, onClose, onBrandAdded }: AddBrandModalProps) {
  const [brandName, setBrandName] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleAddBrand = async () => {
    if (!brandName) {
      toast.error("Please enter brand name");
      return;
    }
    
    if (imageFiles.length === 0) {
      toast.error("Please upload a logo");
      return;
    }

    const formData = new FormData();
    // Put data under the "data" key
    formData.append("data", JSON.stringify({
      name: brandName
    }));
    formData.append("logo", imageFiles[0]); // Using only the first image

    try {
      const res = await createBrand(formData);

      if (res.success) {
        toast.success("Brand added successfully");
        onBrandAdded(); // Call the callback to refresh data
        onClose(); // Close modal on success
        setBrandName("");
        setImageFiles([]);
        setImagePreview([]);
      } else {
        toast.error(res.message || "Failed to add brand");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Brand</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Brand Name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <NMImageUploader
            setImageFiles={setImageFiles}
            setImagePreview={setImagePreview}
            label="Upload Logo (only first image will be used)"
            className="w-fit"
          />
          {imagePreview.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">
                {imagePreview.length > 1 
                  ? `${imagePreview.length} images uploaded. Only the first one will be used.` 
                  : "1 image uploaded"}
              </p>
              <ImagePreviewer
                imagePreview={imagePreview}
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
              />
            </div>
          )}
          <Button onClick={handleAddBrand} className="w-full">
            Add Brand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}