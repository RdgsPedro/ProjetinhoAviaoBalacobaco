var RegNom = [];
var Valor = [];
var ValorAssent = [];
var Letra = ["j", "i", "h", "g", "f", "e", "d", "c", "b", "a"];
var AssentSele = [];
var Botao, index;
var A, B = 0, C = 1, Q = 0;
var assentoss, ValorTotal = 0;
var Armazena = localStorage.setItem('lugar', "2729");
var Memoria = localStorage.getItem('lugar');
for (A = 0; A <= (Memoria.length) * 2; A += 2) {
    RegNom[parseInt(Memoria.substring(A, A + 2))] = "Ocupado";
}

for (A = 0; A < 10; A++) {
    if (A >= 3 && A <= 6) {
        Valor.push(Letra[A] + "1" + 1575);
        Valor.push(Letra[A] + "2" + 840);
        Valor.push(Letra[A] + "3" + 1050);
        Valor.push(Letra[A] + "4" + 840);
        Valor.push(Letra[A] + "5" + 672);
        Valor.push(Letra[A] + "6" + 840);
        Valor.push(Letra[A] + "7" + 1050);
        Valor.push(Letra[A] + "8" + 840);
        Valor.push(Letra[A] + "9" + 1575);
    } else {
        Valor.push(Letra[A] + "1" + 1500);
        Valor.push(Letra[A] + "2" + 800);
        Valor.push(Letra[A] + "3" + 1000);
        Valor.push(Letra[A] + "4" + 800);
        Valor.push(Letra[A] + "5" + 640);
        Valor.push(Letra[A] + "6" + 800);
        Valor.push(Letra[A] + "7" + 1000);
        Valor.push(Letra[A] + "8" + 800);
        Valor.push(Letra[A] + "9" + 1500);
    }
}
RegNom[66]="Cristovão";
    RegNom[24]="Sales";
RegNom[27] = "Pedro";
RegNom[29] = "Henrique";
RegNom[49] = "Boias";
function Carregar() {
    for (var A = 0; A < 90; A++) {
        if (RegNom[A] !== undefined) {
            var linha = Math.floor(A / 9);
            var coluna = A % 9 + 1;
            document.getElementById(Letra[linha] + coluna).style.backgroundColor = "gray";
            document.getElementById(Letra[linha] + coluna).onclick = null;
        }
    }
}

function VerReserva(Botao) {
    if (document.getElementById(Botao).style.backgroundColor === "gray") {
        alert("Este assento já está ocupado e não pode ser selecionado novamente.");
        return;
    }

    if (AssentSele.includes(Botao)) {
        document.getElementById(Botao).style.backgroundColor = "#008cff";
        index = AssentSele.indexOf(Botao);
        AssentSele.splice(index, 1);
        ValorAssent.splice(index, 1);
    } else {
        AssentSele.push(Botao);
        document.getElementById(Botao).style.backgroundColor = "red";
        for (A = 0; A < 90; A++) {
            if (Botao == (Valor[A].substring(0, 2))) {
                ValorAssent.push(Valor[A].substring(2));
            }
        }
    }

    document.getElementById("Reservado").innerHTML = "<h1>Reservados:</h1>";
    for (A = -1; A < AssentSele.length; A++) {
        if (A == -1) {
            document.getElementById("Reservado").innerHTML = "<h1>Reservados:</h1>";
        } else {
            document.getElementById("Reservado").innerHTML += "<h3>" + AssentSele[A].toUpperCase() + "  -  R$: " + (ValorAssent[A]) + "</h3>";
        }
    }

    for (A = 0; A < 90; A++) {
        if (A % 9 == 0) {
            B = A / 9;
            C = 1;
        }
        if (RegNom[A] != null) {
            document.getElementById(Letra[B] + "" + C).style.backgroundColor = "gray"; // muda a cor
            document.getElementById(Letra[B] + "" + C).onclick = "";
        }
        C++;
    }
    var assentos = AssentSele; // Array de assentos selecionados
    var valores = ValorAssent; // Array de valores correspondentes aos assentos
    var valorTotal = 0;
    for (var i = 0; i < valores.length; i++) {
        valorTotal += parseInt(valores[i]);
    }
}

