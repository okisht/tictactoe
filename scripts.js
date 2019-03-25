var moveCounter = 0;
var userPlays = 1;

var defineUser = "";
var opponent = "";
var defineVal = 0;

if (userPlays == 1) {
    defineUser = "X";
    defineVal = 1;
    opponent = "O";
    optVal = 2;
}

else {
    defineUser = "O";
    defineVal = 2;
    opponent = "X";
    optVal = 1;
}


$('.ttt-box').click(function () {

    var ind = $('.ttt-box').index(this) + 1;
    var getDataVal = parseInt($(this).attr("data-value"));
    var clickedIndex = $(this).index();
    const vsToWho = $('select').val();

    moveCalc(getDataVal, vsToWho, clickedIndex);
    winStatement();
    moveCounter = moveCounter + 1;

    if (vsToWho === 'vsComputer') {
        nextMove(userPlays);
    }

})

function winStatement() {
    var dataValues = collectValues();

    for (j = 0; j < 3; j++) {
        if ((dataValues[j] === dataValues[j + 3]) && (dataValues[j + 3] === dataValues[j + 6])) {

            if (dataValues[j] === 2) {
                console.log("O kazandı");
            }
            else if (dataValues[j] === 1) {
                console.log("X kazandı");
            }
        }

    }

    for (k = 0; k < 9; k++) {
        if ((dataValues[k] === dataValues[k + 1]) && (dataValues[k + 1] === dataValues[k + 2])) {

            if (dataValues[k] === 2) {
                console.log("O kazandı");
            }
            else if (dataValues[k] === 1) {
                console.log("X kazandı");
            }
        }
        k = k + 2;
    }

    if (((dataValues[0] === dataValues[4]) && (dataValues[4] === dataValues[8])) || ((dataValues[2] === dataValues[4]) && (dataValues[4] === dataValues[6]))) {

        if (dataValues[4] === 2) {
            console.log("O kazandı");
        }
        else if (dataValues[4] === 1) {
            console.log("X kazandı");
        }
    }

}

function collectValues() {
    var dataVls = [];
    var k = $('.ttt-box').length;
    for (i = 0; i < k; i++) {
        dataVls.push(parseInt($('.ttt-box').eq(i).attr('data-value')));
    }

    return dataVls;
}

function nextMove(userPlays) {
    const valueMatris = collectValues();

    if (moveCounter == 1) {
        if (valueMatris[4] === 0) {
            draw(4, defineVal, opponent);
            moveCounter = moveCounter + 1;
            winStatement();
        }

        else if (valueMatris[4] !== 0) {
            var randmMoves = [0, 2, 6, 8];
            var randmMove = randmMoves[Math.floor(Math.random() * randmMoves.length)];
            draw(randmMove, defineVal, opponent);
            moveCounter = moveCounter + 1;
            winStatement();
        }

    }

    else if (moveCounter % 2 == 1) {

        const winMove = checkWinChange(valueMatris, 2);
        if (winMove === undefined || winMove === null) {
            const decidedMove = checkWinChange(valueMatris, userPlays);
            draw(decidedMove, defineVal, opponent);

            if (decidedMove === undefined || decidedMove === null) {
                var getAdvice = moveAdvice(valueMatris)
                draw(getAdvice, defineVal, opponent);
            }
        }

        else {
            draw(winMove, defineVal, opponent);
        }

        moveCounter = moveCounter + 1;
        winStatement();

    }
}


