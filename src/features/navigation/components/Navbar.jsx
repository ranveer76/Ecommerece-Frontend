import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import {
    selectProductIsFilterOpen,
    toggleFilters,
} from '../../products/ProductSlice';

export const Navbar = ({ isProductList = true }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const userInfo = useSelector(selectUserInfo);
    const cartItems = useSelector(selectCartItems);
    const loggedInUser = useSelector(selectLoggedInUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const is480 = useMediaQuery(theme.breakpoints.down(480));
    const [visible, setVisible] = React.useState(true);

    const wishlistItems = useSelector(selectWishlistItems);
    const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleToggleFilters = () => {
        dispatch(toggleFilters());
    };

    const location = useLocation();
    React.useEffect(() => {
        if (
            location.pathname === '/admin/dashboard' ||
            location.pathname === '/'
        )
            setVisible(true);
        else setVisible(false);
    }, [location]);

    const settings = [
        { name: 'Home', to: '/' },
        {
            name: loggedInUser?.isAdmin ? 'Orders' : 'My orders',
            to: loggedInUser?.isAdmin ? '/admin/orders' : '/orders',
        },
        !loggedInUser
            ? { name: 'Login', to: '/login' }
            : {
                  name: 'Profile',
                  to: loggedInUser?.isAdmin ? '/admin/profile' : '/profile',
              },
        !loggedInUser
            ? { name: 'Signup', to: '/signup' }
            : { name: 'Logout', to: '/logout' },
    ];

    return (
        <AppBar
            position='sticky'
            sx={{
                backgroundColor: 'white',
                boxShadow: 'none',
                color: 'text.primary',
            }}
        >
            <Toolbar
                sx={{
                    p: 1,
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <Typography
                    variant='h6'
                    noWrap
                    component='a'
                    href='/'
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    MERN SHOP
                </Typography>

                <Stack
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    columnGap={2}
                >
                    <Tooltip title='Open settings'>
                        <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                        >
                            <Avatar
                                alt={userInfo?.name}
                                src='null'
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id='menu-appbar'
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {loggedInUser?.isAdmin && (
                            <>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        component={Link}
                                        color={'text.primary'}
                                        sx={{ textDecoration: 'none' }}
                                        to='/admin/add-product'
                                        textAlign='center'
                                    >
                                        Add new Product
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        component={Link}
                                        color={'text.primary'}
                                        sx={{ textDecoration: 'none' }}
                                        to='/admin/brands'
                                        textAlign='center'
                                    >
                                        Add new Brand
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        component={Link}
                                        color={'text.primary'}
                                        sx={{ textDecoration: 'none' }}
                                        to='/admin/categories'
                                        textAlign='center'
                                    >
                                        Add new Category
                                    </Typography>
                                </MenuItem>

                            </>
                        )}
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting?.name + setting}
                                onClick={handleCloseUserMenu}
                            >
                                <Typography
                                    component={Link}
                                    color={'text.primary'}
                                    sx={{ textDecoration: 'none' }}
                                    to={setting.to}
                                    textAlign='center'
                                >
                                    {setting?.name}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    <Typography
                        variant='h6'
                        fontWeight={300}
                    >
                        {is480
                            ? `${userInfo?.name.toString().split(' ')[0]}`
                            : `Hey👋, ${userInfo?.name}`}
                    </Typography>
                    {loggedInUser.isAdmin && (
                        <Button variant='contained'>Admin</Button>
                    )}
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            columnGap: '1rem',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {!loggedInUser?.isAdmin && (
                            <>
                                {cartItems?.length > 0 && (
                                    <Badge
                                        badgeContent={cartItems.length}
                                        color='error'
                                    >
                                        <IconButton
                                            onClick={() => navigate('/cart')}
                                        >
                                            <ShoppingCartOutlinedIcon />
                                        </IconButton>
                                    </Badge>
                                )}

                                <Stack>
                                    <Badge
                                        badgeContent={wishlistItems?.length}
                                        color='error'
                                    >
                                        <IconButton
                                            component={Link}
                                            to={'/wishlist'}
                                        >
                                            <FavoriteBorderIcon />
                                        </IconButton>
                                    </Badge>
                                </Stack>
                            </>
                        )}
                        {isProductList && visible && (
                            <IconButton onClick={handleToggleFilters}>
                                <TuneIcon
                                    sx={{
                                        color: isProductFilterOpen
                                            ? 'black'
                                            : '',
                                    }}
                                />
                            </IconButton>
                        )}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
