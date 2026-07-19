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
    return(

        <Swiper  loop={true} modules={[Autoplay]} 
        autoplay={{
            delay : 2500,
            disableOnInteraction: false,
        }} 
        breakpoints={{
            0: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView : 6,
            },
        }}
        
        className="mb-3">
        {categories.map((category,index) => {
            const Icon = categoryIcons[category.slug];

            return(
            <SwiperSlide key={category.name + index}> 
            <Link to={'#'} 
            className="d-flex flex-column gap-2 align-items-center"> 
            <Icon size={30} /> {category.name} 
            </Link>
            </SwiperSlide>
            );
})}
        </Swiper>
    );
}

