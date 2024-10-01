const firebaseConfig = {
    apiKey: "AIzaSyBWjkLrXaY0Ml38eTU0AjwWWXYXekQQCdE",
    authDomain: "newlottery-e3d80.firebaseapp.com",
    projectId: "newlottery-e3d80",
    storageBucket: "newlottery-e3d80.appspot.com",
    messagingSenderId: "561097167014",
    appId: "1:561097167014:web:733465a4b1bbf077552467",
    measurementId: "G-8QSTCQTZCX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

const searchForm = document.getElementById('searchForm');
let betsData = [];
let prizeData;

function formatCPF(cpfInput) {
    cpfInput.value = cpfInput.value.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function validateCPF() {

    const cpf = document.getElementById('document').value;
    const cpfError = document.getElementById('cpfError');

    if(cpf.length === 14){

        let n1 = parseInt(cpf.charAt(0)), n2 = parseInt(cpf.charAt(1)), n3 = parseInt(cpf.charAt(2));
        let n4 = parseInt(cpf.charAt(4)), n5 = parseInt(cpf.charAt(5)), n6 = parseInt(cpf.charAt(6));
        let n7 = parseInt(cpf.charAt(8)), n8 = parseInt(cpf.charAt(9)), n9 = parseInt(cpf.charAt(10));
        let d1 = parseInt(cpf.charAt(12)), d2 = parseInt(cpf.charAt(13));

        let dig1 = (((n1 * 10) + (n2 * 9) + (n3 * 8) + (n4 * 7) + (n5 * 6) + (n6 * 5) + (n7 * 4) + (n8 * 3) + (n9 * 2)) * 10) % 11;
        dig1 = dig1 === 10 ? 0 : dig1;

        if(dig1 === d1){

            let dig2 = (((n1 * 11) + (n2 * 10) + (n3 * 9) + (n4 * 8) + (n5 * 7) + (n6 * 6) + (n7 * 5) + (n8 * 4) + (n9 * 3) + (dig1 * 2)) * 10) % 11;
            dig2 = dig2 === 10 ? 0 : dig2;

            if(dig2 === d2){

                const invalidCpfs = [
                    '111.111.111-11',
                    '222.222.222-22',
                    '333.333.333-33',
                    '444.444.444-44',
                    '555.555.555-55',
                    '666.666.666-66',
                    '777.777.777-77',
                    '888.888.888-88',
                    '999.999.999-99',
                    '000.000.000-00'
                ];

                if(invalidCpfs.includes(cpf)){
                    cpfError.style.display = 'block';
                } else {
                    cpfError.style.display = 'none';
                }

            }else{
                cpfError.style.display = 'block';
            }

        }else{
            cpfError.style.display = 'block';
        }

    }else{
        cpfError.style.display = 'none';
    }

}

searchForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    try {

        document.getElementById('searchDocDiv').style.display = 'none';
        document.getElementById('gamesListDiv').style.display = 'block';

        listGames();

    } catch(error){
        console.error('Erro ', error);
    }

});

