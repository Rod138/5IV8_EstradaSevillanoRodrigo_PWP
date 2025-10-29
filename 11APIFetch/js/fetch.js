/*
Este es un ejemplo de una API REST utilizando una llamada con fetch, el cual sirve para obtener información sobre el tipo de api (pokemon) y obtener su estrutura a partir de crear una función call back con una promesa.
*/
const pokeApiUrl = 'https://pokeapi.co/api/v2/';

//Vamos a crear una función para obtener todos los datosde la pokedex, para esto tenemos que imaginar el orden y la obtención de los datos
const pokedex = () => {
    //Primero necesitamos obtener todas las stats del pokemon, así que necesitamos crear un diccionario para obtener cada uno de los elementos del front para despues vaciar los datos
    const pokemonStatsElements = {
        hp: document.getElementById('pokemonStatHP'),
        attack: document.getElementById('pokemonStatAttack'),
        defense: document.getElementById('pokemonStatDefense'),
        specialAttack: document.getElementById('pokemonStatSpecialAttack'),
        specialDefense: document.getElementById('pokemonStatSpecialDefense'),
        speed: document.getElementById('pokemonStatSpeed')
    };
    //Necesitamos un auxiliar que nos permita utilizar la clase del tipo de pokemon para cambiar la css dependiendo del tipo
    let currentClassType = null;

    //TIene que cambiar los elementos de la imagen, para ello debemos crear un template que se encargue de encadenar los datos
    const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt='pokedisplay'/>";

    //Necesitamos un objeto que se encargue de guardar las rutas de las imagenes que vamos a cambiar dependiendo de si es una búsqueda, si lo encontró o no al pokemon
    const images = {
        imgPokemonNotFound: "../images/404.png",
        imgLoading: "../images/loading.gif"
    }

    //Necesitamos una variable que guarde todos los contenedores de la pokedex
    const containers = {
        imgenContainer: document.getElementById('pokedisplay-container'),
        pokemonTypesContainer: document.getElementById('pokemonTypes'),
        pokemonNameElement: document.getElementById('pokemonNameResult'),
        pokemonAbilitiesElement: document.getElementById('pokemonAbilities'),
        pokemonMovesElement: document.getElementById('pokemonMoves'),
        pokemonIdElement: document.getElementById('pokemonId')
    };

    //Necesitamos un objeto de tipo array que guarde los botones con su tipo de referencia
    const buttons = {
        all: Array.from(document.getElementsByClassName('btn')),
        search: document.getElementById('btnSearch'),
        next: document.getElementById('btnUp'),
        previous: document.getElementById('btnDown')
    };

    //Para buscar un pokemon necesitamos una variable que guarde el nombre del pokemon
    const pokemonInput = document.getElementById('pokemonName');

    //La agregación de los elementos en este objeto debe ser una estructura que nos permita crear funciones mas pequeñas que sin importar el orden puedan obtener cada uno de los datos solicitados
    const processPokemonType = (pokemonData) => {
        //Primero necesitamos obtener el tupo de pokemon, el nombre y la clase, para que se modifique en el html, ya que tenemos eso tendremos que obtener stats, moves, abilities
        let pokemonType = "";
        //Utilizo una búsqueda de la clase de pokemon, eso se refiere al tipo de pokemon
        const firstClass = pokemonData.types[0].type.name;

        pokemonData.types.forEach((pokemonTypeData) => {
            //Necesito obtener la etiqueta de cada cambio
            pokemonType += `<span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>`;
        });
        //Para poder quitar y cambiar el contenedor dependiendo del tipo tengo que saber a cual pertenece
        if (currentClassType) {
            containers.pokemonMovesElement.classList.remove(currentClassType);
            containers.pokemonAbilitiesElement.classList.remove(currentClassType);
        }
        //Ahora tengo que agregar lo nuevo
        containers.pokemonMovesElement.classList.add(firstClass);
        containers.pokemonAbilitiesElement.classList.add(firstClass);

        //Debo de agregar las etiquetas creadas dentro del foreach
        containers.pokemonTypesContainer.innerHTML = pokemonType;

        //Ahora necesitamos obtener las stats del pokemon
        const processPokemonStats = (pokemonData) => {
            pokemonData.stats?.forEach((pokemonstatData) => {
                //Vamos a evaluar si encuentra el nombre de la estadística para colocarla en el contenedor correspondiente
                switch (pokemonstatData.stat.name) {
                    case 'hp':
                        pokemonStatsElements.hp.innerHTML = pokemonstatData.base_stat;
                        pokemonStatsElements.hp.style = `background-color: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);`;
                        break;
                    case 'attack':
                        pokemonStatsElements.attack.innerHTML = pokemonstatData.base_stat;
                        pokemonStatsElements.attack.style = `background-color: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);`;
                        break;
                    case 'defense':
                        pokemonStatsElements.defense.innerHTML = pokemonstatData.base_stat;
                        pokemonStatsElements.defense.style = `background-color: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);`;
                        break;
                    case 'special-attack':
                        pokemonStatsElements.specialAttack.innerHTML = pokemonstatData.base_stat;
                        pokemonStatsElements.specialAttack.style = `background-color: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);`;
                        break;
                    case 'special-defense':
                        pokemonStatsElements.specialDefense.innerHTML = pokemonstatData.base_stat;
                        pokemonStatsElements.specialDefense.style = `background-color: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);`;
                        break;
                    case 'speed':
                        pokemonStatsElements.speed.innerHTML = pokemonstatData.base_stat;
                        pokemonStatsElements.speed.style = `background-color: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);`;
                        break;
                }
            });
        };
    };
}
