const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY="AIzaSyAav2aOA8yna5T2Nq4Pkr9aAFzQ4iTumQ0";



function getDataFromApi(searchTerm, callback){
	const query = {
		q: `${searchTerm}`,
		part:'snippet',
		key:'AIzaSyAav2aOA8yna5T2Nq4Pkr9aAFzQ4iTumQ0',
		type: 'video'
	};
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result){
	const videoID = result.id.videoId;
	console.log(videoID)
	const url = "https://www.youtube.com/watch?v=" + videoID;
	return `
	<li>
		<a href="${url}"><img src="${result.snippet.thumbnails.medium.url}"></a> <a href="${url}" class="title">${result.snippet.title}</a>
	</li>
	`
}

function displayYoutubeSearchResults(data){
	const results = data.items.map((item) => renderResult(item));
	$('.js-results').html(results);
}

function watchSubmit(){
	$('.js-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(this).find('.js-query');
		const query = queryTarget.val();

		queryTarget.val("");
		getDataFromApi(query, displayYoutubeSearchResults);
		$('.hidden').removeClass('hidden');
	});
}

$(watchSubmit);