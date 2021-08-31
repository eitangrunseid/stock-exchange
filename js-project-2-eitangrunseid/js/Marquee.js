class Marquee {
	constructor(element) {
		const par = document.createElement("p");
		this.par = par;
		par.classList.add("marquee-display");
		element.appendChild(par);
	}

	async printMarquee() {
		async function getMarqueeApi() {
			const response =
				await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/etf/list
`);
			const data = await response.json();
			return data;
		}
		const response = await getMarqueeApi();
		let symbolPrice = "";
		for (const item of response) {
			const symbol = item.symbol;
			const price = item.price;
			symbolPrice += `${symbol}: <span class="marqPrice">$${price}</span> &nbsp;&nbsp`;
		}
		this.par.innerHTML = symbolPrice;
	}
}

