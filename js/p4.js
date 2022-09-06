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
  [' ', ' ', ' ', 'x', ' ', ' ', ' '],
  [' ', ' ', ' ', 'x', ' ', ' ', ' '],
  [' ', ' ', ' ', 'x', ' ', ' ', ' '],
  [' ', ' ', ' ', 'x', ' ', ' ', ' ']
]

function display(game) {
    console.log("---------");

    for ( let i in game) {
        console.log("|" + game[i].join("") + "|")
    }

    console.log("---------")
}

display(game)

function displayHtml(game) {
    //let divs = document.getElementsByClassName("cell");
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
            // } else if (game[i][j] === ' ') {
            //     $(`.c-${i}-${j}`).click(insertCoin(game)) 
            // }
        }
    }   
} 

function insertCoin(game, column) {
    for (let i=5; i>=0; i--) {
        if (game[i][column] == " ") {
            game[i][column] = nextCoin(game);
            break;
        } 
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


function numberOfCoins(game, coin) {
    let total = 0

    for (let row of game) {
        for (let letter of row) {
            if (coin == letter) {
              total += 1 
            }
        }
    }

    // for (let i = 0; i < 6; i ++) {
    //     for (let j = 0; j < 7; j ++) {
    //         if (game[i][j] == coin) {
    //             total += 1
    //         }
    //     }
    // }
    
    return total
}

numberOfCoins(game, 'o')

// function numberOfCoins(game, coin) {
//     let total = {}

//     for (let row of game) {
//         for (let letter of row) {
//             if (total[letter]) {
//                 total[letter] += 1;
//             } else {
//                 total[letter] = 1;
//             }
//         }
//     }
    
//     return total[coin]
// }


$(document).ready(function() {
    displayHtml(game)
    for (let j = 0; j < 7; j ++) {
        i = j + 1;
        $(`.col-${i}`).on("click", function() {
            insertCoin(game, j);
            displayHtml(game)
        })
    }
}) 

// $(document).ready(function() {
//     displayHtml(game)
//     $(".col-1").on("click", function() {
//         insertCoin(game, 0);
//         displayHtml(game)
//     })
// })


// let horiOk(game) {
//     let total = 0;
//     for (let i = 0; i < 7; i ++) {
//         total += 1
//         game[i] = total
//         return total 
//     }
// }

// horiOk(game)

function wonHori(game, coin) {
    for (let i = 0; i < 6; i ++) {
        let total = 0;
        for (let j = 0; j < 7; j ++) {
            if (game[i][j] == coin) {
                total += 1   
            } else {
                total = 0;
            }
            console.log(total)
            if (total == 4)
              return true
        }
    }
    return false
    // return "You Win!";
}

console.log(wonHori(game, "x"))


function wonVerti(game, coin) {
    
    for (let j = 0; j < 7; j ++) {
        let total = 0;
        for (let i = 0; i < 6; i ++) {
            if (game[i][j] == coin) {
                total += 1   
            } else {
                total = 0;
            }
            console.log(total)
            if (total == 4)
              return true
        }
    }
    return false
}


console.log(wonVerti(game, "x"))


// function horiOK(game) {
//     const count = countHori(game);
//     for (let i = 0; i < 6; i ++) {
//         for (let j = 0; j < 7; j ++) {
//             if (count === 4) {
//                 return "You Win!"
//             }
//         }
//     }
// }   