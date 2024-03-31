document.addEventListener('DOMContentLoaded', function() {
    resetRadioButtons();
    showFirstQuestion();
    setupNextButtons();
});

function resetRadioButtons() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

function showFirstQuestion() {
    const firstQuestion = document.querySelector('.question');
    if (firstQuestion) {
        firstQuestion.classList.remove('d-none');
    }
}

function setupNextButtons() {
    const nextButtons = document.querySelectorAll('.next');
    nextButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const currentQuestion = event.target.closest('.question');
            const nextQuestion = currentQuestion.nextElementSibling;
            if (nextQuestion) {
                currentQuestion.classList.add('d-none');
                nextQuestion.classList.remove('d-none');
            } else {
                evaluateResults();
            }
        });
    });
}

function evaluateResults() {
    // Deine bestehende Logik zur Ergebnisberechnung
    const results = { V: 0, A: 0, R: 0, K: 0 };
    const form = document.getElementById('varkQuestionnaire');
    const formData = new FormData(form);

    for (let [name, value] of formData.entries()) {
        if (results.hasOwnProperty(value)) {
            results[value]++;
        }
    }

    const highestScore = Math.max(results.V, results.A, results.R, results.K);
    const preferredLearningStyles = Object.keys(results).filter(key => results[key] === highestScore);

    let description = '';
    preferredLearningStyles.forEach(style => {
        description += getDescriptionForLearningStyle(style);
    });

    // Ergebnisse im Modal setzen
    document.querySelector('#resultsModal .modal-body').innerHTML = description;
    
    // Modal öffnen
    var resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'), {
      keyboard: false
    });
    resultsModal.show();
}


function getDescriptionForLearningStyle(style) {
    const descriptions = {
        V: `<p><strong>Visuell (V):</strong> Du lernst am besten durch visuelle Mittel wie Diagramme, Grafiken und Videos.</p>`,
        A: `<p><strong>Auditiv (A):</strong> Du bevorzugst es, Informationen durch Zuhören zu erwerben, sei es in Vorträgen oder durch Audioaufnahmen.</p>`,
        R: `<p><strong>Lesen/Schreiben (R):</strong> Du favorisierst textbasiertes Material und lernst effektiv durch das Lesen von Texten und das Anfertigen von Notizen.</p>`,
        K: `<p><strong>Kinästhetisch (K):</strong> Du lernst am besten durch direktes Ausführen und Experimentieren, also durch praktische Erfahrungen.</p>`
    };
    return descriptions[style];
}
