import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import tmdbLogo from './PoweredByRectangle_Blue.svg';

import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    container: {
        textAlign: "center",
        paddingTop: theme.spacing.unit * 4,
    },
    divider: {
        marginBottom: theme.spacing.unit * 4,
    },
    logo: {
        height: "80px"
    }
});

function Footer({classes}) {
    return (
        <div className={classes.container}>
            <Divider className={classes.divider} />
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