import React, {Component, createRef} from 'react';
import './users.css'
import {User} from "../../models";

type Props = {
    users: User[];
    activeUserId: string | null;
    setActiveUser: (id: string | null) => void;
    addUser: (name: string) => void;
}

type State = {
    name: string
}

export class Users extends Component<Props, State> {

    public state: State = {
        name: ''
    };

    private scrollContainer = createRef<HTMLDivElement>();

    componentDidUpdate(prevProps: Props) {
        if(this.props.users.length !== prevProps.users.length) {
            this.scrollToBottom();
        }
    }

    private renderedUser = () => {
        const {users, activeUserId} = this.props;
        return users.map(user => {
            const className = activeUserId === user.id ? 'active' : 'inactive';
            const onClick = this.userSelect(activeUserId === user.id ? null : user.id);
            return (
                <div className={className} onClick={onClick}>
                    {user.name}
                </div>
            )
        });
    };

    public render() {
        return (
            <div className="users-container">
                <div className="userDisplay" ref={this.scrollContainer}>
                    {this.renderedUser()}
                </div>
                <div className="inputContainer">
                    <input className="userInput" placeholder="Enter Name" value={this.state.name}
                           onChange={this.onNameChange} onKeyPress={this.onKeyPress}/>
                    <button className="userPush" onClick={this.onClickAdd}> Enter</button>
                </div>
            </div>
        );
    }

    private onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key == 'Enter') {
            this.onClickAdd();
        }
    };

    private onNameChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const {value: name} = event.currentTarget;
        this.setState(() => ({name}));
    };

    private nameMatch = (name: string) => {
    for (let j = 0; j < this.props.users.length; j++) {
        if (this.props.users[j].name === name) {
            return true
        }
    } return false
    };

    private onClickAdd = () => {
        let nameFinder = this.nameMatch(this.state.name.trim());
        //eslint-disable-line
        console.log(nameFinder);
        if (this.state.name !== '' && !nameFinder) {
            this.props.addUser(this.state.name);
            this.clear()
        }
    };

    private clear = () => {
        this.setState({
            name: ''
        })
    };

    private userSelect = (id: string | null) => () => {
        this.props.setActiveUser(id);
    };

    private scrollToBottom = () => {
        const scrollMe = this.scrollContainer.current;
        if(scrollMe !== null) {
            scrollMe.scrollTop = scrollMe.scrollHeight;
        }
    }

}