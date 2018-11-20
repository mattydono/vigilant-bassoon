import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { ChatPanel, Message } from './chat-panel';
import { configureStore } from './redux';
import { createPersistenceService } from './services/persistence';
import { User, Users } from './user-selection';

export class App extends Component {
  private userPersistenceService = createPersistenceService<User>('users');
  private messagesPersistenceService = createPersistenceService<Message>('messages');
  private store = configureStore({
    users: {
      users: this.userPersistenceService.getAll(),
      activeUserId: null,
    },
    messages: {
      messages: this.messagesPersistenceService.getAll(),
    },
  });

  public render() {
    return (
      <Provider store={this.store}>
        <div className="app-container">
          <Users persistenceService={this.userPersistenceService} />
          <ChatPanel persistenceService={this.messagesPersistenceService} />
        </div>
      </Provider>
    );
  }
}
