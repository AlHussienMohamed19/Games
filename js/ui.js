let MMORPG = document.getElementById('MMORPG');
let SHOOTER = document.getElementById('SHOOTER');
let SAILING = document.getElementById('SAILING');
let PERMADEATH = document.getElementById('PERMADEATH');
let SUPERHERO = document.getElementById('SUPERHERO');
let PIXEL = document.getElementById('PIXEL');

let gameCard = document.getElementById('gameCard');
let homeSection = document.getElementById('homeSection');
let gamePage = document.getElementById('gamePage');

let closeBtn = document.getElementById('closeBtn');

let rowOfAllGames = document.getElementById('rowOfAllGames');
let containerOfGames = document.getElementById('containerOfGames');
let innerGamePage = document.getElementById('innerGamePage');
let allGamesArray = [];
let gameObject = ``;



async function getAllGames(category = 'mmorpg') {
    $('#loading').show();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '85199ccb79msh96598c73f049fbcp114226jsnd5dcf5f04a98',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
    const myResponse = await api.json();
    $('#loading').hide();
    allGamesArray = myResponse;
    // console.log(allGamesArray);

    displayAllGames();
}

function displayAllGames() {
    homeSection.classList.remove('d-none');

    // let cartona = ``;
    rowOfAllGames.remove();
    rowOfAllGames = document.createElement('div');
    rowOfAllGames.setAttribute('id', 'rowOfAllGames');
    rowOfAllGames.setAttribute('class', 'row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4');
    containerOfGames.append(rowOfAllGames);

    for (let i = 0; i < allGamesArray.length; i++) {

        // console.log(allGamesArray[i].title);
        // console.log(allGamesArray[i].short_description.slice(0,60));


        let classCol = document.createElement('div');
        classCol.setAttribute('class', 'col');
        // console.log(classCol);
        let gameCard = document.createElement('div');
        gameCard.setAttribute('id', 'gameCard');
        gameCard.setAttribute('class', 'card my-card h-100');
        let cardBody = document.createElement('div');
        cardBody.setAttribute('id', 'cardBody');
        cardBody.setAttribute('class', 'card-body');
        let gameImg = document.createElement('img');
        gameImg.setAttribute('src', `${allGamesArray[i].thumbnail}`);
        gameImg.setAttribute('class', `card-img-top mb-3 w-100`);
        gameImg.setAttribute('alt', `Game Photo`);
        let gameName = document.createElement('div');
        gameName.setAttribute('id', 'gameName');
        gameName.setAttribute('class', 'game-name mb-2 d-flex justify-content-between align-items-center');
        let cardTitle = document.createElement('h6');
        cardTitle.setAttribute('id', 'cardTitle');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.innerHTML = `${allGamesArray[i].title}`
        let freeBtn = document.createElement('button');
        freeBtn.setAttribute('class', 'btn freeBtn btn-primary');
        freeBtn.setAttribute('type', 'submit');
        freeBtn.innerHTML = `Free`;
        let myCardTxt = document.createElement('p');
        myCardTxt.setAttribute('class', 'card-text my-card-text text-center opacity-50');
        myCardTxt.innerHTML = `${allGamesArray[i].short_description.slice(0, 60)}`
        let cardFooter = document.createElement('div');
        cardFooter.setAttribute('class', 'card-footer d-flex justify-content-between align-items-center');
        let footerBtnGenre = document.createElement('button');
        footerBtnGenre.setAttribute('class', 'btn footerBtn');
        footerBtnGenre.setAttribute('type', 'submit');
        footerBtnGenre.innerHTML = `${allGamesArray[i].genre}`
        let footerBtnPlatform = document.createElement('button');
        footerBtnPlatform.setAttribute('class', 'btn footerBtn');
        footerBtnPlatform.setAttribute('type', 'submit');
        footerBtnPlatform.innerHTML = `${allGamesArray[i].platform}`
        rowOfAllGames.append(classCol);
        classCol.append(gameCard);
        gameCard.append(cardBody);
        cardBody.append(gameImg);
        cardBody.append(gameName);
        gameName.append(cardTitle);
        gameName.append(freeBtn);
        cardBody.append(myCardTxt);
        gameCard.append(cardFooter);
        cardFooter.append(footerBtnGenre);
        cardFooter.append(footerBtnPlatform);
        let gameId = `${allGamesArray[i].id}`

        gameCard.addEventListener('click', function () {
            // console.log(gameId);
            getGame(gameId);
            homeSection.classList.add('d-none');
            gamePage.classList.remove('d-none');
        })


        //     cartona += `<div id="classCol" class="col">
        //     <div id="gameCard" class="card my-card h-100">
        //         <div id="cardBody" class="card-body">
        //             <img src="${allGamesArray[i].thumbnail}" class="card-img-top mb-3 w-100" alt="Game Photo">
        //             <div id="gameName" class="game-name mb-2 d-flex justify-content-between align-items-center">
        //                 <h6 class="card-title">${allGamesArray[i].title}</h6>
        //                 <button class="btn freeBtn btn-primary" type="submit">Free</button>
        //             </div>
        //             <p class="card-text my-card-text text-center opacity-50">${allGamesArray[i].short_description.slice(0, 60)}</p>
        //         </div>
        //         <div class="card-footer d-flex justify-content-between align-items-center">
        //             <button class="btn footerBtn" type="submit">${allGamesArray[i].genre}</button>
        //             <button class="btn footerBtn" type="submit">${allGamesArray[i].platform}</button>
        //         </div>
        //     </div>
        // </div>`
    }


    // document.getElementById('rowOfAllGames').innerHTML = cartona;
}

