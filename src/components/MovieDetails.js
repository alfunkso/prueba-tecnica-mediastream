import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {lazyFetchAllDetails} from "../actions";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const debug = require('debug')('prueba-tecnica-mediastream:MovieDetails');

const styles = theme => ({
    poster: {
        maxWidth: "100%",
        maxHeight: "600px",
    },
    posterContainer: {
        textAlign: "center",
    },
});

/* Redux Connection */
const mapStateToProps = (state, ownProps) => {
    const movieId = Number(ownProps.match.params.movieId);
    const movie = state.getIn(["movies", movieId]);
    if ( movie != null ) {
        const apiImages = state.getIn(["status", "apiImages"]);
        return {
            title: movie.get("title"),
            voteAverage: movie.get("vote_average"),
            overview: movie.get("overview"),
            releaseDate: movie.get("release_date"),
            reviews: movie.get("reviews"),
            posterUrl: apiImages.getPosterUrl(movie.get("poster_path")),
        };
    } else {
        return {};
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMount: () => dispatch(lazyFetchAllDetails(Number(ownProps.match.params.movieId))),
});

class MovieDetails extends PureComponent {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const {
            classes,
            title,
            voteAverage,
            releaseDate,
            overview,
            reviews,
            posterUrl
        } = this.props;

        debug("this.props.match.params", this.props.match.params);

        return (
            <div>
                <Paper>
                    <Grid container>
                        <Grid item xs={6} className={classes.posterContainer}>
                            <img
                                src={posterUrl}
                                alt={title}
                                className={classes.poster}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="display2">
                                {title}
                            </Typography>
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
                        <Grid container style={{padding: "0 2em"}}>
                            <Grid item xs={12}>
                                <Typography variant="display1" gutterBottom>
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