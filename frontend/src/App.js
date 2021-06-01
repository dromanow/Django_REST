import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js';
import AuthorPage from './components/AuthorPage.js';
import BookList from './components/Book.js';
import LoginForm from './components/Auth.js';
import axios from 'axios';
import {HashRouter, BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';

const NotFound404 = ({location}) => {
    return(
        <div>
            Not found: {location.pathname}
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
       super(props);
       let token = localStorage.getItem('token');
       this.state = {
          'authors': [],
          'books': [],
          'token': token
       }
    }

    restore_token() {
       let token = localStorage.getItem('token');
//       console.log(           {
//               'token': token
//           }
//        );
       this.setState(
           {
               'token': token
           }
       );

//       console.log('restore_token');
//       console.log(localStorage.getItem('token'));
//       console.log(this.state);
//
    }

    create_header() {
       if (!this.is_auth())
           return {};

       return {
            'Authorization': 'Token ' + this.state.token
       }
    }

    load_data() {
       let headers = this.create_header();

//       console.log(localStorage.getItem('token'));
//       console.log(this.state.token);
//       console.log(headers);

       axios
       .get('http://127.0.0.1:8000/api/authors/', {headers})
       .then(response => {
           const authors = response.data
               this.setState(
               {
                   'authors': authors
               }
           )
       })
       .catch(error => console.log(error))

       axios
       .get('http://127.0.0.1:8000/api/books/', {headers})
       .then(response => {
           const books = response.data
           this.setState(
               {
                   'books': books
               }
           )
       })
       .catch(error => console.log(error))
    }

    componentDidMount() {
        this.restore_token();
        this.load_data();
    }

    is_auth() {
        return this.state.token != '';
    }

    logout() {
           this.setState(
               {
                   'token': ''
               }
           );
    }

    get_token(login, password) {
       axios
       .post(
            'http://127.0.0.1:8000/api-token-auth/',
            {"username": login, "password": password}
       )
       .then(response => {
           this.setState(
               {
                   'token': response.data.token
               }
           );
           localStorage.setItem('token', response.data.token)

           console.log(this.state.token);
//            let item = localStorage.getItem('token');
       })
       .catch(error => alert('Wrong password'))
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Authors</Link>
                            </li>
                            <li>
                                <Link to='/books'>Books</Link>
                            </li>
                            <li>{
                                this.is_auth() ?
                                    <button onClick={() => this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>
                            }
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component = {() => <AuthorList authors={this.state.authors} />} />
                        <Route exact path='/books' component = {() => <BookList books={this.state.books} />} />
                        <Route exact path='/login' component = {() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />
                        <Route exact path='/author/:id' component = {() => <AuthorPage authors={this.state.authors} />} />
                        <Redirect from='/authors' to='/' />
                        <Route component={NotFound404} />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App;
