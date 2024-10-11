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

let gameRef = '';
let selectedNumbers = [];
const userForm = document.getElementById('userForm');
const statesList = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];
const citiesList = [
    {
        state: 'AC',
        cities: [
            'Acrelândia', 'Assis Brasil', 'Brasiléia', 'Bujari', 'Capixaba', 'Cruzeiro do Sul', 'Epitaciolândia', 'Feijó', 'Jordão', 'Manoel Urbano',
            'Marechal Thaumaturgo', 'Mâncio Lima', 'Plácido de Castro', 'Porto Acre', 'Porto Walter', 'Rio Branco', 'Rodrigues Alves', 'Santa Rosa do Purus', 'Sena Madureira', 'Senador Guiomard',
            'Tarauacá', 'Xapuri'
        ]
    },
    {
        state: 'AL',
        cities: [
            'Água Branca', 'Anadia', 'Arapiraca', 'Atalaia', 'Barra de Santo Antônio', 'Barra de São Miguel', 'Batalha', 'Belém', 
            'Belo Monte', 'Boca da Mata', 'Branquinha', 'Cacimbinhas', 'Cajueiro', 'Campestre', 'Campo Alegre', 'Campo Grande', 
            'Canapi', 'Capela', 'Carneiros', 'Chã Preta', 'Coité do Nóia', 'Colônia Leopoldina', 'Coqueiro Seco', 'Coruripe', 
            'Craíbas', 'Delmiro Gouveia', 'Dois Riachos', 'Estrela de Alagoas', 'Feira Grande', 'Feliz Deserto', 'Flexeiras', 
            'Girau do Ponciano', 'Ibateguara', 'Igaci', 'Igreja Nova', 'Inhapi', 'Jacaré dos Homens', 'Jacuípe', 'Japaratinga', 
            'Jaramataia', 'Jequiá da Praia', 'Joaquim Gomes', 'Jundiá', 'Junqueiro', 'Lagoa da Canoa', 'Limoeiro de Anadia', 
            'Maceió', 'Major Isidoro', 'Mar Vermelho', 'Maragogi', 'Maravilha', 'Marechal Deodoro', 'Maribondo', 'Mata Grande', 
            'Matriz de Camaragibe', 'Messias', 'Minador do Negrão', 'Monteirópolis', 'Murici', 'Novo Lino', 'Olho d\'Água das Flores', 
            'Olho d\'Água do Casado', 'Olho d\'Água Grande', 'Olivença', 'Ouro Branco', 'Palestina', 'Palmeira dos Índios', 'Pão de Açúcar', 
            'Pariconha', 'Paripueira', 'Passo de Camaragibe', 'Paulo Jacinto', 'Penedo', 'Piaçabuçu', 'Pilar', 'Pindoba', 'Piranhas', 
            'Poço das Trincheiras', 'Porto Calvo', 'Porto de Pedras', 'Porto Real do Colégio', 'Quebrangulo', 'Rio Largo', 'Roteiro', 
            'Santa Luzia do Norte', 'Santana do Ipanema', 'Santana do Mundaú', 'São Brás', 'São José da Laje', 'São José da Tapera', 
            'São Luís do Quitunde', 'São Miguel dos Campos', 'São Miguel dos Milagres', 'São Sebastião', 'Satuba', 'Senador Rui Palmeira', 
            'Tanque d\'Arca', 'Taquarana', 'Teotônio Vilela', 'Traipu', 'União dos Palmares', 'Viçosa'
        ]
    },
    {
        state: 'AP',
        cities: [
            'Amapá', 'Calçoene', 'Cutias', 'Ferreira Gomes', 'Itaubal', 'Laranjal do Jari', 'Macapá', 
            'Mazagão', 'Oiapoque', 'Pedra Branca do Amapari', 'Porto Grande', 'Pracuúba', 'Santana', 
            'Serra do Navio', 'Tartarugalzinho', 'Vitória do Jari'
        ]
    },
    {
        state: 'AM',
        cities: [
            'Alvarães', 'Amaturá', 'Anamã', 'Anori', 'Apuí', 'Atalaia do Norte', 'Autazes', 
            'Barcelos', 'Barreirinha', 'Benjamin Constant', 'Beruri', 'Boa Vista do Ramos', 
            'Boca do Acre', 'Borba', 'Caapiranga', 'Canutama', 'Carauari', 'Careiro', 
            'Careiro da Várzea', 'Coari', 'Codajás', 'Eirunepé', 'Envira', 'Fonte Boa', 
            'Guajará', 'Humaitá', 'Ipixuna', 'Iranduba', 'Itacoatiara', 'Itamarati', 
            'Itapiranga', 'Japurá', 'Juruá', 'Jutaí', 'Lábrea', 'Manacapuru', 
            'Manaquiri', 'Manaus', 'Manicoré', 'Maraã', 'Maués', 'Nhamundá', 
            'Nova Olinda do Norte', 'Novo Airão', 'Novo Aripuanã', 'Parintins', 
            'Pauini', 'Presidente Figueiredo', 'Rio Preto da Eva', 'Santa Isabel do Rio Negro', 
            'Santo Antônio do Içá', 'São Gabriel da Cachoeira', 'São Paulo de Olivença', 
            'São Sebastião do Uatumã', 'Silves', 'Tabatinga', 'Tapauá', 'Tefé', 
            'Tonantins', 'Uarini', 'Urucará', 'Urucurituba'
        ]
    },
    {
        state: 'BA',
        cities: [
            'Abaíra', 'Abaré', 'Acajutiba', 'Adustina', 'Água Fria', 'Aiquara', 'Alagoinhas', 
            'Alcobaça', 'Almadina', 'Amargosa', 'Amélia Rodrigues', 'América Dourada', 
            'Anagé', 'Andaraí', 'Andorinha', 'Angical', 'Anguera', 'Antas', 'Antônio Cardoso', 
            'Antônio Gonçalves', 'Aporá', 'Apuarema', 'Araças', 'Aracatu', 'Araci', 'Aramari', 
            'Arataca', 'Aratuípe', 'Aurelino Leal', 'Baianópolis', 'Baixa Grande', 'Banzaê', 
            'Barra', 'Barra da Estiva', 'Barra do Choça', 'Barra do Mendes', 'Barra do Rocha', 
            'Barreiras', 'Barro Alto', 'Barrocas', 'Barro Preto', 'Belmonte', 'Belo Campo', 
            'Biritinga', 'Boa Nova', 'Boa Vista do Tupim', 'Bom Jesus da Lapa', 'Bom Jesus da Serra', 
            'Boninal', 'Bonito', 'Boquira', 'Botuporã', 'Brejões', 'Brejolândia', 'Brotas de Macaúbas', 
            'Brumado', 'Buerarema', 'Buritirama', 'Caatiba', 'Cabaceiras do Paraguaçu', 'Cachoeira', 
            'Caculé', 'Caém', 'Caetanos', 'Caetité', 'Cafarnaum', 'Cairu', 'Caldeirão Grande', 
            'Camacan', 'Camaçari', 'Camamu', 'Campo Alegre de Lourdes', 'Campo Formoso', 'Canápolis', 
            'Canarana', 'Canavieiras', 'Candeal', 'Candeias', 'Candiba', 'Cândido Sales', 'Cansanção', 
            'Canudos', 'Capela do Alto Alegre', 'Capim Grosso', 'Caraíbas', 'Caravelas', 'Cardeal da Silva', 
            'Carinhanha', 'Casa Nova', 'Castro Alves', 'Catolândia', 'Catu', 'Caturama', 'Central', 
            'Chorrochó', 'Cícero Dantas', 'Cipó', 'Coaraci', 'Cocos', 'Conceição da Feira', 
            'Conceição do Almeida', 'Conceição do Coité', 'Conceição do Jacuípe', 'Conde', 
            'Condeúba', 'Contendas do Sincorá', 'Coração de Maria', 'Cordeiros', 'Coribe', 
            'Coronel João Sá', 'Correntina', 'Cotegipe', 'Cravolândia', 'Crisópolis', 'Cristópolis', 
            'Cruz das Almas', 'Curaçá', 'Dário Meira', 'Dias d\'Ávila', 'Dom Basílio', 
            'Dom Macedo Costa', 'Elísio Medrado', 'Encruzilhada', 'Entre Rios', 'Érico Cardoso', 
            'Esplanada', 'Euclides da Cunha', 'Eunápolis', 'Fátima', 'Feira da Mata', 'Feira de Santana', 
            'Filadélfia', 'Firmino Alves', 'Floresta Azul', 'Formosa do Rio Preto', 'Gandu', 
            'Gavião', 'Gentio do Ouro', 'Glória', 'Gongogi', 'Governador Lomanto Júnior', 'Governador Mangabeira', 
            'Guajeru', 'Guanambi', 'Guaratinga', 'Heliópolis', 'Iaçu', 'Ibiassucê', 'Ibicaraí', 
            'Ibicoara', 'Ibicuí', 'Ibipeba', 'Ibipitanga', 'Ibiquera', 'Ibirapitanga', 'Ibirapuã', 
            'Ibirataia', 'Ibitiara', 'Ibititá', 'Ibotirama', 'Ichu', 'Igaporã', 'Igrapiúna', 
            'Iguaí', 'Ilhéus', 'Inhambupe', 'Ipecaetá', 'Ipiaú', 'Ipirá', 'Ipupiara', 'Irajuba', 
            'Iramaia', 'Iraquara', 'Irará', 'Irecê', 'Itabela', 'Itaberaba', 'Itabuna', 
            'Itacaré', 'Itaeté', 'Itagi', 'Itagibá', 'Itagimirim', 'Itaguaçu da Bahia', 'Itaju do Colônia', 
            'Itajuípe', 'Itamaraju', 'Itamari', 'Itambé', 'Itanagra', 'Itanhém', 'Itaparica', 
            'Itapé', 'Itapebi', 'Itapetinga', 'Itapicuru', 'Itapitanga', 'Itaquara', 'Itarantim', 
            'Itatim', 'Itiruçu', 'Itiúba', 'Itororó', 'Ituaçu', 'Ituberá', 'Iuiu', 'Jaborandi', 
            'Jacaraci', 'Jacobina', 'Jaguaquara', 'Jaguarari', 'Jaguaripe', 'Jandaíra', 'Jequié', 
            'Jeremoabo', 'Jiquiriçá', 'Jitaúna', 'João Dourado', 'Juazeiro', 'Jucuruçu', 
            'Jussara', 'Jussari', 'Jussiape', 'Lafaiete Coutinho', 'Lagoa Real', 'Laje', 
            'Lajedão', 'Lajedinho', 'Lajedo do Tabocal', 'Lamarão', 'Lapão', 'Lauro de Freitas', 
            'Lençóis', 'Licínio de Almeida', 'Livramento de Nossa Senhora', 'Luís Eduardo Magalhães', 
            'Macajuba', 'Macarani', 'Macaúbas', 'Macururé', 'Madre de Deus', 'Maetinga', 
            'Maiquinique', 'Mairi', 'Malhada', 'Malhada de Pedras', 'Manoel Vitorino', 'Mansidão', 
            'Maracás', 'Maragogipe', 'Maraú', 'Marcionílio Souza', 'Mascote', 'Mata de São João', 
            'Matina', 'Medeiros Neto', 'Miguel Calmon', 'Milagres', 'Mirangaba', 'Mirante', 
            'Monte Santo', 'Morpará', 'Morro do Chapéu', 'Mortugaba', 'Mucugê', 'Mucuri', 
            'Mulungu do Morro', 'Mundo Novo', 'Muniz Ferreira', 'Muquém de São Francisco', 'Muritiba', 
            'Mutuípe', 'Nazaré', 'Nilo Peçanha', 'Nordestina', 'Nova Canaã', 'Nova Fátima', 
            'Nova Ibiá', 'Nova Itarana', 'Nova Redenção', 'Nova Soure', 'Nova Viçosa', 
            'Novo Horizonte', 'Novo Triunfo', 'Olindina', 'Oliveira dos Brejinhos', 'Ouriçangas', 
            'Ourolândia', 'Palmas de Monte Alto', 'Palmeiras', 'Paramirim', 'Paratinga', 
            'Paripiranga', 'Pau Brasil', 'Paulo Afonso', 'Pé de Serra', 'Pedrão', 'Pedro Alexandre', 
            'Piatã', 'Pilão Arcado', 'Pindaí', 'Pindobaçu', 'Pintadas', 'Piraí do Norte', 'Piripá', 
            'Piritiba', 'Planaltino', 'Planalto', 'Poções', 'Pojuca', 'Ponto Novo', 'Porto Seguro', 
            'Potiraguá', 'Prado', 'Presidente Dutra', 'Presidente Jânio Quadros', 'Presidente Tancredo Neves', 
            'Queimadas', 'Quijingue', 'Quixabeira', 'Rafael Jambeiro', 'Remanso', 'Retirolândia', 
            'Riachão das Neves', 'Riachão do Jacuípe', 'Riacho de Santana', 'Ribeira do Amparo', 
            'Ribeira do Pombal', 'Ribeirão do Largo', 'Rio de Contas', 'Rio do Antônio', 
            'Rio do Pires', 'Rio Real', 'Rodelas', 'Ruy Barbosa', 'Salinas da Margarida', 
            'Salvador', 'Santa Bárbara', 'Santa Brígida', 'Santa Cruz Cabrália', 'Santa Cruz da Vitória', 
            'Santa Inês', 'Santa Luzia', 'Santa Maria da Vitória', 'Santa Rita de Cássia', 
            'Santa Teresinha', 'Santaluz', 'Santana', 'Santanópolis', 'Santo Amaro', 
            'Santo Antônio de Jesus', 'Santo Estêvão', 'São Desidério', 'São Domingos', 
            'São Felipe', 'São Félix', 'São Félix do Coribe', 'São Francisco do Conde', 
            'São Gabriel', 'São Gonçalo dos Campos', 'São José da Vitória', 'São José do Jacuípe', 
            'São Miguel das Matas', 'São Sebastião do Passé', 'Sapeaçu', 'Sátiro Dias', 
            'Saubara', 'Saúde', 'Seabra', 'Sebastião Laranjeiras', 'Senhor do Bonfim', 
            'Sento Sé', 'Serra do Ramalho', 'Serra Dourada', 'Serra Preta', 'Serrinha', 
            'Serrolândia', 'Simões Filho', 'Sítio do Mato', 'Sítio do Quinto', 'Sobradinho', 
            'Souto Soares', 'Tabocas do Brejo Velho', 'Tanhaçu', 'Tanque Novo', 'Tanquinho', 
            'Taperoá', 'Tapiramutá', 'Teixeira de Freitas', 'Teodoro Sampaio', 'Teofilândia', 
            'Teolândia', 'Terra Nova', 'Tremedal', 'Tucano', 'Uauá', 'Ubaíra', 'Ubaitaba', 
            'Ubatã', 'Uibaí', 'Umburanas', 'Una', 'Urandi', 'Uruçuca', 'Utinga', 
            'Valença', 'Valente', 'Várzea da Roça', 'Várzea do Poço', 'Várzea Nova', 
            'Varzedo', 'Vera Cruz', 'Vereda', 'Vitória da Conquista', 'Wagner', 'Wanderley', 
            'Wenceslau Guimarães', 'Xique-Xique'
        ]
    },
    {
        state: 'CE',
        cities: [
            'Abaiara', 'Acarape', 'Acaraú', 'Acopiara', 'Aiuaba', 'Alcântaras', 'Altaneira',
            'Alto Santo', 'Amontada', 'Antonina do Norte', 'Apuiarés', 'Aquiraz', 'Aracati',
            'Aracoiaba', 'Ararendá', 'Araripe', 'Aratuba', 'Arneiroz', 'Assaré', 'Aurora',
            'Baixio', 'Banabuiú', 'Barbalha', 'Barreira', 'Barro', 'Barroquinha', 'Baturité',
            'Beberibe', 'Bela Cruz', 'Boa Viagem', 'Brejo Santo', 'Camocim', 'Campos Sales',
            'Canindé', 'Capistrano', 'Caridade', 'Cariré', 'Caririaçu', 'Cariús', 'Carnaubal',
            'Cascavel', 'Catarina', 'Catunda', 'Caucaia', 'Cedro', 'Chaval', 'Choró',
            'Chorozinho', 'Coreaú', 'Crateús', 'Crato', 'Croatá', 'Cruz', 'Deputado Irapuan Pinheiro',
            'Ererê', 'Eusébio', 'Farias Brito', 'Forquilha', 'Fortaleza', 'Fortim',
            'Frecheirinha', 'General Sampaio', 'Graça', 'Granja', 'Granjeiro', 'Groaíras',
            'Guaiúba', 'Guaraciaba do Norte', 'Guaramiranga', 'Hidrolândia', 'Horizonte',
            'Ibaretama', 'Ibiapina', 'Ibicuitinga', 'Icapuí', 'Icó', 'Iguatu', 'Independência',
            'Ipaporanga', 'Ipaumirim', 'Ipu', 'Ipueiras', 'Iracema', 'Irauçuba', 'Itaiçaba',
            'Itaitinga', 'Itapajé', 'Itapipoca', 'Itapiúna', 'Itarema', 'Itatira', 'Jaguaretama',
            'Jaguaribara', 'Jaguaribe', 'Jaguaruana', 'Jardim', 'Jati', 'Jijoca de Jericoacoara',
            'Juazeiro do Norte', 'Jucás', 'Lavras da Mangabeira', 'Limoeiro do Norte',
            'Madalena', 'Maracanaú', 'Maranguape', 'Marco', 'Martinópole', 'Massapê', 'Mauriti',
            'Meruoca', 'Milagres', 'Milhã', 'Miraíma', 'Missão Velha', 'Mombaça', 'Monsenhor Tabosa',
            'Morada Nova', 'Moraújo', 'Morrinhos', 'Mucambo', 'Mulungu', 'Nova Olinda', 'Nova Russas',
            'Novo Oriente', 'Ocara', 'Orós', 'Pacajus', 'Pacatuba', 'Pacoti', 'Pacujá', 'Palhano',
            'Palmácia', 'Paracuru', 'Paraipaba', 'Parambu', 'Paramoti', 'Pedra Branca',
            'Penaforte', 'Pentecoste', 'Pereiro', 'Pindoretama', 'Piquet Carneiro', 'Pires Ferreira',
            'Poranga', 'Porteiras', 'Potengi', 'Potiretama', 'Quiterianópolis', 'Quixadá',
            'Quixelô', 'Quixeramobim', 'Quixeré', 'Redenção', 'Reriutaba', 'Russas', 'Saboeiro',
            'Salitre', 'Santa Quitéria', 'Santana do Acaraú', 'Santana do Cariri', 'São Benedito',
            'São Gonçalo do Amarante', 'São João do Jaguaribe', 'São Luís do Curu', 'Senador Pompeu',
            'Senador Sá', 'Sobral', 'Solonópole', 'Tabuleiro do Norte', 'Tamboril', 'Tarrafas',
            'Tauá', 'Tejuçuoca', 'Tianguá', 'Trairi', 'Tururu', 'Ubajara', 'Umari', 'Umirim',
            'Uruburetama', 'Uruoca', 'Varjota', 'Várzea Alegre', 'Viçosa do Ceará'
        ]
    },
    {
        state: 'DF',
        cities: [
            'Brasília'
        ]
    },
    {
        state: 'ES',
        cities: [
            'Afonso Cláudio', 'Água Doce do Norte', 'Águia Branca', 'Alegre', 'Alfredo Chaves', 
            'Alto Rio Novo', 'Anchieta', 'Apiacá', 'Aracruz', 'Atilio Vivacqua', 
            'Baixo Guandu', 'Barra de São Francisco', 'Boa Esperança', 'Bom Jesus do Norte', 
            'Brejetuba', 'Cachoeiro de Itapemirim', 'Cariacica', 'Castelo', 'Colatina', 
            'Conceição da Barra', 'Conceição do Castelo', 'Divino de São Lourenço', 'Domingos Martins', 
            'Dores do Rio Preto', 'Ecoporanga', 'Fundão', 'Governador Lindenberg', 
            'Guaçuí', 'Guarapari', 'Ibatiba', 'Ibiraçu', 'Ibitirama', 'Iconha', 
            'Irupi', 'Itaguaçu', 'Itapemirim', 'Itarana', 'Iúna', 'Jaguaré', 
            'Jerônimo Monteiro', 'João Neiva', 'Laranja da Terra', 'Linhares', 
            'Mantenópolis', 'Marataízes', 'Marechal Floriano', 'Marilândia', 
            'Mimoso do Sul', 'Montanha', 'Mucurici', 'Muniz Freire', 'Muqui', 
            'Nova Venécia', 'Pancas', 'Pedro Canário', 'Pinheiros', 'Piúma', 
            'Ponto Belo', 'Presidente Kennedy', 'Rio Bananal', 'Rio Novo do Sul', 
            'Santa Leopoldina', 'Santa Maria de Jetibá', 'Santa Teresa', 'São Domingos do Norte', 
            'São Gabriel da Palha', 'São José do Calçado', 'São Mateus', 'São Roque do Canaã', 
            'Serra', 'Sooretama', 'Vargem Alta', 'Venda Nova do Imigrante', 
            'Viana', 'Vila Pavão', 'Vila Valério', 'Vila Velha', 'Vitória'
        ]
    },
    {
        state: 'GO',
        cities: [
            'Abadia de Goiás', 'Abadiânia', 'Acreúna', 'Adelândia', 'Água Fria de Goiás', 
            'Água Limpa', 'Águas Lindas de Goiás', 'Alexânia', 'Aloândia', 'Alto Horizonte', 
            'Alto Paraíso de Goiás', 'Alvorada do Norte', 'Amaralina', 'Americano do Brasil', 
            'Amorinópolis', 'Anápolis', 'Anhanguera', 'Anicuns', 'Aparecida de Goiânia', 
            'Aparecida do Rio Doce', 'Aporé', 'Araçu', 'Aragarças', 'Aragoiânia', 
            'Araguapaz', 'Arenópolis', 'Aruanã', 'Aurilândia', 'Avelinópolis', 
            'Baliza', 'Barro Alto', 'Bela Vista de Goiás', 'Bom Jardim de Goiás', 
            'Bom Jesus de Goiás', 'Bonfinópolis', 'Bonópolis', 'Brazabrantes', 
            'Britânia', 'Buriti Alegre', 'Buriti de Goiás', 'Buritinópolis', 
            'Cabeceiras', 'Cachoeira Alta', 'Cachoeira de Goiás', 'Cachoeira Dourada', 
            'Caçu', 'Caiapônia', 'Caldas Novas', 'Caldazinha', 'Campestre de Goiás', 
            'Campinaçu', 'Campinorte', 'Campo Alegre de Goiás', 'Campo Limpo de Goiás', 
            'Campos Belos', 'Campos Verdes', 'Carmo do Rio Verde', 'Castelândia', 
            'Catalão', 'Caturaí', 'Cavalcante', 'Ceres', 'Cezarina', 'Chapadão do Céu', 
            'Cidade Ocidental', 'Cocalzinho de Goiás', 'Colinas do Sul', 'Córrego do Ouro', 
            'Corumbá de Goiás', 'Corumbaíba', 'Cristalina', 'Cristianópolis', 
            'Crixás', 'Cromínia', 'Cumari', 'Damianópolis', 'Damolândia', 'Davinópolis', 
            'Diorama', 'Divinópolis de Goiás', 'Doverlândia', 'Edealina', 'Edéia', 
            'Estrela do Norte', 'Faina', 'Fazenda Nova', 'Firminópolis', 
            'Flores de Goiás', 'Formosa', 'Formoso', 'Gameleira de Goiás', 
            'Goianápolis', 'Goiandira', 'Goianésia', 'Goiânia', 'Goianira', 
            'Goiás', 'Goiatuba', 'Gouvelândia', 'Guapó', 'Guaraíta', 'Guarani de Goiás', 
            'Guarinos', 'Heitoraí', 'Hidrolândia', 'Hidrolina', 'Iaciara', 'Inaciolândia', 
            'Indiara', 'Inhumas', 'Ipameri', 'Ipiranga de Goiás', 'Iporá', 
            'Israelândia', 'Itaberaí', 'Itaguari', 'Itaguaru', 'Itajá', 'Itapaci', 
            'Itapirapuã', 'Itapuranga', 'Itarumã', 'Itauçu', 'Itumbiara', 
            'Ivolândia', 'Jandaia', 'Jaraguá', 'Jataí', 'Jaupaci', 'Jesúpolis', 
            'Joviânia', 'Jussara', 'Lagoa Santa', 'Leopoldo de Bulhões', 
            'Luziânia', 'Mairipotaba', 'Mambaí', 'Mara Rosa', 'Marzagão', 
            'Matrinchã', 'Maurilândia', 'Mimoso de Goiás', 'Minaçu', 'Mineiros', 
            'Moiporá', 'Monte Alegre de Goiás', 'Montes Claros de Goiás', 
            'Montividiu', 'Montividiu do Norte', 'Morrinhos', 'Morro Agudo de Goiás', 
            'Mossâmedes', 'Mozarlândia', 'Mundo Novo', 'Mutunópolis', 'Nazário', 
            'Nerópolis', 'Niquelândia', 'Nova América', 'Nova Aurora', 'Nova Crixás', 
            'Nova Glória', 'Nova Iguaçu de Goiás', 'Nova Roma', 'Nova Veneza', 
            'Novo Brasil', 'Novo Gama', 'Novo Planalto', 'Orizona', 'Ouro Verde de Goiás', 
            'Ouvidor', 'Padre Bernardo', 'Palestina de Goiás', 'Palmeiras de Goiás', 
            'Palmelo', 'Palminópolis', 'Panamá', 'Paranaiguara', 'Paraúna', 
            'Perolândia', 'Petrolina de Goiás', 'Pilar de Goiás', 'Piracanjuba', 
            'Piranhas', 'Pirenópolis', 'Pires do Rio', 'Planaltina', 
            'Pontalina', 'Porangatu', 'Porteirão', 'Portelândia', 'Posse', 
            'Professor Jamil', 'Quirinópolis', 'Rialma', 'Rianápolis', 'Rio Quente', 
            'Rio Verde', 'Rubiataba', 'Sanclerlândia', 'Santa Bárbara de Goiás', 
            'Santa Cruz de Goiás', 'Santa Fé de Goiás', 'Santa Helena de Goiás', 
            'Santa Isabel', 'Santa Rita do Araguaia', 'Santa Rita do Novo Destino', 
            'Santa Rosa de Goiás', 'Santa Tereza de Goiás', 'Santa Terezinha de Goiás', 
            'Santo Antônio da Barra', 'Santo Antônio de Goiás', 'Santo Antônio do Descoberto', 
            'São Domingos', 'São Francisco de Goiás', 'São João d\'Aliança', 'São João da Paraúna', 
            'São Luís de Montes Belos', 'São Luíz do Norte', 'São Miguel do Araguaia', 
            'São Miguel do Passa Quatro', 'São Patrício', 'São Simão', 
            'Senador Canedo', 'Serranópolis', 'Silvânia', 'Simolândia', 
            'Sítio d\'Abadia', 'Taquaral de Goiás', 'Teresina de Goiás', 
            'Terezópolis de Goiás', 'Três Ranchos', 'Trindade', 'Trombas', 
            'Turvânia', 'Turvelândia', 'Uirapuru', 'Uruaçu', 'Uruana', 
            'Urutaí', 'Valparaíso de Goiás', 'Varjão', 'Vianópolis', 'Vicentinópolis', 
            'Vila Boa', 'Vila Propício'
        ]
    },
    {
        state: 'MA',
        cities: [
            'Açailândia', 'Afonso Cunha', 'Água Doce do Maranhão', 'Alcântara', 'Aldeias Altas', 
            'Altamira do Maranhão', 'Alto Alegre do Maranhão', 'Alto Alegre do Pindaré', 
            'Alto Parnaíba', 'Amapá do Maranhão', 'Amarante do Maranhão', 
            'Anajatuba', 'Anapurus', 'Apicum-Açu', 'Araguanã', 'Araioses', 
            'Arame', 'Arari', 'Axixá', 'Bacabal', 'Bacabeira', 'Bacuri', 
            'Bacurituba', 'Balsas', 'Barão de Grajaú', 'Barra do Corda', 
            'Barreirinhas', 'Bela Vista do Maranhão', 'Belágua', 'Benedito Leite', 
            'Bequimão', 'Bernardo do Mearim', 'Boa Vista do Gurupi', 'Bom Jardim', 
            'Bom Jesus das Selvas', 'Bom Lugar', 'Brejo', 'Brejo de Areia', 
            'Buriti', 'Buriti Bravo', 'Buriticupu', 'Buritirana', 'Cachoeira Grande', 
            'Cajapió', 'Cajari', 'Campestre do Maranhão', 'Cândido Mendes', 
            'Cantanhede', 'Capinzal do Norte', 'Carolina', 'Carutapera', 
            'Caxias', 'Cedral', 'Central do Maranhão', 'Centro do Guilherme', 
            'Centro Novo do Maranhão', 'Chapadinha', 'Cidelândia', 'Codó', 
            'Coelho Neto', 'Colinas', 'Conceição do Lago-Açu', 'Coroatá', 
            'Cururupu', 'Davinópolis', 'Dom Pedro', 'Duque Bacelar', 'Esperantinópolis', 
            'Estreito', 'Feira Nova do Maranhão', 'Fernando Falcão', 'Formosa da Serra Negra', 
            'Fortaleza dos Nogueiras', 'Fortuna', 'Godofredo Viana', 'Gonçalves Dias', 
            'Governador Archer', 'Governador Edison Lobão', 'Governador Eugênio Barros', 
            'Governador Luiz Rocha', 'Governador Newton Bello', 'Governador Nunes Freire', 
            'Graça Aranha', 'Grajaú', 'Guimarães', 'Humberto de Campos', 'Icatu', 
            'Igarapé do Meio', 'Igarapé Grande', 'Imperatriz', 'Itaipava do Grajaú', 
            'Itapecuru Mirim', 'Itinga do Maranhão', 'Jatobá', 'Jenipapo dos Vieiras', 
            'João Lisboa', 'Joselândia', 'Junco do Maranhão', 'Lago da Pedra', 
            'Lago do Junco', 'Lago dos Rodrigues', 'Lago Verde', 'Lagoa do Mato', 
            'Lagoa Grande do Maranhão', 'Lajeado Novo', 'Lima Campos', 
            'Loreto', 'Luís Domingues', 'Magalhães de Almeida', 'Maracaçumé', 
            'Marajá do Sena', 'Maranhãozinho', 'Mata Roma', 'Matinha', 
            'Matões', 'Matões do Norte', 'Milagres do Maranhão', 'Mirador', 
            'Miranda do Norte', 'Mirinzal', 'Monção', 'Montes Altos', 'Morros', 
            'Nina Rodrigues', 'Nova Colinas', 'Nova Iorque', 'Nova Olinda do Maranhão', 
            'Olho d\'Água das Cunhãs', 'Olinda Nova do Maranhão', 'Paço do Lumiar', 
            'Palmeirândia', 'Paraibano', 'Parnarama', 'Passagem Franca', 
            'Pastos Bons', 'Paulino Neves', 'Paulo Ramos', 'Pedreiras', 
            'Pedro do Rosário', 'Penalva', 'Peri Mirim', 'Peritoró', 
            'Pindaré-Mirim', 'Pinheiro', 'Pio XII', 'Pirapemas', 
            'Poção de Pedras', 'Porto Franco', 'Porto Rico do Maranhão', 
            'Presidente Dutra', 'Presidente Juscelino', 'Presidente Médici', 
            'Presidente Sarney', 'Presidente Vargas', 'Primeira Cruz', 
            'Raposa', 'Riachão', 'Ribamar Fiquene', 'Rosário', 
            'Sambaíba', 'Santa Filomena do Maranhão', 'Santa Helena', 
            'Santa Inês', 'Santa Luzia', 'Santa Luzia do Paruá', 
            'Santa Quitéria do Maranhão', 'Santa Rita', 'Santana do Maranhão', 
            'Santo Amaro do Maranhão', 'Santo Antônio dos Lopes', 
            'São Benedito do Rio Preto', 'São Bento', 'São Bernardo', 
            'São Domingos do Azeitão', 'São Domingos do Maranhão', 
            'São Félix de Balsas', 'São Francisco do Brejão', 
            'São Francisco do Maranhão', 'São João Batista', 'São João do Carú', 
            'São João do Paraíso', 'São João do Soter', 'São João dos Patos', 
            'São José de Ribamar', 'São José dos Basílios', 'São Luís', 
            'São Luís Gonzaga do Maranhão', 'São Mateus do Maranhão', 
            'São Pedro da Água Branca', 'São Pedro dos Crentes', 
            'São Raimundo das Mangabeiras', 'São Raimundo do Doca Bezerra', 
            'São Roberto', 'São Vicente Ferrer', 'Satubinha', 
            'Senador Alexandre Costa', 'Senador La Rocque', 
            'Serrano do Maranhão', 'Sítio Novo', 'Sucupira do Norte', 
            'Sucupira do Riachão', 'Tasso Fragoso', 'Timbiras', 
            'Timon', 'Trizidela do Vale', 'Tufilândia', 'Tuntum', 
            'Turiaçu', 'Turilândia', 'Tutóia', 'Urbano Santos', 
            'Vargem Grande', 'Viana', 'Vila Nova dos Martírios', 
            'Vitória do Mearim', 'Vitorino Freire', 'Zé Doca'
        ]
    },
    {
        state: 'MT',
        cities: [
            'Alta Floresta', 'Alto Araguaia', 'Alto Boa Vista', 'Alto Garças', 'Alto Paraguai', 'Alto Taquari', 'Apiacás', 'Araguaiana', 'Araguainha', 'Araguatins',
            'Arenápolis', 'Barra do Bugres', 'Barra do Garças', 'Bom Jesus do Araguaia', 'Brasnorte', 'Cáceres', 'Campinápolis', 'Campo Novo do Parecis', 'Campo Verde', 'Canarana',
            'Cuiabá', 'Curvelândia', 'Dentinho', 'Diamantino', 'Dom Aquino', 'Feliz Natal', 'Gaúcha do Norte', 'General Carneiro', 'Glória D’Oeste', 'Guarantã do Norte',
            'Guiratinga', 'Indiavaí', 'Itiquira', 'Jaciara', 'Jangada', 'Jauru', 'Juara', 'Juína', 'Juruena', 'Juscimeira', 'Lambari D’Oeste', 'Lucas do Rio Verde',
            'Luciara', 'Matupá', 'Mirassol D’Oeste', 'Nobres', 'Nossa Senhora do Livramento', 'Nova Bandeirantes', 'Nova Brasilândia', 'Nova Canaã do Norte', 'Nova Guarita',
            'Nova Lacerda', 'Nova Marilândia', 'Nova Maringá', 'Nova Monte Verde', 'Nova Mutum', 'Nova Nazaré', 'Nova Olímpia', 'Nova Xavantina', 'Novo Horizonte do Norte',
            'Novo Mundo', 'Novo São Joaquim', 'Novo Santo Antônio', 'Novo São Pedro', 'Paranaíta', 'Paranatinga', 'Pedra Preta', 'Poconé', 'Pontal do Araguaia', 'Pontes e Lacerda',
            'Porto Estrela', 'Querência', 'Ribeirão Cascalheira', 'Ribeirãozinho', 'Rio Branco', 'Rio dos Peixes', 'Rondolândia', 'Rondópolis', 'Rosário Oeste', 'Salto do Céu',
            'Santa Carmem', 'Santa Terezinha', 'Santo Afonso', 'Santo Antônio do Leste', 'Santo Antônio do Leverger', 'São Félix do Araguaia', 'São José do Rio Claro', 'São José do Xingu',
            'São José dos Quatro Marcos', 'São Pedro da Cipa', 'Sapezal', 'Serra Nova Dourada', 'Sinop', 'Sorriso', 'Tabaporã', 'Tangará da Serra', 'Tapurah', 'Terra Nova do Norte',
            'Tesouro', 'Torixoréu', 'União do Sul', 'Vale de São Domingos', 'Várzea Grande', 'Vera', 'Vila Bela da Santíssima Trindade', 'Vila Rica'
        ]
    },
    {
        state: 'MS',
        cities: [
            'Água Clara', 'Alcinópolis', 'Amambai', 'Anastácio', 'Anaurilândia', 'Angélica', 'Antônio João', 'Aparecida do Taboado', 'Aquidauana', 'Aral Moreira',
            'Bandeirantes', 'Bataguassu', 'Bataiporã', 'Bela Vista', 'Bodoquena', 'Bonito', 'Brazilândia', 'Camapuã', 'Campo Grande', 'Caracol', 'Cassilândia',
            'Chapadão do Sul', 'Corguinho', 'Coronel Sapucaia', 'Corumbá', 'Costa Rica', 'Coxim', 'Cristalina', 'Douradina', 'Dourados', 'Eldorado', 'Fátima do Sul',
            'Figueirão', 'Glória de Dourados', 'Japorã', 'Jaraguari', 'Jardim', 'Jateí', 'Juti', 'Ladário', 'Laguna Carapã', 'Maracaju', 'Maraú', 'Médio Norte',
            'Mundo Novo', 'Naviraí', 'Nioaque', 'Nova Alvorada do Sul', 'Nova Andradina', 'Novo Horizonte do Sul', 'Paranaíba', 'Paranhos', 'Pedro Gomes', 'Ponta Porã',
            'Porto Murtinho', 'Ribas do Rio Pardo', 'Rio Brilhante', 'Rio Negro', 'Rio Verde de Mato Grosso', 'Rochedo', 'Santa Rita do Pardo', 'São Gabriel do Oeste',
            'São José do Rio Preto', 'São Sebastião do Paraíso', 'Selvíria', 'Sete Quedas', 'Sidrolândia', 'Sonora', 'Tacuru', 'Taquarussu', 'Terenos', 'Três Lagoas',
            'Vicentina'
        ]
    },
    {
        state: 'MG',
        cities: [
            'Abadia dos Dourados','Abaeté','Abre-Campo','Acaiaca','Água Boa','Água Comprida','Aguanil','Águas Formosas','Águas Vermelhas','Aimorés','Aiuruoca','Alagoa','Albertina','Além Paraíba','Alfenas','Alfredo Vasconcelos',
            'Almenara','Alpercata','Alpinópolis','Alterosa','Alto Caparaó','Alto Jequitibá','Alto Rio Doce','Alvarenga','Alvinópolis','Alvorada de Minas','Amparo da Serra','Andradas','Andrelândia','Angelândia','Antônio Carlos',
            'Antônio Dias','Antônio Prado de Minas','Araçaí','Aracitaba','Araçuaí','Araguari','Arantina','Araponga','Araporã','Arapuá','Araújos','Araxá','Arceburgo','Arcos','Areado','Argirita','Aricanduva','Arinos','Astolfo Dutra',
            'Ataléia','Augusto de Lima','Baependi','Baldim','Bambuí','Bandeira','Bandeira do Sul','Barão de Cocais','Barão de Monte Alto','Barbacena','Barra Longa','Barroso','Bela Vista de Minas','Belmiro Braga','Belo Horizonte',
            'Belo Vale','Berilo','Berizal','Bertópolis','Betim','Bias Fortes','Bicas','Biquinhas','Boa Esperança','Bocaina de Minas','Bocaiuva','Bom Despacho','Bom Jardim de Minas','Bom Jesus da Penha','Bom Jesus do Amparo',
            'Bom Jesus do Galho','Bom Repouso','Bom Sucesso','Bonfim','Bonfinópolis de Minas','Bonito de Minas','Borda da Mata','Botelhos','Botumirim','Brás Pires','Brasilândia de Minas','Brasília de Minas','Braúnas',
            'Brazópolis','Brumadinho','Bueno Brandão','Buenópolis','Bugre','Buritis','Buritizeiro','Cabeceira Grande','Cabo Verde','Cachoeira da Prata','Cachoeira de Minas','Cachoeira de Pajeú','Cachoeira Dourada','Caetanópolis',
            'Caeté','Caiana','Cajuri','Caldas','Camacho','Camacho','Camanducaia','Camanducaia','Cambuí','Cambuí','Cambuquira','Campanário','Campanha','Campestre','Campina Verde','Campo Azul','Campo Belo','Campo do Meio',
            'Campo Florido','Campos Altos','Campos Gerais','Cana Verde','Canaã','Canápolis','Candeias','Cantagalo','Caparaó','Capela Nova','Capelinha','Capetinga','Capim Branco','Capinópolis','Capitão Andrade','Capitão Enéas',
            'Capitólio','Caputira','Caraí','Caranaíba','Carandaí','Carangola','Caratinga','Carbonita','Careaçu','Carlos Chagas','Carmésia','Carmo da Cachoeira','Carmo da Mata','Carmo de Minas','Carmo do Cajuru',
            'Carmo do Paranaíba','Carmo do Rio Claro','Carmópolis de Minas','Carneirinho','Carrancas','Carvalhópolis','Carvalhos','Casa Grande','Cascalho Rico','Cássia','Cataguases','Catas Altas','Catas Altas da Noruega',
            'Catuji','Catuti','Caxambu','Cedro do Abaeté','Central de Minas','Centralina','Chácara','Chalé','Chapada do Norte','Chapada Gaúcha','Chiador','Cipotânea','Claraval','Claro dos Poções','Cláudio','Coimbra',
            'Coluna','Comendador Gomes','Comercinho','Conceição da Aparecida','Conceição da Barra de Minas','Conceição das Alagoas','Conceição das Pedras','Conceição de Ipanema','Conceição do Mato Dentro','Conceição do Pará',
            'Conceição do Rio Verde','Conceição dos Ouros','Cônego Marinho','Confins','Congonhal','Congonhas','Congonhas do Norte','Conquista','Conselheiro Lafaiete','Conselheiro Pena','Consolação','Contagem','Coqueiral',
            'Coração de Jesus','Cordisburgo','Cordislândia','Corinto','Coroaci','Coromandel','Coronel Fabriciano','Coronel Murta','Coronel Pacheco','Coronel Xavier Chaves','Córrego Danta','Córrego do Bom Jesus','Córrego Fundo',
            'Córrego Novo','Couto de Magalhães de Minas','Crisólita','Cristais','Cristália','Cristiano Otoni','Cristina','Crucilândia','Cruzeiro da Fortaleza','Cruzília','Cuparaque','Curral de Dentro','Curvelo','Datas',
            'Delfim Moreira','Delfinópolis','Delta','Descoberto','Desterro de Entre Rios','Desterro do Melo','Diamantina','Diogo de Vasconcelos','Dionísio','Divinésia','Divino','Divino das Laranjeiras','Divinolândia de Minas',
            'Divinópolis','Divisa Alegre','Divisa Nova','Divisópolis','Dom Bosco','Dom Cavati','Dom Joaquim','Dom Silvério','Dom Viçoso','Dona Eusébia','Dores de Campos','Dores de Guanhães','Dores do Indaiá','Dores do Turvo',
            'Doresópolis','Douradoquara','Durandé','Elói Mendes','Engenheiro Caldas','Engenheiro Navarro','Entre Folhas','Entre Rios de Minas','Ervália','Esmeraldas','Espera Feliz','Espinosa','Espírito Santo do Dourado','Estiva',
            'Estrela Dalva','Estrela do Indaiá','Estrela do Sul','Eugenópolis','Ewbank da Câmara','Extrema','Fama','Faria Lemos','Felício dos Santos','Felisburgo','Felixlândia','Fernandes Tourinho','Ferros','Fervedouro',
            'Florestal','Formiga','Formoso','Fortaleza de Minas','Fortuna de Minas','Francisco Badaró','Francisco Dumont','Francisco Sá','Franciscópolis','Frei Gaspar','Frei Inocêncio','Frei Lagonegro','Fronteira',
            'Fronteira dos Vales','Fruta de Leite','Frutal','Funilândia','Galileia','Gameleiras','Glaucilândia','Goiabeira','Goianá','Gonçalves','Gonzaga','Gouveia','Governador Valadares','Grão Mogol','Grupiara','Guanhães','Guapé',
            'Guaraciaba','Guaraciama','Guaranésia','Guarani','Guarará','Guarda-Mor','Guaxupé','Guidoval','Guimarânia','Guiricema','Gurinhatã','Heliodora','Iapu','Ibertioga','Ibiá','Ibiaí','Ibiracatu','Ibiraci','Ibirité',
            'Ibitiúra de Minas','Ibituruna','Icaraí de Minas','Igarapé','Igaratinga','Iguatama','Ijaci','Ilicínea','Imbé de Minas','Inconfidentes','Indaiabira','Indianópolis','Ingaí','Inhapim','Inhaúma','Inimutaba','Ipaba','Ipanema',
            'Ipatinga','Ipiaçu','Ipuiúna','Iraí de Minas','Itabira','Itabirinha','Itabirito','Itacambira','Itacarambi','Itaguara','Itaipé','Itajubá','Itamarandiba','Itamarati de Minas','Itambacuri','Itambé do Mato Dentro',
            'Itamogi','Itamonte','Itanhandu','Itanhomi','Itaobim','Itapagipe','Itapecerica','Itapeva','Itatiaiuçu','Itaú de Minas','Itaúna','Itaverava','Itinga','Itueta','Ituiutaba','Itumirim','Iturama','Itutinga','Jaboticatubas',
            'Jacinto','Jacuí','Jacutinga','Jaguaraçu','Jaíba','Jampruca','Janaúba','Januária','Japaraíba','Japonvar','Jeceaba','Jenipapo de Minas','Jequeri','Jequitaí','Jequitibá','Jequitinhonha','Jesuânia','Joaíma','Joanésia',
            'João Monlevade','João Pinheiro','Joaquim Felício','Jordânia','José Gonçalves de Minas','José Raydan','Josenópolis','Juatuba','Juiz de Fora','Juramento','Juruaia','Juvenília','Ladainha','Lagamar','Lagoa da Prata',
            'Lagoa dos Patos','Lagoa Dourada','Lagoa Formosa','Lagoa Grande','Lagoa Santa','Lajinha','Lambari','Lamim','Laranjal','Lassance','Lavras','Leandro Ferreira','Leme do Prado','Leopoldina','Liberdade','Lima Duarte',
            'Limeira do Oeste','Lontra','Luisburgo','Luislândia','Luminárias','Luz','Machacalis','Machado','Madre de Deus de Minas','Malacacheta','Mamonas','Manga','Manhuaçu','Manhumirim','Mantena','Mar de Espanha','Maravilhas',
            'Maria da Fé','Mariana','Marilac','Mário Campos','Maripá de Minas','Marliéria','Marmelópolis','Martinho Campos','Martins Soares','Mata Verde','Materlândia','Mateus Leme','Mathias Lobato','Matias Barbosa',
            'Matias Cardoso','Matipó','Mato Verde','Matozinhos','Matutina','Medeiros','Medina','Mendes Pimentel','Mercês','Mesquita','Minas Novas','Minduri','Mirabela','Miradouro','Miraí','Miravânia','Moeda','Moema','Monjolos',
            'Monsenhor Paulo','Montalvânia','Monte Alegre de Minas','Monte Azul','Monte Belo','Monte Carmelo','Monte Formoso','Monte Santo de Minas','Monte Sião','Montes Claros','Montezuma','Morada Nova de Minas','Morro da Garça',
            'Morro do Pilar','Munhoz','Muriaé','Mutum','Muzambinho','Nacip Raydan','Nanuque','Naque','Natalândia','Natércia','Nazareno','Nepomuceno','Ninheira','Nova Belém','Nova Era','Nova Lima','Nova Módica','Nova Ponte',
            'Nova Porteirinha','Nova Resende','Nova Serrana','Nova União','Novo Cruzeiro','Novo Oriente de Minas','Novorizonte','Olaria','Olhos-d’Água','Olímpio Noronha','Oliveira','Oliveira Fortes','Onça de Pitangui','Oratórios',
            'Orizânia','Ouro Branco','Ouro Fino','Ouro Preto','Ouro Verde de Minas','Padre Carvalho','Padre Paraíso','Pai Pedro','Paineiras','Pains','Paiva','Palma','Palmópolis','Papagaios','Pará de Minas','Paracatu','Paraguaçu',
            'Paraisópolis','Paraopeba','Passa Tempo','Passa-Quatro','Passa-Vinte','Passabém','Passos','Patis','Patos de Minas','Patrocínio','Patrocínio do Muriaé','Paula Cândido','Paulistas','Pavão','Peçanha','Pedra Azul',
            'Pedra Bonita','Pedra do Anta','Pedra do Indaiá','Pedra Dourada','Pedralva','Pedras de Maria da Cruz','Pedrinópolis','Pedro Leopoldo','Pedro Teixeira','Pequeri','Pequi','Perdigão','Perdizes','Perdões','Periquito',
            'Pescador','Piau','Piedade de Caratinga','Piedade de Ponte Nova','Piedade do Rio Grande','Piedade dos Gerais','Pimenta','Pingo-d’Água','Pintópolis','Piracema','Pirajuba','Piranga','Piranguçu','Piranguinho','Pirapetinga',
            'Pirapora','Piraúba','Pitangui','Piumhi','Planura','Poço Fundo','Poços de Caldas','Pocrane','Pompéu','Ponte Nova','Ponto Chique','Ponto dos Volantes','Porteirinha','Porto Firme','Poté','Pouso Alegre','Pouso Alto',
            'Prados','Prata','Pratápolis','Pratinha','Presidente Bernardes','Presidente Juscelino','Presidente Kubitschek','Presidente Olegário','Prudente de Morais','Quartel Geral','Queluzito','Raposos','Raul Soares','Recreio',
            'Reduto','Resende Costa','Resplendor','Ressaquinha','Riachinho','Riacho dos Machados','Ribeirão das Neves','Ribeirão Vermelho','Rio Acima','Rio Casca','Rio do Prado','Rio Doce','Rio Espera','Rio Manso','Rio Novo',
            'Rio Paranaíba','Rio Pardo de Minas','Rio Piracicaba','Rio Pomba','Rio Preto','Rio Vermelho','Ritápolis','Rochedo de Minas','Rodeiro','Romaria','Rosário da Limeira','Rubelita','Rubim','Sabará','Sabinópolis',
            'Sacramento','Salinas','Salto da Divisa','Santa Bárbara','Santa Bárbara do Leste','Santa Bárbara do Monte Verde','Santa Bárbara do Tugúrio','Santa Cruz de Minas','Santa Cruz de Salinas','Santa Cruz do Escalvado',
            'Santa Efigênia de Minas','Santa Fé de Minas','Santa Helena de Minas','Santa Juliana','Santa Luzia','Santa Margarida','Santa Maria de Itabira','Santa Maria do Salto','Santa Maria do Suaçuí','Santa Rita de Caldas',
            'Santa Rita de Ibitipoca','Santa Rita de Jacutinga','Santa Rita de Minas','Santa Rita do Itueto','Santa Rita do Sapucaí','Santa Rosa da Serra','Santa Vitória','Santana da Vargem','Santana de Cataguases',
            'Santana de Pirapama','Santana do Deserto','Santana do Garambéu','Santana do Jacaré','Santana do Manhuaçu','Santana do Paraíso','Santana do Riacho','Santana dos Montes','Santo Antônio do Amparo',
            'Santo Antônio do Aventureiro','Santo Antônio do Grama','Santo Antônio do Itambé','Santo Antônio do Jacinto','Santo Antônio do Monte','Santo Antônio do Retiro','Santo Antônio do Rio Abaixo','Santo Hipólito',
            'Santos Dumont','São Bento Abade','São Brás do Suaçuí','São Domingos das Dores','São Domingos do Prata','São Félix de Minas','São Francisco','São Francisco de Paula','São Francisco de Sales','São Francisco do Glória',
            'São Geraldo','São Geraldo da Piedade','São Geraldo do Baixio','São Gonçalo do Abaeté','São Gonçalo do Pará','São Gonçalo do Rio Abaixo','São Gonçalo do Rio Preto','São Gonçalo do Sapucaí','São Gotardo',
            'São João Batista do Glória','São João da Lagoa','São João da Mata','São João da Ponte','São João das Missões','São João del-Rei','São João do Manhuaçu','São João do Manteninha','São João do Oriente',
            'São João do Pacuí','São João do Paraíso','São João Evangelista','São João Nepomuceno','São Joaquim de Bicas','São José da Barra','São José da Lapa','São José da Safira','São José da Varginha','São José do Alegre',
            'São José do Divino','São José do Goiabal','São José do Jacuri','São José do Mantimento','São Lourenço','São Miguel do Anta','São Pedro da União','São Pedro do Suaçuí','São Pedro dos Ferros','São Romão',
            'São Roque de Minas','São Sebastião da Bela Vista','São Sebastião da Vargem Alegre','São Sebastião do Anta','São Sebastião do Maranhão','São Sebastião do Oeste','São Sebastião do Paraíso','São Sebastião do Rio Preto',
            'São Sebastião do Rio Verde','São Thomé das Letras','São Tiago','São Tomás de Aquino','São Vicente de Minas','Sapucaí-Mirim','Sardoá','Sarzedo','Sem-Peixe','Senador Amaral','Senador Cortes','Senador Firmino',
            'Senador José Bento','Senador Modestino Gonçalves','Senhora de Oliveira','Senhora do Porto','Senhora dos Remédios','Sericita','Seritinga','Serra Azul de Minas','Serra da Saudade','Serra do Salitre','Serra dos Aimorés',
            'Serrania','Serranópolis de Minas','Serranos','Serro','Sete Lagoas','Setubinha','Silveirânia','Silvianópolis','Simão Pereira','Simonésia','Sobrália','Soledade de Minas','Tabuleiro','Taiobeiras','Taparuba','Tapira',
            'Tapiraí','Taquaraçu de Minas','Tarumirim','Teixeiras','Teófilo Otoni','Timóteo','Tiradentes','Tiros','Tocantins','Tocos do Moji','Toledo','Tombos','Três Corações','Três Marias','Três Pontas','Tumiritinga','Tupaciguara',
            'Turmalina','Turvolândia','Ubá','Ubaí','Ubaporanga','Uberaba','Uberlândia','Umburatiba','Unaí','União de Minas','Uruana de Minas','Urucânia','Urucuia','Vargem Alegre','Vargem Bonita','Vargem Grande do Rio Pardo',
            'Varginha','Varjão de Minas','Várzea da Palma','Varzelândia','Vazante','Verdelândia','Veredinha','Veríssimo','Vermelho Novo','Vespasiano','Viçosa','Vieiras','Virgem da Lapa','Virgínia','Virginópolis','Virgolândia',
            'Visconde do Rio Branco','Volta Grande','Wenceslau Braz'
        ]
    },
    {
        state: 'PA',
        cities: [
            'Abaetetuba','Abel Figueiredo','Acará','Afuá','Água Azul do Norte','Alenquer','Almeirim','Altamira','Anajás','Ananindeua','Anapu','Augusto Corrêa','Aurora do Pará','Aveiro (Pará)','Bagre','Baião','Bannach','Barcarena',
            'Belém','Belterra','Benevides','Bom Jesus do Tocantins','Bonito','Bragança','Brasil Novo','Brejo Grande do Araguaia','Breu Branco','Breves','Bujaru','Cachoeira do Arari','Cachoeira do Piriá','Cametá',
            'Canaã dos Carajás','Capanema','Capitão Poço','Castanhal','Chaves','Colares','Conceição do Araguaia','Concórdia do Pará','Cumaru do Norte','Curionópolis','Curralinho','Curuá','Curuçá','Dom Eliseu','Eldorado dos Carajás',
            'Faro','Floresta do Araguaia','Garrafão do Norte','Goianésia do Pará','Gurupá','Igarapé-Açu','Igarapé-Miri','Inhangapi','Ipixuna do Pará','Irituia','Itaituba','Itupiranga','Jacareacanga','Jacundá','Juruti',
            'Limoeiro do Ajuru','Mãe do Rio','Magalhães Barata','Marabá','Maracanã','Marapanim','Marituba','Medicilândia','Melgaço','Mocajuba','Moju','Mojuí dos Campos','Monte Alegre','Muaná','Nova Esperança do Piriá','Nova Ipixuna',
            'Nova Timboteua','Novo Progresso','Novo Repartimento','Obidos','Oeiras do Pará','Oriximiná','Ourém','Ourilândia do Norte','Pacajá','Palestina do Pará','Paragominas','Parauapebas','Pau-d’Arco','Peixe-Boi','Piçarra',
            'Placas','Ponta de Pedras','Portel','Porto de Moz','Prainha','Primavera','Quatipuru','Redenção','Rio Maria','Rondon do Pará','Rurópolis','Salinópolis','Salvaterra','Santa Bárbara do Pará','Santa Cruz do Arari',
            'Santa Isabel do Pará','Santa Luzia do Pará','Santa Maria das Barreiras','Santa Maria do Pará','Santana do Araguaia','Santarém','Santarém Novo','Santo Antônio do Tauá','São Caetano de Odivelas',
            'São Domingos do Araguaia','São Domingos do Capim','São Félix do Xingu','São Francisco do Pará','São Geraldo do Araguaia','São João da Ponta','São João de Pirabas','São João do Araguaia','São Miguel do Guamá',
            'São Sebastião da Boa Vista','Sapucaia','Senador José Porfírio','Soure','Tailândia','Terra Alta','Terra Santa','Tomé-Açu','Tracuateua','Trairão','Tucumã','Tucuruí','Ulianópolis','Uruará','Vigia','Viseu',
            'Vitória do Xingu','Xinguara',
        ]
    },
    {
        state: 'PB',
        cities: [
            'Água Branca','Aguiar','Alagoa Grande','Alagoa Nova','Alagoinha','Alcantil','Algodão de Jandaíra','Alhandra','Amparo','Aparecida','Araçagi','Arara','Araruna','Areia','Areia de Baraúnas','Areial','Aroeiras',
            'Assunção','Baía da Traição','Bananeiras','Baraúna','Barra de Santa Rosa','Barra de Santana','Barra de São Miguel','Bayeux','Belém','Belém do Brejo do Cruz','Bernardino Batista','Boa Ventura','Boa Vista',
            'Bom Jesus','Bom Sucesso','Bonito de Santa Fé','Boqueirão','Borborema','Brejo do Cruz','Brejo dos Santos','Caaporã','Cabaceiras','Cabedelo','Cachoeira dos Índios','Cacimba de Areia','Cacimba de Dentro',
            'Cacimbas','Caiçara','Cajazeiras','Cajazeirinhas','Caldas Brandão','Camalaú','Campina Grande','Capim','Caraúbas','Carrapateira','Casserengue','Catingueira','Catolé do Rocha','Caturité','Conceição',
            'Condado','Conde','Congo','Coremas','Coxixola','Cruz do Espírito Santo','Cubati','Cuité','Cuité de Mamanguape','Cuitegi','Curral de Cima','Curral Velho','Damião','Desterro','Diamante','Dona Inês','Duas Estradas',
            'Emas','Esperança','Fagundes','Frei Martinho','Gado Bravo','Guarabira','Gurinhém','Gurjão','Ibiara','Igaracy','Imaculada','Ingá','Itabaiana','Itaporanga','Itapororoca','Itatuba','Jacaraú','Jericó','João Pessoa',
            'Joca Claudino','Juarez Távora','Juazeirinho','Junco do Seridó','Juripiranga','Juru','Lagoa','Lagoa de Dentro','Lagoa Seca','Lastro','Livramento','Logradouro','Lucena','Mãe d’Água','Malta','Mamanguape','Manaíra',
            'Marcação','Mari','Marizópolis','Massaranduba','Mataraca','Matinhas','Mato Grosso','Maturéia','Mogeiro','Montadas','Monte Horebe','Monteiro','Mulungu','Natuba','Nazarezinho','Nova Floresta','Nova Olinda',
            'Nova Palmeira','Olho d’Água','Olivedos','Ouro Velho','Parari','Passagem','Patos','Paulista','Pedra Branca','Pedra Lavrada','Pedras de Fogo','Pedro Régis','Piancó','Picuí','Pilar','Pilões','Pilõezinhos',
            'Pirpirituba','Pitimbu','Pocinhos','Poço Dantas','Poço de José de Moura','Pombal','Prata','Princesa Isabel','Puxinanã','Queimadas','Quixaba','Remígio','Riachão','Riachão do Bacamarte','Riachão do Poço',
            'Riacho de Santo Antônio','Riacho dos Cavalos','Rio Tinto','Salgadinho','Salgado de São Félix','Santa Cecília','Santa Cruz','Santa Helena','Santa Inês','Santa Luzia','Santa Rita','Santa Teresinha',
            'Santana de Mangueira','Santana dos Garrotes','Santo André','São Bentinho','São Bento','São Domingos','São Domingos do Cariri','São Francisco','São João do Cariri','São João do Rio do Peixe','São João do Tigre',
            'São José da Lagoa Tapada','São José de Caiana','São José de Espinharas','São José de Piranhas','São José de Princesa','São José do Bonfim','São José do Brejo do Cruz','São José do Sabugi','São José dos Cordeiros',
            'São José dos Ramos','São Mamede','São Miguel de Taipu','São Sebastião de Lagoa de Roça','São Sebastião do Umbuzeiro','Sapé','Seridó','Serra Branca','Serra da Raiz','Serra Grande','Serra Redonda','Serraria',
            'Sertãozinho','Sobrado','Solânea','Soledade','Sossêgo','Sousa','Sumé','Tacima','Taperoá','Tavares','Teixeira','Tenório','Triunfo','Uiraúna','Umbuzeiro','Várzea','Vieirópolis','Vista Serrana','Zabelê'
        ]
    },
    {
        state: 'PR',
        cities: [
            'Abatiá','Adrianópolis','Agudos do Sul','Almirante Tamandaré','Altamira do Paraná','Alto Paraíso','Alto Paraná','Alto Piquiri','Altônia','Alvorada do Sul','Amaporã','Ampére','Anahy','Andirá','Ângulo','Antonina',
            'Antônio Olinto','Apucarana','Arapongas','Arapoti','Arapuã','Araruna','Araucária','Ariranha do Ivaí','Assaí','Assis Chateaubriand','Astorga','Atalaia','Balsa Nova','Bandeirantes','Barbosa Ferraz','Barra do Jacaré',
            'Barracão','Boa Ventura de São Roque','Boa Vista da Aparecida','Bocaiúva do Sul','Bom Jesus do Sul','Bom Sucesso','Bom Sucesso do Sul','Borrazópolis','Braganey','Brasilândia do Sul','Cafeara','Cafelândia',
            'Cafezal do Sul','Califórnia','Cambará','Cambé','Cambira','Campina da Lagoa','Campina do Simão','Campina Grande do Sul','Campo Bonito','Campo do Tenente','Campo Largo','Campo Magro','Campo Mourão','Cândido de Abreu',
            'Candói','Cantagalo','Capanema','Capitão Leônidas Marques','Carambeí','Carlópolis','Cascavel','Castro','Catanduvas','Centenário do Sul','Cerro Azul','Céu Azul','Chopinzinho','Cianorte','Cidade Gaúcha','Clevelândia',
            'Colombo','Colorado','Congonhinhas','Conselheiro Mairinck','Contenda','Corbélia','Cornélio Procópio','Coronel Domingos Soares','Coronel Vivida','Corumbataí do Sul','Cruz Machado','Cruzeiro do Iguaçu','Cruzeiro do Oeste',
            'Cruzeiro do Sul','Cruzmaltina','Curitiba','Curiúva','Diamante d’Oeste','Diamante do Norte','Diamante do Sul','Dois Vizinhos','Douradina','Doutor Camargo','Doutor Ulysses','Enéas Marques','Engenheiro Beltrão',
            'Entre Rios do Oeste','Espigão Alto do Iguaçu','Farol','Faxinal','Fazenda Rio Grande','Fênix','Fernandes Pinheiro','Figueira','Flor da Serra do Sul','Floraí','Floresta','Florestópolis','Flórida','Formosa do Oeste',
            'Foz do Iguaçu','Foz do Jordão','Francisco Alves','Francisco Beltrão','General Carneiro','Godoy Moreira','Goioerê','Goioxim','Grandes Rios','Guaíra','Guairaçá','Guamiranga','Guapirama','Guaporema','Guaraci',
            'Guaraniaçu','Guarapuava','Guaraqueçaba','Guaratuba','Honório Serpa','Ibaiti','Ibema','Ibiporã','Icaraíma','Iguaraçu','Iguatu','Imbaú','Imbituva','Inácio Martins','Inajá','Indianópolis','Ipiranga','Iporã',
            'Iracema do Oeste','Irati','Iretama','Itaguajé','Itaipulândia','Itambaracá','Itambé','Itapejara d’Oeste','Itaperuçu','Itaúna do Sul','Ivaí','Ivaiporã','Ivaté','Ivatuba','Jaboti','Jacarezinho','Jaguapitã',
            'Jaguariaíva','Jandaia do Sul','Janiópolis','Japira','Japurá','Jardim Alegre','Jardim Olinda','Jataizinho','Jesuítas','Joaquim Távora','Jundiaí do Sul','Juranda','Jussara','Kaloré','Lapa','Laranjal',
            'Laranjeiras do Sul','Leópolis','Lidianópolis','Lindoeste','Loanda','Lobato','Londrina','Luiziana','Lunardelli','Lupionópolis','Mallet','Mamborê','Mandaguaçu','Mandaguari','Mandirituba','Manfrinópolis','Mangueirinha',
            'Manoel Ribas','Maringá','Marechal Cândido Rondon','Maria Helena','Marialva','Marilândia do Sul','Marilena','Mariluz','Maringá','Mariópolis','Maripá','Marmeleiro','Marquinho','Marumbi','Matelândia','Matinhos',
            'Mato Rico','Mauá da Serra','Medianeira','Mercedes','Mirador','Miraselva','Missal','Moreira Sales','Morretes','Munhoz de Melo','Nossa Senhora das Graças','Nova Aliança do Ivaí','Nova América da Colina','Nova Aurora',
            'Nova Cantu','Nova Esperança','Nova Esperança do Sudoeste','Nova Fátima','Nova Laranjeiras','Nova Londrina','Nova Olímpia','Nova Prata do Iguaçu','Nova Santa Bárbara','Nova Santa Rosa','Nova Tebas','Novo Itacolomi',
            'Ortigueira','Ourizona','Ouro Verde do Oeste','Paiçandu','Palmas','Palmeira','Palmital','Palotina','Paraíso do Norte','Paranacity','Paranaguá','Paranapoema','Paranavaí','Pato Bragado','Pato Branco','Paula Freitas',
            'Paulo Frontin','Peabiru','Perobal','Pérola','Pérola d’Oeste','Piên','Pinhais','Pinhal de São Bento','Pinhalão','Pinhão','Piraí do Sul','Piraquara','Pitanga','Pitangueiras','Planaltina do Paraná','Planalto',
            'Ponta Grossa','Pontal do Paraná','Porecatu','Porto Amazonas','Porto Barreiro','Porto Rico','Porto Vitória','Prado Ferreira','Pranchita','Presidente Castelo Branco','Primeiro de Maio','Prudentópolis','Quarto Centenário',
            'Quatiguá','Quatro Barras','Quatro Pontes','Quedas do Iguaçu','Querência do Norte','Quinta do Sol','Quitandinha','Ramilândia','Rancho Alegre','Rancho Alegre d’Oeste','Realeza','Rebouças','Renascença','Reserva',
            'Reserva do Iguaçu','Ribeirão Claro','Ribeirão do Pinhal','Rio Azul','Rio Bom','Rio Bonito do Iguaçu','Rio Branco do Ivaí','Rio Branco do Sul','Rio Negro','Rolândia','Roncador','Rondon','Rosário do Ivaí','Sabáudia',
            'Salgado Filho','Salto do Itararé','Salto do Lontra','Santa Amélia','Santa Cecília do Pavão','Santa Cruz de Monte Castelo','Santa Fé','Santa Helena','Santa Inês','Santa Isabel do Ivaí','Santa Izabel do Oeste',
            'Santa Lúcia','Santa Maria do Oeste','Santa Mariana','Santa Mônica','Santa Tereza do Oeste','Santa Terezinha de Itaipu','Santana do Itararé','Santo Antônio da Platina','Santo Antônio do Caiuá','Santo Antônio do Paraíso',
            'Santo Antônio do Sudoeste','Santo Inácio','São Carlos do Ivaí','São Jerônimo da Serra','São João','São João do Caiuá','São João do Ivaí','São João do Triunfo','São Jorge d’Oeste','São Jorge do Ivaí',
            'São Jorge do Patrocínio','São José da Boa Vista','São José das Palmeiras','São José dos Pinhais','São Manoel do Paraná','São Mateus do Sul','São Miguel do Iguaçu','São Pedro do Iguaçu','São Pedro do Ivaí',
            'São Pedro do Paraná','São Sebastião da Amoreira','São Tomé','Sapopema','Sarandi','Saudade do Iguaçu','Sengés','Serranópolis do Iguaçu','Sertaneja','Sertanópolis','Siqueira Campos','Sulina','Tamarana','Tamboara',
            'Tapejara','Tapira','Teixeira Soares','Telêmaco Borba','Terra Boa','Terra Rica','Terra Roxa','Tibagi','Tijucas do Sul','Toledo','Tomazina','Três Barras do Paraná','Tunas do Paraná','Tuneiras do Oeste',
            'Tupãssi','Turvo','Ubiratã','Umuarama','União da Vitória','Uniflor','Uraí','Ventania','Vera Cruz do Oeste','Verê','Virmond','Vitorino','Wenceslau Braz','Xambrê'
        ]
    },
    {
        state: 'PE',
        cities: [
            'Abreu e Lima','Afogados da Ingazeira','Afrânio','Agrestina','Água Preta','Águas Belas','Alagoinha','Aliança','Altinho','Amaraji','Angelim','Araçoiaba','Araripina','Arcoverde','Barra de Guabiraba','Barreiros',
            'Belém de Maria','Belém de São Francisco','Belo Jardim','Betânia','Bezerros','Bodocó','Bom Conselho','Bom Jardim','Bonito','Brejão','Brejinho','Brejo da Madre de Deus','Buenos Aires','Buíque','Cabo de Santo Agostinho',
            'Cabrobó','Cachoeirinha','Caetés','Calçado','Calumbi','Camaragibe','Camocim de São Félix','Camutanga','Canhotinho','Capoeiras','Carnaíba','Carnaubeira da Penha','Carpina','Caruaru','Casinhas','Catende','Cedro',
            'Chã de Alegria','Chã Grande','Condado','Correntes','Cortês','Cumaru','Cupira','Custódia','Dormentes','Escada','Exu','Feira Nova','Fernando de Noronha','Ferreiros','Flores','Floresta','Frei Miguelinho','Gameleira',
            'Garanhuns','Glória do Goitá','Goiana','Granito','Gravatá','Iati','Ibimirim','Ibirajuba','Igarassu','Iguaraci','Ilha de Itamaracá','Inajá','Ingazeira','Ipojuca','Ipubi','Itacuruba','Itaíba','Itambé','Itapetim',
            'Itapissuma','Itaquitinga','Jaboatão dos Guararapes','Jaqueira','Jataúba','Jatobá','João Alfredo','Joaquim Nabuco','Jucati','Jupi','Jurema','Lagoa de Itaenga','Lagoa do Carro','Lagoa do Ouro','Lagoa dos Gatos',
            'Lagoa Grande','Lajedo','Limoeiro','Macaparana','Machados','Manari','Maraial','Mirandiba','Moreilândia','Moreno','Nazaré da Mata','Olinda','Orobó','Orocó','Ouricuri','Palmares','Palmeirina','Panelas','Paranatama',
            'Parnamirim','Passira','Paudalho','Paulista','Pedra','Pesqueira','Petrolândia','Petrolina','Poção','Pombos','Primavera','Quipapá','Quixaba','Recife','Riacho das Almas','Ribeirão','Rio Formoso','Sairé','Salgadinho',
            'Salgueiro','Saloá','Sanharó','Santa Cruz','Santa Cruz da Baixa Verde','Santa Cruz do Capibaribe','Santa Filomena','Santa Maria da Boa Vista','Santa Maria do Cambucá','Santa Terezinha','São Benedito do Sul',
            'São Bento do Una','São Caetano','São João','São Joaquim do Monte','São José da Coroa Grande','São José do Belmonte','São José do Egito','São Lourenço da Mata','São Vicente Férrer','Serra Talhada','Serrita','Sertânia',
            'Sirinhaém','Solidão','Surubim','Tabira','Tacaimbó','Tacaratu','Tamandaré','Taquaritinga do Norte','Terezinha','Terra Nova','Timbaúba','Toritama','Tracunhaém','Trindade','Triunfo','Tupanatinga','Tuparetama','Venturosa',
            'Verdejante','Vertente do Lério','Vertentes','Vicência','Vitória de Santo Antão','Xexéu'
        ]
    },
    {
        state: 'PI',
        cities: [
            'Acauã','Agricolândia','Água Branca','Alagoinha do Piauí','Alegrete do Piauí','Alto Longá','Altos','Alvorada do Gurgueia','Amarante','Angical do Piauí','Anísio de Abreu','Antônio Almeida','Aroazes','Aroeiras do Itaim',
            'Arraial','Assunção do Piauí','Avelino Lopes','Baixa Grande do Ribeiro','Barra d’Alcântara','Barras','Barreiras do Piauí','Barro Duro','Batalha','Bela Vista do Piauí','Belém do Piauí','Beneditinos','Bertolínia',
            'Betânia do Piauí','Boa Hora','Bocaina','Bom Jesus','Bom Princípio do Piauí','Bonfim do Piauí','Boqueirão do Piauí','Brasileira','Brejo do Piauí','Buriti dos Lopes','Buriti dos Montes','Cabeceiras do Piauí',
            'Cajazeiras do Piauí','Cajueiro da Praia','Caldeirão Grande do Piauí','Campinas do Piauí','Campo Alegre do Fidalgo','Campo Grande do Piauí','Campo Largo do Piauí','Campo Maior','Canavieira','Canto do Buriti',
            'Capitão de Campos','Capitão Gervásio Oliveira','Caracol','Caraúbas do Piauí','Caridade do Piauí','Castelo do Piauí','Caxingó','Cocal','Cocal de Telha','Cocal dos Alves','Coivaras','Colônia do Gurgueia',
            'Colônia do Piauí','Conceição do Canindé','Coronel José Dias','Corrente','Cristalândia do Piauí','Cristino Castro','Curimatá','Currais','Curral Novo do Piauí','Curralinhos','Demerval Lobão','Dirceu Arcoverde',
            'Dom Expedito Lopes','Dom Inocêncio','Domingos Mourão','Elesbão Veloso','Eliseu Martins','Esperantina','Fartura do Piauí','Flores do Piauí','Floresta do Piauí','Floriano','Francinópolis','Francisco Ayres',
            'Francisco Macedo','Francisco Santos','Fronteiras','Geminiano','Gilbués','Guadalupe','Guaribas','Hugo Napoleão','Ilha Grande','Inhuma','Ipiranga do Piauí','Isaías Coelho','Itainópolis','Itaueira','Jacobina do Piauí',
            'Jaicós','Jardim do Mulato','Jatobá do Piauí','Jerumenha','João Costa','Joaquim Pires','Joca Marques','José de Freitas','Juazeiro do Piauí','Júlio Borges','Jurema','Lagoa Alegre','Lagoa de São Francisco',
            'Lagoa do Barro do Piauí','Lagoa do Piauí','Lagoa do Sítio','Lagoinha do Piauí','Landri Sales','Luís Correia','Luzilândia','Madeiro','Manoel Emídio','Marcolândia','Marcos Parente','Massapê do Piauí','Matias Olímpio',
            'Miguel Alves','Miguel Leão','Milton Brandão','Monsenhor Gil','Monsenhor Hipólito','Monte Alegre do Piauí','Morro Cabeça no Tempo','Morro do Chapéu do Piauí','Murici dos Portelas','Nazaré do Piauí','Nazária',
            'Nossa Senhora de Nazaré','Nossa Senhora dos Remédios','Nova Santa Rita','Novo Oriente do Piauí','Novo Santo Antônio','Oeiras','Olho d’Água do Piauí','Padre Marcos','Paes Landim','Pajeú do Piauí','Palmeira do Piauí',
            'Palmeirais','Paquetá','Parnaguá','Parnaíba','Passagem Franca do Piauí','Patos do Piauí','Pau-d’Arco do Piauí','Paulistana','Pavussu','Pedro II','Pedro Laurentino','Picos','Pimenteiras','Pio IX','Piracuruca','Piripiri',
            'Porto','Porto Alegre do Piauí','Prata do Piauí','Queimada Nova','Redenção do Gurgueia','Regeneração','Riacho Frio','Ribeira do Piauí','Ribeiro Gonçalves','Rio Grande do Piauí','Santa Cruz do Piauí',
            'Santa Cruz dos Milagres','Santa Filomena','Santa Luz','Santa Rosa do Piauí','Santana do Piauí','Santo Antônio de Lisboa','Santo Antônio dos Milagres','Santo Inácio do Piauí','São Braz do Piauí','São Félix do Piauí',
            'São Francisco de Assis do Piauí','São Francisco do Piauí','São Gonçalo do Gurgeia','São Gonçalo do Piauí','São João da Canabrava','São João da Fronteira','São João da Serra','São João da Varjota',
            'São João do Arraial','São João do Piauí','São José do Divino','São José do Peixe','São José do Piauí','São Julião','São Lourenço do Piauí','São Luis do Piauí','São Miguel da Baixa Grande','São Miguel do Fidalgo',
            'São Miguel do Tapuio','São Pedro do Piauí','São Raimundo Nonato','Sebastião Barros','Sebastião Leal','Sigefredo Pacheco','Simões','Simplício Mendes','Socorro do Piauí','Sussuapara','Tamboril do Piauí',
            'Tanque do Piauí','Teresina','União','Uruçuí','Valença do Piauí','Várzea Branca','Várzea Grande','Vera Mendes','Vila Nova do Piauí','Wall Ferraz'
        ]
    },
    {
        state: 'RJ',
        cities: [
            'Angra dos Reis','Aperibé','Araruama','Areal','Armação dos Búzios','Arraial do Cabo','Barra do Piraí','Barra Mansa','Belford Roxo','Bom Jardim','Bom Jesus do Itabapoana','Cabo Frio','Cachoeiras de Macacu','Cambuci',
            'Campos dos Goytacazes','Cantagalo','Carapebus','Cardoso Moreira','Carmo','Casimiro de Abreu','Comendador Levy Gasparian','Conceição de Macabu','Cordeiro','Duas Barras','Duque de Caxias','Engenheiro Paulo de Frontin',
            'Fartura do Piauí','Flores do Piauí','Floresta do Piauí','Floriano','Francinópolis','Francisco Ayres','Francisco Macedo','Francisco Santos','Fronteiras','Guapimirim','Iguaba Grande','Itaboraí','Itaguaí','Italva',
            'Itaocara','Itaperuna','Itatiaia','Japeri','Laje do Muriaé','Macaé','Macuco','Magé','Mangaratiba','Maricá','Mendes','Mesquita','Miguel Pereira','Miracema','Natividade','Nilópolis','Niterói','Nova Friburgo',
            'Nova Iguaçu','Paracambi','Paraíba do Sul','Paraty','Paty do Alferes','Petrópolis','Pinheiral','Piraí','Porciúncula','Porto Real','Quatis','Queimados','Quissamã','Resende','Rio Bonito','Rio Claro','Rio das Flores',
            'Rio das Ostras','Rio de Janeiro','Santa Maria Madalena','Santo Antônio de Pádua','São Fidélis','São Francisco de Itabapoana','São Gonçalo','São João da Barra','São João de Meriti','São José de Ubá',
            'São José do Vale do Rio Preto','São Pedro da Aldeia','São Sebastião do Alto','Sapucaia','Saquarema','Seropédica','Silva Jardim','Sumidouro','Tanguá','Teresópolis','Trajano de Moraes','Três Rios','Valença do Piauí',
            'Várzea Branca','Várzea Grande','Vera Mendes','Vila Nova do Piauí'
        ]
    },
    {
        state: 'RN',
        cities: [
            'Acari','Afonso Bezerra','Água Nova','Alexandria','Almino Afonso','Alto do Rodrigues','Angicos','Antônio Martins','Apodi','Areia Branca','Arez','Assu','Baía Formosa','Baraúna','Barcelona','Bento Fernandes',
            'Boa Saúde','Bodó','Bom Jesus','Brejinho','Caiçara do Norte','Caiçara do Rio do Vento','Caicó','Campo Grande','Campo Redondo','Canguaretama','Caraúbas','Carnaúba dos Dantas','Carnaubais','Ceará-Mirim',
            'Cerro Corá','Coronel Ezequiel','Coronel João Pessoa','Cruzeta','Currais Novos','Doutor Severiano','Encanto','Equador','Espírito Santo','Extremoz','Felipe Guerra','Fernando Pedroza','Florânia',
            'Francisco Dantas','Frutuoso Gomes','Galinhos','Goianinha','Governador Dix-Sept Rosado','Grossos','Guamaré','Ielmo Marinho','Ipanguaçu','Ipueira','Itajá','Itaú','Jaçanã','Jandaíra','Janduís','Japi',
            'Jardim de Angicos','Jardim de Piranhas','Jardim do Seridó','João Câmara','João Dias','José da Penha','Jucurutu','Jundiá','Lagoa d’Anta','Lagoa de Pedras','Lagoa de Velhos','Lagoa Nova','Lagoa Salgada',
            'Lajes','Lajes Pintadas','Lucrécia','Luís Gomes','Macaíba','Macau','Major Sales','Marcelino Vieira','Martins','Maxaranguape','Messias Targino','Montanhas','Monte Alegre','Monte das Gameleiras','Mossoró',
            'Natal','Nísia Floresta','Nova Cruz','Olho-d’Água do Borges','Ouro Branco','Paraná','Paraú','Parazinho','Parelhas','Parnamirim','Passa-e-Fica','Passagem','Patu','Pau dos Ferros','Pedra Grande','Pedra Preta',
            'Pedro Avelino','Pedro Velho','Pendências','Pilões','Poço Branco','Portalegre','Porto do Mangue','Pureza','Rafael Fernandes','Rafael Godeiro','Riacho da Cruz','Riacho de Santana','Riachuelo','Rio do Fogo',
            'Rodolfo Fernandes','Ruy Barbosa','Santa Cruz','Santa Maria','Santana do Matos','Santana do Seridó','Santo Antônio','São Bento do Norte','São Bento do Trairi','São Fernando','São Francisco do Oeste',
            'São Gonçalo do Amarante','São João do Sabugi','São José de Mipibu','São José do Campestre','São José do Seridó','São Miguel','São Miguel do Gostoso','São Paulo do Potengi','São Pedro','São Rafael','São Tomé',
            'São Vicente','Senador Elói de Souza','Senador Georgino Avelino','Serra Caiada','Serra de São Bento','Serra do Mel','Serra Negra do Norte','Serrinha','Serrinha dos Pintos','Severiano Melo','Sítio Novo',
            'Taboleiro Grande','Taipu','Tangará','Tenente Ananias','Tenente Laurentino Cruz','Tibau','Tibau do Sul','Timbaúba dos Batistas','Touros','Triunfo Potiguar','Umarizal','Upanema','Várzea','Venha-Ver','Vera Cruz',
            'Viçosa','Vila Flor'
        ]
    },
    {
        state: 'RS',
        cities: [
            'Aceguá','Água Santa','Agudo','Ajuricaba','Alecrim','Alegrete','Alegria','Almirante Tamandaré do Sul','Alpestre','Alto Alegre','Alvorada','Amaral Ferrador','Ametista do Sul','André da Rocha','Anta Gorda',
            'Antônio Prado','Arambaré','Araricá','Aratiba','Arroio do Meio','Arroio do Sal','Arroio do Tigre','Arroio dos Ratos','Arroio Grande','Arvorezinha','Augusto Pestana','Áurea','Bagé','Balneário Pinhal','Barão',
            'Barão de Cotegipe','Barão do Triunfo','Barra do Guarita','Barra do Quaraí','Barra do Ribeiro','Barra do Rio Azul','Barra Funda','Barracão','Barros Cassal','Benjamin Constant do Sul','Bento Gonçalves',
            'Boa Vista das Missões','Boa Vista do Buricá','Boa Vista do Cadeado','Boa Vista do Incra','Boa Vista do Sul','Bom Jesus','Bom Princípio','Bom Progresso','Bom Retiro do Sul','Boqueirão do Leão','Bossoroca',
            'Bozano','Braga','Brochier','Butiá','Caçapava do Sul','Cacequi','Cachoeira do Sul','Cachoeirinha','Cacique Doble','Caibaté','Caiçara','Camaquã','Camargo','Cambará do Sul','Campestre da Serra','Campina das Missões',
            'Campinas do Sul','Campo Bom','Campo Novo','Campos Borges','Candelária','Cândido Godói','Candiota','Canela','Canguçu','Canoas','Canudos do Vale','Capão Bonito do Sul','Capão da Canoa','Capão do Cipó','Capão do Leão',
            'Capela de Santana','Capitão','Capivari do Sul','Caraá','Carazinho','Carlos Barbosa','Carlos Gomes','Casca','Caseiros','Catuípe','Caxias do Sul','Centenário','Cerrito','Cerro Branco','Cerro Grande',
            'Cerro Grande do Sul','Cerro Largo','Chapada','Charqueadas','Charrua','Chiapetta','Chuí','Chuvisca','Cidreira','Ciríaco','Colinas','Colorado','Condor','Constantina','Coqueiro Baixo','Coqueiros do Sul','Coronel Barros',
            'Coronel Bicaco','Coronel Pilar','Cotiporã','Coxilha','Crissiumal','Cristal','Cristal do Sul','Cruz Alta','Cruzaltense','Cruzeiro do Sul','David Canabarro','Derrubadas','Dezesseis de Novembro','Dilermando de Aguiar',
            'Dois Irmãos','Dois Irmãos das Missões','Dois Lajeados','Dom Feliciano','Dom Pedrito','Dom Pedro de Alcântara','Dona Francisca','Doutor Maurício Cardoso','Doutor Ricardo','Eldorado do Sul','Encantado',
            'Encruzilhada do Sul','Engenho Velho','Entre Rios do Sul','Entre-Ijuís','Erebango','Erechim','Ernestina','Erval Grande','Erval Seco','Esmeralda','Esperança do Sul','Espumoso','Estação','Estância Velha','Esteio',
            'Estrela','Estrela Velha','Eugênio de Castro','Fagundes Varela','Farroupilha','Faxinal do Soturno','Faxinalzinho','Fazenda Vilanova','Feliz','Flores da Cunha','Floriano Peixoto','Fontoura Xavier','Formigueiro',
            'Forquetinha','Fortaleza dos Valos','Frederico Westphalen','Garibaldi','Garruchos','Gaurama','General Câmara','Gentil','Getúlio Vargas','Giruá','Glorinha','Gramado','Gramado dos Loureiros','Gramado Xavier','Gravataí',
            'Guabiju','Guaíba','Guaporé','Guarani das Missões','Harmonia','Herval','Herveiras','Horizontina','Hulha Negra','Humaitá','Ibarama','Ibiaçá','Ibiraiaras','Ibirapuitã','Ibirubá','Igrejinha','Ijuí','Ilópolis','Imbé',
            'Imigrante','Independência','Inhacorá','Ipê','Ipiranga do Sul','Iraí','Itaara','Itacurubi','Itapuca','Itaqui','Itati','Itatiba do Sul','Ivorá','Ivoti','','CIDADES COM A LETRA J','Município','Jaboticaba','Jacuizinho',
            'Jacutinga','Jaguarão','Jaguari','Jaquirana','Jari','Jóia','Júlio de Castilhos','Lagoa Bonita do Sul','Lagoa dos Três Cantos','Lagoa Vermelha','Lagoão','Lajeado','Lajeado do Bugre','Lavras do Sul','Liberato Salzano',
            'Lindolfo Collor','Linha Nova','Maçambará','Machadinho','Mampituba','Manoel Viana','Maquiné','Maratá','Marau','Marcelino Ramos','Mariana Pimentel','Mariano Moro','Marques de Souza','Mata','Mato Castelhano',
            'Mato Leitão','Mato Queimado','Maximiliano de Almeida','Minas do Leão','Miraguaí','Montauri','Monte Alegre dos Campos','Monte Belo do Sul','Montenegro','Mormaço','Morrinhos do Sul','Morro Redondo','Morro Reuter',
            'Mostardas','Muçum','Muitos Capões','Muliterno','Não-Me-Toque','Nicolau Vergueiro','Nonoai','Nova Alvorada','Nova Araçá','Nova Bassano','Nova Boa Vista','Nova Bréscia','Nova Candelária','Nova Esperança do Sul',
            'Nova Hartz','Nova Pádua','Nova Palma','Nova Petrópolis','Nova Prata','Nova Ramada','Nova Roma do Sul','Nova Santa Rita','Novo Barreiro','Novo Cabrais','Novo Hamburgo','Novo Machado','Novo Tiradentes','Novo Xingu',
            'Osório','Paim Filho','Palmares do Sul','Palmeira das Missões','Palmitinho','Panambi','Pantano Grande','Paraí','Paraíso do Sul','Pareci Novo','Parobé','Passa Sete','Passo do Sobrado','Passo Fundo','Paulo Bento',
            'Paverama','Pedras Altas','Pedro Osório','Pejuçara','Pelotas','Picada Café','Pinhal','Pinhal da Serra','Pinhal Grande','Pinheirinho do Vale','Pinheiro Machado','Pinto Bandeira','Pirapó','Piratini','Planalto',
            'Poço das Antas','Pontão','Ponte Preta','Portão','Porto Alegre','Porto Lucena','Porto Mauá','Porto Vera Cruz','Porto Xavier','Pouso Novo','Presidente Lucena','Progresso','Protásio Alves','Putinga','Quaraí',
            'Quatro Irmãos','Quevedos','Quinze de Novembro','Redentora','Relvado','Restinga Seca','Rio dos Índios','Rio Grande','Rio Pardo','Riozinho','Roca Sales','Rodeio Bonito','Rolador','Rolante','Ronda Alta','Rondinha',
            'Roque Gonzales','Rosário do Sul','Rio Grande do Sul','Sagrada Família','Saldanha Marinho','Salto do Jacuí','Salvador das Missões','Salvador do Sul','Sananduva','Santa Bárbara do Sul','Santa Cecília do Sul',
            'Santa Clara do Sul','Santa Cruz do Sul','Santa Margarida do Sul','Santa Maria','Santa Maria do Herval','Santa Rosa','Santa Tereza','Santa Vitória do Palmar','Santana da Boa Vista','Santana do Livramento',
            'Santiago','Santo Ângelo','Santo Antônio da Patrulha','Santo Antônio das Missões','Santo Antônio do Palma','Santo Antônio do Planalto','Santo Augusto','Santo Cristo','Santo Expedito do Sul','São Borja',
            'São Domingos do Sul','São Francisco de Assis','São Francisco de Paula','São Gabriel','São Jerônimo','São João da Urtiga','São João do Polêsine','São Jorge','São José das Missões','São José do Herval',
            'São José do Hortêncio','São José do Inhacorá','São José do Norte','São José do Ouro','São José do Sul','São José dos Ausentes','São Leopoldo','São Lourenço do Sul','São Luiz Gonzaga','São Marcos','São Martinho',
            'São Martinho da Serra','São Miguel das Missões','São Nicolau','São Paulo das Missões','São Pedro da Serra','São Pedro das Missões','São Pedro do Butiá','São Pedro do Sul','São Sebastião do Caí','São Sepé',
            'São Valentim','São Valentim do Sul','São Valério do Sul','São Vendelino','São Vicente do Sul','Sapiranga','Sapucaia do Sul','Sarandi','Seberi','Sede Nova','Segredo','Selbach','Senador Salgado Filho',
            'Sentinela do Sul','Serafina Corrêa','Sério','Sertão','Sertão Santana','Sete de Setembro','Severiano de Almeida','Silveira Martins','Sinimbu','Sobradinho','Soledade','Tabaí','Tapejara','Tapera','Tapes','Taquara',
            'Taquari','Taquaruçu do Sul','Tavares','Tenente Portela','Terra de Areia','Teutônia','Tio Hugo','Tiradentes do Sul','Toropi','Torres','Tramandaí','Travesseiro','Três Arroios','Três Cachoeiras','Três Coroas',
            'Três de Maio','Três Forquilhas','Três Palmeiras','Três Passos','Trindade do Sul','Triunfo','Tucunduva','Tunas','Tupanci do Sul','Tupanciretã','Tupandi','Tuparendi','Turuçu','Ubiretama','União da Serra','Unistalda',
            'Uruguaiana','Vacaria','Vale do Sol','Vale Real','Vale Verde','Vanini','Venâncio Aires','Vera Cruz','Veranópolis','Vespasiano Corrêa','Viadutos','Viamão','Vicente Dutra','Victor Graeff','Vila Flores','Vila Lângaro',
            'Vila Maria','Vila Nova do Sul','Vista Alegre','Vista Alegre do Prata','Vista Gaúcha','Vitória das Missões','Westfália','Xangri-lá'
        ]
    },
    {
        state: 'RO',
        cities: [
            'Alta Floresta d’Oeste','Alto Alegre dos Parecis','Alto Paraíso','Alvorada d’Oeste','Ariquemes','Buritis','Cabixi','Cacaulândia','Cacoal','Campo Novo de Rondônia','Candeias do Jamari','Castanheiras','Cerejeiras',
            'Chupinguaia','Colorado do Oeste','Corumbiara','Costa Marques','Cujubim','Doutor Severiano','Espigão d’Oeste','Governador Jorge Teixeira','Guajará-Mirim','Itapuã do Oeste','Jaru','Ji-Paraná','Machadinho d’Oeste',
            'Ministro Andreazza','Mirante da Serra','Monte Negro','Nova Brasilândia d’Oeste','Nova Mamoré','Nova União','Novo Horizonte do Oeste','Ouro Preto do Oeste','Parecis','Pimenta Bueno','Pimenteiras do Oeste',
            'Porto Velho','Presidente Médici','Primavera de Rondônia','Rio Crespo','Rolim de Moura','Santa Luzia d’Oeste','São Felipe d’Oeste','São Francisco do Guaporé','São Miguel do Guaporé','Seringueiras','Teixeirópolis',
            'Theobroma','Urupá','Vale do Anari','Vale do Paraíso','Vilhena'
        ]
    },
    {
        state: 'RR',
        cities: [
            'Alto Alegre','Amajari','Boa Vista','Bonfim','Cantá','Caracaraí','Caroebe','Iracema','Mucajaí','Normandia','Pacaraima','Rorainópolis','São João da Baliza','São Luís','Uiramutã'
        ]
    },
    {
        state: 'SC',
        cities: [
            'Abdon Batista','Abelardo Luz','Agrolândia','Agronômica','Água Doce','Águas Frias','Águas Mornas','Águas de Chapecó','Alfredo Wagner','Alto Bela Vista','Anchieta','Angelina','Anita Garibaldi','Anitápolis',
            'Antônio Carlos','Apiúna','Arabutã','Araquari','Araranguá','Armazém','Arroio Trinta','Arvoredo','Ascurra','Atalanta','Aurora','Balneário Arroio do Silva','Balneário Barra do Sul','Balneário Camboriú',
            'Balneário Gaivota','Balneário Piçarras','Balneário Rincão','Bandeirante','Barra Bonita','Barra Velha','Bela Vista do Toldo','Belmonte','Benedito Novo','Biguaçu','Blumenau','Bocaina do Sul','Bom Jardim da Serra',
            'Bom Jesus','Bom Jesus do Oeste','Bom Retiro','Bombinhas','Botuverá','Braço do Norte','Braço do Trombudo','Brunópolis','Brusque','Caçador','Caibi','Calmon','Camboriú','Campo Alegre','Campo Belo do Sul','Campo Erê',
            'Campos Novos','Canelinha','Canoinhas','Capinzal','Capivari de Baixo','Capão Alto','Catanduvas','Caxambu do Sul','Celso Ramos','Cerro Negro','Chapadão do Lageado','Chapecó','Cocal do Sul','Concórdia',
            'Cordilheira Alta','Coronel Freitas','Coronel Martins','Correia Pinto','Corupá','Criciúma','Cunha Porã','Cunhataí','Curitibanos','Descanso','Dionísio Cerqueira','Dona Emma','Doutor Pedrinho','Entre Rios',
            'Ermo','Erval Velho','Faxinal dos Guedes','Flor do Sertão','Florianópolis','Formosa do Sul','Forquilhinha','Fraiburgo','Frei Rogério','Galvão','Garopaba','Garuva','Gaspar','Governador Celso Ramos','Grão Pará',
            'Gravatal','Guabiruba','Guaraciaba','Guaramirim','Guarujá do Sul','Guatambu','Herval d’Oeste','Ibiam','Ibicaré','Ibirama','Içara','Ilhota','Imaruí','Imbituba','Imbuia','Indaial','Iomerê','Ipira','Iporã do Oeste',
            'Ipuaçu','Ipumirim','Iraceminha','Irani','Irati','Irineópolis','Itá','Itaiópolis','Itajaí','Itapema','Itapiranga','Itapoá','Ituporanga','Jaborá','Jacinto Machado','Jaguaruna','Jaraguá do Sul','Jardinópolis',
            'Joaçaba','Joinville','José Boiteux','Jupiá','Lacerdópolis','Lages','Laguna','Lajeado Grande','Laurentino','Lauro Müller','Lebon Régis','Leoberto Leal','Lindóia do Sul','Lontras','Luiz Alves','Luzerna',
            'Macieira','Mafra','Major Gercino','Major Vieira','Maracajá','Maravilha','Marema','Massaranduba','Matos Costa','Meleiro','Mirim Doce','Modelo','Mondaí','Monte Carlo','Monte Castelo','Morro da Fumaça','Morro Grande',
            'Navegantes','Nova Erechim','Nova Itaberaba','Nova Trento','Nova Veneza','Novo Horizonte','Orleans','Otacílio Costa','Ouro','Ouro Verde','Paial','Painel','Palhoça','Palma Sola','Palmeira','Palmitos','Papanduva',
            'Paraíso','Passo de Torres','Passos Maia','Paulo Lopes','Pedras Grandes','Penha','Peritiba','Petrolândia','Pinhalzinho','Pinheiro Preto','Piratuba','Planalto Alegre','Pomerode','Ponte Alta do Norte','Ponte Alta',
            'Ponte Serrada','Porto Belo','Porto União','Pouso Redondo','Praia Grande','Presidente Castelo Branco','Presidente Getúlio','Presidente Nereu','Princesa','Quilombo','Rancho Queimado','Rio das Antas','Rio do Campo',
            'Rio do Oeste','Rio do Sul','Rio dos Cedros','Rio Fortuna','Rio Negrinho','Rio Rufino','Riqueza','Rodeio','Romelândia','Salete','Saltinho','Salto Veloso','Sangão','Santa Cecília','Santa Helena','Santa Rosa de Lima',
            'Santa Rosa do Sul','Santa Terezinha','Santa Terezinha do Progresso','Santiago do Sul','Santo Amaro da Imperatriz','São Bento do Sul','São Bernardino','São Bonifácio','São Carlos','São Cristóvão do Sul',
            'São Domingos','São Francisco do Sul','São João Batista','São João do Itaperiú','São João do Oeste','São João do Sul','São Joaquim','São José','São José do Cedro','São José do Cerrito','São Lourenço do Oeste',
            'São Ludgero','São Martinho','São Miguel da Boa Vista','São Miguel do Oeste','São Pedro de Alcântara','Saudades','Schroeder','Seara','Serra Alta','Siderópolis','Sombrio','Sul Brasil','Taió','Tangará','Tigrinhos',
            'Tijucas','Timbé do Sul','Timbó','Timbó Grande','Três Barras','Treviso','Treze de Maio','Treze Tílias','Trombudo Central','Tubarão','Tunápolis','Turvo','União do Oeste','Urubici','Urupema','Urussanga',
            'Várzea','Venha-Ver','Vera Cruz','Viçosa','Vila Flor','Witmarsum','Xanxerê','Xavantina','Xaxim','Zortéa'
        ]
    },
    {
        state: 'SP',
        cities: [
            'Adamantina','Adolfo','Aguaí','Águas da Prata','Águas de Lindóia','Águas de Santa Bárbara','Águas de São Pedro','Agudos','Alambari','Alfredo Marcondes','Altair','Altinópolis','Alto Alegre','Alumínio',
            'Álvares Florence','Álvares Machado','Álvaro de Carvalho','Alvinlândia','Americana','Américo Brasiliense','Américo de Campos','Amparo','Analândia','Andradina','Angatuba','Anhembi','Anhumas','Aparecida',
            'Aparecida d’Oeste','Apiaí','Araçariguama','Araçatuba','Araçoiaba da Serra','Aramina','Arandu','Arapeí','Araraquara','Araras','Arco-Íris','Arealva','Areias','Areiópolis','Ariranha','Artur Nogueira',
            'Arujá','Aspásia','Assis','Atibaia','Auriflama','Avaí','Avanhandava','Avaré','Bady Bassitt','Balbinos','Bálsamo','Bananal','Barão de Antonina','Barbosa','Bariri','Barra Bonita','Barra do Chapéu',
            'Barra do Turvo','Barretos','Barrinha','Barueri','Bastos','Batatais','Bauru','Bebedouro','Bento de Abreu','Bernardino de Campos','Bertioga','Bilac','Birigui','Biritiba Mirim','Boa Esperança do Sul',
            'Bocaina','Bofete','Boituva','Bom Jesus dos Perdões','Bom Sucesso de Itararé','Borá','Boracéia','Borborema','Borebi','Botucatu','Bragança Paulista','Braúna','Brejo Alegre','Brodowski','Brotas','Buri',
            'Buritama','Buritizal','Cabrália Paulista','Cabreúva','Caçapava','Cachoeira Paulista','Caconde','Cafelândia','Caiabu','Caieiras','Caiuá','Cajamar','Cajati','Cajobi','Cajuru','Campina do Monte Alegre',
            'Campinas','Campo Limpo Paulista','Campos do Jordão','Campos Novos Paulista','Cananéia','Canas','Cândido Mota','Cândido Rodrigues','Canitar','Capão Bonito','Capela do Alto','Capivari','Caraguatatuba',
            'Carapicuíba','Cardoso','Casa Branca','Cássia dos Coqueiros','Castilho','Catanduva','Catiguá','Cedral','Cerqueira César','Cerquilho','Cesário Lange','Charqueada','Chavantes','Clementina','Colina',
            'Colômbia','Conchal','Conchas','Cordeirópolis','Coroados','Coronel Macedo','Corumbataí','Cosmópolis','Cosmorama','Cotia','Cravinhos','Cristais Paulista','Cruzália','Cruzeiro','Cubatão','Cunha','Descalvado',
            'Diadema','Dirce Reis','Divinolândia','Dobrada','Dois Córregos','Dolcinópolis','Dourado','Dracena','Duartina','Dumont','Echaporã','Eldorado','Elias Fausto','Elisiário','Embaúba','Embu das Artes','Embu-Guaçu',
            'Emilianópolis','Engenheiro Coelho','Espírito Santo do Pinhal','Espírito Santo do Turvo','Estiva Gerbi','Estrela d’Oeste','Estrela do Norte','Euclides da Cunha Paulista','Fartura','Fernando Prestes','Fernandópolis',
            'Fernão','Ferraz de Vasconcelos','Flora Rica','Floreal','Flórida Paulista','Florínea','Franca','Francisco Morato','Franco da Rocha','Gabriel Monteiro','Gália','Garça','Gastão Vidigal','Gavião Peixoto',
            'General Salgado','Getulina','Glicério','Guaiçara','Guaimbê','Guaíra','Guapiaçu','Guapiara','Guará','Guaraçaí','Guaraci','Guarani d’Oeste','Guarantã','Guararapes','Guararema','Guaratinguetá','Guareí','Guariba',
            'Guarujá','Guarulhos','Guatapará','Guzolândia','Herculândia','Holambra','Hortolândia','Iacanga','Iacri','Iaras','Ibaté','Ibirá','Ibirarema','Ibitinga','Ibiúna','Icém','Iepê','Igaraçu do Tietê','Igarapava',
            'Igaratá','Iguape','Ilha Comprida','Ilha Solteira','Ilhabela','Indaiatuba','Indiana','Indiaporã','Inúbia Paulista','Ipaussu','Iperó','Ipeúna','Ipiguá','Iporanga','Ipuã','Iracemápolis','Irapuã','Irapuru',
            'Itaberá','Itaí','Itajobi','Itaju','Itanhaém','Itaóca','Itapecerica da Serra','Itapetininga','Itapeva','Itapevi','Itapira','Itapirapuã Paulista','Itápolis','Itaporanga','Itapuí','Itapura','Itaquaquecetuba',
            'Itararé','Itariri','Itatiba','Itatinga','Itirapina','Itirapuã','Itobi','Itu','Itupeva','Ituverava','Jaborandi','Jaboticabal','Jacareí','Jaci','Jacupiranga','Jaguariúna','Jales','Jambeiro','Jandira','Jardinópolis',
            'Jarinu','Jaú','Jeriquara','Joanópolis','João Ramalho','José Bonifácio','Júlio Mesquita','Jumirim','Jundiaí','Junqueirópolis','Juquiá','Juquitiba','Lagoinha','Laranjal Paulista','Lavínia','Lavrinhas','Leme',
            'Lençóis Paulista','Limeira','Lindóia','Lins','Lorena','Lourdes','Louveira','Lucélia','Lucianópolis','Luís Antônio','Luiziânia','Lupércio','Lutécia','Macatuba','Macaubal','Macedônia','Magda','Mairinque',
            'Mairiporã','Manduri','Marabá Paulista','Maracaí','Marapoama','Mariápolis','Marília','Marinópolis','Martinópolis','Matão','Mauá','Mendonça','Meridiano','Mesópolis','Miguelópolis','Mineiros do Tietê','Mira Estrela',
            'Miracatu','Mirandópolis','Mirante do Paranapanema','Mirassol','Mirassolândia','Mococa','Mogi das Cruzes','Mogi Guaçu','Mogi Mirim','Mombuca','Monções','Mongaguá','Monte Alegre do Sul','Monte Alto','Monte Aprazível',
            'Monte Azul Paulista','Monte Castelo','Monte Mor','Monteiro Lobato','Morro Agudo','Morungaba','Motuca','Murutinga do Sul','Nantes','Narandiba','Natividade da Serra','Nazaré Paulista','Neves Paulista','Nhandeara',
            'Nipoã','Nova Aliança','Nova Campina','Nova Canaã Paulista','Nova Castilho','Nova Europa','Nova Granada','Nova Guataporanga','Nova Independência','Nova Luzitânia','Nova Odessa','Novais','Novo Horizonte','Nuporanga',
            'Ocauçu','Óleo','Olímpia','Onda Verde','Oriente','Orindiúva','Orlândia','Osasco','Oscar Bressane','Osvaldo Cruz','Ourinhos','Ouro Verde','Ouroeste','Pacaembu','Palestina','Palmares Paulista','Palmeira d’Oeste',
            'Palmital','Panorama','Paraguaçu Paulista','Paraibuna','Paraíso','Paranapanema','Paranapuã','Parapuã','Pardinho','Pariquera-Açu','Parisi','Patrocínio Paulista','Paulicéia','Paulínia','Paulistânia','Paulo de Faria',
            'Pederneiras','Pedra Bela','Pedranópolis','Pedregulho','Pedreira','Pedrinhas Paulista','Pedro de Toledo','Penápolis','Pereira Barreto','Pereiras','Peruíbe','Piacatu','Piedade','Pilar do Sul','Pindamonhangaba',
            'Pindorama','Pinhalzinho','Piquerobi','Piquete','Piracaia','Piracicaba','Piraju','Pirajuí','Pirangi','Pirapora do Bom Jesus','Pirapozinho','Pirassununga','Piratininga','Pitangueiras','Planalto','Platina','Poá',
            'Poloni','Pompeia','Pongaí','Pontal','Pontalinda','Pontes Gestal','Populina','Porangaba','Porto Feliz','Porto Ferreira','Potim','Potirendaba','Pracinha','Pradópolis','Praia Grande','Pratânia','Presidente Alves',
            'Presidente Bernardes','Presidente Epitácio','Presidente Prudente','Presidente Venceslau','Promissão','Quadra','Quatá','Queiroz','Queluz','Quintana','Rafard','Rancharia','Redenção da Serra','Regente Feijó',
            'Reginópolis','Registro','Restinga','Ribeira','Ribeirão Bonito','Ribeirão Branco','Ribeirão Corrente','Ribeirão do Sul','Ribeirão dos Índios','Ribeirão Grande','Ribeirão Pires','Ribeirão Preto','Rifaina',
            'Rincão','Rinópolis','Rio Claro','Rio das Pedras','Rio Grande da Serra','Riolândia','Riversul','Rosana','Roseira','Rubiácea','Rubinéia','Sabino','Sagres','Sales','Sales Oliveira','Salesópolis','Salmourão',
            'Saltinho','Salto','Salto de Pirapora','Salto Grande','Sandovalina','Santa Adélia','Santa Albertina','Santa Bárbara do Oeste','Santa Branca','Santa Clara d’Oeste','Santa Cruz da Conceição','Santa Cruz da Esperança',
            'Santa Cruz das Palmeiras','Santa Cruz do Rio Pardo','Santa Ernestina','Santa Fé do Sul','Santa Gertrudes','Santa Isabel','Santa Lúcia','Santa Maria da Serra','Santa Mercedes','Santa Rita d’Oeste',
            'Santa Rita do Passa Quatro','Santa Rosa de Viterbo','Santa Salete','Santana da Ponte Pensa','Santana de Parnaíba','Santo Anastácio','Santo André','Santo Antônio da Alegria','Santo Antônio de Posse',
            'Santo Antônio do Aracanguá','Santo Antônio do Jardim','Santo Antônio do Pinhal','Santo Expedito','Santópolis do Aguapeí','Santos','São Bento do Sapucaí','São Bernardo do Campo','São Caetano do Sul',
            'São Carlos','São Francisco','São João da Boa Vista','São João das Duas Pontes','São João de Iracema','São João do Pau-d’Alho','São Joaquim da Barra','São José da Bela Vista','São José do Barreiro',
            'São José do Rio Pardo','São José do Rio Preto','São José dos Campos','São Lourenço da Serra','São Luiz do Paraitinga','São Manuel','São Miguel Arcanjo','São Paulo','São Pedro','São Pedro do Turvo',
            'São Roque','São Sebastião','São Sebastião da Grama','São Simão','São Vicente','Sarapuí','Sarutaiá','Sebastianópolis do Sul','Serra Azul','Serra Negra','Serrana','Sertãozinho','Sete Barras','Severínia',
            'Silveiras','Socorro','Sorocaba','Sud Mennucci','Sumaré','Suzanápolis','Suzano','Tabapuã','Tabatinga','Taboão da Serra','Taciba','Taguaí','Taiaçu','Taiuva','Tambaú','Tanabi','Tapiraí','Tapiratiba','Taquaral',
            'Taquaritinga','Taquarituba','Taquarivaí','Tarabai','Tarumã','Tatuí','Taubaté','Tejupá','Teodoro Sampaio','Terra Roxa','Tietê','Timburi','Torre de Pedra','Torrinha','Trabiju','Tremembé','Três Fronteiras',
            'Tuiuti','Tupã','Tupi Paulista','Turiúba','Turmalina','Ubarana','Ubatuba','Ubirajara','Uchoa','União Paulista','Urânia','Uru','Urupês','Valentim Gentil','Valinhos','Valparaíso','Vargem','Vargem Grande do Sul',
            'Vargem Grande Paulista','Várzea Paulista','Vera Cruz','Vinhedo','Viradouro','Vista Alegre do Alto','Vitória Brasil','Votorantim','Votuporanga','Zacarias'
        ]
    },
    {
        state: 'SE',
        cities: [
            'Amparo de São Francisco','Aquidabã','Aracaju','Arauá','Areia Branca','Barra dos Coqueiros','Boquim','Brejo Grande','Campo do Brito','Canhoba','Canindé de São Francisco','Capela','Carira','Carmópolis',
            'Cedro de São João','Cristinápolis','Cumbe (Sergipe)','Divina Pastora','Estância','Feira Nova','Frei Paulo','Gararu','General Maynard','Gracho Cardoso','Ilha das Flores','Indiaroba','Itabaiana (Sergipe)',
            'Itabaianinha','Itabi','Itaporanga d’Ajuda','Japaratuba','Japoatã','Lagarto (Sergipe)','Laranjeiras','Macambira','Malhada dos Bois','Malhador','Maruim','Moita Bonita','Monte Alegre de Sergipe','Muribeca',
            'Neópolis','Nossa Senhora Aparecida','Nossa Senhora da Glória','Nossa Senhora das Dores','Nossa Senhora de Lourdes','Nossa Senhora do Socorro','Pacatuba','Pedra Mole','Pedrinhas','Pinhão','Pirambu','Porto da Folha',
            'Poço Redondo','Poço Verde','Propriá','Riachuelo (Sergipe)','Riachão do Dantas','Ribeirópolis','Rosário do Catete','Salgado (Sergipe)','Santa Luzia do Itanhy','Santa Rosa de Lima','Santana do São Francisco',
            'Santo Amaro das Brotas','Simão Dias','Siriri (Sergipe)','São Cristóvão','São Domingos','São Francisco','São Miguel do Aleixo','Telha','Tobias Barreto','Tomar do Geru','Umbaúba'
        ]
    },
    {
        state: 'TO',
        cities: [
            'Abreulândia','Aguiarnópolis','Aliança do Tocantins','Almas','Alvorada','Ananás','Angico','Aparecida do Rio Negro','Aragominas','Araguacema','Araguaçu','Araguaína','Araguanã','Araguatins','Arapoema','Arraias',
            'Augustinópolis','Aurora do Tocantins','Axixá do Tocantins','Babaçulândia','Bandeirantes do Tocantins','Barra do Ouro','Barrolândia','Bernardo Sayão','Bom Jesus do Tocantins','Brasilândia do Tocantins',
            'Brejinho de Nazaré','Buriti do Tocantins','Cachoeirinha','Campos Lindos','Cariri do Tocantins','Carmolândia','Carrasco Bonito','Caseara','Centenário','Chapada da Natividade','Chapada de Areia','Colinas do Tocantins',
            'Colméia','Combinado','Conceição do Tocantins','Couto de Magalhães','Cristalândia','Crixás do Tocantins','Darcinópolis','Dianópolis','Divinópolis do Tocantins','Dois Irmãos do Tocantins','Dueré','Esperantina',
            'Fátima','Figueirópolis','Filadélfia','Formoso do Araguaia','Fortaleza do Tabocão','Goianorte','Goiatins','Guaraí','Gurupi','Ipueiras','Itacajá','Itaguatins','Itapiratins','Itaporã do Tocantins','Jaú do Tocantins',
            'Juarina','Lagoa da Confusão','Lagoa do Tocantins','Lajeado','Lavandeira','Lizarda','Luzinópolis','Marianópolis do Tocantins','Mateiros','Maurilândia do Tocantins','Miracema do Tocantins','Miranorte','Monte do Carmo',
            'Monte Santo do Tocantins','Muricilândia','Natividade','Nazaré','Nova Olinda','Nova Rosalândia','Novo Acordo','Novo Alegre','Novo Jardim','Oliveira de Fátima','Palmas','Palmeirante','Palmeiras do Tocantins',
            'Palmeirópolis','Paraíso do Tocantins','Paranã','Pau d’Arco','Pedro Afonso','Peixe','Pequizeiro','Pindorama do Tocantins','Piraquê','Pium','Ponte Alta do Bom Jesus','Ponte Alta do Tocantins',
            'Porto Alegre do Tocantins','Porto Nacional','Praia Norte','Presidente Kennedy','Pugmil','Recursolândia','Riachinho','Rio da Conceição','Rio dos Bois','Rio Sono','Sampaio','Sandolândia','Santa Fé do Araguaia',
            'Santa Maria do Tocantins','Santa Rita do Tocantins','Santa Rosa do Tocantins','Santa Tereza do Tocantins','Santa Terezinha do Tocantins','São Bento do Tocantins','São Félix do Tocantins','São Miguel do Tocantins',
            'São Salvador do Tocantins','São Sebastião do Tocantins','São Valério da Natividade','Silvanópolis','Sítio Novo do Tocantins','Sucupira','Taguatinga','Taipas do Tocantins','Talismã','Tocantínia','Tocantinópolis',
            'Tupirama','Tupiratins','Wanderlândia','Xambioá'
        ]
    }

]


