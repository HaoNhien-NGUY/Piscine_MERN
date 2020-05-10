import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import BlogService from "../services/blog.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isOwned: props.isOwned,
            blogUser: undefined,
            isOwned: false,
            post: undefined,
            currentUser: undefined,
            comment: "",
            successful: false,
            message: ""
        }
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
            this.setState({
                blogUser: respUser
            })

            BlogService.getPostDetails(params.postid).then(resp => {
                this.setState({
                    post: resp.data
                })
            });
        });
    }

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            BlogService.postComment(
                this.state.comment,
                this.state.post.post._id
            )
            // .then(
            //     response => {
            //         this.setState({
            //             message: response.data.message,
            //             successful: true
            //         });
            //     },
            //     error => {
            //         const resMessage =
            //             (error.response &&
            //                 error.response.data &&
            //                 error.response.data.message) ||
            //             error.message ||
            //             error.toString();

            //         this.setState({
            //             successful: false,
            //             message: resMessage
            //         });
            //     }
            // );
        }

    }

    render() {
        if (this.state.post) {
            var { title, content, authorname, createdAt } = this.state.post.post;
            // console.log(this.state.post.post._id);
        }
        return (
            <div>
                <div className="col-12 mb-4">
                    {title ? (
                        <div>
                            <h3>Title : {title}</h3>
                            <p>Author : {authorname}</p>
                            <p>Created the : {createdAt}</p>
                            <div className="mb-5">
                                <p>{content}</p>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="col-12 mt-5">
                    <h3 className="mb-4">Comment</h3>
                    <Form
                        onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="comment">Comment</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="comment"
                                        value={this.state.comment}
                                        onChange={this.onChangeComment}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block mt-5">Send</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        )
    }
}