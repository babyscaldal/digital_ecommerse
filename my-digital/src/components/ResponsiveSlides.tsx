import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";

import { ReactNode } from "react";

interface IResponsiveSlides {
  children: ReactNode;
}
export default function ResponsiveSlides({ children }: IResponsiveSlides) {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        navigation={{
          nextEl: ".slider-button-next",
          prevEl: ".slider-button-prev",
        }}
        spaceBetween={10}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
      >
        {children}
      </Swiper>
    </>
  );
}
