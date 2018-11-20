import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { AppState } from '../../redux/configureStore';
import { PersistenceService } from '../../services/persistence';
import { User } from '../../user-selection';
import { Message, MessageId } from '../Message';
import { addMessage, editMessage, removeMessage } from '../redux';
import './chatPanel.css';

type State = {
  userText: string;
  editMessageId: string | null;
};

type ChatPanelMessage = Message & { user: User };

type OwnProps = {
  persistenceService: PersistenceService<Message>;
};

type StateProps = {
  messages: ChatPanelMessage[];
  activeUser: User | null;
};

type DispatchProps = {
  addMessage: typeof addMessage; // both the same
  removeMessage: (messageId: MessageId) => void;
  editMessage: (message: Message) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

class _ChatPanel extends Component<Props, State> {
  public state: State = {
    userText: '',
    editMessageId: null,
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
        <div className="messageEdit">
          <button className="editButton" onClick={this.onMessageDeletion(message.id)}>
            ❌
          </button>
          <button className="editButton" onClick={this.onMessageEdit(message)}>
            ✎
          </button>
        </div>
        <div className="xsFont">{message.user.name}:</div>
        <div>{message.message}</div>
        <div className="xsFont">{message.time}</div>
      </div>
    ));

  private onMessageEdit = (message: Message) => () => {
    this.setState({
      userText: message.message,
      editMessageId: message.id,
    });
  };

  private onMessageDeletion = (messageId: MessageId) => () => {
    if (this.state.editMessageId) {
      this.props.removeMessage(messageId);
      this.setState({
        userText: '',
      });
    } else {
      this.props.removeMessage(messageId);
    }
  };

  private onTextUpdate: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    const { value: userText } = event.currentTarget;
    this.setState(() => ({ userText }));
  };

  private onTextSubmit = () => {
    const message = this.state.userText;
    if (message === '') {
      return;
    }

    if (this.state.editMessageId) {
      const editingMessage = this.props.messages.find(
        message => message.id === this.state.editMessageId,
      );
      if (editingMessage !== undefined) {
        const newMessage = {
          ...editingMessage,
          message,
        };
        this.props.editMessage(newMessage);
        this.props.persistenceService.save(newMessage);
        this.setState({
          userText: '',
          editMessageId: null,
        });
      }
      return;
    }

    const newMessage = {
      userId: this.props.activeUser!.id,
      message,
      id: uuid(),
      time: new Date().toLocaleTimeString(),
    };
    this.props.addMessage(newMessage);
    this.props.persistenceService.save(newMessage);
    this.setState(() => ({ userText: '' }));
  };
}

function mapStateToProps(state: AppState): StateProps {
  const messages = state.messages.messages.map<ChatPanelMessage>(message => {
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

// function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
//   return {
//       addMessage: (message: Message) => dispatch(addMessage(message)),
//       removeMessage: (messageId: MessageId) => dispatch(removeMessage(messageId)),
//   }
// }

const dispatchMap: DispatchProps = {
  addMessage,
  removeMessage,
  editMessage,
};

export const ChatPanel = connect(
  mapStateToProps,
  dispatchMap,
)(_ChatPanel);