let search;
let n = true;
let count = 0;
let yourGame = {};
let pixCode;
let startDate;
let endDate;
let countdownInterval;
let cobr;

function changeNumber(n) {
        
    if(selectedNumbers.includes(n)){
        selectedNumbers = selectedNumbers.filter(num => num !== n);
        document.getElementById(`num-${n}`).classList.remove('selected');
    }else{

        if(selectedNumbers.length < 15){
            selectedNumbers.push(n);
            document.getElementById(`num-${n}`).classList.add('selected');
        }else{
            showToast('Você já escolheu 15 números!');
        }
    }

    if(selectedNumbers.length === 15){
        document.getElementById('sendBtn').style.display = 'block';
    }else{
        document.getElementById('sendBtn').style.display = 'none';
    }
}

function clearNumbers() {
    
    selectedNumbers.forEach(n => {
        document.getElementById(`num-${n}`).classList.remove('selected');
    });

    selectedNumbers = [];
    document.getElementById('sendBtn').style.display = 'none';

}

function sendNumbers() {

    yourGame.numbers = selectedNumbers.sort((a, b) => a - b);

    var sl1 = selectedNumbers.slice(0, 5);
    var sl2 = selectedNumbers.slice(5, 10);
    var sl3 = selectedNumbers.slice(10, 15);

    const listConfirmation = document.getElementById('listConfirmation');
    listConfirmation.innerHTML = sl1.join(' - ');

    const listConfirmationSec = document.getElementById('listConfirmationSec');
    listConfirmationSec.innerHTML = sl2.join(' - ');

    const listConfirmationThr = document.getElementById('listConfirmationThr');
    listConfirmationThr.innerHTML = sl3.join(' - ');

    document.getElementById('listNumbers').style.display = 'none';
    document.getElementById('confirmationDiv').style.display = 'block';

}

