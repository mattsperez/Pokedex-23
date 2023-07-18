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
for (i = 0; i < pokemonList.length; i++) {
    console.log(pokemonList[i]);
    document.write("<p>" + pokemonList[i].name + " ( height: " + pokemonList[i].height + " m ) ");
//this just gives displays all pokemon and height included 
    if(i >= 1.0) {
        console.log(" - aww cute\!");
        document.write(" - aww cute\! ");
    } else if (i <= 1.1) {
        console.log (" - damn, that\'s huge\!");
        document.write(" - damn, that\'s huge\! ");
    };
//displays a message based on the height of each pokemon
};