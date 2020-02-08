import React, { Component } from "react";
import Filter from "./Filter";
import LogView from "./LogView";
import { connect } from "react-redux";
import loadChannels from "../actions/loadChannels";
import loadLogs from "../actions/loadLogs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

class LogSearch extends Component {
    constructor(props) {
        super(props);

        props.dispatch(loadChannels());
    }

    render() {
        return (
            <div className="log-search">
                <ToastContainer />
                <Filter
                    channels={this.props.channels}
                />
                <LogView />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channels: state.channels,
    };
};

export default connect(mapStateToProps)(LogSearch);