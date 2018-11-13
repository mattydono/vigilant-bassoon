import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { ChatPanel } from './chat-panel';
import { configureStore } from './redux';
import { Users } from './user-selection';

export class App extends Component {
  private store = configureStore();

  public render() {
    return (
      <Provider store={this.store}>
        <div className="app-container">
          <Users />
          <ChatPanel />
        </div>
      </Provider>
    );
  }
}
