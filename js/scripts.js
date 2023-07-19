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
    function add (pokemon){
        pokemonList.push(pokemon);
    };

    function getAll() {
        return pokemonList;
    };
    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.add({name: "Dratini", height: "1.8", type: ["dragon"]});

pokemonRepository.getAll().forEach(function(pokemon){
    console.log(pokemon.name + " ( height: " + pokemon.height + " m ) ");
   document.write(pokemon.name + " ( height: " + pokemon.height + " m ) </br> ");
});