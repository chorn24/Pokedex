

            
function GetValue() {
    var PokemonInput = document.getElementById("InputPokemonName").value;
    var LowerPokemonInput = PokemonInput.toLowerCase()
    return LowerPokemonInput
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}



async function GetPokemon() {
    // try{
        const PokeTypes = ["Normal",
            "Grass",
            "Fire" ,
            "Water" ,
            "Fighting" ,
            "Flying" ,
            "Poison" ,
            "Ground" ,
            "Rock" ,
            "Bug" ,
            "Ghost" ,
            "Electric" ,
            "Psychic" ,
            "Ice" ,
            "Dragon" ,
            "Dark" ,
            "Steel", 
            "Fairy", ]

        var PokemonInput = GetValue()
        const Response = await fetch('https://pokeapi.co/api/v2/pokemon/' + PokemonInput)
        let Pokemon = await Response.json();
        let PokemonName = Pokemon['name'];
        let PokemonType = Pokemon['types'];
        let PokemonIMGMale = Pokemon['sprites']['front_default'];
        let PokemonIMGFemale = Pokemon['sprites']['front_female'];
        const Response2 = await fetch(Pokemon["species"]["url"]);
        let PokemonDescription = await Response2.json();
        PokemonDescription = PokemonDescription['flavor_text_entries'][17]['flavor_text'];
        PokemonName = titleCase(PokemonName);
        var PN = document.getElementById("DexNameJS");
        var PD = document.getElementById("DexriptionJS");
        var PT1 = document.getElementById("Type1");
        var PT2 = document.getElementById("Type2");
        var PT1C = document.getElementById("Type1Container");
        var PT2C= document.getElementById("Type2Container");
        var ImageScreen = document.getElementById("ImageScreen");
        ImageScreen.classList.add("ImageScreen");
        var PokeHide = document.getElementById("PokemonImageDefault");
        PokeHide.classList.remove("PokeIMGHidden");
        PokeHide.classList.add("PokeIMG");
        for (var I in PokeTypes) {
            var P1= PT1C.classList.contains(PokeTypes[I])
            var P2= PT2C.classList.contains(PokeTypes[I])
            if (P1) {
                PT1.innerHTML = "";
                PT1C.classList.remove(PokeTypes[I]);

            }
            if (P2) {
                PT2.innerHTML = "";
                PT2C.classList.remove(PokeTypes[I]);
            }
        }
        //__________IMAGE__________
        document.getElementById("PokemonImageDefault").src = PokemonIMGMale;
        if (PokemonIMGMale == undefined) {
            document.getElementById("PokemonImageDefault").src = PokemonIMGFemale;
        }
        //__________TEXT__________
        PN.innerHTML=PokemonName;
        PD.innerHTML=PokemonDescription;
        //__________TYPES__________
        var Type1 = PokemonType[0]["type"]["name"];
        try {
            var Type2 =PokemonType[1]["type"]["name"];
        }
        catch(TypeError) {
            var Type2 = ""
        }
        

        //__________TITLE THE TYPES__________
        Type1 = titleCase(Type1)
        Type2 = titleCase(Type2)

        //__________CHANGE TYPE COLOR__________
        if (Type1 != null) {
            PT1.innerHTML = Type1;
            PT1C.classList.add(Type1)
        }
        if (Type2 == "") {
            console.log("Why are you here")
            PT2.innerHTML = "";
        } else {
            PT2.innerHTML = Type2;
            console.log(Type2)
            PT2C.classList.add(Type2)
        }


        // for (var type in PokeTypes) {
        //     if (PokemonType[0]["type"]["name"] == type) {
        //         PT1C.classList.add(type);
        //         PT1C.classList.remove("Hidden")
        //     }
        //     if (PokemonType[1]["type"]["name"] == type) {
        //         PT2C.classList.add(type);
        //         PT2C.classList.remove("Hidden")
        //     }

        // }


    // }
    // catch(SyntaxError) {
    //     var PokemonInput = GetValue();
    //     PokemonInput = titleCase(PokemonInput);
    //     alert('Could not find the Pokemon named '+ PokemonInput);
    // }
}