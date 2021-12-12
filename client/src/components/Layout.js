import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBarWithSideBar from './AppBarWithSideBar';
import { withRouter } from 'react-router-dom';

const useStyle = makeStyles((theme) => {
    return {
        page: {
            backgroundColor: "#f9f9f9",
            width: '100%',
            padding: theme.spacing(3)
        },
        root: {
            display: 'flex'
        },
        toolbardummy: theme.mixins.toolbar    // here asssigned mui toolbar to dummy toolbar to match height of both so our cards wont overlap
    }
});



function Layout({ children }) {

    const classes = useStyle();

    return (
        <div className={classes.root}>

            <AppBarWithSideBar />

            <div className={classes.page}>
                <div className={classes.toolbardummy}></div>
                {children}
            </div>
        </div>
    )
}

export default withRouter(Layout)
