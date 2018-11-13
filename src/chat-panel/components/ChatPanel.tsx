import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { AppState } from '../../redux/configureStore';
import { User } from '../../user-selection';
import { Message } from '../Message';
import { addMessage } from '../redux';
import './chatPanel.css';

type State = {
  userText: string;
};

type ChatPanelMessage = Message & { user: User };

type StateProps = {
  messages: ChatPanelMessage[];
  activeUser: User | null;
};

type DispatchProps = {
  addMessage: (message: Message) => void;
};

type Props = StateProps & DispatchProps;

class _ChatPanel extends Component<Props, State> {
  public state: State = {
    userText: '',
  };

  private scrollContainer = createRef<HTMLDivElement>();

  public componentDidUpdate(prevProps: Props) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.scrollToBottom();
    }
  }

  public render() {
    if (!this.props.activeUser) {
      return null;
    }

    return (
      <div className="chat-container">
        <div className="chatOutput-container" ref={this.scrollContainer}>
          {this.renderMessage()}
        </div>
        <div className="chatInput-container">
          <textarea
            className="input"
            placeholder="Text Here..."
            value={this.state.userText}
            onChange={this.onTextUpdate}
            onKeyPress={this.onKeyPress}
          />
          <button className="button" onClick={this.onTextSubmit}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  private onKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.onTextSubmit();
    }
  };

  private scrollToBottom = () => {
    const container = this.scrollContainer.current;
    if (container !== null) {
      container.scrollTop = container.scrollHeight;
    }
  };

  private renderMessage = () =>
    this.props.messages.map(message => (
      <div
        className={this.props.activeUser!.id === message.userId ? 'messageDivActive' : 'messageDiv'}
      >
        <div className="xsFont">{message.user.name}:</div>
        <div>{message.message}</div>
        <div className="xsFont">{message.time}</div>
      </div>
    ));

  private onTextUpdate: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    const { value: userText } = event.currentTarget;
    this.setState(() => ({ userText }));
  };

  private onTextSubmit = () => {
    const message = this.state.userText;
    if (message === '') {
      return;
    }
    this.props.addMessage({
      userId: this.props.activeUser!.id,
      message,
      id: uuid(),
      time: new Date().toLocaleTimeString(),
    });
    this.setState(() => ({ userText: '' }));
  };
}

function mapStateToProps(state: AppState): StateProps {
  const messages = state.messages.map<ChatPanelMessage>(message => {
    const user = state.users.users.find(user => user.id === message.userId);
    if (user === undefined) {
      return { ...message, user: { id: message.userId, name: 'DELETED' } };
    }
    return { ...message, user };
  });

  const activeUser = state.users.users.find(user => user.id === state.users.activeUserId);
  return {
    messages,
    activeUser: activeUser ? activeUser : null,
  };
}

// function mapDispatchToProps(dispatch: Dispatch){
//   return {
//     addMessage: (message: Message) => dispatch(addMessage(message))
//   }
// }
const mapDispatchToProps = {
  addMessage,
};

export const ChatPanel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ChatPanel);
