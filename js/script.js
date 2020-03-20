/*
*
* Добавить в документ
* <div id="Section">&nbsp;</div>
* <center><div id="map">&nbsp;</div></center>
*
*/

$(function() {
	// Open case	
	$('#SectionMenu').click(function(event){
		
		var elId = event.target.id;		
		var mainlink = "/Content/Detskij-CHelyabinsk/case/section/";
		var loading_data = '';		
		// Загрузка данных по разделу
		switch(elId){
			case 'Biblioteki':
					loading_data = mainlink+"Biblioteki.htm";
				break;
			case 'Muzykalnyeshkoly':
					loading_data = mainlink+"Muzykalnyeshkoly.htm";
				break;
			case 'ParkiSkveryiZooparki':
					loading_data = mainlink+"ParkiSkveryiZooparki.htm";
				break;
			case 'Teatryikino':
					loading_data = mainlink+"Teatryikino.htm";
				break;
			case 'Kulturnodosugovyeuchrezhdeniy':
					loading_data = mainlink+"Kulturnodosugovyeuchrezhdeniy.htm";
				break;
			case 'Muzeiivystavki':
					loading_data = mainlink+"Muzeiivystavki.htm";
				break;
			case 'Centrydetskogotvorchestva':
					loading_data = mainlink+"Centrydetskogotvorchestva.htm";
				break;
			// Undefained
			default: loading_data = "";
		}
		
		// Загрузка данных карты
		$('#Section').empty(); 
		//$('#map').empty();
		parent.document.getElementById("map").innerHTML = '';
		var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
		switch(elId){
			case 'Biblioteki':				
				script.setAttribute('src', 'https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=3u-f0PqKHAciUMjBEuYv8J4fr8UzDVQG&width=600&height=450');
			break;
		}
		
		showContent(loading_data);		
		$('#Section').show();
		parent.document.getElementById("map").appendChild(script);
	}); 
	
});
var imgsign = '<img src="/Content/relax_park/img/sign_excs.png" />';
// создание ajax объекта  
function createRequestObject()
{
	try { return new XMLHttpRequest() }
	catch(e)
	{
		try { return new ActiveXObject('Msxml2.XMLHTTP') }
		catch(e)
		{
			try { return new ActiveXObject('Microsoft.XMLHTTP') }
			catch(e) { return null; }
		}
	}
}
function showContent(link) {
	var cont = parent.document.getElementById('Section');
	var http = createRequestObject();	
	if( http && link != '')
	{
		http.open('get', link);		
		http.onreadystatechange = function ()
		{
			if(http.readyState == 4){
				if (http.status == 200) { cont.innerHTML = http.responseText; }
				// Страница ненайдена
				if (http.status == 404) { cont.innerHTML = imgsign+' Данные не найдены'; }
				// Сервер временно недоступен
				if (http.status == 500) { cont.innerHTML = imgsign+' Сервер временно не доступен'; }
				// Нет доступа
				if (http.status == 403) { cont.innerHTML = imgsign+' Доступ запрещен'; }
			}
		}
		http.send(null);
	}
	else
	{
		ladingtwo();	
	}
}
function ladingtwo() {
	var cont = parent.document.getElementById('Section');	
	cont.innerHTML = imgsign+' Не удалось загрузить данные раздела. Попробуйте перезагрузить страницу.';
}