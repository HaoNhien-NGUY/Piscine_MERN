import React, { Component } from 'react';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import BlogService from "../services/blog.service";

import Post from "./post.component";

export default class Blog extends Component {
    constructor(props) {
        super(props);

        this.onCreateButton = this.onCreateButton.bind(this);

        this.state = {
            currentUser: undefined,
            blogUser: undefined,
            isOwned: false,
            posts: undefined
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser()
            });
        }

        UserService.getUserLogin(params.login).then(resp => {
            const respUser = resp.data;
            if (user && respUser.login === user.login) {
                this.setState({
                    isOwned: true
                })
            }
            this.setState({
                blogUser: respUser
            })

            BlogService.getUserPost(respUser.id).then(resp => {
                this.setState({
                    posts: resp.data
                })
            });
        });
    }

    onCreateButton(e) {
        console.log('fuck me harder please');
    }


    render() {
        const { currentUser, isOwned, blogUser, posts } = this.state;
        let blogLogin;
        if (blogUser) {
            blogLogin = blogUser.login;
        } else {
            blogLogin = "404 not found";
        }
        return (
            <div>
                <h1>{blogLogin}</h1>
                {isOwned ? (
                    <button onClick={this.onCreateButton()}>Create</button>
                ) : (null)}

                <div className="row mt-5">
                    {posts ? (
                        posts.post.map((post, i) => {
                            return (<Post post={post} key={i} isOwned={isOwned} />)
                        })
                    ) : null}
                </div>
            </div>
        )
    }
}