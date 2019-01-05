import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {addToFavesAndSave, removeFromFavesAndSave} from "../actions";

import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
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
    isFavorite: state.getIn(["favorites", ownProps.movieId]) === true
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
        <GridListTile>
            <img src={backdropUrl} alt={title} />
            <GridListTileBar
                title={<Link className={classes.link} to={`/movie/${id}`}>{title}</Link>}
                subtitle={<span>score: {voteAverage}</span>}
                actionIcon={
                    isFavorite
                        ? (
                            <IconButton
                                className={classes.icon}
                                onClick={onUnfavorite}
                            >
                                <StarIcon />
                            </IconButton>
                        )
                        : (
                            <IconButton
                                className={classes.icon}
                                onClick={onFavorite}
                            >
                                <StarBorderIcon />
                            </IconButton>
                        )
                }
            />
        </GridListTile>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MovieGridTile));