async function getQuestion(url) {
	fetch(url).then(response => response.json()).catch(error => { console.log(error); }).then(() => console.log("Complete"));
}

getQuestion("http://localhost:8000/test/send");