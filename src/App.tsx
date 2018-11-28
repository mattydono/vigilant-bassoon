import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import './App.css';
import { ChatPanel, Message, setMessages } from './chat-panel';
import { AppState, configureStore } from './redux';
import { createPersistenceService, PersistenceService } from './services/persistence';
import { getUsers, Users } from './user-selection';

type State = {
  appStatus: 'loading' | 'ready' | 'error';
  error?: Error;
};

export class App extends Component<{}, State> {
  public state: State = {
    appStatus: 'loading',
  };

  private messagesPersistenceService: PersistenceService<Message>;
  private store: Store<AppState> = configureStore();

  public componentDidMount() {
    this.messagesPersistenceService = createPersistenceService<Message>('messages');

    /* This needs to be within the `userPersistenceService` */
    const serverUsers = new Promise((resolve, reject) => {
      fetch('http://localhost:8080/users')
        .then(response => response.json())
        .then(parsedJSON => resolve(parsedJSON.results))
        .catch(reject);
    });
    serverUsers.then(console.log, console.error);

    this.messagesPersistenceService
      .getAll()
      .then(messages => this.store.dispatch(setMessages(messages)));
    this.store.dispatch(getUsers());
    this.setState({ appStatus: 'ready' });
  }

  public render() {
    if (this.state.appStatus === 'loading') {
      return null;
    }

    if (this.state.appStatus === 'error') {
      return this.state.error!.message;
    }

    return (
      <Provider store={this.store}>
        <div className="app-container">
          <Users />
          <ChatPanel persistenceService={this.messagesPersistenceService} />
        </div>
      </Provider>
    );
  }
}
