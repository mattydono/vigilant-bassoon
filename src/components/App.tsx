import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Message, User } from '../models';
import './App.css';
import { ChatInput } from './chat_input/ChatInput';
import { Users } from './users/Users';

const getCurrentTime = () => new Date().toLocaleTimeString();

type State = {
  users: User[];
  activeUserId: string | null;
  messages: Message[];
};

export class App extends Component<{}, State> {
  public state: State = {
    users: [],
    activeUserId: null,
    messages: [],
  };

  public render() {
    const activeUser = this.state.users.find(user => user.id === this.state.activeUserId);

    return (
      <div className="app-container">
        <Users
          users={this.state.users}
          activeUserId={this.state.activeUserId}
          setActiveUser={this.setActiveUser}
          addUser={this.addUser}
        />
        {activeUser !== undefined && (
          <ChatInput
            messages={this.state.messages}
            activeUserName={activeUser.name}
            addMessage={this.addMessage}
          />
        )}
      </div>
    );
  }

  private setActiveUser = (activeUserId: string | null) => {
    this.setState({ activeUserId });
  };

  private addUser = (name: string) => {
    this.setState(state => ({
      users: [...state.users, { id: uuid(), name }],
    }));
  };

  private addMessage = (message: string) => {
    const activeUser = this.state.users.find(user => {
      return user.id === this.state.activeUserId;
    });

    if (activeUser !== undefined) {
      this.setState(state => ({
        messages: [...state.messages, { id: activeUser.name, message, time: getCurrentTime() }],
      }));
    }
  };
}
