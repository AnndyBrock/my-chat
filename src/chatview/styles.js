const styles = theme => ({

    content: {
        height: 'calc(100vh - 100px)',
        overflow: 'auto',
        padding: '25px',
        marginLeft: '300px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: '50px',
        width: 'calc(100% - 300px)',
        position: 'absolute'
    },

    userSent: {
        float: 'left',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        textAlign: 'left',
        backgroundColor: '#87c49b',
        color: 'white',
        width: 'auto',
        borderRadius: '10px'
    },

    friendSent: {
        float: 'right',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        textAlign: 'right',
        backgroundColor: '#87afc4',
        color: 'white',
        width: 'auto',
        borderRadius: '10px'
    },

    chatHeader: {
        width: 'calc(100% - 301px)',
        height: '50px',
        backgroundColor: '#344195',
        position: 'fixed',
        marginLeft: '301px',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '10px',
        boxSizing: 'border-box'
    }

});

export default styles;