import DAO from './dao';

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
            throw new Error("btnSearch introuvable");
        }



        function recherche($this) {

            let value = document.querySelector('#search-input').value;
            console.log('value : ' + value);

            dao.search({query: value, format: 'json', fields: ['name'], limit: 35, resources: ['game']})
                .then(
                    loaderCss.style.display = 'flex'
                )
                .then((body) => {
                    let data = JSON.parse(body);
                    data.results.forEach(game => {
                        console.log(game.name);
                    });
                    loaderCss.style.display = 'none'
                })
                .catch((err) => {
                    console.log('=========== Erreur recherche ===========');
                    console.log(err);
                });
        }
    }
}

window.onload = App.init.bind(App);