import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'



export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date()
    }



    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users/')
        this.setState({ users: res.data.map(user => user.username) })
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onDateChange = date => {
        this.setState({ date })

    } 

    onSubmit = e => {
        console.log(this.state.title, this.state.content)
        e.preventDefault();

    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card b  lack-words">
                    <div className="card card-title text-center">
                        <h3>Crea una nota </h3>

                    </div>
                    <div className="card card-body">

                        {/* SELECT USER */}
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <select
                                    className="form-control"
                                    name="userSelected"
                                    onChange={this.onInputChange}
                                >
                                    {
                                        this.state.users.map(user =>
                                            <option
                                                key={user}
                                                value={user}
                                            >
                                                {user}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Titulo"
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    type="text"
                                    name="content"
                                    className="form-control"
                                    placeholder="Contenido"
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <DatePicker
                                    selected={this.state.date}
                                    className="form-control"
                                    onChange={this.onDateChange}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Guardar
                        </button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
