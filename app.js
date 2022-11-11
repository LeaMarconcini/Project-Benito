
// Database Paths
var dataFloatPath = 'test/float';
var dataIntPath = 'test/int';
var preguntaPath = 'test/pregunta';
var testpreguntaPath = 'test/testpregunta'
// var usuarioPath = 'test/usuario';


// Get a database reference 
const databaseFloat = database.ref(dataFloatPath);
const databaseInt = database.ref(dataIntPath);
const databasePregunta = database.ref(preguntaPath);
const databaseTestPregunta = database.ref(testpreguntaPath);
// const databaseUsuario = database.ref(usuarioPath);

// Variables to save database current values
var floatReading;
var intReading;
var pregunta;
var testpregunta;
// var usuario;

// Sumar puntos de jugadores y crear botones segun la cant. de jugadores
var cant_btn = document.getElementById("cant_btn");
let inputcantidad = document.getElementById("pregunta_input");
let div = document.getElementById("cuadrado");

let players = []

cant_btn.addEventListener("click", e => {
    let show_points_btn = document.createElement("button");
    show_points_btn.innerText = "Mostrar Puntos";
    show_points_btn.id = "show_btn"
    show_points_btn.onclick = showpoints;
    show_points_btn.classList.add("btn");
    div.appendChild(show_points_btn);
    let div_btns = document.createElement("div");
    div_btns.id = "Div_btns";
    div.appendChild(div_btns);
    for (let i = 0; i < inputcantidad.value; i++) {
        let btn = document.createElement("button");
        btn.innerText = `++P${i}`;
        btn.classList.add("btn");
        btn.id = `btn-${i}`
        btn.onclick = function() {addpunto(i)};
        div_btns.appendChild(btn);
        players.push(0)
    }
    document.getElementById("cant_btn").style.display = "none";
})

if (players.length == 2) {
    let P1_btn = document.getElementById("btn-0");
    let P2_btn = document.getElementById("btn-1");
    var puntosP1 = 0;
    var puntosP2 = 0;
} else if (players.length == 3) {
    let P1_btn = document.getElementById("btn-0");
    let P2_btn = document.getElementById("btn-1");
    let P3_btn = document.getElementById("btn-2");
    var puntosP1 = 0;
    var puntosP2 = 0;
    var puntosP3 = 0;
} else if (players.length == 4) {
    let P1_btn = document.getElementById("btn-0");
    let P2_btn = document.getElementById("btn-1");
    let P3_btn = document.getElementById("btn-2");
    let P4_btn = document.getElementById("btn-3");
    var puntosP1 = 0;
    var puntosP2 = 0;
    var puntosP3 = 0;
    var puntosP4 = 0;
} else if (players.length == 5) {
    let P1_btn = document.getElementById("btn-0");
    let P2_btn = document.getElementById("btn-1");
    let P3_btn = document.getElementById("btn-2");
    let P4_btn = document.getElementById("btn-3");
    let P5_btn = document.getElementById("btn-4");
    var puntosP1 = 0;
    var puntosP2 = 0;
    var puntosP3 = 0;
    var puntosP4 = 0;
    var puntosP5 = 0;
} else {
    let P1_btn = document.getElementById("btn-0");
    let P2_btn = document.getElementById("btn-1");
    let P3_btn = document.getElementById("btn-2");
    let P4_btn = document.getElementById("btn-3");
    let P5_btn = document.getElementById("btn-4");
    let P6_btn = document.getElementById("btn-5");
    var puntosP1 = 0;
    var puntosP2 = 0;
    var puntosP3 = 0;
    var puntosP4 = 0;
    var puntosP5 = 0;
    var puntosP6 = 0;
}

const addpunto = (numero) => {
    players[numero] += 1;
}


// //Enviar pregunta con boton
// let check_btn = document.getElementById("send_btn");

// check_btn.addEventListener("click", event => {
//     let pregunta_nueva = document.getElementById("pregunta_input").value
//     databasePregunta.set(pregunta_nueva);
// })
// //

// // refreshcar la pagina
// let refresh = document.getElementById("send_btn");

// refresh.addEventListener('click', event => {
//     window.location.reload();
// })
//

// Numero random para la pregunta
let random_btn = document.getElementById("random_btn");
let num_random 
let num_prev = 0
let num = 0

function generateRandom(min,max){
    do {
        min= Math.ceil(min);
        max= Math.floor(max);
        num_prev= num;
        num= Math.floor(Math.random() * (1 + max - min) + min);
        
    }while(num == num_prev);  
    return num;  
}

//Seleccion de la pregunta random 
document.getElementById("random_btn").onclick = function () {
    num_random = parseInt(generateRandom(1,31));
    console.log(num_random);
    var pregunta = database.ref('test/preguntas/preg' + num_random);
    pregunta.on('value', (snapshot) => {
        testpregunta = snapshot.val();
        databaseTestPregunta.set(testpregunta);
      }, (errorObject) => {
        alert('The read failed: ' + errorObject.name);
      });
}

//Alerta de los puntos de los jugadores
function showpoints (){
    let puntoshtml = "";
    for (i = 0; i < players.length; i++) {
        puntoshtml += `<p>Puntos P${i+1}:</p>`;
        puntoshtml += players[i];
    }
    Swal.fire({
        icon: 'info',
        title: 'Los puntos de los jugadores son',
        html : puntoshtml,
        // html: '<p>Puntos P1:</p>' + puntosP1 + '<p>Puntos P2:</p>' + puntosP2 + '<p>Puntos P3:</p>' + 
        // puntosP3 + '<p>Puntos P4:</p>' + puntosP4 + '<p>Puntos P5:</p>' + puntosP5 + 
        // '<p>Puntos P6:</p>' + puntosP6,
        background:'theme-dark',
        showCloseButton: 'true',
        confirmButtonText: 'Ok',
        // confirmButtonColor:'#000000',
        // cancelButtonColor:'#000000',
        showCancelButton:'true',
        cancelButtonText:'Reset',
        // color:'#ffffff'
    }).then(function(result){
        if(result.value){
            console.log('good');
        }else if(result.dismiss == 'cancel'){
            players = [];
            document.getElementById("Div_btns").remove();
            document.getElementById("show_btn").remove();
            document.getElementById("cant_btn").style.display = "block"
        }
      })
}