function changeNumbers() {
    document.getElementById('listNumbers').style.display = 'block';
    document.getElementById('confirmationDiv').style.display = 'none';
}

function toRegister() {

    document.getElementById('registerDiv').style.display = 'block';
    document.getElementById('confirmationDiv').style.display = 'none';

    const stateSelect = document.getElementById('stateSelect');
    
    statesList.forEach(function(state) {
        let option = document.createElement('option');
        option.value = state;
        option.text = state;
        stateSelect.appendChild(option);
    });

}

function populateCities() {

    const stateSelect = document.getElementById('stateSelect');
    const citySelect = document.getElementById('citySelect');
    const selectedState = stateSelect.value;

    citySelect.innerHTML = '<option value="">Selecione uma cidade</option>';

    if(selectedState){

        const stateCities = citiesList.find(item => item.state === selectedState);

        if(stateCities){

            stateCities.cities.forEach(function(city) {

                let option = document.createElement('option');
                option.value = city;
                option.text = city;
                citySelect.appendChild(option);

            });

            citySelect.disabled = false;

        }else{
            
            citySelect.disabled = true;

        }
    }else{

        citySelect.disabled = true;

    }

}

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

function validateEmail() {

    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(emailPattern.test(email)){
        emailError.style.display = 'none';
    }else{
        emailError.style.display = 'block';
    }

}

userForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    try {

        const formAux = document.getElementById('userForm');

        let reg = {
            name: formAux.elements['completeName'].value,
            document: formAux.elements['document'].value,
            email: formAux.elements['email'].value,
            state: formAux.elements['stateSelect'].value,
            city: formAux.elements['citySelect'].value,
            accessCode: formAux.elements['accessCode'].value
        };

        yourGame.register = reg;

        document.getElementById('paymentDiv').style.display = 'block';
        document.getElementById('registerDiv').style.display = 'none';
        search = true;

        generatePix();

    } catch(error){
        console.error('Erro ao enviar dados: ', error);
    }
});

async function generatePix() {

    const calendario = {
        expiracao: 300
    };

    const devedor = {
        cpf: document.getElementById('document').value.replace(/\./g, '').replace('-', ''),
        nome: document.getElementById('completeName').value
    };

    const valor = {
        original: '10.00'
    };

    const req = {
        calendario: calendario,
        devedor: devedor,
        valor: valor,
        chave: "a3544ca7-2917-44e4-81f8-69a98430627b",
        solicitacaoPagador: "Jogo no New Lottery - Seven To Win"
    };

    try {

        const response = await fetch('https://nlb01.up.railway.app/pix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        });

        if(response.ok){

            const r = await response.json();
            pixCode = r.pixCopiaECola;
            generateQRCode(r.location);
            document.getElementById('pixCodeDiv').innerText = pixCode;

            yourGame.pixData = r,
            yourGame.paymentStatus = 'WAITING';

            startDate = new Date();
            endDate = new Date();
            endDate.setDate(endDate.getDate() + 2);

            countdownBreak();

        }else{
            console.error('Erro na criação da cobrança PIX:', response.statusText);
        }

    }catch (error){

        console.error('Erro ao fazer a solicitação:', error);

    }

}

function generateQRCode(location) {

    document.getElementById("qrcode").innerHTML = "";
    
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: location,
        width: 128, // Largura do QR Code
        height: 128, // Altura do QR Code
        colorDark : "#000000", // Cor escura
        colorLight : "#ffffff", // Cor clara
        correctLevel : QRCode.CorrectLevel.H // Nível de correção de erro
    });

}

