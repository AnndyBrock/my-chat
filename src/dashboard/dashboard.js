import React from 'react';
import ChatListComponent from '../chatlist/chatlist';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import ChatViewComponent from '../chatview/chatview';
import ChatTextBoxComponent from '../chattextbox/chattextbox'
const firebase = require("firebase");

class DashboardComponent extends React.Component{

    constructor(){
        super();
        this.state={
            selectedChat: null,
            newChatFormVisible:false,
            email:null,
            chats:[]
        }
    }

    render() {

        const {classes} = this.props;
        const {selectedChat, newChatFormVisible, email, chats}=this.state;

        return(
            <div>
                <ChatListComponent history={this.props.history}
                selectChatFn={this.selectChat}
                newChatButtonFn={this.newChatButton}
                chats={this.state.chats}
                userEmail={this.state.email}
                chatIndex={this.state.selectedChat}
                />
                {
                     newChatFormVisible ? null : <ChatViewComponent user={email} chat={chats[selectedChat]}/>
                }
                {
                    selectedChat!==null && !newChatFormVisible ?
                        <ChatTextBoxComponent
                            messageRead={this.messageRead}
                            onSubmit={this.submitMessage}/> : null

                }
                 <Button onClick={this.signOut} className={classes.signOutBtn}>Sign Out</Button>
            </div>
        );
    }
    signOut = ()=>firebase.auth().signOut();

    selectChat = async (chatIndex) =>{
        await this.setState({selectedChat:chatIndex});
        this.messageRead()
    };

    buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

    submitMessage = (msg) => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr!==this.state.email)[0]);
        firebase.firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender:this.state.email,
                    message: msg,
                    timestamp:Date.now()
                }),
                receiverHasRead:false
            })
    };

    newChatButton=()=> this.setState({newChatFormVisible:true, selectedChat:null});

    messageRead = () =>{
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr=>_usr!==this.state.email)[0])
        if (this.clikingOnChat(this.state.selectedChat)){
            firebase.firestore()
                .collection('chats')
                .doc(docKey)
                .update({receiverHasRead:true})
        }else {
            console.log("I am a sender")
        }
    };

    clikingOnChat = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length-1].sender!==this.state.email;

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if (!_usr){
                this.props.history.push('/login')
            }else{
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users','array-contains',_usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data());
                        await this.setState({
                            email: _usr.email,
                            chats: chats,
                            friends: []
                        });
                        console.log(this.state)
                    })
            }
        })
    }
}

export default withStyles(styles)(DashboardComponent);
