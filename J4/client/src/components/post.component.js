import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import UserService from "../services/user.service";
// import AuthService from "../services/auth.service";
// import BlogService from "../services/blog.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOwned: props.isOwned
        }
        // this.onDeleteButton = this.onDeleteButton.bind(this);

    }

    componentDidMount() {

    }

    deleteHandler(i, e) {
        e.preventDefault();

    }

    render() {
        const { title, content, authorname, _id } = this.props.post;
        console.log(this.props.post);
        return (
            <div className="col-12 mb-4">
                <h3><Link to={"/"+authorname+"/"+ _id}>Title : {title}</Link></h3>
                <p>Author : {authorname}</p>
                <div className="mb-5">
                    <p>{content}</p>
                    {this.state.isOwned ? (<button onClick={this.deleteHandler.bind(this)} className="btn btn-danger">Delete</button>) : null}
                </div>
            </div>
        )
    }
}