import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({

});

/* Redux Connection */
const mapStateToProps = (state, ownProps) => ({
    id: ownProps.movieId,
    title: state.getIn(["movies", ownProps.movieId, "title"]),
    voteAverage: state.getIn(["movies", ownProps.movieId, "vote_average"]),
    backdropUrl: state.getIn(["status", "apiImages"]).getBackdropUrl(state.getIn(["movies", ownProps.movieId, "backdrop_path"])),
});

function MovieGridTile({classes, title, voteAverage, backdropUrl, id}) {
    return (
        <Link to={`/movie/${id}`}>
            <GridListTile>
                <img src={backdropUrl} alt={title} />
                <GridListTileBar
                    title={title}
                    subtitle={<span>score: {voteAverage}</span>}
                />
            </GridListTile>
        </Link>
    );
}

export default connect(mapStateToProps)(withStyles(styles)(MovieGridTile));