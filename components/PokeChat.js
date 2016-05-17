/*
 * Module dependencies
 */

import React from 'react';
import PokeMessage from './PokeMessage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class PokeChat extends React.Component {
	

	render() {
		return <ul className="pokechat">
			<ReactCSSTransitionGroup transitionName="message-animation">
			{
				this.props.messages.map((message) => {
					return <PokeMessage key={message.id} message={message} />
				})
			}
			</ReactCSSTransitionGroup>
		</ul>
	}
}

PokeChat.defaultProps = { messages: [] };