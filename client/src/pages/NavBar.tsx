import { AppBar, Box, Button, Drawer, Hidden, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useEffect, useState } from "react";

interface Props {
    handleClick: () => void;
    menuOpen: boolean;
}

export default function NavBar({handleClick, menuOpen }: Props) {
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState<string>("")

    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location]);
    
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <Box sx={{ mr: 2 }}>
                    <img src={'/logo.png'} alt="Logo" style={{ height: 100 }} />
                </Box>
                <Hidden mdDown>
                    <Button component={Link} to='/instructions'
                        sx={{
                            color: currentRoute === '/instructions' ? '#B5CC22' : '#467500',
                            border: 'none', mr: 2, fontWeight: 'bold'
                        }}
                    >
                        使用說明
                    </Button>
                    <Button component={Link} to='/charging'
                        sx={{
                            color: currentRoute === '/charging' ? '#B5CC22' : '#467500',
                            border: 'none', mr: 2, fontWeight: 'bold'
                        }}
                    >
                        收費方式
                    </Button>
                    <Button component={Link} to='/stop'
                        sx={{
                            color: currentRoute === '/stop' ? '#B5CC22' : '#467500',
                            border: 'none', mr: 2, fontWeight: 'bold'
                        }}
                    >
                        站點資訊
                    </Button>
                    <Button component={Link} to='/news'
                        sx={{
                            color: currentRoute === '/news' ? '#B5CC22' : '#467500',
                            border: 'none', mr: 2, fontWeight: 'bold'
                        }}
                    >
                        最新消息
                    </Button>
                    <Button component={Link} to='/activity'
                        sx={{
                            color: currentRoute === '/activity' ? '#B5CC22' : '#467500',
                            border: 'none', fontWeight: 'bold'
                        }}
                    >
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
                                    <ListItemText primary="使用說明"
                                        sx={{ color: currentRoute === '/instructions' ? '#467500' : 'white' }} />
                                </Link>
                            </ListItem>
                            <ListItem onClick={handleClick}>
                                <Link to='/charging' style={{ textDecoration: 'none' }}>
                                    <ListItemText primary="收費方式"
                                        sx={{ color: currentRoute === '/charging' ? '#467500' : 'white' }} />
                                </Link>
                            </ListItem>
                            <ListItem onClick={handleClick}>
                                <Link to='/stop' style={{ textDecoration: 'none' }}>
                                    <ListItemText primary="站點資訊"
                                        sx={{ color: currentRoute === '/stop' ? '#467500' : 'white' }} />
                                </Link>
                            </ListItem>
                            <ListItem onClick={handleClick}>
                                <Link to='/news' style={{ textDecoration: 'none' }}>
                                    <ListItemText primary="最新消息"
                                        sx={{ color: currentRoute === '/news' ? '#467500' : 'white' }} />
                                </Link>
                            </ListItem>
                            <ListItem onClick={handleClick}>
                                <Link to='/activity' style={{ textDecoration: 'none' }}>
                                    <ListItemText primary="活動專區"
                                        sx={{ color: currentRoute === '/activity' ? '#467500' : 'white' }} />
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
                                    component={Link} to='/login'
                                >
                                    登入
                                </Button>
                            </ListItem>
                        </List>
                    </Drawer>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}