function listGames() {

    const formAux = document.getElementById('searchForm');
    let d = formAux.elements['document'].value;

    const query = db.collection('games');

    query.onSnapshot((snapshot) => {

        snapshot.docChanges().forEach((change) => {
        
            if(change.doc.id === 'sevenToWin'){

                if(change.doc.get('status') === 'closed'){
                    window.location.href = '../../index.html';
                }else{

                    if(change.doc.get('lastNumber') === undefined){
                        document.getElementById('raffleSelected').textContent = 0;
                    }else{
                        document.getElementById('raffleSelected').textContent = change.doc.get('lastNumber');
                    }

                    if(change.doc.get('raffles') !== undefined){

                        if(change.doc.get('raffles')[0] !== undefined){
                            document.getElementById('num-1').textContent = change.doc.get('raffles')[0];
                            document.getElementById('num-1').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[1] !== undefined){
                            document.getElementById('num-2').textContent = change.doc.get('raffles')[1];
                            document.getElementById('num-2').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[2] !== undefined){
                            document.getElementById('num-3').textContent = change.doc.get('raffles')[2];
                            document.getElementById('num-3').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[3] !== undefined){
                            document.getElementById('num-4').textContent = change.doc.get('raffles')[3];
                            document.getElementById('num-4').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[4] !== undefined){
                            document.getElementById('num-5').textContent = change.doc.get('raffles')[4];
                            document.getElementById('num-5').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[5] !== undefined){
                            document.getElementById('num-6').textContent = change.doc.get('raffles')[5];
                            document.getElementById('num-6').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[6] !== undefined){
                            document.getElementById('num-7').textContent = change.doc.get('raffles')[6];
                            document.getElementById('num-7').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[7] !== undefined){
                            document.getElementById('num-8').textContent = change.doc.get('raffles')[7];
                            document.getElementById('num-8').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[8] !== undefined){
                            document.getElementById('num-9').textContent = change.doc.get('raffles')[8];
                            document.getElementById('num-9').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[9] !== undefined){
                            document.getElementById('num-10').textContent = change.doc.get('raffles')[9];
                            document.getElementById('num-10').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[10] !== undefined){
                            document.getElementById('num-11').textContent = change.doc.get('raffles')[10];
                            document.getElementById('num-11').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[11] !== undefined){
                            document.getElementById('num-12').textContent = change.doc.get('raffles')[11];
                            document.getElementById('num-12').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[12] !== undefined){
                            document.getElementById('num-13').textContent = change.doc.get('raffles')[12];
                            document.getElementById('num-13').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[13] !== undefined){
                            document.getElementById('num-14').textContent = change.doc.get('raffles')[13];
                            document.getElementById('num-14').style.display = 'block';
                        }

                        if(change.doc.get('raffles')[14] !== undefined){
                            document.getElementById('num-15').textContent = change.doc.get('raffles')[14];
                            document.getElementById('num-15').style.display = 'block';
                        }

                    }

                    db.collection('games').doc('sevenToWin').get().then((doc) => {

                        if(doc.exists){

                            let b = doc.get('bets');
                            betsData = [];

                            b.forEach(aux => {
                                if(aux.register.document === d){
                                    betsData.push(aux);
                                }
                            });

                            const betsContainer = document.getElementById('betsContainer');
                            betsContainer.innerHTML = '';

                            
                            betsData.forEach(b => {

                                b.numbers.sort((a, b) => a - b);

                                let numbers = b.numbers[0] + ' - ' + 
                                              b.numbers[1] + ' - ' + 
                                              b.numbers[2] + ' - ' + 
                                              b.numbers[3] + ' - ' + 
                                              b.numbers[4] + ' - ' + 
                                              b.numbers[5] + ' - ' +
                                              b.numbers[6] + ' - ' +
                                              b.numbers[7] + ' - ' +
                                              b.numbers[8] + ' - ' +
                                              b.numbers[9] + ' - ' +
                                              b.numbers[10] + ' - ' +
                                              b.numbers[11] + ' - ' +
                                              b.numbers[12] + ' - ' +
                                              b.numbers[13] + ' - ' +
                                              b.numbers[14];
                        
                                const gameContainer = document.createElement('div');
                                gameContainer.classList.add('gameContainer');

                                const gameItem = document.createElement('div');
                                gameItem.classList.add('game');

                                const gameLabel = document.createElement('div');
                                gameLabel.innerHTML = `
                                    <h1>${b.id}</h1>
                                    <h2><b>${numbers}</b></h2>
                                    <p>Acertos: <b>${b.values.hits}</b></p>
                                `;

                                b.numbersFormatt = numbers;

                                if (b.values.prize !== undefined) {
                                    gameLabel.innerHTML += `<p>Prêmio: <b>R$ ${b.values.prize.toFixed(2)}</b></p>`;
                                }

                                gameItem.appendChild(gameLabel);
                                gameContainer.appendChild(gameItem);

                                if (b.values.prize !== undefined) {

                                    const prizeItem = document.createElement('div');
                                    prizeItem.classList.add('prize');
                                    prizeItem.innerHTML = `
                                        <div>Clique Para Receber o Prêmio</div>
                                        <div class="trophy-icon">🏆</div>
                                    `;
                                    prizeItem.addEventListener('click', function() {
                                        getPrize(b);
                                    });

                                    gameContainer.appendChild(prizeItem);
                                }

                                betsContainer.appendChild(gameContainer);

                            });

                        }

                    });

                }

            }

        });

    });

}

function getPrize(bet) {

    prizeData = bet;
    let win = [];
    let get = 0;
    let val = false;

    document.getElementById('gamesListDiv').style.display = 'none';
    document.getElementById('prizeDiv').style.display = 'block';

    db.collection('games').doc('sevenToWin').get().then((doc) => {

        if(doc.exists){

            if(doc.get('winners') !== undefined){

                win = doc.get('winners');

                win.forEach(w => {

                    if(w.id === prizeData.id){

                        val = true;

                        if(w.status === 'requested'){
                            get = 2
                        }else
                        if(w.status === 'done'){
                          get = 3;
                        }

                    }else
                    if(w.id !== prizeData.id && !val){
                      get = 1;
                    }

                });

            }else{
              get = 1;
            }

            if(get === 1){

                let fp = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(bet.values.prize);

                const prizeTip = document.getElementById('tipPrize');
                prizeTip.innerHTML = `Valor a Receber: <b>${fp}</b>`;

            }else
            if(get === 2){
                document.getElementById('waitingDiv').style.display = 'block';
                document.getElementById('prizeDiv').style.display = 'none';
            }else
            if(get === 3){

                let storageRef = storage.ref('/proofs/sevenToWin/' + prizeData.id + '/proof.jpeg');

                storageRef.getDownloadURL().then((url) => {
                    document.getElementById('proof').src = url;
                }).catch((error) => {
                    console.error('Erro ao obter a URL da imagem', error);
                });

                document.getElementById('doneDiv').style.display = 'block';
                document.getElementById('prizeDiv').style.display = 'none';
            }

        }else{
            console.log('Nenhum documento encontrado!');
        }

    });

}

async function sendKey() {

    const formAux = document.getElementById('prizeForm');
    let ks = formAux.elements['keySelect'].value;
    let k = formAux.elements['key'].value;

    let p = {
        type: ks,
        key: k
    };

    prizeData.pix = p;
    prizeData.status = 'requested';

    setWinner().then(() => {
        prizeData = {};
        formAux.reset();
        document.getElementById('gamesListDiv').style.display = 'block';
        document.getElementById('prizeDiv').style.display = 'none';
    });

}

async function setWinner() {

    const reference = db.doc("/games/sevenToWin");

    try {

        let change = await reference.update({
            winners: firebase.firestore.FieldValue.arrayUnion(prizeData)
        });

        return change;

    } catch (error) {
        console.error("Erro ao atualizar ganhadores:", error);
        throw error;
    }

}

function back() {
    document.getElementById('gamesListDiv').style.display = 'block';
    document.getElementById('prizeDiv').style.display = 'none';
    document.getElementById('waitingDiv').style.display = 'none';
    document.getElementById('doneDiv').style.display = 'none';
}

///////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('searchDocDiv').style.display = 'block';

});