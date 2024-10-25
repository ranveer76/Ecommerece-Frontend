import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Box, MobileStepper } from "@mui/material";
import { Autoplay } from "swiper/modules";

export const ProductBanner = ({ images }) => {
    const [activeStep, setActiveStep] = useState(0);

    if (!images.length) {
        return null
    }

  return (
    <>
      <Swiper
        modules={[Autoplay]}
              onSlideChange={(swiper) => {
                  setActiveStep(swiper.realIndex);
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        style={{ height: "100%", width: "100%" }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              sx={{ width: "100%", objectFit: "contain" }}
              src={image}
              alt={`Banner Image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <MobileStepper
        steps={images.length}
        position="static"
        activeStep={activeStep}
      />
    </>
  );
};
