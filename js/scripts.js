//IIFE
let pokemonRepository = (function () {
	let pokemonList = [];

//API to retrieve Pokedex info
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
//modal
	let modalContainer = document.querySelector("#modal-container");

//function to add pokemon and to reject if a non pokemon is added
	function add(pokemon) {
		if (typeof pokemon === "object" && "name" && "detailsUrl" in pokemon) {
			pokemonList.push(pokemon);
		} else {
			console.log("that's not a pokemon!");
		}
	}

//function to call the pokemon list
	function getAll() {
		return pokemonList;
	}

	function addListItem(pokemon) {
		let pokemonList = document.querySelector(".pokemon-list");
		let listpokemon = document.createElement("li");
		let button = document.createElement("button");
		button.innerText = pokemon.name;
		button.classList.add("button-class");
		listpokemon.appendChild(button);
		pokemonList.appendChild(listpokemon);

		button.addEventListener("click", function () {
			showDetails(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
					console.log(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.types = details.types;
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showModal(pokemon) {
	//Clear existing modal content
		modalContainer.innerHTML = "";

		let modal = document.createElement("div");
		modal.classList.add("modal");

		let closeButtonElement = document.createElement("button");
		closeButtonElement.classList.add("modal-close");
		closeButtonElement.innerText = "Close";
		closeButtonElement.addEventListener("click", hideModal);

		let nameElement = document.createElement("h1");
		nameElement.innerText = pokemon.name;

		let heightElement = document.createElement("p");
		heightElement.innerText = "height: " + " " + pokemon.height;

		let typesElement = document.createElement("p");
		typesElement.innerText = "types: " + " " + pokemon.types;

		let imageElement = document.createElement("img");
		imageElement.setAttribute("src", pokemon.imageUrl);

		modal.appendChild(closeButtonElement);
		modal.appendChild(nameElement);
		modal.appendChild(heightElement);
		modal.appendChild(typesElement);
		modal.appendChild(imageElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add("is-visible");
	}

	function hideModal() {
		modalContainer.classList.remove("is-visible");
	}

	window.addEventListener("keydown", (e) => {
		let modalContainer = document.querySelector("#modal-container");
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
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});
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
