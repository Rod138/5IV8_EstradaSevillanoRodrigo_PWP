//Api Key de ComicVine
const apiKey = "f5bd3f860b4348479c796bacb0735da3288833b8";
//URL de la API de cómics :)
const comicApiUrl = 'https://comicvine.gamespot.com/api/search/'
//Crear la función principal
const comics = () => {
    //Obtener elementos del DOM
    const characterInfoElements = {
        //Basic Info
        name: document.getElementById('name'),
        gender: document.getElementById('gender'),
        aliases: document.getElementById('aliasesUl'),
        first_appeared_in_issue: document.getElementById('first-appearance'),
        birth: document.getElementById('birth'),
        //Advanced Info
        origin: document.getElementById('origin'),
        powers: document.getElementById('powersUl'),
        count_of_issue_appearances: document.getElementById('appearances'),
        // Description
        description: document.getElementById('description'),
        //Knowns
        teams: document.getElementById('teamsUl'),
        character_friends: document.getElementById('friendsUl'),
        character_enemies: document.getElementById('enemiesUl'),
    };
    //Rutas de las imágenes
    const images = {
        imgCharacterNotFound: "./img/404.png",
        imgLoading: "./img/loading.gif",
        imgInterrogation: "./img/interrogacion.png",
        imgMarvel: "./img/marvel.png",
        imgDC: "./img/dc.png"
    }
    //Almacenamos los botones en un objeto con un Array para todoslos botones y variables individuales
    const buttons = {
        all: Array.from(document.getElementsByClassName('btn')),
        search: document.getElementById('search-btn'),
    };
    //Guardamos el nobre del personaje en una variable
    let characterInput = document.getElementById('nameInput');
    //Creamos las funciones para modicar el HTML con los datos obtenidos
    //Editorial
    const proccesPublisher = (characterData) => {
        //Primero necesitamos obtener la editorial
        let publisher = characterData.results[0].publisher.name;
        let publisherImg = images.imgInterrogation;
        let publisherName = publisher;
        //Verificamos si la editorial es Marvel o DC
        if ((publisher).toLowerCase().includes("marvel")) {
            publisherImg = images.imgMarvel;
        } else if ((publisher).toLowerCase().includes("dc")) {
            publisherImg = images.imgDC;
        }
        //Cambiar la imagen y el nombre en el HTML
        document.getElementById('publisher').innerText = publisherName;
        document.getElementsByClassName('publisherimg')[0].src = publisherImg;
    };
    //Información básica
    const proccesbasicInfo = (characterData) => {
        //Obtenemos los datos básicos
        let name = characterData.results[0].name;
        let gender = characterData.results[0].gender;
        let aliases = characterData.results[0].aliases;
        let aliasesContent = "";
        if (aliases) {
            aliases.split("\n").forEach(alias => {
                aliasesContent += `<li>${alias}</li>`;
            });
        } else {
            aliasesContent = "<li>No hay información</li>";
        }
        let firstAppeared = characterData.results[0].first_appeared_in_issue?.name || "No hay información";
        let birth = characterData.results[0]?.birth || "No hay información";
        //Modificamos el HTML
        characterInfoElements.name.innerText = name;
        //El género viene como número
        switch (gender) {
            case 1:
                characterInfoElements.gender.innerText = "Masculino";
                break;
            case 2:
                characterInfoElements.gender.innerText = "Femenino";
                break;
            case 3:
                characterInfoElements.gender.innerText = "Otro";
                break;
            default:
                characterInfoElements.gender.innerText = "Desconocido";
                break;
        }
        characterInfoElements.aliases.innerHTML = aliasesContent;
        characterInfoElements.first_appeared_in_issue.innerText = firstAppeared;
        characterInfoElements.birth.innerText = birth;

    };
    //Información avanzada
    const proccesAdvancedInfo = (characterData) => {
        let origin = characterData.results[0].origin?.name || "No hay información";
        let powers = characterData.results[0].powers || [];
        let powersContent = "";
        if (powers.length > 0) {
            powers.forEach(power => powersContent += `<li>${power.name}</li>`);
        } else {
            powersContent = "<li>Ninguno</li>";
        }
        let appearances = characterData.results[0].count_of_issue_appearances || 0;
        characterInfoElements.origin.innerText = origin;
        characterInfoElements.powers.innerHTML = powersContent;
        characterInfoElements.count_of_issue_appearances.innerText = appearances;
    };
    //Descripción
    const proccesDescription = (characterData) => {
        //Obtenemos la descripción
        let description = characterData.results[0].deck || "Descripción no disponible.";
        //Modificamos el HTML
        characterInfoElements.description.innerText = description;
    };
    //Conocidos
    const proccesKnowns = (characterData) => {
        //Obtenemos los conocidos
        let teams = characterData.results[0].teams || [];
        let character_friends = characterData.results[0].character_friends || [];
        let character_enemies = characterData.results[0].character_enemies || [];
        //Modificamos el HTML
        let teamsContent = "";
        if (teams.length > 0) {
            teams.forEach(team => teamsContent += `<li>${team.name}</li>`);
        } else {
            teamsContent = "<li>No hay información</li>";
        }
        characterInfoElements.teams.innerHTML = teamsContent;
        let friendsContent = "";
        if (character_friends.length > 0) {
            character_friends.forEach(friend => friendsContent += `<li>${friend.name}</li>`);
        } else {
            friendsContent = "<li>No hay información</li>";
        }
        characterInfoElements.character_friends.innerHTML = friendsContent;
        let enemiesContent = "";
        if (character_enemies.length > 0) {
            character_enemies.forEach(enemy => enemiesContent += `<li>${enemy.name}</li>`);
        } else {
            enemiesContent = "<li>No hay información</li>";
        }
        characterInfoElements.character_enemies.innerHTML = enemiesContent;
    };
    //Poner la imagen de cargando y deshabilitar los botones
    const setLoading = () => {
        document.getElementsByClassName('characterimg')[0].src = images.imgLoading;
        buttons.all.forEach(button => button.disabled = true);
    };
    //Rehabilitar los botones
    const setLoadingComplete = () => {
        buttons.all.forEach(button => button.disabled = false);
    };
    //Función de consulta a la API
    const getCharacterData = async (characterName) => {
        const query = characterName.trim().replace(/\s+/g, '+');
        const fullUrl = `${comicApiUrl}?api_key=${apiKey}&format=json&resources=character&query=${query}`;
        const proxy = "https://api.allorigins.win/raw?url=";
        try {
            const res = await fetch(`${proxy}${encodeURIComponent(fullUrl)}`);
            if (!res.ok) throw new Error("Respuesta no válida del proxy");
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Error al obtener datos del personaje:", error);
            return { requestFailed: true };
        }
    };
    //Función principal para obtener y procesar los datos
    const setCharacterData = async (characterName) => {
        if (!characterName || characterName.trim() === "") {
            Swal.fire({
                title: 'Error',
                text: 'Por favor ingresa el nombre de un personaje para buscar.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
            return;
        }
        setLoading();
        const characterData = await getCharacterData(characterName);
        if (characterData.requestFailed || characterData.results.length === 0) {
            //Cambiar imgaen
            document.querySelector('.characterimg').src = images.imgCharacterNotFound;
            //Basic Info vacía
            characterInfoElements.name.innerText = "Personaje no encontrado";
            characterInfoElements.gender.innerText = "-";
            characterInfoElements.aliases.innerHTML = "<li>-</li>";
            characterInfoElements.first_appeared_in_issue.innerText = "-";
            characterInfoElements.birth.innerText = "-";
            //Advanced Info vacía
            characterInfoElements.origin.innerText = "-";
            characterInfoElements.powers.innerHTML = "<li>-</li>";
            characterInfoElements.count_of_issue_appearances.innerText = "-";
            //Description vacía
            characterInfoElements.description.innerText = "Descripción no disponible.";
            //Knowns vacía
            characterInfoElements.teams.innerHTML = "<li>-</li>";
            characterInfoElements.character_friends.innerHTML = "<li>-</li>";
            characterInfoElements.character_enemies.innerHTML = "<li>-</li>";
            //Publisher vacía
            document.getElementById('publisher').innerText = "Desconocida";
            document.getElementsByClassName('publisherimg')[0].src = images.imgInterrogation;
            setLoadingComplete();
            return;
        }
        // obtenemos la URL detallada
        // obtenemos la URL detallada
        const detailUrl = characterData.results[0].api_detail_url;
        const proxy = "https://api.allorigins.win/raw?url=";
        const fullDetailUrl = `${detailUrl}?api_key=${apiKey}&format=json`;
        console.log(fullDetailUrl);
        try {
            const res = await fetch(`${proxy}${encodeURIComponent(fullDetailUrl)}`);
            if (!res.ok) throw new Error("Respuesta no válida del proxy");
            const fullData = await res.json();
            const fullCharacter = fullData.results;
            // Imagen
            const characterImgSrc = fullCharacter.image ? fullCharacter.image.original_url : images.imgCharacterNotFound;
            document.querySelector('.characterimg').src = characterImgSrc;
            // Procesar datos
            proccesPublisher({ results: [fullCharacter] });
            proccesbasicInfo({ results: [fullCharacter] });
            proccesAdvancedInfo({ results: [fullCharacter] });
            proccesDescription({ results: [fullCharacter] });
            proccesKnowns({ results: [fullCharacter] });
        } catch (error) {
            console.error("Error al obtener detalle:", error);
            document.querySelector('.characterimg').src = images.imgCharacterNotFound;
        }
        setLoadingComplete();
    };
    //Vincular la función de búsqueda
    const triggers = () => {
        //Botón de búsqueda
        buttons.search.onclick = () => setCharacterData(characterInput.value);
        //Campo de entrada - Enter para buscar
        characterInput.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === 'Enter') {
                setCharacterData(characterInput.value);
            }
        }
    };
    setLoadingComplete();
    triggers();
};

window.onload = comics;
