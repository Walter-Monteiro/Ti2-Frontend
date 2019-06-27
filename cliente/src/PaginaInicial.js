import React, { Component } from 'react'
import axios from 'axios'
import Image from './Image'
import ImagePopup from './ImagePopup';
import './PaginaInicial.css'

class PaginaInicial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            ShowPopup: false,
            ShowImage: {},
            SearchTxt: "",
            UserNameTxt: "",
            PasswordTxt: "",
            isAuthenticated: false
        }
        this.Click = this.Click.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.SearchPost = this.SearchPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Login = this.Login.bind(this);

    }
    async componentDidMount() {
        let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts');
        //console.log(response.data[0].caption);
        let postArray = response.data;
        //muda o estado do objeto
        this.setState({
            posts: postArray
        })
    }
    //evento
    async Click(id) {
        let srt = 'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id
        let response = await axios.get(srt);
        let obj = {
            image: "https://ipt-ti2-iptgram.azurewebsites.net/api/posts/" + id + "/image",
            user: response.data.user.name,
            date: response.data.postedAt,
            subtitle: response.data.caption,
            likes: response.data.likes

        }
        let commentsResponse = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id + '/comments');
        obj.comments = commentsResponse.data;

        this.setState({
            ShowImage: obj,
            ShowPopup: true
        })
    }
    closePopup() {
        this.setState({
            ShowPopup: false
        })
    }
    async SearchPost(evt) {
        evt.preventDefault();
        let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/?query=' + this.state.SearchTxt);
        let postArray = response.data;
        this.setState({
            posts: postArray,
            SearchTxt: ""
        })
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value

        })
    }
    async Login(e) {
        e.preventDefault();
        let obj = {
            "userName": this.state.UserNameTxt,
            "password": this.state.PasswordTxt
        }
        let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/account/login', obj)
        //se conseguimos autenticar
        if (response.status === 200) {
            this.setState({
                UserNameTxt: "",
                PasswordTxt: "",
                isAuthenticated: true
            })
        }
    }
    render() {
        return (
            <div className="PaginaInicial">
                <form className="PaginaInicial-SearchForm" onSubmit={this.SearchPost} >

                    <input placeholder="Search Post... here" name="SearchTxt" onChange={this.handleChange} value={this.state.SearchTxt} />
                    <button type="submit" >🔍</button>

                </form>
                {
                    (this.state.isAuthenticated)?
                    <button>logout</button>
                    :
                    <form className="PaginaInicial-LoginForm" onSubmit={this.Login}>
                    <input type="text" name="UserNameTxt" value={this.state.UserNameTxt} onChange={this.handleChange} />
                    <input type="password" name="PasswordTxt" value={this.state.PasswordTxt} onChange={this.handleChange} />
                    <button type="submit">Submeter</button>
                    </form>
                }
                {
                    this.state.posts.map(function (p) {
                        return ([
                            <h1>{p.caption}</h1>,
                            <h2>{p.user.name}</h2>,
                            <Image id={p.id} Click={this.Click} />,
                            <h2>{p.postedAt.substring(0, p.postedAt.indexOf("T"))}</h2>,
                            <h3>{p.likes}</h3>,
                            <h3>{p.comments}</h3>
                        ])
                    }.bind(this)
                    )
                }

                {
                    // se for verdade e renderizado senao nao e
                    this.state.ShowPopup &&
                    <ImagePopup
                        image={this.state.ShowImage.image}
                        user={this.state.ShowImage.user}
                        date={this.state.ShowImage.date}
                        subtitle={this.state.ShowImage.subtitle}
                        likes={this.state.ShowImage.likes}
                        comments={this.state.ShowImage.comments}
                        closePopup={this.closePopup}
                    />

                }
            </div>
        );
    }
}
export default PaginaInicial;