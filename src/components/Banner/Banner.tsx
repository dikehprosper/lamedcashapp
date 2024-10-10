"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";
import { TbSpeakerphone } from "react-icons/tb";

export default function Banner() {
  return (
    <div className="banner-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000 }}
        slidesPerView={1}
        spaceBetween={20}
        loop
        style={{ borderRadius: "10px" }}
      >
        <SwiperSlide className="banner-swiper-slide">
          <div className="banner">
            <div className="banner-icon">
              <TbSpeakerphone className="banner-speaker" />
            </div>
            <div className="write-up-title">
              <h4>Cash up for grabs</h4>
              <p className="write-up-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                temporibus reiciendis unde b
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="banner-swiper-slide">
          <div className="banner">
            <div className="banner-icon">
              <TbSpeakerphone className="banner-speaker" />
            </div>
            <div className="write-up-title">
              <h4>Cash up for grabs</h4>
              <p className="write-up-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                temporibus reiciendis unde b
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="banner-swiper-slide">
          <div className="banner">
            <div className="banner-icon">
              <TbSpeakerphone className="banner-speaker" />
            </div>
            <div className="write-up">
              <h4 className="write-up-title">Cash up for grabs</h4>
              <p className="write-up-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                temporibus reiciendis unde b
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
