/*
 * Module dependencies
 */

import React from 'react';
import PokeTable from './PokeTable';
import PokeChat from './PokeChat';
import uid from 'uid';
import $ from 'jquery';
import io from 'socket.io-client';

export default class PokeApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { messages: [], pokemons: [] };
		this.onGrowl = this.onGrowl.bind(this);
		this.user = uid(10);   /*user para autor de cada mensaje*/
	}

	/*implementar un metodo del ciclo de vida del component - antes de que se monte component en el DOM*/	
	componentWillMount() {
		// debugger
		$.get('/pokemons', (pokemons) => { /*request a pokemons y recibe pokemons*/
			this.setState({ pokemons: pokemons }); /*setear el state con this.state y cada vez que se hace this.state se ejecuta render()*/
		})
		/*establecer la conexion con el servidor*/
		this.socket = io('http://localhost:3000');
		this.socket.on('message', (message) => {  /*suscribimos al evento message*/
			if (message.user !== this.user) {
				this.newMessage(message);
			}
		}) 
	}

	onGrowl(name) {
		let text = `${name}, ${name}!`;
		let message = { id: uid(), text: text, user: this.user };
		this.newMessage (message);
		this.socket.emit('message', message);
	}

	newMessage(message) {
		this.state.messages.push(message);
		let messages = this.state.messages;
		this.setState({ messages: messages });
	}

	render() {
		if (this.state.pokemons.length) {
			return <div className="pokeapp">
				<PokeTable pokemons={this.state.pokemons} onGrowl={this.onGrowl} />
				<PokeChat messages={this.state.messages} />
			</div>
		} else {
			return <p>Cargando... </p>
		}
	}
}