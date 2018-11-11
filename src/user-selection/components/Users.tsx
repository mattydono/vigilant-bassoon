import React from 'react';
import { User } from '../User';
import './users.css';

type Props = {
  users: User[];
  activeUserId: string | null;
  setActiveUser: (id: string | null) => void;
  addUser: (name: string) => void;
};

type State = {
  name: string;
};

export class Users extends React.Component<Props, State> {
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
          {user.name}
        </div>
      );
    });
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
