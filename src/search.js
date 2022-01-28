export default class Search{


    static platformsDisplay(platforms){
        let platforms_display = "";
        if(platforms === null){
            return "Pas de platformes...";
        }
        for (let i = 0; i < platforms.length; i++) {
            if(i === platforms.length - 1){
                platforms_display += platforms[i].abbreviation;
                break;
            }
            else if(i === 4){
                platforms_display += platforms[i].abbreviation;
                break;
            }
            platforms_display += platforms[i].abbreviation + ', ';
        }
        if(platforms.length <= 5){
            return platforms_display;
        }
        else{
            return platforms_display + " +" + (platforms.length - 5);
        }
    }

    static toRaw(html){
        if(!html){
            return "Pas de description...";
        }
        return html.replace(/<[^>]*>?/gm, '');
    }

    static displayJeux(guid, name, image, platforms, date_added, deck, description){
        let favoris = JSON.parse(localStorage.getItem('favorisList'));
        let button = '<button id="f'+ guid +'" class="ajouter__button">Ajouter à mes favoris</button>';

        console.log(favoris.length);
        for(let i = 0; i < favoris.length; i++){
            // noinspection EqualityComparisonWithCoercionJS
            if(guid == favoris[i].replace(/[f]/gm, '')){
                console.log('favoris !');
                button = '<button id="f'+ guid +'" class="ajouter__button">Retirer de mes favoris</button>';
            }
        }

        return '' +
            '<div class="container-fiche" id="' + guid + '">\n' +
            '   <div class="fiche-jeu">\n' +
            '     <span class="close__span">FERMER</span>\n' +
            '     <div class="titre__div">\n' +
            '       <h2>' + name + '</h2>\n' +
            '       <img src='+ image +'>\n' +
            '      </div>\n' +
            '      <div class="plateformes__div">\n' +
            '         <span><b>Plateformes:</b> '+ this.platformsDisplay(platforms) +'</span>\n' +
            '         <span><b>Date de Sortie:</b> '+ new Date(date_added).toLocaleDateString() +'</span>\n' +
            '      </div>\n' +
            '      <p><b>Description (courte):</b> '+ deck +'</p>\n' +
            '      <p class="description__p"><b>Description (longue):</b> '+ this.toRaw(description) +'</p>\n' +
                button +
            '   </div>\n' +
            '</div>' +
            '<div id="r'+ guid +'" class="delete-confirm">\n' +
            '  <div class="container-delete">' +
            '    <p>Voulez vous vraiment retirer <b>'+ name +'</b> de vos favoris ?</p>\n' +
            '    <div>\n' +
            '      <button class="cancel__button">Annuler</button>\n' +
            '      <button class="remove__button">Retirer</button>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>';
    }

    static displayFicheJeux(guid, image, name, platforms){
        return '' +
            '<div id="'+ guid +'" class="jeux__div">' +
            '   <img src='+ image +'>' +
            '   <h2>' + name + ' | '+ this.platformsDisplay(platforms) +'</h2>' +
            '   <span id="h' + guid +'" class="heart">&#10084;</span>' +
            '</div>';
    }

    static noResults() {
        return '<h3 class="effectuez__h3">Aucun résultat... :(</h3>';
    }

}

$(document.body).on('click','.jeux__div', function(){
    let modal = document.getElementById(this.id);
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';

    $(modal).on('click','.close__span', function(){
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
    })
});

let favorisList = [];
$(document.body).on('click', '.ajouter__button', function(){
        let modal = document.getElementById(this.id.replace(/[f]/gm, ''));
        let id = document.getElementById(this.id);
        let heart = document.getElementById('h' + this.id.replace(/[f]/gm, ''));

        if(!JSON.parse(localStorage.getItem('favorisList')).includes(this.id)){
            favorisList.push(this.id);
            localStorage.setItem("favorisList", JSON.stringify(favorisList));
            id.innerHTML = "Retirer de mes favoris";
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
            heart.style.display = 'block';
        }
        else{
            let btnRemove = document.getElementById('r'+this.id.replace(/[f]/gm, ''));
            btnRemove.style.display = 'flex';
            $(btnRemove).on('click', '.remove__button', function(){
                let guid = JSON.parse(localStorage.getItem('favorisList')).indexOf(this.id);
                favorisList.splice(guid, 1);
                localStorage.setItem("favorisList", JSON.stringify(favorisList));
                btnRemove.style.display = 'none';
                id.innerHTML = "Ajouter à mes favoris";
                modal.style.display = 'none';
                modal.style.visibility = 'hidden';
                heart.style.display = 'none';
            })
            $(btnRemove).on('click', '.cancel__button', function(){
                btnRemove.style.display = 'none';
            })
        }
});