function countdownBreak() {

    let now = new Date();
    let tm = (now.getTime() - startDate.getTime()) / 1000;

    let min = Math.floor((tm / 60) % 60);
    let seg = Math.floor(tm % 60);

    let minFormat = ("00" + min).slice(-2);
    let segFormat = ("00" + seg).slice(-2);

    document.getElementById("countdownBreakView").innerText = minFormat + ":" + segFormat;

    if(min < 5 && search){

        countdownInterval = setTimeout(countdownBreak, 1000);
        checkResponsePix();
        count++;

    }else{

        clearTimeout(countdownInterval);

        if(search){

            search = false;
            document.getElementById('paymentDiv').style.display = 'none';
            document.getElementById('registerDiv').style.display = 'block';

        }else{

            document.getElementById('paymentDiv').style.display = 'none';
            document.getElementById('waitingDiv').style.display = 'block';

            setTimeout(() => {

                if(yourGame.pixData.paymentStatus === 'CONCLUIDA'){
                    generateGameId();
                }

            }, 5000);

        }

    }

}

function copyPixCode() {

    navigator.clipboard.writeText(pixCode).then(() => {
        console.log('Código PIX copiado para a área de transferência!');
    }).catch(err => {
        console.error('Falha ao copiar o código PIX: ', err);
    });

}

