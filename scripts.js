var moveCounter = 0;
var userPlays = 1;
var defineVal = 0;
var defineUser = "";
var opponent = "";
var vsToWho = "";
var scorebrd = [0,0];

/* check
1-3  0
1-5  2
3-7  6
5-7  8*/



sideSelect();

$('button.btn').click( function() {

    vsToWho = $('select').val();
    for(i=0;i < $('.tictac > div').length; i++) {
        if ($('.tictac > div').eq(i).hasClass("selected")) {
            userPlays = i + 1 ;
        }
    }

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
    
    $('.options').hide(100);
    $('.ttt').css('display','flex');
    $('.playerTurn').show();

    if (vsToWho === 'vsPlayer') {
        $('.playerTurn').text(defineUser + " Playing");
    }
    else if(vsToWho === 'vsComputer') {
        $('.playerTurn').text("You are playing with " + defineUser);
    }

})



$('.ttt-box').click( function() {
    var getDataVal = parseInt($(this).attr("data-value"));
    var clickedIndex = $(this).index();
    moveCalc(getDataVal, vsToWho, clickedIndex);
    winStatement();
    movefunc();
    //moveCounter = moveCounter + 1;

    if (vsToWho === 'vsComputer') {
        nextMove(userPlays);
    }

})

function winStatement() {
    var dataValues = collectValues();

    for (j = 0; j < 3; j++) {
        if ((dataValues[j] === dataValues[j + 3]) && (dataValues[j + 3] === dataValues[j + 6])) {

            if (dataValues[j] === 2) {
                var winValues = [j, j+3 , j+6];
                winner(winValues,1,2); 
                console.log("O kazandı");
            }
            else if (dataValues[j] === 1) {
                var winValues = [j, j+3 , j+6];
                winner(winValues,1,1);
                console.log("X kazandı");
            }
        }

    }

    for (k = 0; k < 9; k++) {
        if ((dataValues[k] === dataValues[k + 1]) && (dataValues[k + 1] === dataValues[k + 2])) {

            if (dataValues[k] === 2) {
                var winValues = [k, k+1 , k+2];
                winner(winValues,0,2);
                console.log("O kazandı");
               
            }
            else if (dataValues[k] === 1) {
                var winValues = [k, k+1 , k+2];
                winner(winValues,0,1);
                console.log("X kazandı");
                
            }
        }
        k = k + 2;
    }

    if ( ((dataValues[2] === dataValues[4]) && (dataValues[4] === dataValues[6]))) {

        if (dataValues[4] === 2) {
            var winValues = [2, 4 , 6];
            winner(winValues,4,2);
            console.log("O kazandı");
        }
        else if (dataValues[4] === 1) {
            var winValues = [2, 4 , 6];
            winner(winValues,4,1);
            console.log("X kazandı");
        }
       
    }

    if ( ((dataValues[0] === dataValues[4]) && (dataValues[4] === dataValues[8]))   ) {

        if (dataValues[4] === 2) {
            var winValues = [0, 4 , 8];
            winner(winValues,3,2);
            console.log("O kazandı");
        }
        else if (dataValues[4] === 1) {
            var winValues = [0, 4 , 8];
            winner(winValues,3,1);
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
            setTimeout(draw,300,4, optVal, opponent);

        }

        else if (valueMatris[4] !== 0) {
            var randmMoves = [0, 2, 6, 8];
            var randmMove = randmMoves[Math.floor(Math.random() * randmMoves.length)];
            setTimeout(draw,300,randmMove, optVal, opponent);   
        }
    }

    else if (moveCounter %2 == 1) {

// opt val 2 ile değiştirildi //
        var winMove = checkWinChange(valueMatris, defineVal);
        var newwinMove = checkWinChange(valueMatris, optVal);
        if (newwinMove > -1) {
            winMove = newwinMove;
            setTimeout(draw,300,winMove, optVal, opponent);
           // draw(winMove, optVal, opponent);
        }
        
        else if (winMove === undefined || winMove === null) {
            var decidedMove = checkWinChange(valueMatris, userPlays);
            setTimeout(draw,300,decidedMove, optVal, opponent);
           // draw(decidedMove, optVal, opponent);

            if (decidedMove === undefined || decidedMove === null) {
                var getAdvice = moveAdvice(valueMatris)
                setTimeout(draw,300,getAdvice, optVal, opponent);
               // draw(getAdvice, optVal, opponent);
            }
        }

        else {
            setTimeout(draw,300,winMove, optVal, opponent);
            //draw(winMove, optVal, opponent);
        }

    }

    movefunc();
    setTimeout (winStatement,320);
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

                if (valuesMatriss[i + 2] === checkVal && valuesMatriss[7] === 0) {
                    return 7;
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

            if (valuesMatriss[i-7] == checkVal) {

                if ( (valuesMatriss[i - 5] === checkVal && valuesMatriss[0] === 0) && (valuesMatriss[i - 6] != 0 && valuesMatriss[i - 2] != 0 ))  {
                    return 0;
                    break;
                } 2-6
            
                
                if ( (valuesMatriss[i - 3] === checkVal && valuesMatriss[2] === 0)  && (valuesMatriss[i - 8] != 0 && valuesMatriss[i - 6] != 0 ) ){
                    return 2;
                    break;
                } 0-8
            }
                           
            
            if (valuesMatriss[i-1] == checkVal) {
            
                if ((valuesMatriss[i - 5] === checkVal && valuesMatriss[6] === 0)  && (valuesMatriss[i - 8] != 0 && valuesMatriss[i] != 0 ) ) {
                    return 6;
                    break;
                } 0-8
            
                
                if ((valuesMatriss[i - 3] === checkVal && valuesMatriss[8] === 0)  && (valuesMatriss[i - 2] != 0 && valuesMatriss[i - 6] != 0 ) ) {
                    return 8;
                    break;
                } 6-2
            }


        }

        /* çapraz ortası boş durumların kontrolü */
        // en uçta kalan boşlukların dolu olup olmadığı kontrol edilmeli
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
           // setTimeout(draw,300,clckInd, defineVal, defineUser);
            draw(clckInd, defineVal, defineUser);
        }
        else if (getVal === 0 && moveCounter % 2 === 1) {
            setTimeout(draw,300,clckInd, optVal, opponent);
           // draw(clckInd, optVal, opponent);
        }
    }

    else {
        if (getVal === 0 && moveCounter % 2 === 0) {
            //setTimeout(draw,300,clckInd, defineVal, defineUser);
            draw(clckInd, defineVal, defineUser);
        }
        else if (getVal === 0 && moveCounter % 2 === 1) {
           // setTimeout(draw,300,clckInd, optVal, opponent);
            draw(clckInd, optVal, opponent);
        }
    }

}
function draw(getMove, getDefinedVal, getDefinedUser) {
    $('.ttt-box').eq(getMove).attr("data-value", getDefinedVal);
    $('.ttt-box').eq(getMove).text(getDefinedUser);
    $('.ttt-box').eq(getMove).addClass("drawed");
}

