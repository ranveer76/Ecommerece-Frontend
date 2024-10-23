import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Box, MobileStepper } from "@mui/material";

export const ProductBanner = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [images.length]);

  return (
    <>
      <Swiper
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        autoplay={{ delay: 3000 }}
        loop={true}
        style={{ height: "100%", width: "100%" }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              sx={{ width: "100%", objectFit: "contain" }}
              src={image}
              alt={"Banner Image"}
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
