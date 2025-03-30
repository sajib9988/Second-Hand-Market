import Image from "next/image";
import productBanner from "@/assets/product-banner.png"; // ইমেজ ইমপোর্ট

const ProductBanner = ({ title, path }: { title: string; path: string }) => {
  return (
    <div className="border-2 border-white rounded-3xl mt-10 flex justify-center items-center relative h-[250px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={productBanner}
        alt="Product Banner"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* Overlay */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div> */}

      {/* Text Content (z-10 দিয়ে ইমেজের ওপরে নিয়ে আসা হয়েছে) */}
      <div className="relative z-10 text-black text-center">
        <h2 className="font-bold text-2xl leading-loose">{title}</h2>
        <p>{path}</p>
      </div>
    </div>
  );
};

export default ProductBanner;
