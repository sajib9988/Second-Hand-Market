"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/service/category";
import { getAllBrands } from "@/service/brand";
import { toast } from "sonner";
import { IBrand } from "@/type/brand";

const FilterSidebar = () => {
  const [price, setPrice] = useState(50);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: categoriesData }, { data: brandsData }] = await Promise.all([
          getAllCategories(),
          getAllBrands(),
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        toast.error("Failed to fetch filters");
      }
    };
    fetchData();
  }, []);

  return (
    <Card className="p-4 rounded-2xl shadow-md w-72">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Search</h2>
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => {
            const val = e.target.value;
            setSearch(val);
            updateQuery("search", val);
          }}
        />

        <h2 className="text-lg font-semibold mt-6">Filter By Price</h2>
        <Slider
          defaultValue={[price]}
          max={1000}
          onValueChange={(val) => {
            setPrice(val[0]);
            updateQuery("price", val[0]);
          }}
        />
        <p className="mt-2">${price}</p>

        <h2 className="text-lg font-semibold mt-6">Brands</h2>
        <ul className="space-y-2 mt-2">
          {brands.map((brand) => (
            <li key={brand._id} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) => {
                  updateQuery("brands", checked ? brand._id : "");
                }}
              />
              <span>{brand.name}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Categories</h2>
        <ul className="space-y-2 mt-2">
          {categories.map((cat: any) => (
            <li key={cat._id} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) => {
                  updateQuery("categories", checked ? cat._id : "");
                }}
              />
              <span>{cat.name}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Availability</h2>
        <ul className="space-y-2 mt-2">
          {["In Stock", "Pre Order", "Upcoming"].map((status) => (
            <li key={status} className="flex items-center gap-2">
              <Checkbox
                checked={availability === status}
                onCheckedChange={() => {
                  const val = availability === status ? "" : status;
                  setAvailability(val);
                  updateQuery("availability", val);
                }}
              />
              <span>{status}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
