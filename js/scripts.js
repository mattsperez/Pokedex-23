//IIFE
let pokemonRepository = (function () {
	let pokemonList = [];

	//API to retrieve Pokedex info
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

	//modal
	let modalContainer = document.querySelector("#exampleModal");

	//function to add pokemon and to reject if a non pokemon is added
	function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			"types" &&
			"name" &&
			"detailsUrl" in pokemon
		) {
			pokemonList.push(pokemon);
		} else {
			console.log("that's not a pokemon!");
		}
	}

	//function to call the pokemon list
	function getAll() {
		return pokemonList;
	}
	//function to create each pokemon as a button
	function addListItem(pokemon) {
		let pokemonList = document.querySelector(".list-group");
		let pokemonListItem = document.createElement("li");
		pokemonListItem.classList.add("list-group-item");
		let button = document.createElement("btn");
		button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
		button.classList.add("btn", "btn-block");
		button.setAttribute("data-toggle", "modal");
		button.setAttribute("data-target", "#exampleModal");
		pokemonListItem.appendChild(button);
		pokemonList.appendChild(pokemonListItem);
		button.addEventListener("click", function () {
			showDetails(pokemon);
		});
		
	}

	//trying to change item to pokemon
	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						//this will captalize the first letter of the name
						name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	//shows info inside modal
	function loadDetails(pokemon) {
		let url = pokemon.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				pokemon.imageUrl = details.sprites.front_default;
				pokemon.height = details.height;
				pokemon.types = [];
				for (var i = 0; i < details.types.length; i++) {
					pokemon.types.push(details.types[i].type.name);
				}
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showModal(pokemon) {
		//Clear existing modal content
 
		let modalBody = document.createElement(".modal-body");
		modalBody.classList.add(".modal-body")

		let modalTitle = document.createElement("div");
		modalTitle.classList.add(".modal-title")

		/* let closeButtonElement = document.createElement("button");
		closeButtonElement.classList.add("modal-close");
		closeButtonElement.innerText = "Close";
		closeButtonElement.addEventListener("click"); */

		let titleElement = document.querySelector(".modal-title");
		titleElement.innerText = pokemon.name;

		let heightElement = document.querySelector(".modal-body");
		heightElement.innerText = "Height: " + " " + pokemon.height + " " + "m";

		let typesElement = document.createElement("p");
		typesElement.innerText = "Types: " + " " + pokemon.types.join(", ");

		let imageElement = document.createElement("img");
		imageElement.setAttribute("src", pokemon.imageUrl);

		/* modal.appendChild(closeButtonElement);*/
		modalTitle.appendChild(titleElement);
		modalBody.appendChild(heightElement);
		modalBody.appendChild(typesElement);
		modalBody.appendChild(imageElement);

		/* modalContainer.classList.add("is-visible"); */
	}

	function hideModal() {
		modalContainer.classList.remove("is-visible");
	}

	window.addEventListener("keydown", (e) => {
		let modalContainer = document.querySelector("#exampleModal");
		if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
			hideModal();
		}
	});

	modalContainer.addEventListener("click", (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

	function showDetails(pokemon) {
		/* loadDetails(pokemon).then(function () {
			showModal(pokemon);
		}); */
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
		showModal: showModal,
		hideModal: hideModal,
	};
})();

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
