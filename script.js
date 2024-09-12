document.addEventListener("DOMContentLoaded", () => {

    const firebaseConfig = {
        apiKey: "AIzaSyBWjkLrXaY0Ml38eTU0AjwWWXYXekQQCdE",
        authDomain: "newlottery-e3d80.firebaseapp.com",
        projectId: "newlottery-e3d80",
        storageBucket: "newlottery-e3d80.appspot.com",
        messagingSenderId: "561097167014",
        appId: "1:561097167014:web:733465a4b1bbf077552467",
        measurementId: "G-8QSTCQTZCX"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const gamesCollection = db.collection('games');

    let stw = {};
    const q = gamesCollection;

    q.onSnapshot((snapshot) => {

        snapshot.docChanges().forEach((change) => {
        
            if(change.doc.id === 'sevenToWin'){

                stw = change.doc.data();
                const status = stw.status;
                    
                document.getElementById('status-link').textContent = (status === 'closed') ? 'Fechado' : 'Entrar';
                    
                if(status === 'closed'){

                    document.getElementById('status-link').removeAttribute('href');

                }else{

                    document.getElementById('status-link').href = '#';
                    document.getElementById('status-link').addEventListener('click', () => {
                        selectGame('sevenToWin');
                    });

                }

            }
        
        });

    });

    function selectGame(gameId) {

        if(stw.status === 'open'){
            window.location.href = './pages/' + gameId + '/' + gameId + '.html';
        }else{
            window.location.href = './pages/' + gameId + '/' + gameId + '-list.html';
        }

    }

});