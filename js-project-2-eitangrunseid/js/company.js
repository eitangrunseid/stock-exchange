const header = document.getElementById("header");
const companyImg = document.getElementById("company-img");
const parDescription = document.getElementById("description");
const companyLink = document.getElementById("company-link");
const companyStockPrice = document.getElementById("stock-price");
const companyStockChange = document.getElementById("stock-change");
const spinnerContainer = document.querySelector(".spinner-container");

const symbol = getUrlParameter("symbol");
let historyDateArray = [];

loadCompany();

async function loadHistoryStocks() {
    const historyStock = await getHistoryStockPrice(symbol);
    spinnerContainer.classList.add("invisible");
	return historyStock;
}

async function getHistoryStockPrice(symbol) {
    const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
        );
        const data = await response.json();
        return data;
    }
    
function getUrlParameter(name) {
    spinnerContainer.classList.remove("invisible");
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	return results === null
		? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

async function getCompanyProfile() {
	const response = await fetch(
		`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
	);
	const data = await response.json();
	return data.profile;
}

async function loadCompany() {
	const companyProfile = await getCompanyProfile(symbol);
	header.innerHTML = companyProfile.companyName;
	companyImg.src = companyProfile.image;
	parDescription.innerHTML = companyProfile.description;
	companyLink.href = companyProfile.website;
	companyLink.innerHTML = companyProfile.website;
	companyStockPrice.innerHTML = `$${companyProfile.price}`;
	companyStockChange.innerHTML = companyProfile.changesPercentage;

	if (companyProfile.changesPercentage.charAt(1) === "-") {
		companyStockChange.style.color = "red";
	} else companyStockChange.style.color = "green";
}

loadHistoryStocks().then((info) => {
      const dataHistory = info.historical;
    const labels = dataHistory.map((element) => element.date);
    labels.reverse();
    const closeGate = dataHistory.map((element) => element.close);
    closeGate.reverse();
		const data = {
			labels: labels,
			datasets: [
				{
					label: "My First dataset",
					backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    rectRot: "rectRot",
					data: closeGate,
				},
			],
		};
		const config = {
            type: "line",
			data,
			options: {},
		};
    var myChart = new Chart(document.getElementById("myChart"), config);
});
