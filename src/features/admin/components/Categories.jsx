import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Link } from 'react-router-dom';
import {
    Button,
    FormControl,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import { addCategoryAsync as addCategory, selectCategoryStatus } from '../../categories/CategoriesSlice';

const Categories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const CategoriesAddStatus = useSelector(selectCategoryStatus)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleSubmit = (e) => {
        e.preventDefault()
        const category = {
            name: e.target.name.value
        }
        dispatch(addCategory(category))
        navigate('/admin/dashboard')
    }

    useEffect(() => {
        if (CategoriesAddStatus === 'success') {
            navigate('/admin/dashboard')
        }
    }, [CategoriesAddStatus, navigate])

    return (
        <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            sx={{
                width: '100%',
                height: '100%',
                padding: '2rem',
                backgroundColor: 'background.default',
                borderRadius: '1rem',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                marginTop: isMobile ? '1rem' : '5rem',
            }}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
                sx={{ width: '100%' }}
            >
                <Link to='/admin/dashboard'>
                    <IconButton>
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <Typography variant='h5'>Add Category</Typography>
                <div></div>
            </Stack>
            <Form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        name='name'
                        label='Category Name'
                        variant='outlined'
                        required
                    />
                </FormControl>
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: '1rem' }}
                >
                    Add Category
                </Button>
            </Form>
        </Stack>
    )
}

export default Categories