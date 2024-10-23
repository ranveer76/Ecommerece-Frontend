import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
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
import { motion } from "framer-motion";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
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
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const is1420 = useMediaQuery(theme.breakpoints.down(1420));
  const is990 = useMediaQuery(theme.breakpoints.down(990));
  const is840 = useMediaQuery(theme.breakpoints.down(840));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

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
      const data = { user: loggedInUser?._id, product: id };
      dispatch(createWishlistItemAsync(data));
    } else if (!e.target.checked) {
      const index = wishlistItems.findIndex((item) => item.product._id === id);
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
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
                        product.images.map((image, index) => (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1 }}
                            style={{ width: "200px", cursor: "pointer" }}
                            onClick={() => setActiveStep(index)}
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
                      <img
                        style={{ width: "90%", objectFit: "contain" }}
                        src={product.images[activeStep]}
                        alt={`${product.title}`}
                      />
                    ) : (
                      <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(swiper) =>
                          setActiveStep(swiper.activeIndex)
                        }
                      >
                        {product.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              style={{ width: "100%", objectFit: "contain" }}
                              src={image}
                              alt={`${product.title}`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </Stack>
                </Stack>

                <Stack
                  sx={{ flex: 1, paddingRight: is500 ? 0 : "2rem" }}
                  rowGap={2}
                >
                  <Typography variant="h4" fontWeight={600}>
                    {product.title}
                  </Typography>
                  <Typography fontSize={"1.2rem"} fontWeight={600}>
                    ₹{product.price}
                  </Typography>

                  <Stack>
                    <Rating
                      readOnly
                      value={totalReviews === 0 ? 0 : averageRating}
                      precision={0.5}
                      sx={{ color: "#FFA000" }}
                    />
                    {totalReviews > 0 && (
                      <Typography color="text.secondary" variant="caption">
                        {totalReviews} reviews
                      </Typography>
                    )}
                  </Stack>

                  <Stack mt={3} direction="row" spacing={2}>
                    {SIZES.map((size, index) => (
                      <Box
                        key={index}
                        sx={{
                          cursor: "pointer",
                          border:
                            selectedSize === size
                              ? "1px solid #FF9B00"
                              : "1px solid lightgrey",
                          borderRadius: "2rem",
                          padding: "0.5rem 1rem",
                          "&:hover": {
                            border: "1px solid #FF9B00",
                          },
                        }}
                        onClick={() => handleSizeSelect(size)}
                      >
                        <Typography color="text.secondary">{size}</Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Stack mt={2} direction="row" spacing={2}>
                    {COLORS.map((color, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: color,
                          border:
                            selectedColorIndex === index
                              ? "2px solid #FF9B00"
                              : "2px solid white",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedColorIndex(index)}
                      />
                    ))}
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Button onClick={handleDecreaseQty}>-</Button>
                    <Typography>{quantity}</Typography>
                    <Button onClick={handleIncreaseQty}>+</Button>
                  </Stack>

                  <Button
                    disabled={isProductAlreadyInCart}
                    onClick={handleAddToCart}
                    variant="contained"
                    size="large"
                  >
                    {isProductAlreadyInCart ? "Added to Cart" : "Add to Cart"}
                  </Button>

                  <Stack direction="row" alignItems="center">
                    <Checkbox
                      checked={isProductAlreadyinWishlist}
                      onChange={handleAddRemoveFromWishlist}
                    />
                    <Typography>Add to Wishlist</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} mt={2}>
                    <LocalShippingOutlinedIcon />
                    <Typography>Free Shipping</Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack mt={5}>
                <Typography variant="h6">Description</Typography>
                <Typography variant="body1">{product.description}</Typography>
              </Stack>

              <Stack mt={5}>
                <Typography variant="h6">Reviews</Typography>
                <Reviews reviews={reviews} />
              </Stack>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
};
