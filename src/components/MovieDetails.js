import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {lazyFetchMovie} from "../actions";
import {Link} from "react-router-dom";
import {List} from 'immutable';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Reviews from './Reviews';

const styles = theme => ({
    container: {
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4,
    },
    poster: {
        maxWidth: "100%",
        maxHeight: "600px",
    },
    posterContainer: {
        textAlign: "center",
    },
    paper: {
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    adult: {
        color: "red",
    },
    backButton: {
        marginTop: theme.spacing.unit * 4,
    },
});

/* Redux Connection */
const mapStateToProps = (state, ownProps) => {
    const movieId = Number(ownProps.match.params.movieId);
    const movie = state.getIn(["movies", movieId]);
    if ( movie != null ) {
        const apiImages = state.getIn(["status", "apiImages"]);
        return {
            movieId: movieId,
            title: movie.get("title"),
            tagline: movie.get("tagline"),
            voteAverage: movie.get("vote_average"),
            voteCount: movie.get("vote_count"),
            overview: movie.get("overview"),
            releaseDate: movie.get("release_date"),
            homepage: movie.get("homepage"),
            language: movie.get("original_language"),
            popularity: movie.get("popularity"),
            runtime: movie.get("runtime"),
            genres: movie.get("genres", List()).map(genre => genre.get("name")),
            countries: movie.get("production_countries", List()).map(country => country.get("iso_3166_1")),
            backdropUrl: apiImages.getBackdropUrl(movie.get("backdrop_path")),
            posterUrl: apiImages.getPosterUrl(movie.get("poster_path")),
            fullPosterUrl: apiImages.getImageUrl(movie.get("poster_path"), "original"),
        };
    } else {
        return {
            movieId: movieId,
        };
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMount: () => dispatch(lazyFetchMovie(Number(ownProps.match.params.movieId))),
});

class MovieDetails extends PureComponent {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const {
            classes,
            movieId,
            title,
            tagline,
            voteAverage,
            voteCount,
            overview,
            releaseDate,
            homepage,
            language,
            popularity,
            runtime,
            genres,
            countries,
            posterUrl,
            fullPosterUrl,
            adult,
        } = this.props;

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={6} className={classes.posterContainer}>
                            {
                                posterUrl != null
                                ? (
                                    <a
                                        href={fullPosterUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={posterUrl}
                                            alt={title}
                                            className={classes.poster}
                                        />
                                    </a>
                                    )
                                : (
                                    <Typography variant="h4">
                                        No poster available
                                    </Typography>
                                    )
                            }

                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h2">
                                {title}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {tagline}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="secondary"
                                gutterBottom
                            >
                                <StarHalfIcon />
                                Score: {voteAverage} ({voteCount} votes)
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {overview}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Language: {language}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Homepage: <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a>
                            </Typography>
                            <Typography variant="body2">
                                Release date: {releaseDate}
                            </Typography>
                            {
                                (adult === "true" || adult) &&
                                <Typography variant="button" className={classes.adult}>
                                    Adult movie
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                </Paper>
                <Reviews movieId={movieId} />
                <Button
                    component={Link}
                    to="/ptm/"
                    size="medium"
                    color="primary"
                    variant="outlined"
                    className={classes.backButton}
                >
                    <ArrowBackIcon /> Back to movie list
                </Button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MovieDetails));