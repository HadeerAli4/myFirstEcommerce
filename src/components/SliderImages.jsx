import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay , EffectFade} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


export default function SliderImages(){

 const SLIDER_IMAGES = [
    "headphone.webp",
    "handy.png",
    "homedecoration.jpg"
 ]


    return(
        <>
       <div className="mx-auto" style={{ width: "900px", maxWidth: "100%" }}>
    <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}             
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
    >
        {SLIDER_IMAGES.map((image, index) => (
            <SwiperSlide key={image}>
                <img 
                    src={image} 
                    alt={`Slide ${index + 1}`} 
                    style={{
                        width: "100%",
                        height: "500px",
                        objectFit: "cover",
                        borderRadius: "30px",
                    }} 
                />
            </SwiperSlide>
        ))}
    </Swiper>
</div>
        </>
    )
}
