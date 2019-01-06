import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {addToFavesAndSave, removeFromFavesAndSave, lazyFetchReviews} from "../actions";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const debug = require('debug')('prueba-tecnica-mediastream:MovieDetails');

const styles = theme => ({

});

/* Redux Connection */
const mapStateToProps = (state, ownProps) => ({
    title: state.getIn(["movies", Number(ownProps.match.params.movieId), "title"]),
    voteAverage: state.getIn(["movies", Number(ownProps.match.params.movieId), "vote_average"]),
    overview: state.getIn(["movies", Number(ownProps.match.params.movieId), "overview"]),
    releaseDate: state.getIn(["movies", Number(ownProps.match.params.movieId), "release_date"]),
    reviews: state.getIn(["movies", Number(ownProps.match.params.movieId), "reviews"]),
    posterUrl: state.getIn(["status", "apiImages"]).getPosterUrl(state.getIn(["movies", Number(ownProps.match.params.movieId), "poster_path"])),
    isFavorite: state.getIn(["favorites", Number(ownProps.match.params.movieId)]) === true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onFavorite: () => dispatch(addToFavesAndSave(Number(ownProps.match.params.movieId))),
    onUnfavorite: () => dispatch(removeFromFavesAndSave(Number(ownProps.match.params.movieId))),
    onMount: () => dispatch(lazyFetchReviews(Number(ownProps.match.params.movieId))),
});

class MovieDetails extends PureComponent {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const {
            title,
            voteAverage,
            releaseDate,
            overview,
            reviews,
            posterUrl,
            onFavorite,
            onUnfavorite,
            isFavorite
        } = this.props;

        debug("this.props.match.params", this.props.match.params);

        return (
            <div>
                <Paper>
                    <Grid container>
                        <Grid item xs={6}>
                            <img src={posterUrl} alt={title} style={{maxWidth: "400px"}} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="display1">
                                {title}
                            </Typography>
                            {
                                isFavorite
                                    ? (
                                        <IconButton onClick={onUnfavorite}>
                                            <StarIcon />
                                        </IconButton>
                                    )
                                    : (
                                        <IconButton onClick={onFavorite}>
                                            <StarBorderIcon />
                                        </IconButton>
                                    )
                            }
                            <Typography variant="title">
                                Score: {voteAverage}
                            </Typography>
                            <Typography variant="body2">
                                Release date: {releaseDate}
                            </Typography>
                            <Typography variant="body1">
                                {overview}
                            </Typography>
                        </Grid>
                    </Grid>

                    {
                        reviews != null &&
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="title" gutterBottom>
                                    Reviews
                                </Typography>
                                {
                                    reviews.isEmpty()
                                    ? (
                                            <Typography variant="subtitle1" gutterBottom>
                                                No reviews
                                            </Typography>
                                    )
                                    : (
                                        <div>
                                        {
                                            reviews.map((review, index) => (
                                                <div key={index} style={{ padding: "2em" }}>
                                                    <Typography variant="h5">
                                                        {review.get("author")}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {review.get("content")}
                                                    </Typography>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    )
                                }
                            </Grid>
                        </Grid>
                    }
                </Paper>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MovieDetails));