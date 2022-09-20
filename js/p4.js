let tableau = Array(6);

for (let i = 0; i < 6; i ++) {
    tableau[i] = Array(7);
    for (let j = 0; j < 7; j ++) {
        tableau[i][j] = ' ';
    }
}

tableau[4][3] = 'x'
tableau[5][3] = 'x'
tableau[5][4] = '0'
tableau[5][5] = '0'



let game = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ']
]

// *** Function that will display the game variable in the console ***

function display(game) {
    console.log("---------");
    for ( let i in game) {
        console.log("|" + game[i].join("") + "|")
    }
    console.log("---------")
}

display(game)


// *** Function that will display the html instead of the display function above ***

function displayHtml(game) {
    for (let i = 0; i < 6; i ++) {
        for (let j = 0; j < 7; j ++) {
            // i          = index de ligne actuel 
            // j          = index de colonne actuel 
            // game[i][j] = valeur de colonne actuelle (' ', 'x', 'o')
            if (game[i][j] === 'x') {
                $(`.c-${i}-${j}`).addClass("red-coin")
            } else if (game[i][j] === 'o') {
                $(`.c-${i}-${j}`).addClass("yel-coin")
            }
        }
    }   
} 


// *** Function that will insert a coin everytime we click on a cell ***

function insertCoin(game, column) {
    const wonRedHori = wonHori(game, "x")
    const wonYelHori = wonHori(game, "o")
    const wonRedVerti = wonVerti(game, "x")
    const wonYelVerti = wonVerti(game, "o")
    for (let i=5; i>=0; i--) {
        if (game[i][column] == " ") {
            game[i][column] = nextCoin(game);
            break;   
        } 
        // if (wonRedHori == true || wonYelHori == true || wonRedVerti == true || wonYelVerti == true) {
        //     break;
        // }
    }
    return game
}


// function insertCoin(game) {
//     for (let i=5; i>=0; i--) {
//         for (let j = 0; j < 7; j ++) {
//         if (game[i][j] === " ") {
//             $(`.col-${j}`).on("click", nextCoin(game));
//             break;
//         } 
//     }
// }
//     return game
// }

// insertCoin(game)


// *** function that will count the number of each coin (red and yellow) ***

function numberOfCoins(game, coin) {
    let total = 0

    // for (let row of game) {
    //     for (let letter of row) {
    //         if (coin == letter) {
    //           total += 1 
    //         }
    //     }
    // }

    //              OR

    for (let i = 0; i < 6; i ++) {
        for (let j = 0; j < 7; j ++) {
            if (game[i][j] == coin) {
                total += 1
            }
        }
    }
    
    return total
}

numberOfCoins(game, 'o')


// *** function that will determine what color should the next coin be ***

function nextCoin(game) {
    const numberOfX = numberOfCoins(game, 'x')
    const numberOfO = numberOfCoins(game, 'o')
    
    if (numberOfX < numberOfO) {
        return 'x';
    }
    else {
        return 'o';
    }
}


// *** function that will be link between the HTML/CSS and the JS ***

$(document).ready(function() {
    displayHtml(game)
    displayArrow(game)
    for (let j = 0; j < 7; j ++) {
        i = j + 1;
        $(`.col-${i}`).on("click", function() {
            insertCoin(game, j);
            displayHtml(game)
        })
    }
}) 


// *** function that displays an arrow on top of a column when we hover it ***

function displayArrow(game) {
    for (let j = 0; j < 7; j ++) {

        $(".col-1").mouseover(function() {
            $(".arrow-1").css("visibility", "visible");
        })
        $(".col-1").mouseout(function() {
            $(".arrow-1").css("visibility", "hidden");
        })

        $(".col-2").mouseover(function() {
            $(".arrow-2").css("visibility", "visible");
        })
        $(".col-2").mouseout(function() {
            $(".arrow-2").css("visibility", "hidden");
        })

        $(".col-3").mouseover(function() {
            $(".arrow-3").css("visibility", "visible");
        })
        $(".col-3").mouseout(function() {
            $(".arrow-3").css("visibility", "hidden");
        })

        $(".col-4").mouseover(function() {
            $(".arrow-4").css("visibility", "visible");
        })
        $(".col-4").mouseout(function() {
            $(".arrow-4").css("visibility", "hidden");
        })

        $(".col-5").mouseover(function() {
            $(".arrow-5").css("visibility", "visible");
        })
        $(".col-5").mouseout(function() {
            $(".arrow-5").css("visibility", "hidden");
        })

        $(".col-6").mouseover(function() {
            $(".arrow-6").css("visibility", "visible");
        })
        $(".col-6").mouseout(function() {
            $(".arrow-6").css("visibility", "hidden");
        })

        $(".col-7").mouseover(function() {
            $(".arrow-7").css("visibility", "visible");
        })
        $(".col-7").mouseout(function() {
            $(".arrow-7").css("visibility", "hidden");
        })

    }
}


// *** function that tells us when an horizontal win is reached ***

function wonHori(game, coin) {
    for (let i = 0; i < 6; i ++) {
        let total = 0;
        for (let j = 0; j < 7; j ++) {
            if (game[i][j] == coin) {
                total += 1   
            } else {
                total = 0;
            }
            if (total == 4)
              return true
        }
    }
    return false
}

wonHori(game, "x")


// *** function that tells us when a vertical win is reached ***

function wonVerti(game, coin) {
    
    for (let j = 0; j < 7; j ++) {
        let total = 0;
        for (let i = 0; i < 6; i ++) {
            if (game[i][j] == coin) {
                total += 1   
            } else {
                total = 0;
            }
            if (total == 4)
              return true
        }
    }
    return false
}

