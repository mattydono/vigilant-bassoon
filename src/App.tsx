import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import './App.css';
import { ChatPanel, Message } from './chat-panel';
import { AppState, configureStore } from './redux';
import { createPersistenceService, PersistenceService } from './services/persistence';
import { User, Users } from './user-selection';

type State = {
  appStatus: 'loading' | 'ready' | 'error';
  error?: Error;
};

export class App extends Component<{}, State> {
  public state: State = {
    appStatus: 'loading',
  };

  private userPersistenceService: PersistenceService<User>;
  private messagesPersistenceService: PersistenceService<Message>;
  private store: Store<AppState>;

  public componentDidMount() {
    this.userPersistenceService = createPersistenceService<User>('users');
    this.messagesPersistenceService = createPersistenceService<Message>('messages');

    Promise.all([this.userPersistenceService.getAll(), this.messagesPersistenceService.getAll()])
      .then(([users, messages]) => {
        this.store = configureStore({
          users: {
            users,
            activeUserId: null,
          },
          messages: {
            messages,
          },
        });
        this.setState({ appStatus: 'ready' });
      })
      .catch(reason => {
        this.setState({
          appStatus: 'error',
          error: reason instanceof Error ? reason : new Error(reason),
        });
      });
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
          <Users persistenceService={this.userPersistenceService} />
          <ChatPanel persistenceService={this.messagesPersistenceService} />
        </div>
      </Provider>
    );
  }
}
