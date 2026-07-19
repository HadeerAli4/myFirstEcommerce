import { useEffect, useState } from "react"
import { ErrorHandler } from "../utils/errorhandler"
import { API, GET_ALL_CATEGORIES_API } from "../api/api";
import { Swiper , SwiperSlide } from "swiper/react";
import {Autoplay} from "swiper/modules"
import {GiAmpleDress, GiBallerinaShoes, GiChessKing, GiConverseShoe, GiFragrance, GiGemNecklace, GiLaptop, GiPoloShirt, GiPorcelainVase} from "react-icons/gi";
import { FaBagShopping, FaCar, FaKitchenSet, FaTabletScreenButton } from "react-icons/fa6";
import { MdOutlineChair, MdOutlineLocalGroceryStore, MdSportsTennis } from "react-icons/md";
import { TbDeviceWatchExclamation } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";
import { PiMotorcycleBold } from "react-icons/pi";
import { FcTwoSmartphones } from "react-icons/fc";
import { BsEmojiSunglasses, BsHandbagFill } from "react-icons/bs";
import { RiJewelryLine, RiTShirtLine } from "react-icons/ri";
import "swiper/css";
import { Link } from "react-router-dom";

export default function CategoryList(){
    const categoryIcons= {
"beauty": FaBagShopping,
  "fragrances": GiFragrance ,
  "furniture": MdOutlineChair,
  "groceries": MdOutlineLocalGroceryStore,
  "home-decoration": GiPorcelainVase ,
  "kitchen-accessories": FaKitchenSet ,
  "laptops": GiLaptop ,
  "mens-shirts": GiPoloShirt ,
  "mens-shoes": GiConverseShoe ,
  "mens-watches": TbDeviceWatchExclamation ,
  "mobile-accessories" : FaMobileAlt ,
  "motorcycle": PiMotorcycleBold ,
  "skin-care": GiChessKing ,
  "smartphones": FcTwoSmartphones ,
  "sports-accessories": MdSportsTennis ,
  "sunglasses": BsEmojiSunglasses ,
  "tablets": FaTabletScreenButton ,
  "tops": RiTShirtLine ,
  "vehicle": FaCar ,
  "womens-bags": BsHandbagFill ,
  "womens-dresses": GiAmpleDress ,
  "womens-jewellery": RiJewelryLine ,
  "womens-shoes": GiBallerinaShoes ,
  "womens-watches": GiGemNecklace
};

    const [categories, setCategories] = useState([]);

useEffect(function(){
    async function fetchCategories(){
        try{
            const response = await API.get(GET_ALL_CATEGORIES_API);
            setCategories(response.data);
        }catch(error){
            ErrorHandler(error);
        }
    }
    fetchCategories();
},[])

return (
  <Swiper  
    loop={categories.length > 6} // Prevents Swiper layout glitches if categories are few
    modules={[Autoplay]} 
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }} 
    breakpoints={{
      0: { slidesPerView: 2, spaceBetween: 10 },
      576: { slidesPerView: 3, spaceBetween: 15 },
      768: { slidesPerView: 4, spaceBetween: 20 },
      1200: { slidesPerView: 6, spaceBetween: 25 },
    }}
    className="mb-4 py-2"
  >
    {categories.map((category, index) => {
      // 1. Find icon component or use a fallback shopping bag if it doesn't match perfectly
      const IconComponent = categoryIcons[category.slug] || FaBagShopping;

      return (
        <SwiperSlide key={category.slug || index}> 
          {/* 2. Route dynamically using query parameters to filter your products page */}
          <Link 
            to={`/products?category=${category.slug}`} 
            className="d-flex flex-column gap-2 align-items-center text-decoration-none text-center category-link-item"
            style={{ color: "inherit" }}
          > 
            <div className="p-3 bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm icon-wrapper">
              <IconComponent size={24} className="text-primary" /> 
            </div>
            <span className="fw-medium small text-capitalize">{category.name}</span>
          </Link>
        </SwiperSlide>
      );
    })}
  </Swiper>
);
}