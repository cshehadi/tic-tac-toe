"use strict";


$(document).ready(function() {

    var turn = '';

    function highlight(selector) {
        $(selector).css('background-color','yellowgreen');
    }

    function addCells(selector) {
        var score = 0;
        $(selector).each(function() {
            score += $(this).data('value');
        })
        return score;
    }

    function endGame(result) {
        
        $('.console').html(result);
        $('.console').css('margin-bottom', '0px');
        $('.new-game').show();
    }

    function checkScore(elem) {

        var result = 0;
        var selector_groups = ['.horiz','.vert','.diag'];

        // check horizontal
        for (var selector_index = 1; selector_index <= 3; selector_index++) {
            $.each(selector_groups, function (index, value) {

                var selector = value+'-'+selector_index; // constructs a selector, e.g. horiz-1
                result = addCells(selector); // the winner will be either 3 (x) or -3 (y)
                if (Math.abs(result) == 3) {
                    highlight(selector);
                    var winner = (result > 0) ? 'X' : 'O';
                    endGame(winner+' WINS!!!');
                    return;
                }
            });
        }

        // If it got this far, then no one won.  Do one last check to see if all cells are full
        var full_cells = 0;
        $('.cell').each(function () {
            if ($(this).find('i').length) {
                full_cells++;
            }
        });
        if (full_cells == 9) {
            endGame("It's a tie!");
        }
    }

    function clearBoard() {
        $('.cell').each(function () {
            $(this).html('');
            $(this).css('background-color', 'white');
            $(this).data('value', 0);
            $(this).addClass('active');
        });
    }

    function newTurn() {
        turn = (turn == 'X') ? 'O' : 'X';
        $('.console').html(turn+"'s turn.");
    }

    function newGame() {
        turn = 'X';
        $('.new-game').hide();
        $('.console').css('margin-bottom', '1em');
        clearBoard();
        $('.console').html(turn+"'s turn.");
    }

    function getIconClass() {
        return (turn == 'X') ? 'fa-times' : 'fa-circle-o';
    }

    function getIconValue() {
        return (turn == 'X') ? 1 : -1;
    }

    // you can only click on an active cell
    $('.board').on('click', '.active', function() {
        $(this).html('<i class="fa '+getIconClass()+'" aria-hidden="true"></i>');
        $(this).data('value', getIconValue());
        $(this).removeClass('active'); // deactivate this cell, it's been used
        newTurn();
        checkScore();
    });

    $('#new-game').click(function() {
        newGame();
    });

    newGame();

});
