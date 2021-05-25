import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js';
import AuthorPage from './components/AuthorPage.js';
import BookList from './components/Book.js';
//import axios from 'axios';
import {HashRouter, BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';

// http://localhost:3000/#/books
// http://localhost:3000/author/1


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
        const author1 = {id: 1, name: 'Грин', birthday_year: 1880}
        const author2 = {id: 2, name: 'Пушкин', birthday_year: 1799}
        const authors = [author1, author2]
        const book1 = {id: 1, name: 'Алые паруса', author: author1}
        const book2 = {id: 2, name: 'Золотая цепь', author: author1}
        const book3 = {id: 3, name: 'Пиковая дама', author: author2}
        const book4 = {id: 4, name: 'Руслан и Людмила', author: author2}
        const books = [book1, book2, book3, book4]
        this.state = {
          'authors': authors,
          'books': books
        }
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
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component = {() => <AuthorList authors={this.state.authors} />} />
                        <Route exact path='/books' component = {() => <BookList books={this.state.books} />} />
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
