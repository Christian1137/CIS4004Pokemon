async function capturePoke() {
    const input = document.getElementById("inputPoke").value.toLowerCase().trim();
    
    if (!input) return;

    try {
        let data;
        const cached = localStorage.getItem(input);
        
        if (cached) {
            console.log("Loading from localStorage:", input);
            data = JSON.parse(cached);
        } else {
            console.log("Fetching from API:", input);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

            if (!response.ok) {
                alert("Pokemon not found!");
                return;
            }

            data = await response.json();
            console.log(data);
            localStorage.setItem(input, JSON.stringify(data));
        } 

        document.getElementById("pokeImg").src = data.sprites.front_default;

        const audio = document.querySelector("audio");
        const audioSource = audio.querySelector("source");
        audioSource.src = data.cries.latest;
        audioSource.type = "audio/ogg";
        audio.load(); 

        const moves = data.moves.map(m => m.move.name);
        const dropdowns = ["pokeMoves1", "pokeMoves2", "pokeMoves3", "pokeMoves4"];

        dropdowns.forEach(id => {
            const select = document.getElementById(id);
            select.innerHTML = ""; 

            moves.forEach(move => {
                const option = document.createElement("option");
                option.value = move;
                option.textContent = move;
                select.appendChild(option);
            });
        });

    } catch (error) {
        console.error("Error fetching pokemon:", error);
    }
}

function addToTeam() {
    const teamList = document.getElementById("teamList");

    const img = document.getElementById("pokeImg").src;
    const move1 = document.getElementById("pokeMoves1").value;
    const move2 = document.getElementById("pokeMoves2").value;
    const move3 = document.getElementById("pokeMoves3").value;
    const move4 = document.getElementById("pokeMoves4").value;

    const card = document.createElement("div");
    card.classList.add("teamCard");
    card.innerHTML = `
        <img src="${img}" alt="pokemon">
        <ul>
            <li>${move1}</li>
            <li>${move2}</li>
            <li>${move3}</li>
            <li>${move4}</li>
        </ul>
    `;

    teamList.appendChild(card);
}