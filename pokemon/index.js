
const card = document.querySelector(".card");
let ShinyMode = false;
const typeEffectiveness = {
    normal: { weakTo: ["fighting"], resistantTo: [], immuneTo: ["ghost"] },
    fire: { weakTo: ["water", "rock", "ground"], resistantTo: ["fire", "grass", "ice", "bug", "steel", "fairy"], immuneTo: [] },
    water: { weakTo: ["electric", "grass"], resistantTo: ["fire", "water", "ice", "steel"], immuneTo: [] },
    electric: { weakTo: ["ground"], resistantTo: ["electric", "flying", "steel"], immuneTo: [] },
    grass: { weakTo: ["fire", "ice", "poison", "flying", "bug"], resistantTo: ["water", "electric", "grass", "ground"], immuneTo: [] },
    ice: { weakTo: ["fire", "fighting", "rock", "steel"], resistantTo: ["ice"], immuneTo: [] },
    fighting: { weakTo: ["flying", "psychic", "fairy"], resistantTo: ["rock", "bug", "dark"], immuneTo: [] },
    poison: { weakTo: ["ground", "psychic"], resistantTo: ["grass", "fighting", "poison", "bug", "fairy"], immuneTo: [] },
    ground: { weakTo: ["water", "ice", "grass"], resistantTo: ["poison", "rock"], immuneTo: ["electric"] },
    flying: { weakTo: ["electric", "ice", "rock"], resistantTo: ["grass", "fighting", "bug"], immuneTo: ["ground"] },
    psychic: { weakTo: ["bug", "ghost", "dark"], resistantTo: ["fighting", "psychic"], immuneTo: [] },
    bug: { weakTo: ["fire", "flying", "rock"], resistantTo: ["grass", "fighting", "ground"], immuneTo: [] },
    rock: { weakTo: ["water", "grass", "fighting", "ground", "steel"], resistantTo: ["normal", "fire", "poison", "flying"], immuneTo: [] },
    ghost: { weakTo: ["ghost", "dark"], resistantTo: ["poison", "bug"], immuneTo: ["normal", "fighting"] },
    dragon: { weakTo: ["ice", "dragon", "fairy"], resistantTo: ["fire", "water", "electric", "grass"], immuneTo: [] },
    dark: { weakTo: ["fighting", "bug", "fairy"], resistantTo: ["ghost", "dark"], immuneTo: ["psychic"] },
    steel: { weakTo: ["fire", "fighting", "ground"], resistantTo: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"], immuneTo: ["poison"] },
    fairy: { weakTo: ["poison", "steel"], resistantTo: ["fighting", "bug", "dark"], immuneTo: ["dragon"] }
  };


async function fetchData() {
    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase(); //name 
        

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok){
            throw new Error("I can't find this pokemon!");
        }
        
        
        const data = await response.json();
        let pokemonSprite;
        if(!ShinyMode){
            pokemonSprite = data.sprites.front_default;
        }else{
            pokemonSprite = data.sprites.front_shiny;
        }
        
        const types = [];
        for(let i=0;i<data.types.length;i++){
            types[i] = data.types[i].type.name;
        } // types[]
        const abilities = [];
        for(let i = 0;i<data.abilities.length;i++){
            abilities[i] = data.abilities[i].ability.name;
        }//abilities[]

        const weaknessOfPkm = WeaknessCheck(types);//weakness[]

        displayPokemonInfo(pokemonName,types,abilities,weaknessOfPkm);
        

        const imgElement = document.getElementById("PokemonSprite");
        
        imgElement.src = pokemonSprite;
        imgElement.style.display = "flex";
        imgElement.style.width ="30%";
        imgElement.style.alignItems ="center";
        imgElement.style.marginLeft= "100px"
        imgElement.style.marginTop= "100px"
        

    }catch(error){
        console.error(error);
    }
}

function WeaknessCheck(types){
     const weaknesses = new Set();
    types.forEach(type => {
        if (typeEffectiveness[type]) {
          typeEffectiveness[type].weakTo.forEach(weakness => weaknesses.add(weakness));
        } else {
          console.warn(`Type "${type}" not found in the effectiveness map.`);
        }
      });
      const resistances = new Set();
      const immunities = new Set();

      types.forEach(type => {
        if (typeEffectiveness[type]) {
          
            typeEffectiveness[type].resistantTo.forEach(resistance => resistances.add(resistance));
            typeEffectiveness[type].immuneTo.forEach(immunity => immunities.add(immunity));
        }
      });
    resistances.forEach(resistance => weaknesses.delete(resistance));
    immunities.forEach(immunity => weaknesses.delete(immunity));

      return Array.from(weaknesses);

}
function  displayPokemonInfo(pokemonName,types,abilities,weaknessOfPkm){
    
    card.textContent ='';
    card.style.display = 'flex';
    const nameDisplay = document.createElement("h1");
    const displayTypes = document.createElement("p");
    const displayAbilities = document.createElement("p");
    const displayWeakness = document.createElement("p");


    nameDisplay.textContent = pokemonName;
    displayTypes.textContent += `Types: `;
    types.forEach(item =>{
        displayTypes.textContent +=item + " ";
    })
    displayAbilities.textContent += "Abilities: "
    abilities.forEach(item =>{
        displayAbilities.textContent +=item + " ";
    })
    displayWeakness.textContent += "Weakness: "
    weaknessOfPkm.forEach(item =>{
        displayWeakness.textContent +=item + " ";
    })

    nameDisplay.classList.add("nameDisplay");
    displayTypes.classList.add("displayTypes");
    displayAbilities.classList.add("displayAbilities");
    displayWeakness.classList.add("displayWeakness");

    card.appendChild(nameDisplay);
    card.appendChild(displayTypes);
    card.appendChild(displayAbilities);
    card.appendChild(displayWeakness);
    


}
function ChangeToShiny(){
    ShinyMode =!ShinyMode;
    shinybtn = document.getElementById("shinybtn");
    if(ShinyMode){
        shinybtn.textContent = 'Shiny ✨';
    }else{
        shinybtn.textContent = 'Default😎';
    }
    
}
