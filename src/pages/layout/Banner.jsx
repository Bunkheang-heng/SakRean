import React from "react";
import banner from "../../assets/image/Banner.jpg"
import "../../assets/css/Banner.css"

const Banner = () => {
    return (
        <div className="banner-img">
            <img src={banner} alt="#" className="rounded-md"/>
        </div>
    );
}
 
export default Banner;