async function checkResponsePix() {

    let req = {
        inicio: startDate.getFullYear() + '-' + 
                ('00' + (startDate.getMonth()+1)).slice(-2) + '-' +
                ('00' + (startDate.getDate())).slice(-2) +
                'T00:00:00.000Z',
        fim: endDate.getFullYear() + '-' + 
             ('00' + (endDate.getMonth()+1)).slice(-2) + '-' +
             ('00' + (endDate.getDate())).slice(-2) +
             'T00:00:00.000Z',
        txid: yourGame.pixData.txid
    };

    let queryString = new URLSearchParams(req).toString();

    const response = await fetch(`https://nlb01.up.railway.app/pix?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){

        const data = await response.json();
        console.log(data);
        console.log(data.status);
        console.log(n);

        if(data.status === 'CONCLUIDA'){

            if(n){

                search = false;
                cob = data;
                yourGame.pixData = cob;
                yourGame.pixData.paymentStatus = 'CONCLUIDA';

            }

        }

    }

}

function generateGameId() {

    let now = new Date();
    const form = document.getElementById('userForm');

    const completeName = form.elements['completeName'].value;
    const documentValue = form.elements['document'].value;
    const email = form.elements['email'].value;

    let id = gameRef +
             '.' +
             documentValue.replace('.', '').replace('.', '').replace('-', '').substr(3, 3) +
             '.' +
             documentValue.replace('.', '').replace('.', '').replace('-', '').substr(6, 3) +
             '.' +
             now.getFullYear() +
             ('00' + (now.getMonth() + 1)).slice(-2) +
             ('00' + now.getDate()).slice(-2) +
             '.' + 
             ('00' + now.getHours()).slice(-2) +
             ('00' + now.getMinutes()).slice(-2) +
             ('00' + now.getSeconds()).slice(-2) +
             ('00' + now.getMilliseconds()).slice(-3);

    yourGame.id = id;

    let em = {
        id: yourGame.id,
        to: email,
        name: completeName
    };
  
    let price = 10;
    let tax = price * 0.0119;
    let prim = price - tax;
    let exise = prim * 0.275;
    let sec = prim - exise
  
    let v = {
        date: new Date,
        price: price,
        tax: tax,
        exise: exise,
        value: sec,
        hits: 0
    };
  
    yourGame.values = v;
  
    let g = {
        id: gameRef,
        bet: yourGame
    };

    updateGameBets(g).then(async () => {

        try {

            const response = await fetch('https://nlb01.up.railway.app/email/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(em)
            });
    
            if(response.ok){
                
                document.getElementById('waitingDiv').style.display = 'none';
                document.getElementById('doneDiv').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '../../index.html'
                }, 5000);

            }else{
                console.error('Erro no envio do E-Mail:', response.statusText);
            }
    
        }catch (error){   
            console.error('Erro ao fazer a solicitação:', error);
        }

    });

}

async function updateGameBets(data) {

    const reference = db.doc("/games/sevenToWin");

    try {

        let change = await reference.update({
            bets: firebase.firestore.FieldValue.arrayUnion(data.bet)
        });

        return change;

    } catch (error) {
        console.error("Erro ao atualizar as apostas:", error);
        throw error;
    }

}

function showToast(message) {

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerText = message;

    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#f44336'; // Cor semelhante ao 'danger'
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    toast.style.fontSize = '16px';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);

}

///////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {

    db.collection('games').doc('sevenToWin').get().then((doc) => {

        if(doc.exists){

            gameRef = doc.get('gameid');
            document.getElementById('listNumbers').style.display = 'block';

        }else{
            console.log('Nenhum documento encontrado!');
        }

    });

});

document.getElementById('videoLink').addEventListener('click', function() {

    var videoContainer = document.getElementById('videoContainer');
    var youtubeVideo = document.getElementById('youtubeVideo');
    
    youtubeVideo.src = "https://www.youtube.com/embed/wYo_F_BVdAg";
    
    videoContainer.style.display = 'block';

});
