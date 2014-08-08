var artApp = {};

artApp.key = "m4IROGIz";

artApp.init = function(){
	var defaultAnimal = $('#animal').val();
	artApp.getPieces(defaultAnimal);
	$('#animal').on('change', function(){
		var animal = $(this).val();
		artApp.updateTitle(animal);
		// console.log(animal);
		$('#artwork').empty();
		artApp.getPieces(animal);
	});
};

artApp.getPieces = function(query){
	$.ajax({
	  url: 'https://www.rijksmuseum.nl/api/en/collection',
	  type: 'GET',
	  data: {
	    key: artApp.key,
	    format: 'jsonp',
	    q: query
	  },
	  dataType: 'jsonp',
	  success: function(result){
	    // console.log(result.artObjects);
	    artApp.displayPieces(result.artObjects);
	  }
	});
}

artApp.displayPieces = function(data){
	$.each(data, function(i, piece){
		// console.log(piece.longTitle);
		var title = $('<h2>').text(piece.title);
		var artist = $('<p>').addClass('artist').text(piece.principalOrFirstMaker);
		var image = $('<img>').attr('src', piece.webImage.url);
		var artPiece = $('<div>').addClass('piece').append(image, title, artist);
		$('#artwork').append(artPiece);
	});
}

artApp.updateTitle = function(subject) {
	$('#page-title').find("span").text(subject);
}

$(function(){
	artApp.init();
});