const btnClick = document.querySelector(".btn")


btnClick.addEventListener("click",(e)=>{
    e.preventDefault(); //Não atualiza a pagina
    
    const PokemonText = document.querySelector("#Pokedex").value.toLowerCase(); //pega o texto do input e deixa minusculo
    let ResponsePokemon = getPokemon(PokemonText);

    if(ResponsePokemon.status==200){
        let dadosPokemon = JSON.parse(ResponsePokemon.responseText);
        let idPokedex = dadosPokemon.id;
        let pokemonNome = dadosPokemon.name;
        let tipoPokemon = dadosPokemon.types[0].type.name;
        let imagemPokemon = dadosPokemon.sprites.front_default;

        if(typeof dadosPokemon.types[1]  === "undefined"){
            console.log("nao possui segundo type")  
        }else{
            tipoPokemon +=" / "+dadosPokemon.types[1].type.name
        }

        adicionarElementos(imagemPokemon,idPokedex,pokemonNome,tipoPokemon);
    
    }else{
        console.log("Erro na Request")
    }

});

const getPokemon = (Pokemon) =>{

    const url = `https://pokeapi.co/api/v2/pokemon/${Pokemon}`
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET",url,false);
    httpRequest.send(null);
    return httpRequest;
}


const adicionarElementos = (urlImg,idPokedex,Pokemon,Type) => {
    let divResultado = document.querySelector(".imagemPokemon");
    document.querySelector("#IdPokedex").innerHTML= `<p>Id Pokedex: ${idPokedex} </p>` ;
    document.querySelector("#PokemonNome").innerHTML=`<p>Nome: ${Pokemon} </p>`;
    document.querySelector("#PokemonType").innerHTML= `<p>Tipos: ${Type} </p>`;
    
    let imagemPokemon = document.createElement('img');
    imagemPokemon.src = urlImg;

    if(document.querySelector("img")){
        document.querySelector(".imagemPokemon img").src = urlImg;

    }else{
        divResultado.appendChild(imagemPokemon);
    }
}
