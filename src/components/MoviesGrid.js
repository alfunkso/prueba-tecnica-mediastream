import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {fetchNextPage} from "../actions";

import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import MovieGridTile from './MovieGridTile';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    loadMoreButton: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
});

/* Redux Connection */
const mapStateToProps = (state) => ({
    appGlobalStatus: state.getIn(["status", "appGlobalStatus"]),
    popularIndex: state.getIn(["popularIndex"]),
});

const mapDispatchToProps = (dispatch) => ({
    onLoadMore: () => dispatch(fetchNextPage())
});

function MoviesGrid({appGlobalStatus, popularIndex, onLoadMore, classes}) {
    return (
        <div className={classes.root}>
            <GridList cellHeight={240}>
                {
                    popularIndex.map(movieId => (
                        <MovieGridTile movieId={movieId} key={movieId} />
                    ))
                }
            </GridList>
            <Button
                size="large"
                onClick={onLoadMore}
                variant="contained"
                color="primary"
                className={classes.loadMoreButton}
                fullWidth
            >
                Load more
            </Button>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MoviesGrid));