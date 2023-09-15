import React, { Fragment, useEffect, useState } from 'react';
import { Ubike } from '../models/ubike';
import { AppBar, Autocomplete, Box, Button, Checkbox, Container, Drawer, FormControl, FormControlLabel, Grid, Hidden, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Toolbar, Typography, tablePaginationClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DehazeIcon from '@mui/icons-material/Dehaze';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link, useLocation } from 'react-router-dom';



interface Props {
    data: Ubike[];
}

export default function Page4({ data }: Props) {
    const taipei = ["松山區", "大安區", "大同區", "中山區", "內湖區", "南港區",
        "士林區", "北投區", "信義區", "中正區", "萬華區", "文山區", "臺大公館校區"]
    const taiwan = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市',
        '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣',
        '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', '基隆市', '新竹市', '嘉義市']
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectArea, setSelectArea] = useState<string>("");
    const [selectTown, setSelectTown] = useState<boolean[]>(Array(taipei.length).fill(false));
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [newData, setNewData] = useState<any[]>([]);
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState<string>("")

    useEffect(() => {
        const newSelectedDistricts = taipei.filter((district, index) => selectTown[index]);
        setSelectedDistricts(newSelectedDistricts);
        const updateData = data.filter(item => newSelectedDistricts.includes(item.sarea));
        setNewData(updateData); 
    }, [selectTown]);
    useEffect(() => {
        setCurrentRoute(location.pathname);
    },[location])

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    }
    const handleChange = (event: SelectChangeEvent<typeof selectArea>) => {
        setSelectArea(event.target.value);
    }
    const handleCancel = () => {
        setSelectArea("");
    }
    const handleSelectAllTown = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setSelectTown(Array(taipei.length).fill(newSelectAll));
    }
    const handleSelectSingleTown = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const newSelectTown = [...selectTown];
        newSelectTown[index] = !newSelectTown[index];
        setSelectTown(newSelectTown);
        if (newSelectTown.some(a => a === false)){
            setSelectAll(false);
        }
    }

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

    return (
        <Box sx={{ paddingLeft: { xs: 5, md: 12 }, paddingRight: { xs: 5, md: 12 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, height: 50 }}>
                <AppBar position="static" color="transparent" elevation={0}>
                    <Toolbar>
                        <Box sx={{ mr: 2 }}>
                            <img src={'/logo.png'} alt="Logo" style={{ height: 100 }} />
                        </Box>
                        <Hidden mdDown>
                            <Button component={Link} to='/instructions' sx={{ color: currentRoute === '/instructions' ? '#B5CC22' : '#467500', border: 'none', mr: 2, fontWeight: 'bold' }}>
                                使用說明
                            </Button>
                            <Button component={Link} to='/charging' sx={{ color: currentRoute === '/charging' ? '#B5CC22' : '#467500', border: 'none', mr: 2, fontWeight: 'bold' }}>
                                收費方式
                            </Button>
                            <Button component={Link} to='/stop' sx={{ color: currentRoute === '/stop' || currentRoute === '/page4' ? '#B5CC22' : '#467500', border: 'none', mr: 2, fontWeight: 'bold' }}>
                                站點資訊
                            </Button>
                            <Button component={Link} to='/news' sx={{ color: currentRoute === '/news' ? '#B5CC22' : '#467500', border: 'none', mr: 2, fontWeight: 'bold' }}>
                                最新消息
                            </Button>
                            <Button component={Link} to='/activity' sx={{ color: currentRoute === '/activity' ? '#B5CC22' : '#467500', border: 'none', fontWeight: 'bold' }}>
                                活動專區
                            </Button>
                            <Box sx={{ flexGrow: 1 }}></Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: '#B5CC22',
                                    color: 'white',
                                    backgroundColor: '#B5CC22',
                                    borderRadius: '20px'
                                }}
                                component={Link} to='/login'
                            >
                                登入
                            </Button>
                        </Hidden>
                        <Hidden mdUp>
                            <Box sx={{ flexGrow: 1 }}></Box>
                            <Button onClick={handleClick}>
                                <DehazeIcon sx={{ color: '#B5CC22' }} />
                            </Button>
                            <Drawer
                                anchor="right"
                                open={menuOpen}
                                onClose={handleClick}
                                PaperProps={{
                                    style: {
                                        width: '100%',
                                        height: '100vh',
                                        backgroundColor: '#B5CC22'
                                    }
                                }}
                            >
                                <Toolbar sx={{ background: 'white' }}>
                                    <img src={'/logo.png'} alt="Logo" style={{ height: 83 }} />
                                    <Box sx={{ flexGrow: 1 }}></Box>
                                    <Button onClick={handleClick}>
                                        <CloseIcon sx={{ color: '#B5CC22' }} />
                                    </Button>
                                </Toolbar>
                                <List>
                                    <ListItem onClick={handleClick}>
                                        <Link to='/instructions' style={{ textDecoration: 'none' }}>
                                            <ListItemText primary="使用說明" sx={{ color: currentRoute === '/instructions' ? '#467500' : 'white' }} />
                                        </Link>
                                    </ListItem>
                                    <ListItem onClick={handleClick}>
                                        <Link to='/charging' style={{ textDecoration: 'none' }}>
                                            <ListItemText primary="收費方式" sx={{ color: currentRoute === '/charging' ? '#467500' : 'white' }} />
                                        </Link>
                                    </ListItem>
                                    <ListItem onClick={handleClick}>
                                        <Link to='/stop' style={{ textDecoration: 'none' }}>
                                            <ListItemText primary="站點資訊" sx={{ color: currentRoute === '/stop' || currentRoute === '/page4' ? '#467500' : 'white' }} />
                                        </Link>
                                    </ListItem>
                                    <ListItem onClick={handleClick}>
                                        <Link to='/news' style={{ textDecoration: 'none' }}>
                                            <ListItemText primary="最新消息" sx={{ color: currentRoute === '/news' ? '#467500' : 'white' }} />
                                        </Link>
                                    </ListItem>
                                    <ListItem onClick={handleClick}>
                                        <Link to='/activity' style={{ textDecoration: 'none' }}>
                                            <ListItemText primary="活動專區" sx={{ color: currentRoute === '/activity' ? '#467500' : 'white' }} />
                                        </Link>
                                    </ListItem>
                                </List>
                                <Box sx={{ flexGrow: 1 }}></Box>
                                <List sx={{ marginBottom: '5%' }}>
                                    <ListItem onClick={handleClick}>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                borderColor: 'white',
                                                color: '#82D900',
                                                backgroundColor: 'white',
                                                borderRadius: '20px'
                                            }}
                                        >
                                            登入
                                        </Button>
                                    </ListItem>
                                </List>
                            </Drawer>
                        </Hidden>
                    </Toolbar>
                </AppBar>
            </Box>

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
                        {selectArea == '臺北市' && taipei.map((area, index) => (
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

            <Grid container spacing={5} sx={{ marginTop: 2, marginLeft: 1, paddingRight: 7 }}>
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
                {selectArea == '臺北市' && newData.slice(0, 5).map((one, index) => (
                    <Fragment key={index + "$"}>
                        {index % 2 !== 0
                            ?
                            <>
                                {taipei.includes(one.sarea)
                                    ? <Grid item xs={3} md={2} sx={{ ...gridItem, background: '#1111' }}>台北市</Grid>
                                    : <Grid item xs={3} md={2} sx={{ ...gridItem, background: '#1111' }}>其他</Grid>
                                }
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
                                        ? <Grid item xs={3} md={2} sx={{ ...gridItem, ...bottomLeft }}>台北市</Grid>
                                        : <Grid item xs={3} md={2} sx={gridItem}>台北市</Grid>
                                    )
                                    : <Grid item xs={3} md={2} sx={gridItem}>其他</Grid>
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
            <Box sx={{ height: 50 }}></Box>
        </Box>
    )
}