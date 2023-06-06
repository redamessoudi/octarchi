// JavaScript code
// variables
let radarChart;
var barChart;
const labels = [
    'Evolutivity', 'Modularity', 
    'Cost', 'Performance', 
    'Simplicity', 'Testability', 
    'Fault Tolerance', 'Green IT'];

const messages = {
    veryGood: [
        "The Mozart of Solution Architecture!",
        "This architecture shines brighter than a diamond!",
        "Your architecture is like a perfectly baked cake, every layer is simply delightful!",
        "Looks like you've just taken a masterclass from Leonardo da Vinci of solution architecture!"
    ],
    good: [
        "This is on track, but a bit more polishing wouldn't hurt!",
        "Not all heroes wear capes, some just draw good architecture!",
        "Good job! This architecture is better than a lukewarm pizza!",
        "There's potential here! Like a cake that just needs a bit more frosting!"
    ],
    average: [
        "This is like adding pineapple to a pizza - some might like it, but it's not for everyone!",
        "The architecture is like your mother-in-law. It's okay but you wish it could be better!",
        "It's like coffee without caffeine - not very stimulating.",
        "The architecture is like a vacation without an itinerary – it’s got potential, but needs direction."
    ],
    bad: [
        "This architecture needs more work than a decaffeinated coffee needs caffeine!",
        "Your architecture is like a soup sandwich – pretty messy!",
        "This architecture is as confusing as instructions on a shampoo bottle!",
        "This is like a software project without a deadline – pretty chaotic!"
    ],
    veryBad: [
        "This architecture is like bringing a knife to a gunfight, totally ill-prepared!",
        "If architecture was a crime, this one would need a good lawyer!",
        "This architecture is messier than a teenager's bedroom!",
        "This architecture is like a square wheel, not going to get you very far!"
    ]
};

// functions
function resetPage() {
    const inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    // hide elements
    document.getElementById('totalScoreDiv').style.display = 'none';
    document.getElementById('messageOfScoreDiv').style.display = 'none';

    document.getElementById('score1Percent').style.display = 'none';
    document.getElementById('score2Percent').style.display = 'none';
    document.getElementById('score3Percent').style.display = 'none';
    document.getElementById('score4Percent').style.display = 'none';
    document.getElementById('score5Percent').style.display = 'none';
    document.getElementById('score6Percent').style.display = 'none';
    document.getElementById('score7Percent').style.display = 'none';
    document.getElementById('score8Percent').style.display = 'none';

    if (radarChart) {
        radarChart.destroy(); // Destroy the old chart if there is one
        radarChart = null;
    }
}

function getColor(score) {
    if (score >= 4) {
        return 'green';
    // } else if (score >= 3) {
    //     return 'yellow';
    } else if (score >= 2) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Check my architecture function
function checkMyArchi() {
    const scores = [
        document.getElementById('score1').value || 0,
        document.getElementById('score2').value || 0,
        document.getElementById('score3').value || 0,
        document.getElementById('score4').value || 0,
        document.getElementById('score5').value || 0,
        document.getElementById('score6').value || 0,
        document.getElementById('score7').value || 0,
        document.getElementById('score8').value || 0
    ];

    const colors = scores.map(getColor);
    const totalScore = scores.reduce((a, b) => Number(a) + Number(b), 0);
    const percentage = totalScore / (5 * scores.length) * 100;
    const percentages = scores.map(score => score / 5 * 100);


    // Display total score percentage on the page
    document.getElementById('totalScorePercent').textContent = `${percentage.toFixed(1)}%`;
    document.getElementById('totalScoreDiv').style.display = 'block'; // Show totalScoreDiv
    
    // Display percentages on the page
    document.getElementById('score1Percent').textContent = `${percentages[0]}%`;
    document.getElementById('score2Percent').textContent = `${percentages[1]}%`;
    document.getElementById('score3Percent').textContent = `${percentages[2]}%`;
    document.getElementById('score4Percent').textContent = `${percentages[3]}%`;
    document.getElementById('score5Percent').textContent = `${percentages[4]}%`;
    document.getElementById('score6Percent').textContent = `${percentages[5]}%`;
    document.getElementById('score7Percent').textContent = `${percentages[6]}%`;
    document.getElementById('score8Percent').textContent = `${percentages[7]}%`;

    // decision messages handling
    let decisionMessages;
    if (percentage >= 90) {
        decisionMessages = messages.veryGood;
    } else if (percentage >= 70) {
        decisionMessages = messages.good;
    } else if (percentage >= 40) {
        decisionMessages = messages.average;
    } else if (percentage >= 20) {
        decisionMessages = messages.bad;
    } else {
        decisionMessages = messages.veryBad;
    }

    //Display decision message
    const messageScore = decisionMessages[Math.floor(Math.random() * decisionMessages.length)];
    document.getElementById('messageScore').textContent = messageScore;
    document.getElementById('messageOfScoreDiv').style.display = 'block'; // Show messageOfScoreDiv

    // radar chart
    if (radarChart) {
        radarChart.destroy(); // Destroy the old chart if there is one
    }

    const radarData = {
        labels: labels,
        datasets: [{
            label: 'Criteria Scores',
            data: scores,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
            pointBackgroundColor: 'rgb(153, 102, 255)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(153, 102, 255)'
        }]
    };

    const radarConfig = {
        type: 'radar',
        data: radarData,
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    };

    radarChart = new Chart(
        document.getElementById('criteriaRadarChart'),
        radarConfig
    );
}

const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.value < 1) {
      input.value = 1;
    } else if (input.value > 5) {
      input.value = 5;
    }
  });
});

  