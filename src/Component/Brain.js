import React, { Component } from 'react'
import Cart from './picz/unn.jpg'

class Brain extends Component {
    constructor() {
        super()
        this.state = {
            searchArea: '',
            loading: false,
            // data: [],
            allBooks: []
        }
        // this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event) => {
        // console.log(event.target.value)
        this.setState({ searchArea: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.bookSearch(this.state.searchArea)
    }

    bookSearch = (userinput) => {
        this.setState({ loading: true })
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${userinput}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({
                    loading: false,
                    allBooks: response
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    renderBooks = (data) => {
        if (!data || !data.items || data.items.length < 1) {
            return (<div><img className='lib' src={Cart} alt="nawaoo" /></div>)
        }

        return data.items.map((item, key) => {
            return (
                <div key={key}>
                    <div className="potter">
                        <img src={
                            item.volumeInfo.imageLinks === undefined
                                ? ""
                                : `${item.volumeInfo.imageLinks.thumbnail}`
                        } alt={item.volumeInfo.title} />
                        <div className='potters'>
                            <h2> Title: {item.volumeInfo.title}</h2>
                            <h4> Author: {item.volumeInfo.authors}</h4>
                            <h4> Published Date: {item.volumeInfo.publishedDate}</h4>
                            <div>
                                // eslint-disable-next-line
                                <a href={item.volumeInfo.infoLink} target="_blank">
                                    <button className='review'>REVIEW</button>
                                </a>
                            </div>


                        </div>
                    </div>
                </div>
            )

        });

    }


    render() {

        const text = this.state.loading ? "loading...." : this.renderBooks(this.state.allBooks)

        return (

            < div className='format' >
                <form onSubmit={this.onSubmit} className='format' >
                    <input className="form"
                        type='text'
                        placeholder='Enter book title or author here!'
                        onChange={this.handleChange} />
                    <br />
                    <button type='submit' className='search'>SEARCH</button>

                </form>
                <div className='post'>
                    <div className='grid'>
                        {text}
                    </div>
                </div>

            </div >
        )
    }
}

export default Brain