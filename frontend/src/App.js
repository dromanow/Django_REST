import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './Author.js';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'authors': []
        }
    }

    componentDidMount() {
       axios
       .get('http://127.0.0.1:8000/api/authors')
       .then(response => {
           const authors = response.data
               this.setState(
               {
                   'authors': authors
               }
           )
       })
       .catch(error => console.log(error))

//        const authors = [
//            {
//                "first_name": "Александр",
//                "last_name": "Пушкин",
//                "birthday_year": 1798
//            },
//            {
//                "first_name": "Федор",
//                "last_name": "Достоевский",
//                "birthday_year": 1821
//            }
//        ]
//        this.setState({
//            'authors': authors
//        });
    }

    render() {
        return (
            <div> <AuthorList authors={this.state.authors} /> </div>
        )
    }
}

export default App;
