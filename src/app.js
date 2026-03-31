window.onload = function() {
    atualizarTabela();
}

function registrar(){
    //nomear variaveis
    let nomePersonagem = document.getElementById('char-name').value;
    let level = document.getElementById('level').value;
    let totalXp = document.getElementById('total-xp').value;
    let skill = document.getElementById('skill-level').value;
    let progressoBarra = document.getElementById('skill-range').value;

    //skill-level nao ser negativo
    if(level <= 0 || totalXp <= 0 || skill <=0){
        alert("Coloque informações verdadeiras!");
        return;
    }
        //historico
        let historico = JSON.parse(localStorage.getItem('dadosRucoy')) || [];
        let antigo = historico[historico.length - 1];

        //comparacao com o antigo
        if(antigo) {
        let ganhoXP = Number(totalXp) - Number(antigo.xp);
        let ganhoLvl = Number(level) - Number(antigo.lvl);
        let ganhoSkill = Number(skill) - Number(antigo.skill);
        let ganhoBarra = Number(progressoBarra) - Number(antigo.progresso);
            
            
            //evolucao da barra
            if(ganhoBarra < 0 && ganhoSkill > 0){
                let totalProgresso = (100 - Number(antigo.progresso)) + Number(progressoBarra);
                alert(`UPOU! Você progrediu ${totalProgresso}% da barra total!`);
            }
            alert(`Evolução Detectada: +${ganhoXP} XP, +${ganhoLvl} Levels!`);

        } else {
                alert("Primeiro registro realizado! Volte na próxima semana para comparar.");
        }
        //registro hoje
        let snapshot = {
            player: nomePersonagem,
            lvl: level, 
            xp: totalXp, 
            skill: skill, 
            progresso: progressoBarra,
            data: new Date().toLocaleDateString()
        }

        //salvar
        historico.push(snapshot);
        localStorage.setItem('dadosRucoy', JSON.stringify(historico));
        localStorage.setItem('ultimo_player', nomePersonagem);

        //atualizar tabela
        atualizarTabela();
}

//funcao para tabela
function atualizarTabela(){
    let historico = JSON.parse(localStorage.getItem('dadosRucoy')) || [];
    let tabela = document.getElementById('history-body');

    //limpa tabela
    tabela.innerHTML = "";

    if(historico.length === 0){
        tabela.innerHTML = `<tr><td style="color: var(--text-dim); text-align: center;" colspan="4">Nenhum registro encontrado.</td></tr>`;
        return;
    }

    //cria linhas da tbela
    historico.reverse().forEach((item) => {
        let linha = `
            <tr>
                <td>${item.data}</td>
                <td>${item.player}</td>
                <td>Lvl ${item.lvl}</td>
                <td><button class="btn-view" onclick="alert('XP Total: ${item.xp} | Skill: ${item.skill} (${item.progresso}%)')">Ver Detalhes</button></td>
            </tr>
        `;
        tabela.innerHTML += linha;
    })
}

//barra porcentagem
document.getElementById('skill-range').addEventListener('input', function() {
    document.getElementById('percShow').innerText = this.value + "%";
});