function checkWinChange(valuesMatriss, checkVal) {
    for (i = 0; i < valuesMatriss.length; i++) {
        if (i == 0) {
            if (valuesMatriss[i] === checkVal) {

                if (valuesMatriss[i + 1] === checkVal && valuesMatriss[2] === 0) {
                    return 2;
                    break;
                }

                if (valuesMatriss[i + 3] === checkVal && valuesMatriss[6] === 0) {
                    return 6;
                    break;
                }

                if (valuesMatriss[i + 4] === checkVal && valuesMatriss[8] === 0) {
                    return 8;
                    break;
                }

                if (valuesMatriss[i + 2] === checkVal && valuesMatriss[1] === 0) {
                    return 1;
                    break;
                }

                if (valuesMatriss[i + 6] === checkVal && valuesMatriss[3] === 0) {
                    return 3;
                    break;
                }

                if (valuesMatriss[i + 8] === checkVal && valuesMatriss[4] === 0) {
                    return 4;
                    break;
                }

                /*
                check 
                0-1
                0-3
                0-4
                0-2  
                0-6  
                0-8
                */
            }

        }

        else if (i == 2) {
            if (valuesMatriss[i] == checkVal) {

                if (valuesMatriss[i - 1] === checkVal && valuesMatriss[0] === 0) {
                    return 0;
                    break;
                }

                if (valuesMatriss[i + 2] === checkVal && valuesMatriss[6] === 0) {
                    return 6;
                    break;
                }

                if (valuesMatriss[i + 3] === checkVal && valuesMatriss[8] === 0) {
                    return 8;
                    break;
                }

                if (valuesMatriss[i + 6] === checkVal && valuesMatriss[5] === 0) {
                    return 5;
                    break;
                }

                if (valuesMatriss[i + 4] === checkVal && valuesMatriss[4] === 0) {
                    return 4;
                    break;
                }

                /*
                check 
                2-1
                2-4
                2-5
                2-8
                2-6
                */
            }

        }

        else if (i == 4) {
            if (valuesMatriss[i] == checkVal) {

                if (valuesMatriss[i - 3] === checkVal && valuesMatriss[7] === 0) {
                    return 7;
                    break;
                }

                if (valuesMatriss[i - 1] === checkVal && valuesMatriss[5] === 0) {
                    return 5;
                    break;
                }

                if (valuesMatriss[i + 1] === checkVal && valuesMatriss[3] === 0) {
                    return 3;
                    break;
                }

                if (valuesMatriss[i + 3] === checkVal && valuesMatriss[1] === 0) {
                    return 1;
                    break;
                }
                /*
                check 
                4-1
                4-3
                4-5
                4-7
                */
            }

        }

        else if (i == 6) {
            if (valuesMatriss[i] == checkVal) {


                if (valuesMatriss[i - 3] === checkVal && valuesMatriss[0] === 0) {
                    return 0;
                    break;
                }

                if (valuesMatriss[i - 2] === checkVal && valuesMatriss[2] === 0) {
                    return 2;
                    break;
                }

                if (valuesMatriss[i + 1] === checkVal && valuesMatriss[8] === 0) {
                    return 8;
                    break;
                }

                if (valuesMatriss[i + 2] === checkVal && valuesMatriss[5] === 0) {
                    return 5;
                    break;
                }

                if (valuesMatriss[i - 4] === checkVal && valuesMatriss[4] === 0) {
                    return 4;
                    break;
                }

                /*
                check 
                6-3
                6-4
                6-7
                6-8
                6-2
                */
            }

        }

        else if (i == 8) {
            if (valuesMatriss[i] == checkVal) {

                if (valuesMatriss[i - 4] === checkVal && valuesMatriss[0] === 0) {
                    return 0;
                    break;
                }

                if (valuesMatriss[i - 3] === checkVal && valuesMatriss[2] === 0) {
                    return 2;
                    break;
                }

                if (valuesMatriss[i - 1] === checkVal && valuesMatriss[6] === 0) {
                    return 6;
                    break;
                }

                /*
                check 
                8-4
                8-5
                8-7
                */
            }

        }

        /* çapraz ortası boş durumların kontrolü */
        else if (i == 1) {
            if (valuesMatriss[i] == checkVal) {

                if (valuesMatriss[i + 6] === checkVal && valuesMatriss[4] === 0) {
                    return 4;
                    break;
                }

            }

            if (valuesMatriss[i + 2] == checkVal) {

                if (valuesMatriss[i + 4] === checkVal && valuesMatriss[4] === 0) {
                    return 4;
                    break;
                }

            }

        }
    }

}

function moveAdvice(currentMatris) {
    var moveContainer = [];
    var corners = [0, 2, 6, 8]

    for (j = 0; j < currentMatris.length; j++) {
        if (currentMatris[j] === 0) {

            for (k = 0; k < corners.length; k++) {
                if (j == corners[k]) {
                    moveContainer.push(corners[k]);
                }
            }

            if (moveContainer.length > 0) {
                break;
            }

            else { moveContainer.push(j); }

        }
    }

    var anyMove = moveContainer[Math.floor(Math.random() * moveContainer.length)];
    return anyMove;
}


function moveCalc(getVal, vsToWho, clckInd) {

    if (vsToWho === 'vsComputer') {
        if (getVal === 0 && moveCounter % 2 === 0) {
            draw(clckInd, optVal, defineUser);
        }
        else if (getVal === 0 && moveCounter % 2 === 1) {
            draw(clckInd, optVal, opponent);
        }
    }

    else {
        if (getVal === 0 && moveCounter % 2 === 0) {
            draw(clckInd, defineVal, defineUser);
        }
        else if (getVal === 0 && moveCounter % 2 === 1) {
            draw(clckInd, optVal, opponent);
        }
    }

}
function draw(getMove, getDefinedVal, getDefinedUser) {
    $('.ttt-box').eq(getMove).attr("data-value", getDefinedVal);
    $('.ttt-box').eq(getMove).text(getDefinedUser);
    $('.ttt-box').eq(getMove).addClass("drawed");
}

