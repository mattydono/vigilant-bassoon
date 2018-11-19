import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import uuid from 'uuid';
import { AppState } from '../../redux';
import { addUser, removeUser, setActiveUser } from '../redux';
import { User, UserId } from '../User';
import './users.css';

type State = {
  name: string;
};

type StateProps = {
  users: User[];
  activeUserId: string | null;
};

type DispatchProps = {
  setActiveUser: (id: string | null) => void;
  addUser: (name: string) => void;
  removeUser: (id: UserId) => void;
};

type Props = StateProps & DispatchProps;

export class _Users extends React.Component<Props, State> {
  public state: State = {
    name: '',
  };

  private scrollContainer = React.createRef<HTMLDivElement>();

  public componentDidUpdate(prevProps: Props) {
    if (this.props.users.length !== prevProps.users.length) {
      this.scrollToBottom();
    }
  }

  public render() {
    return (
      <div className="users-container">
        <div className="userDisplay" ref={this.scrollContainer}>
          {this.renderedUser()}
        </div>
        <div className="inputContainer">
          <input
            className="userInput"
            placeholder="Enter Name"
            value={this.state.name}
            onChange={this.onNameChange}
            onKeyPress={this.onKeyPress}
            maxLength={10}
          />
          <button className="userPush" onClick={this.onClickAdd}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  private renderedUser = () => {
    const { users, activeUserId } = this.props;
    return users.map(user => {
      const className = activeUserId === user.id ? 'active' : 'inactive';
      const onClick = this.userSelect(activeUserId === user.id ? null : user.id);
      return (
        <div key={user.id} className={`userOption ${className}`} onClick={onClick}>
          <button className="removeUser" onClick={this.onRemoveUser}>
            ❌
          </button>
          {user.name}
        </div>
      );
    });
  };

  private onRemoveUser = () => {
    this.props.removeUser(this.props.activeUserId!);
  };

  private onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      this.onClickAdd();
    }
  };

  private onNameChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value: name } = event.currentTarget;
    this.setState(() => ({ name }));
  };

  private nameExists = (name: string) => this.props.users.some(user => user.name === name);

  private onClickAdd = () => {
    const name = this.state.name.trim();
    if (name.length === 0 || this.nameExists(name)) {
      return;
    }

    this.props.addUser(name);
    this.clear();
  };

  private clear = () => {
    this.setState({ name: '' });
  };

  private userSelect = (id: string | null) => () => {
    this.props.setActiveUser(id);
  };

  private scrollToBottom = () => {
    const container = this.scrollContainer.current;
    if (container !== null) {
      container.scrollTop = container.scrollHeight;
    }
  };
}

function mapStateToProps(state: AppState): StateProps {
  const activeUser = state.users.users.find(user => user.id === state.users.activeUserId);
  return {
    users: state.users.users,
    activeUserId: activeUser ? activeUser.id : null,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setActiveUser: (userId: UserId | null) => dispatch(setActiveUser(userId)),
    addUser: (name: string) => dispatch(addUser({ name, id: uuid() })),
    removeUser: (userId: UserId) => dispatch(removeUser(userId)),
  };
}

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Users);
