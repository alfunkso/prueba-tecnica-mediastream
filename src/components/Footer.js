import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import tmdbLogo from './PoweredByRectangle_Blue.svg';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        textAlign: "center",
        paddingTop: theme.spacing.unit * 4,
    },
    divider: {
        marginBottom: theme.spacing.unit * 2,
    },
    madeBy: {
        marginBottom: theme.spacing.unit * 2,
    },
    logo: {
        height: "80px"
    }
});

function Footer({classes}) {
    return (
        <div className={classes.container}>
            <Divider className={classes.divider} />
            <Typography variant="subtitle1" gutterBottom className={classes.madeBy} >
                Made by&nbsp;
                <a
                    href="https://alfunkso.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{textDecoration: "none"}}
                >
                    Alfonso Cornejo
                </a>
            </Typography>
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                <img
                    src={tmdbLogo}
                    alt="Logo The Movie Database"
                    className={classes.logo}
                />
            </a>
        </div>
    );
}

export default withStyles(styles)(Footer);