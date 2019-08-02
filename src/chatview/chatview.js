
import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatViewComponent extends React.Component {

    render() {
 
        const {classes, chat, user} = this.props;

        if (chat === undefined){
            return(<main id='chatview-container' className={classes.content}></main>)
        } else {
            return (
               <div>
                   <div className={classes.chatHeader}>
                        Your conversation with {chat.users.filter(_usr=>_usr!==user )}
                   </div>
                   <main id='chatview-container' className={classes.content}>
                       {
                           chat.messages.map((_msg, _indx)=>{
                               return(<div key={_indx} className={_msg.sender===user ? classes.friendSent : classes.userSent}>
                                   {_msg.message}
                               </div>)
                           })
                       }
                   </main>
               </div>
            )
        }

    }

    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');
        if (container)
            container.scrollTo(0, container.scrollHeight)
    }
}

export default withStyles(styles)(ChatViewComponent);
