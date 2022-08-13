const textarea = document.querySelector ("textarea");
const texto_convertido = document.getElementById ("texto-convertido");
const container_conversao = document.querySelector (".aside-conversao");
const container_mensagem = document.querySelector (".aside-mensagem");
const botoes = document.querySelectorAll(".botoes button");
const b_copiar = document.getElementById("b-copiar");
const container_alert = document.querySelector (".container-dialog");
const container_alert_botao = container_alert.querySelector ("button");
const acentos = [["à", "á", "ã", "â"], ["é", "è", "ê"], ["í, ì, î"], ["ó", "ò", "õ", "ô"], ["ú", "ù", "û"]];
const letras = ["a", "e", "i", "o", "u"];
const correspondencia = ["ai", "enter", "imes", "ober", "ufat"];

for (let i = 0; i < 2; i++) {
    botoes[i].onclick = () => {
        let texto = textarea.value;
        if (texto) {
            container_conversao.classList.remove ("d-none");
            container_mensagem.classList.add ("d-none");
            for (let i = 0; i < acentos.length; i++) {
                for (let letra_acentuada of acentos[i]) {
                    let regex = new RegExp (letra_acentuada, "g");
                    texto = texto.replace (regex, letras[i]);
                }
            }
            if (i == 0) {
                texto = texto.split ("")
                for (let x = 0; x < texto.length; x++) {
                    for (let y = 0; y < letras.length; y++) {
                        if (texto[x] == letras[y]) {
                            texto[x] = correspondencia[y];
                        }
                    }
                }
            } else {
                texto = texto.split("");
                for (let x = 0; x < texto.length; x++) {
                    for (let y = 0; y < correspondencia.length; y++) {
                        if (texto.join("").startsWith (correspondencia[y], x)) {
                            texto.splice (x, correspondencia[y].length, letras[y]);
                            break;
                        }
                    }
                }
            }
            texto_convertido.textContent = texto.join("");
        }
    };
}

b_copiar.onclick = () => {
    navigator.clipboard.writeText (texto_convertido.textContent);
    container_alert.classList.remove ("d-none");
};

container_alert_botao.onclick = () => {
    container_alert.classList.add ("d-none");
}
