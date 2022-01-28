import DAO from './dao';
import SEARCH from './search';

export default class App {

    static init() {
        const dao = new DAO('642cbf58b1fc868c31b53415c0046e04d6d2f2ef', 'hylozoisme');

        const btnSearch = document.querySelector("#search-btn");
        if (!btnSearch) {
            throw new Error("btnSearch introuvable");
        }
        btnSearch.addEventListener("click", recherche);

        const loaderCss = document.querySelector("#loaderCss");
        if (!loaderCss) {
            throw new Error("loaderCss introuvable");
        }

        const modal = document.querySelector(".modal");
        if (!modal) {
            throw new Error("modal introuvable");
        }

        function recherche() {

            let value = document.querySelector('#search-input').value;
            let containerJeux = document.querySelector('.container-jeux');
            containerJeux.innerHTML = "";
            modal.innerHTML = "";

            dao.search({query: value, format: 'json', fields: ['guid', 'name', 'image', 'platforms', 'date_added', 'deck', 'description'], limit: 12, resources: ['game']})
                .then(
                    loaderCss.style.display = 'flex'
                )
                .then((body) => {
                    let data = JSON.parse(body);
                    console.log(data);
                    if(data.status_code === 101 || data.number_of_total_results === 0){
                        containerJeux.innerHTML = SEARCH.noResults();
                        loaderCss.style.display = 'none';
                    }
                    else{
                        data.results.forEach(game => {
                            console.log(game);

                            modal.innerHTML += SEARCH.displayJeux(game.guid, game.name, game.image.small_url, game.platforms, game.date_added, game.deck, game.description);
                            containerJeux.innerHTML += SEARCH.displayFicheJeux(game.guid, game.image.screen_url, game.name, game.platforms);
                        });
                        loaderCss.style.display = 'none';
                    }
                })
                .catch((err) => {
                    console.log('=========== Erreur recherche ===========');
                    console.log(err);
                });
        }

        const favorisBtn = document.querySelector("#favoris-btn");
        if (!favorisBtn) {
            throw new Error("btn favoris introuvable");
        }
        favorisBtn.addEventListener("click", favoris);

        function favoris(){
            let containerJeux = document.querySelector('.container-jeux');
            containerJeux.innerHTML = "";
            modal.innerHTML = "";

            const favoris = JSON.parse(localStorage.getItem('favorisList'));
            for(let i = 0; i < favoris.length; i++){
                dao.getGame({id: favoris[i].replace(/[f]/gm, ''), fields: ['guid', 'name', 'image', 'platforms', 'date_added', 'deck', 'description'], format: 'json'})
                    .then((body) => {
                        let data = JSON.parse(body);
                        console.log(data.results);
                        modal.innerHTML += SEARCH.displayJeux(data.results.guid, data.results.name, data.results.image.small_url, data.results.platforms, data.results.date_added, data.results.deck, data.results.description);
                        containerJeux.innerHTML += SEARCH.displayFicheJeux(data.results.guid, data.results.image.screen_url, data.results.name, data.results.platforms);
                    })
                    .catch((err) => {
                        console.log('=========== Erreur recherche ===========');
                        console.log(err);
                    });
            }
        }
    }
}


window.onload = App.init.bind(App);