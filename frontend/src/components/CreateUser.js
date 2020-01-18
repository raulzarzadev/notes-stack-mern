import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    getUsers = async e => {
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({ users: res.data })
    }


    async componentDidMount() {
        this.getUsers()
    }

    

    onSubmit = async e => {
        await axios.post('http://localhost:4000/api/users', {
        username: this.state.username})
        e.preventDefault();
    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/'+ id)
        this.getUsers()
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body black-words">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li 
                                className="list-group list-group-item-action" 
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}
                                >
                                    {user.username}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
