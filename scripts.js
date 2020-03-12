
var myList = document.getElementById('lista'); // Otetaan <ul> elementti
var userInput = document.getElementById('userInput'); // Otetaan käyttäjän kirjoitettu tekstikenttä
var submitButton = document.getElementById('submitButton'); // Otetaan lähetä nappi
var idCount = 0; // Tehdään tyhjä muuttuja jotta voidaan asettaa jokaiselle "tehtävälle" uniikki id
let deleteButtons = [] // Tehdään tyhjä lista/array jotta voidaan säästää poista-nappuloiden ID:t myöhemmin ja tarkistaa että oikeata nappulaa painetaan


// Palautetaan käyttäjän tekstikentän pituus
function inputLength() {

	return userInput.value.length;
}



// Tehdtään uusi tehtävä elementti meidän <ul> elementtiin
function makeListElement(){

	var x = document.createElement('li'); // Tehdään li-elementti
	x.id = idCount // Asetetaan uuden li-elementin ID:n uniikkiin numeroon
	x.appendChild(document.createTextNode(userInput.value)); // Lisätään käyttäjän teksi
	myList.appendChild(x) // Lisätään li-elementti listaan
	

	var varX = document.createElement('button'); // Tehdään button-elementti joka poistaa li-elementin painaessaan
	varX.id = idCount + "d" // Asetetaan button-elementin uniikki ID samaksi kuin sen li-elementti, mutta lisätään "d" kirjain loppuun jotta scripti eroittaa li ja button-elementit
	varX.classList.add('button-style'); // Lisätään nappulaan css tyyli
	deleteButtons.push(varX.id) // Lisätään button-elementin uniikki ID listaan
	varX.appendChild(document.createTextNode('X')); // Lisätään "x" merkki nappulaan
	x.appendChild(varX); // Lisätään painike li-elementtiin
	idCount += 1 // Lisätään ID laskuriin yksi numero jotta siitä tulee taas uniikki
}


// Lisätään tehtävä Enter-painiketta painamalla
function addToListOnEnter()
{
	if(inputLength() > 0 && event.key === "Enter") // event.which == 13 on enterin painaus
	{
		makeListElement();
		userInput.value = "" // Asetetaan käyttäjän teksti tyhjäksi
	}
}


// Funktio joka lisää listaan jos submit painike on painettu
function addToListOnPress()
{
	if(inputLength() > 0)
	{
		makeListElement();
		userInput.value = "" // Asetetaan käyttäjän teksti tyhjäksi
	}
	
}




// Tarkistetaan onko event argumentti li-elementti
function liCheck(event){
	if (event.target.nodeName == "LI"){
		return event.target // Jos elementti on <li>, palautetaan se
	}
}


// Vaihdetaan li-elementin ulkonäköä
function changeStyle(event){
	var li = liCheck(event);

	try{
		if(li.nodeName == "LI"){ 
			document.getElementById(li.id).classList.toggle('click-changer'); // Vaihdetaan elementin luokan
		}
	}catch(e){

	}
	
	
}

// Tarkistetaan onko event argumentti poista-painike
function btnCheck(event){

	// Tarkistetaan onko event argument elementin ID poisto nappula listassa
	if (deleteButtons.includes(event.target.id) && event.target.nodeName === "BUTTON"){ 
		return true
	}else{
		return false
	}
}


// Poistetaan tehtävä listasta
function deleteListItem(event) {
	try{

		// Jos nappula on poista-nappula
		if (btnCheck(event) === true){

			// Poistetaan "d" kirjain poisto nappulan ID:stä joka on tallennettu listassa. Jotta saataisimme sen nappulan oma li-elementti
			var targetId = event.target.id.replace('d','')
			var target = document.getElementById(targetId)
			target.parentNode.removeChild(target) // poistetaan li-elementti
		}else{

		}

	}catch(e){
	}
}



// Oletus funktio joka tarkistetaan joka kerta kuin käyttäjä painaa nappulaa
function onClickEvent(event){
	deleteListItem(event); // Tarkista onko käyttäjä painanut poisto nappulaa
	changeStyle(event); // Tarkista onko käyttäjä painanut li-elementtiä

}