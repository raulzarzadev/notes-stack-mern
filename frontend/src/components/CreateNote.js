import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'




export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        description: '',
        date: new Date(),
        editing: false,
        id: ''
    }



    async componentDidMount() {
        console.log(this.props.match.params.id);

        const res = await axios.get('http://localhost:4000/api/users/')
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        })
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
            this.setState({
                title: res.data.title,
                description: res.data.description,
                date: new Date(res.data.date),
                author: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
            console.log(res.data);
        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onDateChange = date => {
        this.setState({ date })

    }

    onSubmit = async e => {
        e.preventDefault();

        const newNote = {
            title: this.state.title,
            description: this.state.description,
            author: this.state.userSelected,
            date: this.state.date
        }

        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote)
        } else {
            await axios.post('http://localhost:4000/api/notes/', newNote)
        }
        window.location.href = '/'
    }


    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card black-words">
                    <div className="card card-title text-center">
                        <h3>Crea una nota </h3>

                    </div>
                    <div className="card card-body">


                        <form onSubmit={this.onSubmit}>
                            {/* SELECT USER */}
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    value={this.state.userSelected}
                                    onChange={this.onInputChange}
                                    name="userSelected" >
                                    {
                                        this.state.users.map(user =>
                                            <option key={user} value={user}>
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
                                    value={this.state.title}
                                    className="form-control"
                                    placeholder="Titulo"
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    type="text"
                                    name="description"
                                    value={this.state.description}
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
