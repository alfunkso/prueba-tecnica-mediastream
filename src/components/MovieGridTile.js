import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {addToFavesAndSave, removeFromFavesAndSave} from "../actions";

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
    tile: {
        minWidth: "300px",
        minHeight: "169px",
        width: "24vw",
        height: "13.5vw",
    },
    titleBar: {

    },
    image: {
        width: "100%",
        height: "100%",
    },
    link: {
        color: "rgb(255,255,255)",
        textDecoration: "none",
    }
});

/* Redux Connection */
const mapStateToProps = (state, ownProps) => ({
    id: ownProps.movieId,
    title: state.getIn(["movies", ownProps.movieId, "title"]),
    voteAverage: state.getIn(["movies", ownProps.movieId, "vote_average"]),
    backdropUrl: state.getIn(["status", "apiImages"]).getBackdropUrl(state.getIn(["movies", ownProps.movieId, "backdrop_path"])),
    isFavorite: state.getIn(["favorites", Number(ownProps.movieId)]) === true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onFavorite: () => dispatch(addToFavesAndSave(ownProps.movieId)),
    onUnfavorite: () => dispatch(removeFromFavesAndSave(ownProps.movieId)),
});

function MovieGridTile(
    {
        classes,
        title,
        voteAverage,
        backdropUrl,
        onFavorite,
        onUnfavorite,
        isFavorite,
        id,
    }
) {
    return (
        <GridListTile className={classes.tile}>
            <Link className={classes.link} to={`/ptm/movie/${id}`}>
                <img
                    src={backdropUrl}
                    alt={title}
                    className={classes.image}
                />
                <GridListTileBar
                    className={classes.titleBar}
                    title={title}
                    subtitle={<span>Score: {voteAverage}</span>}
                />
            </Link>
        </GridListTile>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MovieGridTile));