export default (channel, username) => (dispatch) => {
    dispatch({
        type: 'SET_CURRENT',
        channel: channel,
        username: username
    });
}