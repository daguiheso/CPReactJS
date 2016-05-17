import pokemons from './pokemons';

export default {
	pokemons: {
		find: function(callback) {
			setTimeout( () => {  /*simulando peticion a servidor con setTimeout*/
				callback(pokemons)
			},3000)
		}
	}
}