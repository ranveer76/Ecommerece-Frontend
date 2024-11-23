import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'
import { QRCodePng, appStorePng, googlePlayPng ,facebookPng,instagramPng,twitterPng,linkedinPng} from '../../assets'
import SendIcon from '@mui/icons-material/Send';
import { MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router-dom';


export const Footer = () => {

    const theme=useTheme()
    const is700=useMediaQuery(theme.breakpoints.down(700))

    const labelStyles={
        fontWeight:300,
        cursor:'pointer'
    }

  return (
      <Stack
          sx={{
              backgroundColor: theme.palette.primary.main,
              paddingTop: '3rem',
              paddingLeft: is700 ? '1rem' : '3rem',
              paddingRight: is700 ? '1rem' : '3rem',
              paddingBottom: '1.5rem',
              rowGap: '5rem',
              color: theme.palette.primary.light,
              justifyContent: 'space-around',
          }}
      >
          <Stack
              flexDirection={'row'}
              rowGap={'1rem'}
              justifyContent={is700 ? '' : 'space-around'}
              flexWrap={'wrap'}
          >
              <Stack
                  rowGap={'1rem'}
                  padding={'1rem'}
              >
                  <Typography
                      variant='h6'
                      fontSize={'1.5rem'}
                  >
                      Exclusive
                  </Typography>
                  <Typography variant='h6'>Subscribe</Typography>
                  <Typography sx={labelStyles}>
                      Get 10% off your first order
                  </Typography>
                  <TextField
                      placeholder='Enter your email'
                      sx={{ border: '1px solid white', borderRadius: '6px' }}
                      InputProps={{
                          endAdornment: (
                              <IconButton
                                  onClick={(e) => {
                                      e.preventDefault();
                                      if (
                                          e.target.parentElement.outerHTML.includes(
                                              'button'
                                          )
                                      ) {
                                          e.target.parentElement.previousElementSibling.value =
                                              '';
                                      } else if (
                                          e.target.parentElement.parentElement.outerHTML.includes(
                                              'button'
                                          )
                                      ) {
                                          e.target.parentElement.parentElement.previousElementSibling.value =
                                              '';
                                      }
                                  }}
                              >
                                  <SendIcon
                                      sx={{
                                          color: theme.palette.primary.light,
                                      }}
                                  />
                              </IconButton>
                          ),
                          style: { color: 'whitesmoke' },
                      }}
                  />
              </Stack>

              <Stack
                  rowGap={'1rem'}
                  padding={'1rem'}
              >
                  <Typography variant='h6'>Support</Typography>
                  <Typography sx={labelStyles}>
                      11th Main Street, Dhaka, DH 1515, California.
                  </Typography>
                  <a
                      href='mailto:ranveerwalia76@gmail.com?subject=Feedback'
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}
                  >
                      <Typography sx={labelStyles}>
                          ranveerwalia76@gmail.com
                      </Typography>
                  </a>
                  <Typography sx={labelStyles}>+919876109576</Typography>
              </Stack>

              <Stack
                  rowGap={'1rem'}
                  padding={'1rem'}
              >
                  <Typography variant='h6'>Account</Typography>
                  <Link
                      to='/profile'
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}
                  >
                      <Typography sx={labelStyles}>My Account</Typography>
                  </Link>
                  <Link
                      to='/login'
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}
                  >
                      <Typography sx={labelStyles}>Login / Register</Typography>
                  </Link>
                  <Link
                      to='/orders'
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}
                  >
                      <Typography sx={labelStyles}>Order History</Typography>
                  </Link>
                  <Link
                      to='/cart'
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}
                  >
                      <Typography sx={labelStyles}>Cart</Typography>
                  </Link>
                  <Link
                      to='/wishlist'
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}
                  >
                      <Typography sx={labelStyles}>Wishlist</Typography>
                  </Link>
                  <Link
                      to='/'
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}
                  >
                      <Typography sx={labelStyles}>Shop</Typography>
                  </Link>
              </Stack>

              <Stack
                  rowGap={'1rem'}
                  padding={'1rem'}
              >
                  <Typography variant='h6'>Quick Links</Typography>
                  <Typography sx={labelStyles}>Privacy Policy</Typography>
                  <Typography sx={labelStyles}>Terms Of Use</Typography>
                  <Typography sx={labelStyles}>FAQ</Typography>
                  <Typography sx={labelStyles}>Contact</Typography>
              </Stack>

              <Stack
                  rowGap={'1rem'}
                  padding={'1rem'}
              >
                  <Typography variant='h6'>Download App</Typography>
                  <Typography
                      sx={{
                          ...labelStyles,
                          color: 'graytext',
                          fontWeight: 500,
                      }}
                  >
                      Save $3 with App New User Only
                  </Typography>
                  <Stack
                      flexDirection={'row'}
                      columnGap={'.5rem'}
                  >
                      <Box
                          width={'100px'}
                          height={'100px'}
                      >
                          <img
                              src={QRCodePng}
                              height={'100%'}
                              width={'100%'}
                              style={{ objectFit: 'contain' }}
                              alt='QR Code'
                          />
                      </Box>

                      <Stack justifyContent={'space-around'}>
                          <Stack>
                              <img
                                  style={{
                                      width: '100%',
                                      height: '100%',
                                      cursor: 'pointer',
                                  }}
                                  src={googlePlayPng}
                                  alt='GooglePlay'
                              />
                          </Stack>
                          <Stack>
                              <img
                                  style={{
                                      width: '100%',
                                      height: '100%',
                                      cursor: 'pointer',
                                  }}
                                  src={appStorePng}
                                  alt='AppStore'
                              />
                          </Stack>
                      </Stack>
                  </Stack>

                  <Stack
                      mt={0.6}
                      flexDirection={'row'}
                      columnGap={'2rem'}
                  >
                      <MotionConfig
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 1 }}
                      >
                          <a
                              href='https://www.facebook.com'
                              style={{
                                  textDecoration: 'none',
                                  color: 'whitesmoke',
                              }}
                          >
                              <motion.img
                                  style={{ cursor: 'pointer' }}
                                  src={facebookPng}
                                  alt='Facebook'
                              />
                          </a>
                          <a
                              href='https://www.twitter.com'
                              style={{
                                  textDecoration: 'none',
                                  color: 'whitesmoke',
                              }}
                          >
                              <motion.img
                                  style={{ cursor: 'pointer' }}
                                  src={twitterPng}
                                  alt='Twitter'
                              />
                          </a>
                          <a
                              href='https://www.instagram.com/rsw._76/'
                              style={{
                                  textDecoration: 'none',
                                  color: 'whitesmoke',
                              }}
                          >
                              <motion.img
                                  style={{ cursor: 'pointer' }}
                                  src={instagramPng}
                                  alt='Instagram'
                              />
                          </a>
                          <a
                              href='https://www.linkedin.com/in/ranveer-singh-walia-34043b247/'
                              style={{
                                  textDecoration: 'none',
                                  color: 'whitesmoke',
                              }}
                          >
                              <motion.img
                                  style={{ cursor: 'pointer' }}
                                  src={linkedinPng}
                                  alt='Linkedin'
                              />
                          </a>
                      </MotionConfig>
                  </Stack>
              </Stack>
          </Stack>

          <Stack alignSelf={'center'}>
              <Typography color={'GrayText'}>
                  &copy; Mern Store {new Date().getFullYear()}. All right
                  reserved
              </Typography>
          </Stack>
      </Stack>
  );
}
