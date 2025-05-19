// Objeto onde agrupamos todas as funções relacionadas à API
const pokeApi = {};

// Função que transforma os dados da API em um objeto do tipo Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id; // ID do Pokémon
    pokemon.name = pokeDetail.name; // Nome

    // Extrai os nomes dos tipos (ex: "fire", "grass")
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types; // pega o primeiro tipo como principal

    pokemon.types = types; // atribui todos os tipos
    pokemon.type = type; // define o tipo principal
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default // imagem do Pokémon

    return pokemon;
}

// Busca os detalhes de um Pokémon usando sua URL
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url) // faz a requisição HTTP
        .then((response) => response.json()) // converte resposta em JSON
        .then(convertPokeApiDetailToPokemon) // converte para objeto Pokemon
}

// Função que busca uma lista de Pokémons da API, usando paginação
pokeApi.getPokemon = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json()) // converte resposta em JSON
        .then((jsonBody) => jsonBody.results) // extrai apenas o array de pokémons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeia para buscar os detalhes
        .then((detailRequests) => Promise.all(detailRequests)) // espera todas as requisições terminarem
        .then((pokemonsDetails) => pokemonsDetails) // retorna array de objetos Pokémon
}

// Exemplo de uso do Promise.all para buscar vários Pokémons em paralelo
Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')
]).then((results) => {
    console.log(results); // mostra os resultados no console
})