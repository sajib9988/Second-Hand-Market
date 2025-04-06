"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import DiscountModal from "./DiscountModal";
import { IProducts } from "@/type/products";
import { IMeta } from "@/type/meta";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import { deleteProduct } from "@/service/product";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";
import AddCategoryModal from "../../create-brand-categories/add-categories";
import AddBrandModal from "../../create-brand-categories/Add-Brand";

const ManageProducts = ({
  products,
  meta,
}: {
  products: IProducts[];
  meta: IMeta;
}) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const [openBrandModal, setOpenBrandModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const handleView = (product: IProducts) => {
    console.log("Viewing product:", product);
  };

  const handleDelete = async () => {
    if (!deleteProductId) return;
    try {
      const response = await deleteProduct(deleteProductId);
      if (response.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setDeleteModalOpen(false);
      setDeleteProductId(null);
    }
  };

  const columns: ColumnDef<IProducts>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds(
                selectedIds.filter((id) => id !== row.original._id)
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <span>{row.original.brand.name}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "offerPrice",
      header: "Offer Price",
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(`/user/products/update-product/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => {
              setDeleteProductId(row.original._id);
              setDeleteModalOpen(true);
            }}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/user/products/add-product")}
            size="sm"
          >
            Add Product <Plus className="ml-1 w-4 h-4" />
          </Button>


          <Button
            onClick={() => setOpenBrandModal(true)}
            size="sm"
            variant="outline"
          >
            Add Brand <Plus className="ml-1 w-4 h-4" />
          </Button>

          <AddBrandModal
            open={openBrandModal}
            onClose={() => setOpenBrandModal(false)}
            onBrandAdded={() => router.refresh()}
          />

          <Button
            onClick={() => setOpenCategoryModal(true)}
            size="sm"
            variant="outline"
          >
            Add Category <Plus className="ml-1 w-4 h-4" />
          </Button>
          <AddCategoryModal
            open={openCategoryModal}
            onClose={() => setOpenCategoryModal(false)}
            onCategoryAdded={() => router.refresh()}
          />

          <DiscountModal
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>

      <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        name={
          products.find((product) => product._id === deleteProductId)?.name ||
          "this product"
        }
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        description={`Are you sure you want to delete ${products.find((product) => product._id === deleteProductId)?.name ||
          "this product"
          }?`}
      />




 

    </div>
  );
};

export default ManageProducts;
