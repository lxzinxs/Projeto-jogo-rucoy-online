function registrar(){
    //nomear variaveis
    let nomePersonagem = document.getElementById('char-name').value;
    let level = document.getElementById('level').value;
    let totalXp = document.getElementById('total-xp').value;
    let skill = document.getElementById('skill-level').value;

    //skill/level nao ser negativo
    if(level <= 0){
        alert("Coloque informações verdadeiras!");
    } else if(totalXp <= 0){
        alert("Coloque informações verdadeiras!");
    } else if(skill <= 0){
        alert("Coloque informações verdadeiras!");
    } else {
        //testes
        console.log("seu nome é", nomePersonagem,"seu level é", level, "seu xp total é", totalXp, "sua skill é", skill);
    }

    //processo
    //usar o math.pow(skill, 2) para skill
    //usar o math.pow(level, 3) para level
}