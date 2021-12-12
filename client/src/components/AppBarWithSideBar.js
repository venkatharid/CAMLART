import * as React from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { SubjectOutlined } from '@material-ui/icons';
import MapIcon from '@material-ui/icons/Map';
import { useHistory, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyle = makeStyles((theme) => {
    return {
        drawer: {
            width: drawerWidth,
            [`${theme.breakpoints.up('md')} and (orientation: portrait)`]: {
                width: 0
            },
        },
        drawerPaper: {
            width: drawerWidth
        },
        active: {
            background: '#f4f4f4'
        },
        toolbardummy: theme.mixins.toolbar,    // here asssigned mui toolbar to dummy toolbar to match height of both so our cards wont overlap
        description: {
            flexGrow: 1
        }
    }
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const menuItems = [
    {
        text: "Home",
        icon: <SubjectOutlined color='secondary' />,
        path: '/'
    },
    {
        text: "See on Map",
        icon: <MapIcon color='secondary' />,
        path: '/map'
    }
]

function AppBarWithSideBar() {
    const classes = useStyle();
    const history = useHistory();
    const location = useLocation();

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuOptionClick = (path) => {
        setOpen(false);
        history.push(path);
    }

    return (
        <Box style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                color='secondary'
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        style={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h5'
                        className={classes.description}
                        noWrap
                    >
                        COVID-19 Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                style={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                className={`${classes.drawer} sidedraw`}
                classes={{ paper: classes.drawerPaper }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => handleMenuOptionClick(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}></ListItemText>
                            <Divider />
                        </ListItem>
                    ))}
                </List>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}

export default AppBarWithSideBar;