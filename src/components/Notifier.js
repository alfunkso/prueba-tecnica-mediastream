import React from 'react';
import {connect} from 'react-redux';
import {withSnackbar} from 'notistack';
import {setSnackbarEnqueuer} from "../actions";

/* Redux Connection */
const mapDispatchToProps = (dispatch, ownProps) => ({
    setSnackbarEnqueuer: () => dispatch(setSnackbarEnqueuer(ownProps.enqueueSnackbar))
});

class Notifier extends React.PureComponent {
    componentDidMount() {
        this.props.setSnackbarEnqueuer();
    }

    render() {
        return null;
    }
}

export default withSnackbar(connect(() => ({}), mapDispatchToProps)(Notifier));