getAllGames();



let navBtns = document.querySelectorAll('a.nav-link');

for (var i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('click', function (e) {
        let cat = e.target.id;
        console.log(cat);
        getAllGames(cat);
        $('.my-navbar .navbar-nav').find('a.active').removeClass('active');
        $(this).addClass('active');
    })
}



async function getGame(id) {
    $('#loading').show();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '85199ccb79msh96598c73f049fbcp114226jsnd5dcf5f04a98',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    const myResponse = await api.json();
    $('#loading').hide();
    gameObject = myResponse;
    // console.log(gameObject);
    displayGame(gameObject);
}


function displayGame(gameObject) {

    innerGamePage.remove();
    innerGamePage = document.createElement('div');
    innerGamePage.setAttribute('id', 'innerGamePage');
    gamePage.append(innerGamePage);


    let gamePageHeader = document.createElement('div');
    gamePageHeader.setAttribute('id', 'gamePageHeader');
    gamePageHeader.setAttribute('class', 'header d-flex justify-content-between align-items-center');
    let DetailsGame = document.createElement('h3');
    DetailsGame.innerHTML = 'Details Game';
    let closeBtn = document.createElement('button');
    closeBtn.setAttribute('id', 'closeBtn');
    let closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'fa-solid fa-xmark opacity-50');


    let gameInfoBody = document.createElement('div');
    gameInfoBody.setAttribute('class', 'row gameInfoBody mt-4');
    let gameImgDiv = document.createElement('div');
    gameImgDiv.setAttribute('class', 'col-md-4');
    let gameImg = document.createElement('img');
    gameImg.setAttribute('src', `${gameObject.thumbnail}`);
    gameImg.setAttribute('class', 'w-100');
    gameImgDiv.append(gameImg);
    gameInfoBody.append(gameImgDiv);
    let gameInfoTxt = document.createElement('div');
    gameInfoTxt.setAttribute('class', 'col-md-8');
    let gameTitle = document.createElement('h3');
    gameTitle.innerHTML = `Title: `;
    let gameTitleTxt = document.createElement('span');
    gameTitleTxt.setAttribute('id', 'gameTitleTxt');
    gameTitleTxt.innerHTML = `${gameObject.title}`;
    gameTitle.append(gameTitleTxt)
    let gameCategory = document.createElement('h6');
    gameCategory.innerHTML = `Category: `;
    let Category = document.createElement('span');
    Category.setAttribute('class', 'textWithBg');
    Category.setAttribute('id', 'Category');
    Category.innerHTML = `${gameObject.genre}`;
    gameCategory.append(Category);
    let gamePlatform = document.createElement('h6');
    gamePlatform.innerHTML = `Platform: `;
    let Platform = document.createElement('span');
    Platform.setAttribute('class', 'textWithBg');
    Platform.setAttribute('id', 'Platform');
    Platform.innerHTML = `${gameObject.platform}`
    gamePlatform.append(Platform);
    let gameStatus = document.createElement('h6');
    gameStatus.innerHTML = `Status: `;
    let Status = document.createElement('span');
    Status.setAttribute('class', 'textWithBg');
    Status.setAttribute('id', 'Status');
    Status.innerHTML = `${gameObject.status}`;
    gameStatus.append(Status);
    let gameDesc = document.createElement('p');
    gameDesc.setAttribute('class', 'small');
    gameDesc.innerHTML = `${gameObject.description}`;
    let showGameBtn = document.createElement('a');
    showGameBtn.setAttribute('class', 'btn btn-outline-warning');
    showGameBtn.setAttribute('type', 'button');
    showGameBtn.setAttribute('id', 'showGameBtn');
    showGameBtn.setAttribute('target', '_blank');
    showGameBtn.setAttribute('href', `${gameObject.game_url}`);
    showGameBtn.innerHTML = "Show Game";
    gamePage.append(innerGamePage);
    innerGamePage.append(gamePageHeader);
    innerGamePage.append(gameInfoBody);
    gamePageHeader.append(DetailsGame);
    gamePageHeader.append(closeBtn);
    closeBtn.append(closeIcon);
    gameInfoBody.append(gameInfoTxt);
    gameInfoTxt.append(gameTitle);
    gameInfoTxt.append(gameCategory);
    gameInfoTxt.append(gamePlatform);
    gameInfoTxt.append(gameStatus);
    gameInfoTxt.append(gameDesc);
    gameInfoTxt.append(showGameBtn);

    closeBtn.addEventListener('click', function () {
        gamePage.classList.add('d-none');
        homeSection.classList.remove('d-none');
    })


    //     <div class="row gameInfoBody mt-4">
    //         <div class="col-md-4">
    //             <img src="imges/thumbnail.jpg" class="w-100" alt="">
    //         </div>
    //         <div class="col-md-8">
    //             <h3><span id="gameTitleTxt">Diablo Immortal</span> </h3>
    //             <h6>Category: <span class="textWithBg" id="Category">MMOARPG</span></h6>
    //             <h6>Platform: <span class="textWithBg" id="Platform">Windows</span></h6>
    //             <h6>Status: <span class="textWithBg" id="Status">Live</span></h6>
    //             <p class="small">The demon fighting doesn’t have to stop when you walk away from the computer thanks to Blizzard
    //                 Entertainment’s Diablo Immortal. Built for mobile and also released on PC, the game fills in the
    //                 gaps between Diablo II and III in an MMOARPG environment. Diablo Immortal picks up following the
    //                 presumed death of the Archangel Tyrael, during which time mankind must deal with the fallout. One of
    //                 the many problems are the fragments of the shattered Worldstone spread across the land, waiting for
    //                 Diablo’s underlings to collect them in an attempt to bring about his return. Players can choose from
    //                 one of six classes in Diablo Immortal. These are the classic Barbarian, the Crusader, the Demon
    //                 Hunter, the Monk, the Necromancer, and the Wizard. All six classes features their own unique skills
    //                 and abilities. The game also introduces six new bosses, ranging from The Skeleton King to the
    //                 Glacial Colossus. Each offers players a unique challenge, and all are found in places filled with
    //                 danger. So, players will want to be well prepared before taking them on.</p>
    //              <a type="button" id="showGameBtn" class="btn btn-outline-warning">Show Game</a>
    //        </div>
    //     </div>
}


let navBarOff = $('#my-navbar').offset().top;
// console.log(navBarOff);

$(window).scroll(function () {

    let wScroll = $(window).scrollTop();

    if (wScroll >= navBarOff - 20) {
        $('#my-navbar').css('position', 'fixed');
        $('#my-navbar').css('transform', 'translateY(0%)');
        $('#outerNavBar').css('display', 'flex');
        $('#outerNavBar').css('justify-content', 'center');
    }
    else {
        $('#my-navbar').css('position', 'static');
        $('#my-navbar').css('transform', 'translateY(-50%)');
    }

});
