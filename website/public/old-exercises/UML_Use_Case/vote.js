let votes;
let voteOption = "";
const saved = localStorage.getItem('savedVotes');
const savedVotes = JSON.parse(saved)

window.onload = function() {
    const buttonOne = document.getElementById("buttonOne");
    const buttonTwo = document.getElementById("buttonTwo");
    const roleHeader = document.getElementById("roleHeader");
    const voteBlock = document.getElementById("voteBlock");

    buttonOne.innerHTML = 'Käyttäjä';
    buttonTwo.innerHTML = 'Ylläpitäjä';
    roleHeader.innerHTML = '<span style="font-weight: bold">Valitse roolisi:</span><br><span style="font-size: small">(Voit vaihtaa roolia myöhemmin päivittämällä sivun.)</span>';

    buttonOne.addEventListener("click", handleButtonOneClick);
    buttonTwo.addEventListener("click", handleButtonTwoClick);

    if (savedVotes !== null) {
        votes = savedVotes;
        loadVotes();
    } else {
        votes = {};
    }
};



function loadVotes() {
    const cardBody = document.querySelector("#voteBlock .card-body");
    cardBody.innerHTML = "";

    Object.keys(votes).forEach(answer => {
        const a = document.createElement("a");
        a.classList.add("card-text");
        a.textContent = answer;
        a.style.fontWeight = "bold";
        a.style.color = "black";
        a.style.textDecoration = "none";

        a.onclick = function() {
            showVote(answer);
        };

        cardBody.appendChild(a);
    });
}



function handleButtonOneClick() {
    if (buttonOne.innerHTML === "Käyttäjä") {
        roleHeader.innerHTML = 'Käyttäjä';
        addUserButton();
    } else if (buttonOne.innerHTML === "Lisää äänestys") {
        showPopup();
    }
}



function handleButtonTwoClick() {
    if (buttonTwo.innerHTML === "Ylläpitäjä") {
        roleHeader.innerHTML = 'Ylläpitäjä';
        addAdminButtons();
        loadVotes();
    } else if (buttonTwo.innerHTML === "Lisää äänestys") {
        showPopup();
    } else if (buttonTwo.innerHTML === "Poista äänestys") {
        removeVoteOption();
    }
}



function addUserButton() {
    buttonOne.innerHTML = "Lisää äänestys";
    buttonTwo.style.display = "none";
    voteBlock.style.display = "block";
}



function addAdminButtons() {
    buttonOne.innerHTML = "Lisää äänestys";
    buttonTwo.innerHTML = "Poista äänestys";
    voteBlock.style.display = "block";
}



function showPopup() {
    let n = Object.keys(votes).length + 1;
    let answer = prompt("Kirjoita äänestyksen aihe:");
    if (answer !== null && answer.trim() !== "") {
        const cardBody = document.querySelector("#voteBlock .card-body");
        const a = document.createElement("a");
        a.classList.add("card-text");
        a.textContent = n + ". " + answer;
        answer = a.textContent;
        a.style.fontWeight = "bold";
        a.style.color = "black";
        a.style.textDecoration = "none";

        if (answer) {
            let voteCount = 0;
            votes[answer] = voteCount;
        }
        
        a.onclick = function() {
            showVote(answer)
        };

        cardBody.appendChild(a);
        localStorage.setItem('savedVotes', JSON.stringify(votes));
    }
}



function showVote(answer) {
    if (roleHeader.innerHTML != 'Ylläpitäjä') {
        const modal = document.getElementById("myModal");
        const modalText = document.getElementById("modalText");
        let voteResult = votes[answer] + (votes[answer] === 1 ? " ääni" : " ääntä");

        modalText.innerHTML = "";

        const row = document.createElement("div");
        row.classList.add("row");

        const answerDiv = document.createElement("div");
        const resultDiv = document.createElement("div");
        
        answerDiv.classList.add("col-6");
        resultDiv.classList.add("col-6", "resultDiv");

        answerDiv.innerHTML = answer;
        resultDiv.innerHTML = voteResult;

        resultDiv.style.textAlign = "right";

        row.appendChild(answerDiv);
        row.appendChild(resultDiv);

        modalText.appendChild(row);

        modal.style.display = "block";
        voteOption = answer;

        localStorage.setItem('savedVotes', JSON.stringify(votes));
    }
}



function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}



function vote() {
    votes[voteOption] += 1;
    localStorage.setItem('savedVotes', JSON.stringify(votes));
    alert("Ääni vastaanotettu!")
    closeModal();
}



function removeVoteOption() {
    let toBeRemoved = prompt("Syötä poistettavan äänestyksen numero:");
    if (toBeRemoved !== null && toBeRemoved.trim() !== "") {
        const num = parseInt(toBeRemoved);
        if (!isNaN(num)) {
            const toBeRemovedKey = Object.keys(votes).find(key => key.startsWith(toBeRemoved + ". "));
            if (toBeRemovedKey) {
                delete votes[toBeRemovedKey];
                loadVotes();
                localStorage.setItem('savedVotes', JSON.stringify(votes));
                alert("Äänestys poistettu.");
            } else {
                alert("Virheellinen äänestyksen numero.");
            }
        } else {
            alert("Virheellinen syöte. Syötteen tulee olla numero.");
        }
    }
}