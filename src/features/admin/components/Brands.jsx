import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Link } from 'react-router-dom'
import { Button, FormControl, IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { selectBrandStatus } from '../../brands/BrandSlice'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

import { createBrandAsync as addBrand } from '../../brands/BrandSlice'


const AddBrand = () => {
    const dispatch = useDispatch()
    const brandAddStatus = useSelector(selectBrandStatus)
    const navigate = useNavigate()
    const theme = useTheme()
    const is1100 = useMediaQuery(theme.breakpoints.down(1100))

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.brandName.value
        dispatch(addBrand({ name }))
    }

    useEffect(() => {
        if (brandAddStatus === 'success') {
            navigate('/admin/dashboard')
        }
    }, [brandAddStatus, navigate])

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
                marginTop: is1100 ? '1rem' : '5rem',
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
                <Typography variant='h4'>Add Brand</Typography>
            </Stack>
            <Form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        id='brandName'
                        name='brandName'
                        label='Brand Name'
                        variant='outlined'
                        margin='normal'
                        required
                        autoFocus
                    />
                </FormControl>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    sx={{ marginTop: '1rem' }}
                >
                    Add Brand
                </Button>
            </Form>
        </Stack>
    )
}

export default AddBrand