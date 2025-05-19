// Referência ao elemento <ul> onde serão inseridos os Pokémons
const pokemonList = document.getElementById('pokemonList')

// Referência ao botão "Carregar mais"
const loadMoreButton = document.getElementById('loadMoreButton');

// Limites para paginação
const maxRecords = 151; // total de registros
const limit = 10; // quantos por vez
let offset = 0; // onde começa

// Função que transforma um Pokémon em HTML para exibir na tela
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        <li class="type">poison</li>
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `
}

// Carrega os Pokémons e adiciona ao HTML
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml; // adiciona ao conteúdo da lista
    })
}

// Carrega os primeiros Pokémons
loadPokemonItens(offset, limit);

// Ao clicar no botão, carrega mais Pokémons
loadMoreButton.addEventListener('click', () => {
    offset += limit; // aumenta o offset
    const qtdRecordsWithNextPage = offset + limit;

    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset; // pega só o que falta
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton); // remove o botão
    } else {
        loadPokemonItens(offset, limit); // carrega normalmente
    }
})