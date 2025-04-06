"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { createCategory } from "@/service/category";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onCategoryAdded: () => void;
}

const AddCategoryModal = ({ open, onClose, onCategoryAdded }: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async () => {
    if (!categoryName) {
      toast.error("Please enter category name");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload a logo");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({ name: categoryName }));
    formData.append("logo", imageFiles[0]);

    setLoading(true);
    try {
      const res = await createCategory(formData);
      if (res.success) {
        toast.success("Category added successfully!");
        onCategoryAdded();
        setCategoryName("");
        setImageFiles([]);
        setImagePreview([]);
        onClose();
      } else {
        toast.error(res.message || "Failed to add category");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
          <Button onClick={handleAddCategory} className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Category"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