function CalcularValorTotal() {
    var nome = document.getElementById("textoInput").value;
    var assentos = AssentSele; // Array de assentos selecionados
    var valores = ValorAssent; // Array de valores correspondentes aos assentos

    // Atualiza o RegNom com os assentos selecionados
    for (var i = 0; i < assentos.length; i++) {
        var assentoIndex = parseInt(assentos[i].substring(1)) - 1;
        var letraIndex = Letra.indexOf(assentos[i][0]);
        RegNom[letraIndex * 9 + assentoIndex] = nome;
    }

    // Atualiza a cor dos assentos selecionados para vermelho
    for (var i = 0; i < assentos.length; i++) {
        document.getElementById(assentos[i]).style.backgroundColor = "gray";
    }

    var valorTotal = 0;
    for (var i = 0; i < valores.length; i++) {
        valorTotal += parseInt(valores[i]);
    }

    // Cria um objeto com o nome, valor total e um array de objetos com assento e valor
    var dados = {
        nome: nome,
        valorTotal: valorTotal,
        assentosEValores: []
    };

    for (var i = 0; i < assentos.length; i++) {
        dados.assentosEValores.push({
            assento: assentos[i],
            valor: valores[i]
        });
    }

    // Recupera os dados existentes do localStorage ou inicializa um array vazio
    var dadosSalvos = JSON.parse(localStorage.getItem('dadosSalvos')) || [];

    // Adiciona os novos dados ao array
    dadosSalvos.push(dados);

    // Salva o array atualizado de dados no localStorage
    localStorage.setItem('dadosSalvos', JSON.stringify(dadosSalvos));

    // Exibe o valor total na tela
    document.getElementById('Resultado').innerHTML = "R$ "+valorTotal+ ",00";

    // Limpa a caixa de texto após salvar os dados
    document.getElementById("textoInput").value = "";

    // Exiba uma mensagem ou realize outras ações conforme necessário
    alert("Dados salvos com sucesso!");
}

function final() {
    assentoss = Memoria;
    for (var A = 0; A < AssentSele.length; A++) {
    }
}

function exibirTabela() {
    var tabela = document.getElementById("tabelaAssentos");
    if (tabela.style.display === "none") {
        tabela.style.display = "table";
        document.getElementById("Busca").visibility = "visible";
        popularTabela();
    } else {
        tabela.style.display = "none";
        document.getElementById("Busca").visibility = "hidden";
    }
}

function popularTabela() {
    var corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = "";

    for (var i = 0; i < 90; i++) {
        var linha = document.createElement("tr");

        var colunaAssento = document.createElement("td");
        colunaAssento.textContent = Letra[Math.floor(i / 9)].toUpperCase() + (i % 9 + 1);
        linha.appendChild(colunaAssento);

        var colunaStatus = document.createElement("td");
        if (RegNom[i] !== undefined && RegNom[i] !== "Ocupado") {
            colunaStatus.textContent = "Ocupado";
        } else {
            colunaStatus.textContent = "Disponível";
        }
        linha.appendChild(colunaStatus);

        var colunaOcupante = document.createElement("td");
        if (RegNom[i] !== undefined && RegNom[i] !== "Ocupado") {
            colunaOcupante.textContent = RegNom[i];
        } else {
            colunaOcupante.textContent = "-";
        }
        linha.appendChild(colunaOcupante);

        corpoTabela.appendChild(linha);
    }
}

function Buscando(){
    var funfou = false;
    for (var i = 0; i < 10; i++) {
        for(var A=1;A<10;A++){
    if((document.getElementById("barra-Pesquisa").value).toUpperCase() == Letra[i].toUpperCase()+A && RegNom[(i*9+A-1)] != null)
    {
    alert(Letra[i].toUpperCase()+A+" - "+RegNom[(i*9+A-1)]);
    var funfou = true;}
    }
    }
    if(!funfou)
    {
        alert("Nada Encontrado");
    }
}