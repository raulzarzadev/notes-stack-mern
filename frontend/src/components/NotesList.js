import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'



export default class NotesList extends Component {

    state = {
        notes: []
    }

    componentDidMount() {
        console.log('montando componente');
        this.getNotes()
    }

    async getNotes () {
        console.log('pidiendo notas');
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({ notes: res.data })
    }

    async editNote(id) {
        
        const res = await axios.get('http://localhost:4000/api/notes/', id)

        
        window.location.href="/newNote/" 
        console.log('nota', res);
    }

    async deleteNote(id){
        console.log('borrando nota', id);
        await axios.delete('http://localhost:4000/api/notes/' + id)
        this.getNotes()
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card black-words ">
                            <h6 className="d-flex justify-content-end m-2" >{format(note.date, 'en_US')}</h6>
                                <div className="card-header d-flex justify-content-between text-center">
                                    <h4>{note.title}</h4> 
                                    
                                    <Link 
                                    className="btn btn-primary" to={"/edit/" + note._id}>
                                    <FontAwesomeIcon icon={faEdit}/> {/* icono de editar */}
                                    </Link>

                                </div>
                                <div className="card-body black-words">
                                    <p>
                                        {note.description}
                                    </p>
                                    <p className="text-center">{note.author}</p>
                                </div>
                                <div className="card-footer black-words">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Borrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
