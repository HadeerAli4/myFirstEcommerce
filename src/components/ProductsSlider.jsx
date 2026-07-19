import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "./productCard";

export default function ProductsSlider({ products }) {
  if (!products || products.length === 0) {
    return <p className="mt-5 text-center">No products found.</p>;
  }

  return (
    <Swiper style={{alignItems:"stretch"}}
      className="mt-5"
      modules={[Navigation]}
      spaceBetween={40}
      navigation={true}
      breakpoints={{
        0: { slidesPerView: 2,
          slidesPerGroup: 1,
         },
        768: { slidesPerView: 3,
          slidesPerGroup: 2,
         },
        1200: { slidesPerView: 4,
          slidesPerGroup:3,
         },
      }}
    >
      {products?.map((product) => (
        <SwiperSlide style={{height : "auto"}} key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
