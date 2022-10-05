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
            } else {
                $(`.c-${i}-${j}`).removeClass("yel-coin")
                $(`.c-${i}-${j}`).removeClass("red-coin")
            }
        }
    }

    if (nextCoin(game) == 'x') {
        $('.arrow').css('borderColor', 'rgb(245, 20, 9)')
    } else {
        $('.arrow').css('borderColor', 'rgb(249, 220, 5)')
    }
} 


// *** Function that will insert a coin everytime we click on a cell ***

function insertCoin(game, column) {
    for (let i=5; i>=0; i--) {
        if (game[i][column] == " ") {
            game[i][column] = nextCoin(game);
            break;   
        }
    }
    return game
}



// *** function that will count the number of each coin (red and yellow) ***

function numberOfCoins(game, coin) {
    let total = 0

    // for (let row of game) {
    //     for (let letter of row) {
    //         if (coin == letter) {
    //           total += 1 
    //           console.log(total)
    //         }
    //     }
    // }

    //              OR

    for (let i = 0; i < 6; i ++) {
        for (let j = 0; j < 7; j ++) {
            if (game[i][j] == coin) {
                total += 1
                console.log(total)
            }
        }
    }
    
    return total
}



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
    bindArrow()
    bindTryAgain(game)
    play(game)
}) 


function play(game) {
    let isWon = false;
    for (let j = 0; j < 7; j ++) {
        i = j + 1;
        $(`.col-${i}`).on("click", function() {
            if (!isWon) {
                insertCoin(game, j);

                if (won(game, 'o')) {
                    isWon = true;

                    $(".bounce-in-fwd").css({
                        "visibility": "visible",
                        "background-color": "rgb(249, 220, 5)"
                    });
                }
                else if (won(game, 'x')) {
                    isWon = true;

                    $(".bounce-in-fwd").css({
                        "visibility": "visible",
                        "background-color": "rgb(245, 20, 9)"
                    });
                }

                if (isWon) {
                    $(".restart").removeClass("bounce-in-fwd");
                    $(".restart")[0].offsetWidth;                // MAGIC to restart animation => https://css-tricks.com/restart-css-animation/
                    $(".restart").addClass("bounce-in-fwd");
                }
            }

            displayHtml(game)
        })
    }
}


// *** function that displays an arrow on top of a column when we hover it ***

function bindArrow() {
    for (let j = 0; j < 7; j ++) {

        $(`.col-${j + 1}`).mouseover(function() {
            $(`.arrow-${j + 1}`).css("visibility", "visible");
        })
        $(`.col-${j + 1}`).mouseout(function() {
            $(`.arrow-${j + 1}`).css("visibility", "hidden");
        })
    }
}

function won(game, coin) {
    return wonHori(game, coin) || wonVerti(game, coin) || wonDiago1(game, coin) || wonDiago2(game, coin)
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
                return true;
        }
    }

    return false
}


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
                return true;
        }
    }

    return false
}


function bindTryAgain(game) {
    $(".try-again").on("click", function() {
        emptyGame(game)
        isWon = false
        play(game)
    })
}

function emptyGame(game) {
    for (let i = 0; i < 6; i ++) {
        for (let j = 0; j < 7; j ++) {
            game[i][j] = ' '
            $(".bounce-in-fwd").css("visibility", "hidden")
        }    
    }

    displayHtml(game)
}

function wonDiago1(game, coin) {
    for (let i = 3; i < 6; i ++) {
        let total = 0;
        for (let j = 0; j < 7; j ++) {
            if (game[i][j] == coin && game[i-1][j+1] == coin && game[i-2][j+2] == coin && game[i-3][j+3] == coin) {
                total += 4   
            } else {
                total = 0;
            }
            if (total == 4) 
                return true;
        }
     }

    return false
}


function wonDiago2(game, coin) {
    for (let i = 3; i < 6; i ++) {
        let total = 0;
        for (let j = 6; j >= 0; j --) {
            if (game[i][j] == coin && game[i-1][j-1] == coin && game[i-2][j-2] == coin && game[i-3][j-3] == coin) {
                // console.log(game[i-1][j+1])
                // console.log(game[i][j])
                total += 4   
            } else {
                total = 0;
            }
            if (total == 4) 
                return true;
        }
     }

    return false
}