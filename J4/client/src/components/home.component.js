import React, { Component } from 'react';
import UserService from "../services/user.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Post from "./post.component";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: undefined
        };
    }

    componentDidMount() {
        UserService.getAllUsers().then(resp => {
            this.setState({
                users: resp.data
            })
        });
    }

    render() {
        const { users } = this.state;

        return (
            <div>

                <h1 className="mb-5">Homepage</h1>
                {users ? (
                    users.users.map((user, i) => {
                        return <Link to={"/"+user.login} className="nav-link">
                        Blog : {user.login}
                      </Link>
                    })
                ) : null}
            </div>
        )
    }
}