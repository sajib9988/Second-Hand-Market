import { ICategory } from "@/type/category";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="bg-white bg-opacity-50 border-2 border-white rounded-2xl text-center p-6 h-44">
      {category?.icon ? (
        <Image
          src={category.icon}
          width={100}
          height={150}
          alt="category icon"
          className="mx-auto"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 mx-auto rounded-full" /> // Fallback UI when no icon is available
      )}
      <h3 className="text-lg font-semibold truncate mt-3">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;