function sideSelect() {
    $('.tictac > div').click( function() {

        for(i=0;i < $('.tictac > div').length; i++) {
            $('.tictac > div').eq(i).removeClass("selected");
        }

        $(this).addClass("selected");


    }) 

}

function movefunc() {
    moveCounter = moveCounter + 1;

    if (vsToWho === 'vsPlayer') {
        if(moveCounter%2 == 0) {
            $('.playerTurn').text(defineUser + " Playing");
        }
        
        else if (moveCounter < 9){
            $('.playerTurn').text(opponent + " Playing");
        }
    }

    if (moveCounter == 9) {
        console.log("gameover");
        $('.winner').text("Draw !");
        scorebrd[0] = scorebrd[0] + 1;
        scorebrd[1] = scorebrd[1] + 1;
        $('.scoreboard .x').text(scorebrd[0]);
        $('.scoreboard .o').text(scorebrd[1]);

        clearPage();        
    }

}

function winner(winnerValues,winDirection,whoWins) {

    if (winDirection == 0) {
        for(l=0;l<winnerValues.length;l++ ) {
            $('.ttt-box').eq(winnerValues[l]).addClass("horizontal");
        }
    }

    else if (winDirection == 1) {
        for(l=0;l<winnerValues.length;l++ ) {
            $('.ttt-box').eq(winnerValues[l]).addClass("vertical");
        }
    }

    else if (winDirection == 3) {
        for(l=0;l<winnerValues.length;l++ ) {
            $('.ttt-box').eq(winnerValues[l]).addClass("bcrosst");
        }
    }

    else if (winDirection == 4) {
        for(l=0;l<winnerValues.length;l++ ) {
            $('.ttt-box').eq(winnerValues[l]).addClass("tcrossb");
        }
    }

    if(whoWins == defineVal) {
        $('.winner').text(defineUser + "  Won !");
        if(defineVal == 1) {
            scorebrd[0] = scorebrd[0] + 1;
            $('.scoreboard .x').text(scorebrd[0]);
        }
        else if(defineVal == 2) {
            scorebrd[1] = scorebrd[1] + 1;
            $('.scoreboard .o').text(scorebrd[1]);
        }

    }
    else if(whoWins == optVal) {
        $('.winner').text(opponent + "  Won !");
        if(optVal == 1) {
            scorebrd[0] = scorebrd[0] + 1;
            $('.scoreboard .x').text(scorebrd[0]);
        }
        else if(optVal == 2) {
            scorebrd[1] = scorebrd[1] + 1;
            $('.scoreboard .o').text(scorebrd[1]);
        }
    }
    clearPage();
}


$('select').change(function(){ 
    
    if ($(this).val() == "vsPlayer") {
        $('.player').fadeIn();
    }

    else{
        $('.player').fadeOut();
    }
});

$(".newMatch .btn").click( function() {

    for(i=0;i < 9 ; i ++) {
        $('.ttt-box').eq(i).removeClass("done drawed horizontal vertical bcrosst tcrossb ");
        $('.ttt-box').eq(i).attr('data-value',0);
        $('.ttt-box').eq(i).text("");
        moveCounter = 0;
    }

    $('.winner').hide(100);
    $('.newMatch').hide(100);
    $('.goback').hide(100);
    $('.ttt-box').css('opacity','1');
})

$('.goback').click( function() {
    location.reload();
});


function clearPage() {
    $('.winner').show(300);
    $('.scoreboard').show(300);
    $('.newMatch').show(500);
    $('.goback').show(500);
    $('.ttt-box').css('opacity','0.25');
    
    for(var j=0;j<$('.ttt-box').length;j++) {
        if(!$('.ttt-box').eq(j).hasClass("drawed")) {
            $('.ttt-box').eq(j).addClass("done");
        }
    }
}