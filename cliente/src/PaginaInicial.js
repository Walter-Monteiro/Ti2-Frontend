import React, { Component } from 'react'
import axios from 'axios'
import Image from './Image'
import ImagePopup from './ImagePopup';

class PaginaInicial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            ShowPopup: false,
            ShowImage: {}
        }
        this.Click = this.Click.bind(this);
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
    async Click(id){
        let srt = 'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/'+id
        let response = await axios.get(srt);
        let obj = {
            image: "https://ipt-ti2-iptgram.azurewebsites.net/api/posts/"+id+"/image",
            user: response.data.user.name,
            date: response.data.postedAt,
            subtitle: response.data.caption,
            likes: response.data.likes

        }
        this.setState({
            ShowImage:obj,
            ShowPopup: true
        })
    }
    render() {
        return (
            <div className="PaginaInicial">
                {
                    this.state.posts.map(function (p) {
                        return ([
                            <h1>{p.caption}</h1>,
                            <h2>{p.user.name}</h2>,
                            <Image id={p.id} Click={this.Click}/>,
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
                        image = {this.state.ShowImage.image}
                        user = {this.state.ShowImage.user}
                        date = {this.state.ShowImage.date}
                        subtitle = {this.state.ShowImage.subtitle}
                        likes= {this.state.ShowImage.likes}
                        />

                }
            </div>
        );
    }
}
export default PaginaInicial;