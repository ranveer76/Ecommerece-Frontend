import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectSelectedProduct,
} from "../ProductSlice";
import {
  Box,
  Checkbox,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems,
} from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  fetchReviewsByProductIdAsync,
  resetReviewFetchStatus,
  selectReviewFetchStatus,
  selectReviews,
} from "../../review/ReviewSlice";
import { Reviews } from "../../review/components/Reviews";
import { toast } from "react-toastify";
import { MotionConfig, motion } from "framer-motion";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import Favorite from "@mui/icons-material/Favorite";
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice";
import { useTheme } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MobileStepper from "@mui/material/MobileStepper";
import Lottie from "lottie-react";
import { loadingAnimation } from "../../../assets";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = ["#020202", "#F6F6F6", "#B82222", "#BEA9A9", "#E2BB8D"];

export const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector(selectSelectedProduct);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
  const reviews = useSelector(selectReviews);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const theme = useTheme();
  const is1420 = useMediaQuery(theme.breakpoints.down(1420));
  const is990 = useMediaQuery(theme.breakpoints.down(990));
  const is840 = useMediaQuery(theme.breakpoints.down(840));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const is387 = useMediaQuery(theme.breakpoints.down(387));
  const is340 = useMediaQuery(theme.breakpoints.down(340));

  const wishlistItems = useSelector(selectWishlistItems);

  const isProductAlreadyInCart = cartItems.some(
    (item) => item.product._id === id
  );
  const isProductAlreadyinWishlist = wishlistItems.some(
    (item) => item.product._id === id
  );

  const productFetchStatus = useSelector(selectProductFetchStatus);
  const reviewFetchStatus = useSelector(selectReviewFetchStatus);

  const totalReviewRating = reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const totalReviews = reviews.length;
  const averageRating = parseInt(Math.ceil(totalReviewRating / totalReviews));

  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
      dispatch(fetchReviewsByProductIdAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (wishlistItemAddStatus === "fulfilled") {
      toast.success("Product added to wishlist");
    } else if (wishlistItemAddStatus === "rejected") {
      toast.error("Error adding product to wishlist, please try again later");
    }
  }, [wishlistItemAddStatus]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === "fulfilled") {
      toast.success("Product removed from wishlist");
    } else if (wishlistItemDeleteStatus === "rejected") {
      toast.error(
        "Error removing product from wishlist, please try again later"
      );
    }
  }, [wishlistItemDeleteStatus]);

  useEffect(() => {
    if (productFetchStatus === "rejected") {
      toast.error("Error fetching product details, please try again later");
    }
  }, [productFetchStatus]);

  useEffect(() => {
    if (reviewFetchStatus === "rejected") {
      toast.error("Error fetching product reviews, please try again later");
    }
  }, [reviewFetchStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductFetchStatus());
      dispatch(resetReviewFetchStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, [dispatch]);

    const handleAddToCart = () => {
        if (!loggedInUser) {
            toast.error("Please login to add product to cart");
            return;
        }
    const item = { user: loggedInUser._id, product: id, quantity };
    dispatch(addToCartAsync(item));
    setQuantity(1);
  };

  const handleDecreaseQty = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    if (quantity < 20 && quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddRemoveFromWishlist = (e) => {
      if (e.target.checked) {
          if (!loggedInUser) {
              toast.error("Please login to add product to wishlist");
              return;
            }
      const data = { user: loggedInUser?._id, product: id };
      dispatch(createWishlistItemAsync(data));
    } else if (!e.target.checked) {
      const index = wishlistItems.findIndex((item) => item.product._id === id);
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const swiperRef = React.useRef(null);
  const [maxSteps, setMaxsteps] = useState(0);

  useEffect(() => {
    if (productFetchStatus === "fullfilled") setMaxsteps(product?.images?.length);
  }, [product, productFetchStatus]);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handleBack = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <>
      {!(
        productFetchStatus === "rejected" && reviewFetchStatus === "rejected"
      ) && (
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mb: "2rem",
            rowGap: "2rem",
          }}
        >
          {(productFetchStatus || reviewFetchStatus) === "pending" ? (
            <Stack
              width={is500 ? "35vh" : "25rem"}
              height={"calc(100vh - 4rem)"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Lottie animationData={loadingAnimation} />
            </Stack>
          ) : (
            <Stack>
              <Stack
                alignSelf={"flex-start"}
                flexDirection={"row"}
                columnGap={1}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <motion.div whileHover={{ x: -5 }}>
                  <IconButton component={Link} to={"/"}>
                    <ArrowBackIcon fontSize={is480 ? "medium" : "large"} />
                  </IconButton>
                </motion.div>
                <Typography variant="h4" fontWeight={500}>
                  {product?.title}
                </Typography>
              </Stack>
              <Stack
                width={is480 ? "auto" : is1420 ? "auto" : "88rem"}
                p={is480 ? 2 : 0}
                height={is840 ? "auto" : "50rem"}
                rowGap={5}
                mt={is840 ? 0 : 5}
                justifyContent={"center"}
                mb={5}
                flexDirection={is840 ? "column" : "row"}
                columnGap={is990 ? "2rem" : "5rem"}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    columnGap: "2.5rem",
                    alignSelf: "flex-start",
                    height: "100%",
                  }}
                >
                  {!is1420 && (
                    <Stack
                      sx={{
                        display: "flex",
                        rowGap: "1.5rem",
                        height: "100%",
                        overflowY: "scroll",
                      }}
                    >
                      {product &&
                        product?.images?.map((image, index) => (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1 }}
                            style={{ width: "200px", cursor: "pointer" }}
                            onClick={() => setSelectedImageIndex(index)}
                          >
                            <img
                              style={{ width: "100%", objectFit: "contain" }}
                              src={image}
                              alt={`${product.title}`}
                            />
                          </motion.div>
                        ))}
                    </Stack>
                  )}

                  <Stack mt={is480 ? "0rem" : "5rem"}>
                    {is1420 ? (
                      <Stack width={is480 ? "100%" : is990 ? "400px" : "500px"}>
                        <Swiper
                          modules={[Autoplay]}
                          spaceBetween={50}
                          slidesPerView={1}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          onSlideChange={(swiper) =>
                            setActiveStep(swiper.realIndex)
                          }
                          ref={swiperRef}
                          style={{ height: "auto", width: "100%" }}
                        >
                          {product?.images?.map((image, index) => (
                            <SwiperSlide key={index}>
                              <Box
                                component="img"
                                sx={{
                                  width: "100%",
                                  height: "auto",
                                  objectFit: "contain",
                                  minHeight: "300px",
                                }}
                                src={image}
                                alt={product.title}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        { maxSteps && (maxSteps >= 1) &&
                          <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                              <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                              >
                                Next
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowLeft />
                                ) : (
                                  <KeyboardArrowRight />
                                )}
                              </Button>
                            }
                            backButton={
                              <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                              >
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowRight />
                                ) : (
                                  <KeyboardArrowLeft />
                                )}
                                Back
                              </Button>
                            }
                          />
                        }
                      </Stack>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <img
                          style={{
                            width: "100%",
                            objectFit: "contain",
                            aspectRatio: 1 / 1,
                          }}
                          src={product?.images[selectedImageIndex] || ''}
                          alt={`${product?.title}`}
                        />
                      </div>
                    )}
                  </Stack>
                </Stack>

                <Stack rowGap={"1.5rem"} width={is480 ? "100%" : "25rem"}>
                  <Stack rowGap={".5rem"}>
                    <Typography variant="h4" fontWeight={600}>
                      {product?.title}
                    </Typography>

                    <Stack
                      sx={{
                        flexDirection: "row",
                        columnGap: is340 ? ".5rem" : "1rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                        rowGap: "1rem",
                      }}
                    >
                      <Rating value={averageRating} readOnly />
                      <Typography>
                        ({" "}
                        {totalReviews === 0
                          ? "No reviews"
                          : totalReviews === 1
                          ? `${totalReviews} Review`
                          : `${totalReviews} Reviews`}{" "}
                        )
                      </Typography>
                      <Typography
                        color={
                          product?.stockQuantity <= 10
                            ? "error"
                            : product?.stockQuantity <= 20
                            ? "orange"
                            : "green"
                        }
                      >
                        {product?.stockQuantity <= 10
                          ? `Only ${product?.stockQuantity} left`
                          : product?.stockQuantity <= 20
                          ? "Only few left"
                          : "In Stock"}
                      </Typography>
                    </Stack>

                    <Typography variant="h5">${product?.price}</Typography>
                  </Stack>

                  <Stack rowGap={".8rem"}>
                    <Typography>{product?.description}</Typography>
                    <hr />
                  </Stack>

                  {!loggedInUser?.isAdmin && (
                    <Stack sx={{ rowGap: "1.3rem" }} width={"fit-content"}>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        columnGap={is387 ? "5px" : "1rem"}
                        width={"fit-content"}
                      >
                        <Typography>Colors: </Typography>
                        <Stack
                          flexDirection={"row"}
                          columnGap={is387 ? ".5rem" : ".2rem"}
                        >
                          {COLORS.map((color, index) => (
                              <div
                                  key={color + index}
                              style={{
                                backgroundColor: "white",
                                border:
                                  selectedColorIndex === index
                                    ? `1px solid ${theme.palette.primary.dark}`
                                    : "",
                                width: is340 ? "40px" : "50px",
                                height: is340 ? "40px" : "50px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "100%",
                              }}
                            >
                              <div
                                onClick={() => setSelectedColorIndex(index)}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  border:
                                    color === "#F6F6F6"
                                      ? "1px solid grayText"
                                      : "",
                                  backgroundColor: color,
                                  borderRadius: "100%",
                                }}
                              ></div>
                            </div>
                          ))}
                        </Stack>
                      </Stack>

                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        columnGap={is387 ? "5px" : "1rem"}
                        width={"fit-content"}
                      >
                        <Typography>Size: </Typography>
                        <Stack
                          flexDirection={"row"}
                          columnGap={is387 ? ".5rem" : "1rem"}
                        >
                          {SIZES.map((size) => (
                              <motion.div
                                  key={size}
                              onClick={() => handleSizeSelect(size)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 1 }}
                              style={{
                                border:
                                  selectedSize === size
                                    ? ""
                                    : "1px solid grayText",
                                borderRadius: "8px",
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                padding: "1.2rem",
                                backgroundColor:
                                  selectedSize === size
                                    ? "#DB4444"
                                    : "whitesmoke",
                                color: selectedSize === size ? "white" : "",
                              }}
                            >
                              <p>{size}</p>
                            </motion.div>
                          ))}
                        </Stack>
                      </Stack>

                      <Stack
                        flexDirection={"row"}
                        columnGap={is387 ? ".3rem" : "1.5rem"}
                        width={"100%"}
                      >
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <MotionConfig
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1 }}
                          >
                            <motion.button
                              onClick={handleDecreaseQty}
                              style={{
                                padding: "10px 15px",
                                fontSize: "1.050rem",
                                backgroundColor: "",
                                color: "black",
                                outline: "none",
                                border: "1px solid black",
                                borderRadius: "8px",
                              }}
                            >
                              -
                            </motion.button>
                            <p
                              style={{
                                margin: "0 1rem",
                                fontSize: "1.1rem",
                                fontWeight: "400",
                              }}
                            >
                              {quantity}
                            </p>
                            <motion.button
                              onClick={handleIncreaseQty}
                              style={{
                                padding: "10px 15px",
                                fontSize: "1.050rem",
                                backgroundColor: "black",
                                color: "white",
                                outline: "none",
                                border: "none",
                                borderRadius: "8px",
                              }}
                            >
                              +
                            </motion.button>
                          </MotionConfig>
                        </Stack>

                        {isProductAlreadyInCart ? (
                          <button
                            style={{
                              padding: "10px 15px",
                              fontSize: "1.050rem",
                              backgroundColor: "black",
                              color: "white",
                              outline: "none",
                              border: "none",
                              borderRadius: "8px",
                            }}
                          >
                            In Cart
                          </button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1 }}
                            onClick={handleAddToCart}
                            style={{
                              padding: "10px 15px",
                              fontSize: "1.050rem",
                              backgroundColor: "black",
                              color: "white",
                              outline: "none",
                              border: "none",
                              borderRadius: "8px",
                            }}
                          >
                            Add To Cart
                          </motion.button>
                        )}

                        <motion.div
                          style={{
                            border: "1px solid grayText",
                            borderRadius: "4px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            checked={isProductAlreadyinWishlist}
                            onChange={(e) => handleAddRemoveFromWishlist(e)}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                          />
                        </motion.div>
                      </Stack>
                    </Stack>
                  )}

                  <Stack
                    mt={3}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px grayText solid",
                      borderRadius: "7px",
                    }}
                  >
                    <Stack
                      p={2}
                      flexDirection={"row"}
                      alignItems={"center"}
                      columnGap={"1rem"}
                      width={"100%"}
                      justifyContent={"flex-sart"}
                    >
                      <Box>
                        <LocalShippingOutlinedIcon />
                      </Box>
                      <Stack>
                        <Typography>Free Delivery</Typography>
                        <Typography>
                          Enter your postal for delivery availabity
                        </Typography>
                      </Stack>
                    </Stack>
                    <hr style={{ width: "100%" }} />
                    <Stack
                      p={2}
                      flexDirection={"row"}
                      alignItems={"center"}
                      width={"100%"}
                      columnGap={"1rem"}
                      justifyContent={"flex-start"}
                    >
                      <Box>
                        <CachedOutlinedIcon />
                      </Box>
                      <Stack>
                        <Typography>Return Delivery</Typography>
                        <Typography>Free 30 Days Delivery Returns</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack width={is1420 ? "auto" : "88rem"} p={is480 ? 2 : 0}>
                <Reviews productId={id} averageRating={averageRating} />
              </Stack>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
};
