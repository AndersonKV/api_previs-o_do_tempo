(function global() {
const city = document.querySelector('#city');
const btn = document.querySelector('.my-container--input-group-addon');

let apiDate = ([]);
let apiWeekday = ([]);

//espera de evento no input
city.addEventListener("keydown", async function(e) {

	if(e.keyCode == 13 && city.value.length == 0) { alert('digite algo') }

	else if (e.keyCode == 13) {

	let url1 = 'http://api.openweathermap.org/data/2.5/weather?q='+city.value+'&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
	let url2 = 'http://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
 
 	Promise.all([
 		fetch(url1).then(cidade => cidade.json()),
		fetch(url2).then(semana => semana.json())
		])
		.then((previsao) => {
		apiDate.push(previsao[0])
		apiWeekday.push(previsao[1])
		createAnimation();
		setTimeout(function() { template(); }, 1300);
	})
	.catch((err) => {console.log(err); });

 	}
}) 

//espera de evento no btn/lupa
btn.addEventListener("click", async function(e) {
	if(city.value.length == 0) { alert('digite algo') }

	else {
	let url1 = 'http://api.openweathermap.org/data/2.5/weather?q='+city.value+'&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
	let url2 = 'http://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
 
 	Promise.all([
 		fetch(url1).then(cidade => cidade.json()),
		fetch(url2).then(semana => semana.json())
		])
		.then((previsao) => {
		apiDate.push(previsao[0])
		apiWeekday.push(previsao[1])
		createAnimation();
		setTimeout(function() { template(); }, 1300);
	})
	.catch((err) => {console.log(err); });

	}
});

function createAnimation() {
	const divAnimation = document.createElement('img');
	divAnimation.classList.add('div-animation')
	divAnimation.src = 'js/load.gif';		 
	document.querySelector('.show').insertBefore(divAnimation, document.querySelector('.show').childNodes[0]);
}

async function template() {
	console.log(apiDate)
	console.log(apiWeekday)
 	const model = `
	 	<div class="my-container--weather-forecast-requested animation">
		 	<h4>${apiDate[0].name}, <span>${apiDate[0].sys.country}</span></h4>
		 	<h1>${apiDate[0].weather[0].description}</h1>
   		 	<div class="weather-thermal-sensation">
		 		<p class="weather-down"><i class="fas fa-arrow-down"></i><span>${apiDate[0].main.temp_min}</span>º</p>
 		 		<p class="weather-up"><i class="fas fa-arrow-up"></i><span>${apiDate[0].main.temp_max}</span>º</p>
		 		<p class="weather-thermal">Sesanção <span>${apiDate[0].main.temp}</span>ºC</p>
		 	</div>
		 	<div class="wind-and-humidity">
		 		<p class="weather-wind">Vento <span>${apiDate[0].wind.speed}km/h</span></p>
		 		<p class="weather-humidity">Humidade <span>${apiDate[0].main.humidity}</span>%</p>
		 	</div>
		 	<hr class="hr-1">
		 	<div class="weekday">
 				<div class="weather-day"><p>Terça</p><span class="first-span">${apiWeekday[0].list[0].main.temp_min}</span>º<span class="second-span">${apiWeekday[0].list[0].main.temp_max}</span>º</div>
 				<div class="weather-day"><p>Quarta</p><span class="first-span">${apiWeekday[0].list[1].main.temp_min}</span>º<span class="second-span">${apiWeekday[0].list[1].main.temp_max}</span>º</div>
 				<div class="weather-day"><p>Quinta</p><span class="first-span">${apiWeekday[0].list[2].main.temp_min}</span>º<span class="second-span">${apiWeekday[0].list[2].main.temp_max}</span>º</div>
 				<div class="weather-day"><p>Sexta</p><span class="first-span">${apiWeekday[0].list[3].main.temp_min}</span>º<span class="second-span">${apiWeekday[0].list[3].main.temp_max}</span>º</div>
 				<div class="weather-day"><p>Sabado</p><span class="first-span">${apiWeekday[0].list[4].main.temp_min}</span>º<span class="second-span">${apiWeekday[0].list[4].main.temp_max}</span>º</div>
 		 	</div>
	 	</div>
	`;

 	
  	const div = document.createElement("div");
	div.innerHTML = model;
	document.querySelector('.show').insertBefore(div, document.querySelector('.show').childNodes[0]);
 	
 	//verifica se a região e brasil e traduz o clima
 	verifyCountryAndWeather();
 	//formata os numeros do dia da semana
 	dataModeling();

 	//remove animação
 	document.querySelector('.div-animation').remove();
}

function verifyCountryAndWeather() {
	let country = document.querySelector('.my-container--weather-forecast-requested h4 span').innerText;
	let h1 = document.querySelector('.my-container--weather-forecast-requested h1');
	let time = document.querySelector('.my-container--weather-forecast-requested h1').innerText;

	if(country == "BR") {

		let change = country.replace("BR", "Brasil");
		document.querySelector('.my-container--weather-forecast-requested h4 span').innerText = change;

	switch (time) {
		/*Group 2xx: Thunderstorm*/

		case "thunderstorm with light rain":
	 		h1.innerText = 'trovoada com chuva fraca';
	  		break;

		case "thunderstorm with rain":
	 		h1.innerText = 'trovoada com chuva';
	 		break;

	 	case "thunderstorm with heavy rain":
	 		h1.innerText = 'tempestade com chuva forte';
	 		break;

	 	case "light thunderstorm":
	 		h1.innerText = 'trovoada leve';
	 		break;

	 	case "thunderstorm":
	 		h1.innerText = 'trovoada';
	 		break;

	 	case "heavy thunderstorm":
	 		h1.innerText = 'trovoada intensa';
	 		break;

	 	case "ragged thunderstorm":
	 		h1.innerText = 'tempestade irregular';
	 		break;

	 	case "thunderstorm with light drizzle	":
	 		h1.innerText = 'trovoada com chuviscos leves';
	 		break;

	 	case "thunderstorm with drizzle	":
	 		h1.innerText = 'chuva leve';
	 		break;	

		case "thunderstorm with drizzle	":
	 		h1.innerText = 'trovoada com chuviscos pesados';
	 		break;	

	 	/*Group 3xx: Drizzle*/
	    
	 	case "light intensity drizzle":
	 		h1.innerText = 'chuvisco de intensidade de luz';
			break;

		case "drizzle":
	 		h1.innerText = 'chuvisco';
			break;

		case "heavy intensity drizzle":
	 		h1.innerText = 'chuviscos intensos';
			break;

		case "light intensity drizzle rain":
	 		h1.innerText = 'intensidade leve chuva chuvisco';
			break;

		case "drizzle rain":
	 		h1.innerText = 'chuvisco';
			break;

		case "heavy intensity drizzle rain":
	 		h1.innerText = 'forte chuva intensa chuvisco';
			break;

		case "shower rain and drizzle":
	 		h1.innerText = 'chuva de chuva e chuvisco';
			break;

		case "heavy shower rain and drizzle":
	 		h1.innerText = 'chuva forte e chuvisco';
			break;

		case "shower drizzle":
	 		h1.innerText = 'chuvisco do chuveiro';
			break;

		/*Group 5xx: Rain*/

		case "light rain":
	 		h1.innerText = 'chuva leve';
			break;

		case "moderate rain	":
	 		h1.innerText = 'chuva moderada';
			break;

		case "heavy intensity rain":
	 		h1.innerText = 'chuva intensa';
			break;

		case "very heavy rain":
	 		h1.innerText = 'chuva muito forte';
			break;

		case "extreme rain":
	 		h1.innerText = 'chuva extrema';
			break;

		case "freezing rain	":
	 		h1.innerText = 'chuva congelante';
			break;

		case "light intensity shower rain":
	 		h1.innerText = 'chuva intensa com chuva intensa';
			break;

		case "shower rain":
	 		h1.innerText = 'chuva de banho';
			break;

		case "heavy intensity shower rain":
	 		h1.innerText = 'chuva forte de chuva intensa';
			break;

		case "ragged shower rain":
	 		h1.innerText = 'chuva de chuva irregular';
			break;

		/*Group 6xx: Snow*/

		case "light snow":
	 		h1.innerText = 'pouca neve';
			break;

		case "Snow":
	 		h1.innerText = 'neve';
			break;

		case "Heavy snow":
	 		h1.innerText = 'Neve pesada';
			break;

		case "Sleet":
	 		h1.innerText = 'achuva com neve';
			break;

		case "Light shower sleet":
	 		h1.innerText = 'Granizo leve';
			break;

		case "Shower sleet":
	 		h1.innerText = 'chuva de granizo';
			break;

		case "Light rain and snow":
	 		h1.innerText = 'Chuva e neve fraca';
			break;

		case "Rain and snow":
	 		h1.innerText = 'chuva e neve';
			break;

		case "Light shower snow":
	 		h1.innerText = 'Nevoeiro leve';
			break;

		case "Shower snow":
	 		h1.innerText = 'Neve no chuveiro';
			break;

		case "Heavy shower snow":
	 		h1.innerText = 'Neve pesada';
			break;

		/*Group 7xx: Atmosphere*/

		case "mist":
	 		h1.innerText = 'névoa';
		break;

		case "Smoke":
	 		h1.innerText = 'Fumaça';
		break;

		case "Haze":
	 		h1.innerText = 'Neblina';
		break;

		case "sand/ dust whirls":
	 		h1.innerText = 'turbilhões de areia / poeira';
		break;

		case "fog":
	 		h1.innerText = 'névoa';
		break;

		case "sand":
	 		h1.innerText = 'areia';
		break;

		case "dust":
	 		h1.innerText = 'poeira';
		break;

		case "volcanic ash":
	 		h1.innerText = 'cinza vulcanica';
		break;

		case "squalls":
	 		h1.innerText = 'rajadas';
		break;

		case "tornado":
	 		h1.innerText = 'tornado';
		break;

		/*Group 800: Clear*/

		case "clear sky":
	 		h1.innerText = 'céu limpo';
		break;

		/*Group 80x: Clouds*/
		case "few clouds":
	 		h1.innerText = 'poucas nuvens';
		break;

		case "scattered clouds":
	 		h1.innerText = 'nuvens dispersas';
		break;

		case "broken clouds":
	 		h1.innerText = 'nuvens quebradas';
		break;

		case "overcast clouds":
	 		h1.innerText = 'nuvens nubladas';
		break;

		} 
 
	}
}

function dataModeling() {
	//previsão baixa
	let weather_down = document.querySelector('.weather-down span');
	//previsão alta
 	let weather_up = document.querySelector('.weather-up span');
 	//sensação termica
 	let wind_and_humidity = document.querySelector('.weather-thermal-sensation .weather-thermal span');
 	//numero dos dias da semana
 	let weather_day = document.querySelectorAll('.weather-day .first-span');
	let weather_day_2 = document.querySelectorAll('.weather-day .second-span');

	//loop para modelar todos os numeros do dia da semana
	for(i = 0; i < weather_day.length; i++) {
  		let formated_day = weather_day[i].innerText.substring(0, 2)
 		document.querySelectorAll('.weather-day .first-span')[i].innerText = formated_day;
	}

	for(l = 0; l < weather_day_2.length; l++) {
		let formated_day_2 = weather_day_2[l].innerText.substring(0, 2)
		document.querySelectorAll('.weather-day .second-span')[l].innerText = formated_day_2;
	}
	//formtada os numeros deixando apenas dois
  	let formated_down = weather_down.innerText.substring(0, 2)
  	let formated_up = weather_up.innerText.substring(0, 2)
  	let formated_wind = wind_and_humidity.innerText.substring(0, 2)
 
 	document.querySelector('.weather-down span').innerText = formated_down
 	document.querySelector('.weather-up span').innerText = formated_up;

 	document.querySelector('.weather-thermal-sensation .weather-thermal span').innerText = formated_wind;	
}

let rj = 'http://api.openweathermap.org/data/2.5/forecast?q=rio de janeiro&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let sp = 'http://api.openweathermap.org/data/2.5/forecast?q=são paulo&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let bh = 'http://api.openweathermap.org/data/2.5/forecast?q=belo horizonte&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let br = 'http://api.openweathermap.org/data/2.5/forecast?q=brasília&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let be = 'http://api.openweathermap.org/data/2.5/forecast?q=belém&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let sa = 'http://api.openweathermap.org/data/2.5/forecast?q=Salvador&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let cu = 'http://api.openweathermap.org/data/2.5/forecast?q=Curitiba&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let fo = 'http://api.openweathermap.org/data/2.5/forecast?q=Fortaleza&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let ma = 'http://api.openweathermap.org/data/2.5/forecast?q=Manaus&APPID=c9e521ce9d19eaee59d2bac74f6410a9'
let jo = 'http://api.openweathermap.org/data/2.5/forecast?q=João Pessoa&APPID=c9e521ce9d19eaee59d2bac74f6410a9'



//req da previsão do tempo da semana
Promise.all([
	fetch(rj).then((rj, index) => rj.json()),
	fetch(sp).then((sp, index) => sp.json()),
	fetch(bh).then((bh, index) => bh.json()),
	fetch(br).then((br, index) => br.json()),
	fetch(be).then((be, index) => be.json()),
	fetch(sa).then((sa, index) => sa.json()),
	fetch(cu).then((cu, index) => cu.json()),
	fetch(fo).then((fo, index) => fo.json()),
	fetch(ma).then((ma, index) => ma.json()),
	fetch(jo).then((jo, index) => jo.json())
	])
	.then((weather) => {

	 	weather.filter((w, n) => {
 			const model = ` <span class="weather-min">${w.list[n].main.temp_min.toString().substr(0, 2)}º</span> <span class="weather-max">${w.list[n].main.temp_max.toString().substr(0, 2)}º</span> <span class="weather-city">${w.city.name}</span> `; const div = document.createElement("div");
		 	div.classList.add('my-container--row-weather')
		 	div.classList.add('animation')
		 	div.innerHTML = model
		 	if(n <= 4) {document.querySelector('.my-container--row--col-sm-left').append(div)}
	  		if(n >= 5) {document.querySelector('.my-container--row--col-sm-right').append(div)}
			 
		})
 	})

.catch((err) => {console.log(err); });
 
/*finalização final da function global*/
})();
