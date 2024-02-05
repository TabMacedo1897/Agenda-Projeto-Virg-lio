function gerarBotoes() {
    // Verifica se os botões já foram criados
    if (!document.getElementById("botaoSalaA") && !document.getElementById("botaoSalaB")) {
        var botao1 = document.createElement("button");
        botao1.id = "botaoSalaA";
        botao1.innerText = "Sala A";
        botao1.onclick = function () {
            window.location.href = "./1AnoA/turmaA.html";
        };

        var botao2 = document.createElement("button");
        botao2.id = "botaoSalaB";
        botao2.innerText = "Sala B";
        botao2.onclick = function () {
            window.location.href = "caminho_para_o_outro_html2.html";
        };

        var container = document.getElementById("botoesContainer");
        container.appendChild(botao1);
        container.appendChild(botao2);
    }
}



// Função sem parâmetros e sem retorno
function saudacao() {
    console.log("Olá, mundo!");
}

// Função com parâmetros e retorno
function somar(a, b) {
    return a + b;
}
saudacao(); // Chama a função saudacao()

var resultado = somar(3, 5); // Chama a função somar() com os argumentos 3 e 5
console.log(resultado); // Imprime o resultado (8) no console

function exemploEscopo() {
    var x = 10; // Variável local
    console.log(x); // Pode ser acessada dentro da função
}

exemploEscopo();
// console.log(x); // Isso geraria um erro, pois x não é definido fora da função
function multiplicar(a, b) {
    return a * b;
}

var resultadoMultiplicacao = multiplicar(4, 6);
console.log(resultadoMultiplicacao); // Imprime o resultado (24) no console
