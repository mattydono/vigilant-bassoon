import React, {Component} from 'react';
import {Users} from './users/Users';
import {ChatInput} from './chat_input/ChatInput';
import '../app.css';
import {Message, User} from "../models";
import uuid from 'uuid/v4';

type State = {
    users: User[];
    activeUserId: string | null;
    messages: Message[];
};

// const USERS: ReadonlyArray<User> = [
//     {id: uuid(), name: 'Kyle'},
//     {id: uuid(), name: 'Matt'},
// ];

export class App extends Component<{}, State> {
    public state: State = {
        users: [],
        activeUserId: null,
        messages: [],
    };

    render() {

        const activeUser = this.state.users.find(user => {
           return user.id === this.state.activeUserId
        });

        return (
            <div className="app-container">
                <Users users={this.state.users} activeUserId={this.state.activeUserId}
                       setActiveUser={this.setActiveUser} addUser={this.addUser}/>
                {activeUser !== undefined && <ChatInput messages={this.state.messages} activeUserName={activeUser.name} addMessage={this.addMessage}/>}
            </div>
        );
    }

    private setActiveUser = (activeUserId: string | null) => {
        this.setState({activeUserId});
    };

    private addUser = (name: string) => {
        this.setState ((state) => ({
            users: [...state.users, {name, id: uuid()}]
        }));
    };

    private addMessage = (message: string) => {

        const activeUser = this.state.users.find(user => {
            return user.id === this.state.activeUserId
        });

        if(activeUser !== undefined) {

            this.setState((state) => ({
                messages: [...state.messages, {
                    message,
                    id: activeUser.name,
                    time: this.getCurrentTime()
                }],
            }));
        }
    };
    private getCurrentTime = () => new Date().toLocaleTimeString();
}