/*
 Copyright 2014 Google Inc. All rights reserved - 2014-2015 Adrián Arroyo Calle

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

function setup(window) {

  if (!!window.cookieChoices) {
    return window.cookieChoices;
  }

  var document = window.document;
  // IE8 does not support textContent, so we should fallback to innerText.
  var supportsTextContent = 'textContent' in document.body;

  var cookieChoices = (function() {

    var cookieName = 'displayCookieConsent';
    var cookieConsentId = 'cookieChoiceInfo';
    var dismissLinkId = 'cookieChoiceDismiss';

    function _createHeaderElement(cookieText, dismissText, linkText, linkHref) {
      var butterBarStyles = 'position:fixed;width:100%;background-color:#eee;' +
          'margin:0; left:0; top:0;padding:4px;z-index:1000;text-align:center;';

      var cookieConsentElement = document.createElement('div');
      cookieConsentElement.id = cookieConsentId;
      cookieConsentElement.style.cssText = butterBarStyles;
      cookieConsentElement.appendChild(_createConsentText(cookieText));

      if (!!linkText && !!linkHref) {
        cookieConsentElement.appendChild(_createInformationLink(linkText, linkHref));
      }
      cookieConsentElement.appendChild(_createDismissLink(dismissText));
      return cookieConsentElement;
    }

    function _createDialogElement(cookieText, dismissText, linkText, linkHref) {
      var glassStyle = 'position:fixed;width:100%;height:100%;z-index:999;' +
          'top:0;left:0;opacity:0.5;filter:alpha(opacity=50);' +
          'background-color:#ccc;';
      var dialogStyle = 'z-index:1000;position:fixed;left:50%;top:50%';
      //var contentStyle = 'position:relative;left:-50%;margin-top:-25%;' +
      //    'background-color:#fff;padding:20px;box-shadow:4px 4px 25px #888;';
      var contentStyle = "position:fixed;left:0px;top:0px;" +
 			"background-color:#fff;padding:20px;box-shadow:4px 4px 25px #888;";

      var cookieConsentElement = document.createElement('div');
      cookieConsentElement.id = cookieConsentId;

      var glassPanel = document.createElement('div');
      glassPanel.style.cssText = glassStyle;

      var content = document.createElement('div');
      content.style.cssText = contentStyle;

      var dialog = document.createElement('div');
      dialog.style.cssText = dialogStyle;

      var dismissLink = _createDismissLink(dismissText);
      dismissLink.style.display = 'block';
      dismissLink.style.textAlign = 'right';
      dismissLink.style.marginTop = '8px';

      content.appendChild(_createConsentText(cookieText));
      if (!!linkText && !!linkHref) {
        content.appendChild(_createInformationLink(linkText, linkHref));
      }
      content.appendChild(dismissLink);
      dialog.appendChild(content);
      cookieConsentElement.appendChild(glassPanel);
      cookieConsentElement.appendChild(dialog);
      return cookieConsentElement;
    }

    function _setElementText(element, text) {
      if (supportsTextContent) {
        element.textContent = text;
      } else {
        element.innerText = text;
      }
    }

    function _createConsentText(cookieText) {
      var consentText = document.createElement('span');
      _setElementText(consentText, cookieText);
      return consentText;
    }

    function _createDismissLink(dismissText) {
      var dismissLink = document.createElement('a');
      _setElementText(dismissLink, dismissText);
      dismissLink.id = dismissLinkId;
      dismissLink.href = '#';
      dismissLink.style.marginLeft = '24px';
      return dismissLink;
    }

    function _createInformationLink(linkText, linkHref) {
      var infoLink = document.createElement('a');
      _setElementText(infoLink, linkText);
      infoLink.href = linkHref;
      infoLink.target = '_blank';
      infoLink.style.marginLeft = '8px';
      return infoLink;
    }

    function _dismissLinkClick() {
		//EXECUTE COOKIES
		      //EXECUTE COOKIES
		console.log("Click, installing cookies");
		var scripts=document.getElementsByClassName("cookie");
		for(var i=0;i<scripts.length;i++)
		{
			var script=document.createElement("script");
			script.type="text/javascript";
			script.innerHTML=scripts[i].textContent;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
      _saveUserPreference();
      _removeCookieConsent();
      return false;
    }

    function _showCookieConsent(cookieText, dismissText, linkText, linkHref, isDialog) {
      if (_shouldDisplayConsent()) {
        _removeCookieConsent();
        var consentElement = (isDialog) ?
            _createDialogElement(cookieText, dismissText, linkText, linkHref) :
            _createHeaderElement(cookieText, dismissText, linkText, linkHref);
        var fragment = document.createDocumentFragment();
        fragment.appendChild(consentElement);
        document.body.appendChild(fragment.cloneNode(true));
        document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
      }
    }

    function showCookieConsentBar(cookieText, dismissText, linkText, linkHref) {
      _showCookieConsent(cookieText, dismissText, linkText, linkHref, false);
    }

    function showCookieConsentDialog(cookieText, dismissText, linkText, linkHref) {
      _showCookieConsent(cookieText, dismissText, linkText, linkHref, true);
    }

    function _removeCookieConsent() {
      var cookieChoiceElement = document.getElementById(cookieConsentId);
      if (cookieChoiceElement != null) {
        cookieChoiceElement.parentNode.removeChild(cookieChoiceElement);
      }
    }

    function _saveUserPreference() {
      // Set the cookie expiry to one year after today.
      var expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      document.cookie = cookieName + '=y; expires=' + expiryDate.toGMTString();
    }

    function _shouldDisplayConsent() {
      // Display the header only if the cookie has not been set.
      return !document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
    }

    var exports = {};
    exports.showCookieConsentBar = showCookieConsentBar;
    exports.showCookieConsentDialog = showCookieConsentDialog;
    return exports;
  })();

  window.cookieChoices = cookieChoices;
  return cookieChoices;
};

var t=new Object;
t["es"]=new Array;
t["es"].push("Las cookies de este sitio se usan para personalizar el contenido y los anuncios, para ofrecer funciones de medios sociales y para analizar el tráfico. Además, compartimos información sobre el uso que haga del sitio web con nuestros partners de medios sociales, de publicidad y de análisis web.");
t["es"].push("Acepto las cookies");
t["es"].push("Saber más");
t["en"]=new Array;
t["en"].push("We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners.");
t["en"].push("OK");
t["en"].push("Know more");
t["fr"]=new Array;
t["fr"].push("Les cookies nous permettent de personnaliser le contenu et les annonces, d'offrir des fonctionnalités relatives aux médias sociaux et d'analyser notre trafic. Nous partageons également des informations sur l'utilisation de notre site avec nos partenaires de médias sociaux, de publicité et d'analyse.");
t["fr"].push("OK");
t["fr"].push("En savoir plus");
t["de"]=new Array;
t["de"].push("Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website zu analysieren. Außerdem geben wir Informationen zu Ihrer Nutzung unserer Website an unsere Partner für soziale Medien, Werbung und Analysen weiter.");
t["de"].push("OK");
t["de"].push("Details ansehen");
t["pt"]=new Array;
t["pt"].push("Utilizamos cookies para personalizar conteúdo e anúncios, fornecer funcionalidades de redes sociais e analisar o nosso tráfego. Também partilhamos informações acerca da sua utilização do site com os nossos parceiros de redes sociais, publicidade e análise. ");
t["pt"].push("OK");
t["pt"].push("Ver detalhes");
t["it"]=new Array;
t["it"].push("Utilizziamo i cookie per personalizzare i contenuti e gli annunci, fornire le funzioni dei social media e analizzare il nostro traffico. Inoltre forniamo informazioni sul modo in cui utilizzi il nostro sito alle agenzie pubblicitarie, agli istituti che eseguono analisi dei dati web e ai social media nostri partner.");
t["it"].push("OK");
t["it"].push("Visualizza dettagli");
t["ca"]=new Array;
t["ca"].push("Utilitzem les galetes per personalitzar el contingut i els anuncis, per oferir funcions de mitjans socials i per analitzar el trànsit del lloc. També compartim la informació sobre com feu servir el lloc amb els partners de mitjans socials, de publicitat i d'anàlisis amb qui col·laborem.");
t["ca"].push("OK");
t["ca"].push("Mostra els detalls");
t["da"]=new Array;
t["da"].push("Vi bruger cookies til at gøre vores indhold og annoncer mere personligt, til at vise dig funktioner fra de sociale medier og til at analysere vores trafik. Vi deler også oplysninger om din brug af vores website med vores partnere inden for annoncering på sociale medier og med vores analysepartnere.");
t["da"].push("OK");
t["da"].push("Få flere oplysninger");
t["lv"]=new Array;
t["lv"].push("Mēs izmantojam sīkfailus, lai personalizētu saturu un reklāmas, nodrošinātu sociālo saziņas līdzekļu funkcijas un analizētu mūsu datplūsmu. Mēs arī kopīgojam informāciju par to, kā jūs izmantojat mūsu vietni, savos sociālās saziņas līdzekļos, kā arī ar mūsu reklamēšanas un analīzes partneriem.");
t["lv"].push("OK");
t["lv"].push("Skatīt detalizētu informāciju");
t["lt"]=new Array;
t["lt"].push("Naudojame slapukus norėdami suasmeninti turinį ir skelbimus, kad teiktume visuomeninės medijos funkcijas ir galėtume analizuoti savo srautą. Informaciją apie tai, kaip naudojatės svetaine, bendriname su visuomeninės medijos, reklamavimo ir analizės partneriais.");
t["lt"].push("OK");
t["lt"].push("Žr. išsamią informaciją");
t["nl"]=new Array;
t["nl"].push("We gebruiken cookies om content en advertenties te gebruiken, om functies voor social media te bieden en om ons websiteverkeer te analyseren. We delen ook informatie over uw gebruik van onze site met onze partners voor social media, adverteren en analyse. ");
t["nl"].push("OK");
t["nl"].push("Details weergeven");
t["pl"]=new Array;
t["pl"].push("Wykorzystujemy pliki cookie do spersonalizowania treści i reklam, aby oferować funkcje społecznościowe i analizować ruch w naszej witrynie. Informacje o tym, jak korzystasz z naszej witryny, udostępniamy partnerom społecznościowym, reklamowym i analitycznym.");
t["pl"].push("OK");
t["pl"].push("Zobacz szczegóły");
t["sv"]=new Array;
t["sv"].push("Vi använder cookies för att anpassa innehållet och annonserna till användarna, tillhandahålla funktioner för sociala medier och analysera vår trafik. Vi vidarebefordrar information om din användning av vår webbplats till de sociala medier och annons- och analysföretag som vi samarbetar med");
t["sv"].push("OK");
t["sv"].push("Mer information");
t["cs"]=new Array;
t["cs"].push("K personalizaci obsahu a reklam, poskytování funkcí sociálních médií a analýze naší návštěvnosti využíváme soubory cookie. Informace o tom, jak náš web používáte, sdílíme se svými partnery působícími v oblasti sociálních médií, inzerce a analýz.");
t["cs"].push("OK");
t["cs"].push("Zobrazit podrobnosti");

function euro_lang(id){
  var lang=navigator.language || navigator.userLanguage;
  if(t[lang.substring(0,2)]) {
    return t[lang.substring(0,2)][id];
  } else {
    return t["en"][id];
  }
}

function euroCookie(link){
	document.addEventListener("DOMContentLoaded",function(){
    setup(window);
		cookieChoices.showCookieConsentDialog(euro_lang(0),euro_lang(1),euro_lang(2),link);
		function execCookies(){
			var scripts=document.getElementsByClassName("cookie");
			for(var i=0;i<scripts.length;i++)
			{
				insertScript(scripts[i].textContent);
			}
		}
		function insertScript(content){
			var script=document.createElement("script");
			script.type="text/javascript";
			script.innerHTML=content;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
				}
			return "";
		}
		if(getCookie("displayCookieConsent")=="y")
		{
			console.log("Consent already accepted");
			execCookies();
		}
	});
}

if(typeof module !== "undefined"){
  module.exports={euroCookie: euroCookie};
}
