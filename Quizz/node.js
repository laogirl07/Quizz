// Voici le tableau pour les questions/réponses

(function() {
    let questions = [{
        question: "Qui est le meilleur ami de Gon FREECS?",
        choices: ["Kurapika", "Kirua", "Leolio", "Naruto"],
        correctAnswer: 1
    }, {
        question: "Qui as tué Jiraya dans Naruto?",
        choices: ["Pain", "Oroshimaru", "Naruto", "Itachi"],
        correctAnswer: 0
    }, {
        question: "Qui est dans l'équipage de Luffy?",
        choices: ["Shanks", "Trafalgar", "Robbin", "Barbe blanche"],
        correctAnswer: 2
    }, {
        question: "Quelle est le nom de Grey dans Fairytail?",
        choices: ["Scarlett", "Fullbuster", "Heartfilia", "Draer"],
        correctAnswer: 1
    }];

    let questionCounter = 0; //Cela compte les questions
    let selections = []; //Tableau contenant les choix du client
    let quiz = $('#quiz'); //Objet div du Quiz

    //Afficher la question initial
    displayNext();

    // Cliquez sur le bouton pour le bouton 'suivant'
    $('#next').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        //Si une des réponses n'est pas cliquer un popper se déclenche disant de repondre
        if (isNaN(selections[questionCounter])) {
            alert('Il nous faut une réponse!!!');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Cliquez sur le bouton pour le bouton 'précedent'
    $('#prev').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Cliquez sur le bouton pour le bouton 'retour au départ'
    $('#start').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Anime les boutons au survol
    $('.button').on('mouseenter', function() {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function() {
        $(this).removeClass('active');
    });

    // Crée et retourne la div qui contient les questions et
    // les sélections de réponses
    function createQuestionElement(index) {
        let qElement = $('<div>', {
            id: 'question'
        });

        let header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        let question = $('<p>').append(questions[index].question);
        qElement.append(question);

        let radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Crée une liste des choix de réponse en tant qu'entrées
    function createRadios(index) {
        let radioList = $('<ul>');
        let item;
        let input = '';
        for (let i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Lit la sélection du client et place la valeur dans un tableau
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Affiche le prochain élément demandé
    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if (questionCounter < questions.length) {
                let nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Contrôle l'affichage du bouton 'precedant'
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                let scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Calcule le score et renvoie un paragraphe à afficher
    function displayScore() {
        let score = $('<p>', { id: 'question' });

        let numCorrect = 0;
        for (let i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('Tu as ' + numCorrect + ' réponses justes sur ' +
            questions.length + '!!!');
        return score;
    }
})();