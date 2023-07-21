let pokemonRepository = (function () {
let pokemonList = [
    
    {
        name: "Squirtle",
        height: "0.5",
        type: ["water"]
    },
    {
        name: "Vulpix",
        height: "0.6",
        type: ["fire"]
    },
    {
        name: "Arbok",
        height: "3.5",
        type: ["poison"]
    },
    {
        name: "Cubone",
        height: "0.4",
        type: ["ground"]
    }

];
    //function to add pokemon and to reject if a non pokemon is added
    function add (pokemon){
        if(typeof pokemon === "object" && "name" && "type" in pokemon){
        pokemonList.push(pokemon);
        } else {
        console.log("that\'s not a pokemon\!")
    };
  };

    //function to call the pokemon list
    function getAll() {
        return pokemonList;
    };

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.addEventListener("click", function(showDetails){
            console.log(pokemon)
        });
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

    function showDetails(pokemon) {
        console.log(pokemonList);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();
    //added a pokemon
    pokemonRepository.add({name: "Dratini", height: "1.8", type: ["dragon"]});

    console.log(pokemonRepository.getAll());

    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    });