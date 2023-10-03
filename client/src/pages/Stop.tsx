import React, { Fragment, useEffect, useState } from 'react';
import { Ubike } from '../models/ubike';
import { Autocomplete, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, Hidden, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { taiwan } from '../models/taiwan';
import { taipei, newTaipei, hsinchuCo, hsinchuCi, miaoli, taichung, chiayi, tainan, kaohsiung, pingtung } from '../models/city';
import agent from '../api/agent';


export default function Stop() {
    const [data, setData] = useState<any[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false); //選擇全部的checkbox
    const [selectArea, setSelectArea] = useState<string>(""); //台灣縣市
    const [newData, setNewData] = useState<Ubike[]>([]); //勾選的縣市
    const [newCity, setNewCity] = useState<string[]>([]); //獲取縣市區
    const [selectTown, setSelectTown] = useState<boolean[]>([]); //checkbox
    const [page, setPage] = useState<number>(0); //頁數控制

    useEffect(() => {
        const newSelectedDistricts = newCity.filter((_, index) => selectTown[index]);
        const updateData = data.filter(item => newSelectedDistricts.includes(item.sarea));
        setNewData(updateData);
        setPage(0);
    }, [selectTown, data]); //勾選單區的控制
    useEffect(() => {
        switch (selectArea) {
            case '臺北市':
                setNewCity(taipei);
                setSelectTown(Array(taipei.length).fill(false));
                setSelectAll(false);
                agent.taipei().then(response => {
                    setData(response);
                })
                break;
            case '新北市':
                setNewCity(newTaipei);
                setSelectTown(Array(newTaipei.length).fill(false));
                setSelectAll(false);
                agent.newTaipei().then(response => {
                    setData(response);
                })
                break;
            case '新竹縣':
                setNewCity(hsinchuCo);
                setSelectTown(Array(hsinchuCo.length).fill(false));
                setSelectAll(false);
                break;
            case '新竹市':
                setNewCity(hsinchuCi);
                setSelectTown(Array(hsinchuCi.length).fill(false));
                setSelectAll(false);
                break;
            case '苗栗縣':
                setNewCity(miaoli);
                setSelectTown(Array(miaoli.length).fill(false));
                setSelectAll(false);
                break;
            case '臺中市':
                setNewCity(taichung);
                setSelectTown(Array(taichung.length).fill(false));
                setSelectAll(false);
                break;
            case '嘉義縣':
                setNewCity(chiayi);
                setSelectTown(Array(chiayi.length).fill(false));
                setSelectAll(false);
                break;
            case '台南市':
                setNewCity(tainan);
                setSelectTown(Array(tainan.length).fill(false));
                setSelectAll(false);
                break;
            case '高雄市':
                setNewCity(kaohsiung);
                setSelectTown(Array(kaohsiung.length).fill(false));
                setSelectAll(false);
                agent.kaohsiung().then(response => {
                    setData(response);
                });                
                break;
            case '屏東縣':
                setNewCity(pingtung);
                setSelectTown(Array(pingtung.length).fill(false));
                setSelectAll(false);
                break;
            default:
                setNewCity([]);
                setSelectTown([]);
                setSelectAll(false);
                break;
        }
    }, [selectArea])



    const handleChange = (event: SelectChangeEvent<typeof selectArea>) => {
        setSelectArea(event.target.value);
    }
    const handleCancel = () => {
        setSelectArea("");
    }
    const handleSelectAllTown = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setSelectTown(Array(newCity.length).fill(newSelectAll));
    }
    const handleSelectSingleTown = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const newSelectTown = [...selectTown];
        newSelectTown[index] = !newSelectTown[index];
        setSelectTown(newSelectTown);
        if (newSelectTown.some(a => a === false)) {
            setSelectAll(false);
        }
    }
    const handlePage = (change: boolean) => {
        if(change){
            setPage(page+1);
        }else{
            setPage(page-1);
        }
    }


 //#region  CSS樣式
    const topLeft = {
        borderTopLeftRadius: '40px'
    }
    const topRight = {
        borderTopRightRadius: '40px'
    }
    const bottomLeft = {
        borderBottomLeftRadius: '40px'
    }
    const bottomRight = {
        borderBottomRightRadius: '40px'
    }
    const gridTitle = {
        height: 70,
        background: '#B5CC22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    const gridItem = {
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
//#endregion


    return (
        <Box>
            <Box border={1} height={1} color={'#2222'} />

            <Box height={80} display="flex" alignItems="center" marginLeft={4}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: '#B5CC22' }}>
                    站點資訊
                </Typography>
            </Box>

            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: 0 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} height={70} sx={{ width: { xs: '100%', md: '400px' } }}>
                        <FormControl sx={{ m: 1, width: 242, background: '#2222', marginBottom: 4 }}>
                            <InputLabel>選擇區域</InputLabel>
                            <Select value={selectArea} onChange={handleChange}>
                                {taiwan.map((area, index) => (
                                    <MenuItem key={index} value={area}>
                                        {area}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={5} sx={{ width: { xs: '100%', md: '400px' } }}>
                        <Autocomplete sx={{ marginRight: 0, paddingRight: 0, marginTop: 1, marginLeft: 1, background: '#2222', maxWidth: '242px' }}
                            disablePortal options={taiwan} value={selectArea} isOptionEqualToValue={(option, value) => value === "" || option === value}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="搜尋站點"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            taiwan.some(area => area === selectArea)
                                                ?
                                                <IconButton onClick={() => { handleCancel() }}>
                                                    <CancelIcon />
                                                </IconButton>
                                                :
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                        )
                                    }}
                                />}
                            onChange={(event, newValue) => setSelectArea(newValue!)}
                        />
                    </Grid>
                </Grid >
            </Container>

            <Grid container spacing={2} marginTop={5}>
                <Grid item xs={12} md={5} marginLeft={5}>
                    <FormControlLabel control={<Checkbox checked={selectAll} color='success' onClick={handleSelectAllTown} />} label="全部勾選" />
                    <Box>
                        {selectArea!! && newCity.map((area, index) => (
                            <FormControlLabel key={index} control={
                                <Checkbox checked={selectTown[index]} color='success'
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleSelectSingleTown(event, index)}
                                />} label={area}
                            />
                        ))}
                    </Box>
                </Grid>
                <Hidden mdDown>
                    <Grid item md={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <img src={'/byc.png'} style={{ width: '100%', alignItems: 'flex-end' }} />
                    </Grid>
                </Hidden>
            </Grid>

            <Grid container spacing={5} sx={{ marginTop: 2, marginLeft: 1, marginBottom: 5, paddingRight: 7 }}>
                <Grid item xs={3} md={2} sx={{ ...gridTitle, ...topLeft, color: 'white' }}>
                    縣市
                </Grid>
                <Grid item xs={3} md={2} sx={{ ...gridTitle, color: 'white' }}>
                    區域
                </Grid>
                <Grid item xs={6} md={6} sx={{
                    ...gridTitle, '@media (min-width: 900px)': {
                        borderTopRightRadius: '0px'
                    }, ...topRight, color: 'white'
                }}>
                    站點名稱
                </Grid>
                <Hidden mdDown>
                    <Grid container item xs={1} sx={{ ...gridTitle, color: 'white' }}>
                        <span>可借</span>
                        <span>車輛</span>
                    </Grid>
                    <Grid container item xs={1} sx={{ ...gridTitle, ...topRight, color: 'white' }}>
                        <span>可還</span>
                        <span>空位</span>
                    </Grid>
                </Hidden>
                {selectArea!! && newData.slice(5*page, 5*(page+1)).map((one, index) => (
                    <Fragment key={index + "$"}>
                        {index % 2 !== 0
                            ?
                            <>
                                <Grid item xs={3} md={2} sx={{ ...gridItem, background: '#1111' }}>{selectArea}</Grid>
                                <Grid item xs={3} md={2} sx={{ ...gridItem, background: '#1111' }}>{one.sarea}</Grid>
                                <Grid item xs={6} md={6} sx={{ ...gridItem, background: '#1111', justifyContent: 'flex-start' }}>{one.ar}</Grid>
                                <Hidden mdDown>
                                    <Grid item xs={1} sx={{ ...gridItem, background: '#1111' }}>{one.tot}</Grid>
                                    <Grid item xs={1} sx={{ ...gridItem, background: '#1111' }}>{one.sbi}</Grid>
                                </Hidden>
                            </>
                            : <>
                                {taipei.includes(one.sarea)
                                    ?
                                    (index == 4
                                        ? <Grid item xs={3} md={2} sx={{ ...gridItem, ...bottomLeft }}>{selectArea}</Grid>
                                        : <Grid item xs={3} md={2} sx={gridItem}>{selectArea}</Grid>
                                    )
                                    : <Grid item xs={3} md={2} sx={gridItem}>{selectArea}</Grid>
                                }
                                <Grid item xs={3} md={2} sx={gridItem}>{one.sarea}</Grid>
                                {index == 4
                                    ?
                                    <Grid item xs={6} md={6} sx={{
                                        ...gridItem,
                                        justifyContent: 'flex-start',
                                        ...bottomRight,
                                        '@media (min-width: 900px)': {
                                            borderBottomRightRadius: '0px'
                                        }
                                    }}>{one.ar}</Grid>
                                    :
                                    <Grid item xs={6} md={6} sx={{ ...gridItem, justifyContent: 'flex-start' }}>{one.ar}</Grid>
                                }
                                <Hidden mdDown>
                                    <Grid item xs={1} sx={gridItem}>{one.tot}</Grid>
                                    {index == 4
                                        ? <Grid item xs={1} sx={{ ...gridItem, ...bottomRight }}>{one.sbi}</Grid>
                                        : <Grid item xs={1} sx={gridItem}>{one.sbi}</Grid>
                                    }
                                </Hidden>
                            </>
                        }
                    </Fragment>
                ))}
            </Grid>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    size='large'
                    sx={{
                        background: '#B5CC22',
                        borderColor: '#B5CC22',
                        color: 'white',
                        marginRight: 1,
                        '&:hover': {
                            background: '#467500'
                        }
                    }}
                    onClick={() => handlePage(false)}
                    disabled = {page === 0}
                >
                    上一頁
                </Button>
                <Button
                    size='large'
                    sx={{
                        background: '#B5CC22',
                        borderColor: '#B5CC22',
                        color: 'white',
                        marginLeft: 1,
                        '&:hover': {
                            background: '#467500'
                        }
                    }}
                    onClick={() => handlePage(true)}
                    disabled = {page >= (Number((newData.length/5).toFixed(0))-1)}
                >
                    下一頁
                </Button>
            </Container>
        </Box>
    )
}