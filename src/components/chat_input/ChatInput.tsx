import React, {Component, createRef} from 'react';
import './chat.css';
import {Message} from "../../models";

type State = {
    userText: string;
}

type Props = {
    activeUserName: string;
    messages: Message[];
    addMessage: (message: string) => void;
}

export class ChatInput extends Component<Props, State> {

    public state: State = {
        userText: '',
    };

    private scrollContainer = createRef<HTMLDivElement>();

    componentDidUpdate(prevProps: Props) {
        if(this.props.messages.length !== prevProps.messages.length) {
            this.scrollToBottom();
        }
    }

    render() {
        return(
            <div className="chat-container">
                <div className="chatOutput-container" ref={this.scrollContainer}>
                    {this.renderMessage()}
                </div>
                <div className="chatInput-container">
                    <textarea className="input" placeholder="Text Here..." value={this.state.userText} onChange={this.onTextUpdate} onKeyPress={this.onKeyPress}/>
                    <button className="button" onClick={this.onTextSubmit}> Enter </button>
                </div>
            </div>
        );
    }

    private onKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
        if ( e.key == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.onTextSubmit();
        }
    };

    private scrollToBottom = () => {
        if(this.scrollContainer.current !== null) {
            this.scrollContainer.current.scrollTop = this.scrollContainer.current.scrollHeight
        }
    };

    private renderMessage = () =>
        this.props.messages.map(message =>
            <div className={this.props.activeUserName === message.id ? "messageDivActive" : "messageDiv"}>
                <div className="xsFont">{message.id}:</div>
                <div>{message.message}</div>
                <div className="xsFont">{message.time}</div>
            </div>
        );

    private onTextUpdate: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
        const { value: userText } = event.currentTarget;
        this.setState(() => ({ userText }));
    };

    private onTextSubmit = () => {
        if (this.state.userText === '') {
            return;
        }
        this.props.addMessage(this.state.userText);
        this.setState((state) => ({
            userText: '',
        }));
    };
}