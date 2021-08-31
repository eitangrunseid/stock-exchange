class SearchForm {
	constructor(element) {
		this.element = element;
		const container = document.querySelector(".container");
		this.container = container;
		const inputGroup = document.createElement("div");
		inputGroup.classList.add("input-group", "mb-3", "mt-5");

		const inputSearch = document.createElement("input");
		this.inputValue = inputSearch;
		inputSearch.id = "search-input";
		inputSearch.type = "text";
		inputSearch.classList.add("form-control");
		inputSearch.ariaLabel = "Recipient's username";
		inputSearch.ariaDescribedby = "button-addon2";
		const searchBtn = document.createElement("button");
		this.btn = searchBtn;
		searchBtn.classList.add(
			"btn",
			"btn-primary",
			"btn-outline-secondary",
			"search-btn"
		);
		searchBtn.type = "button";
		searchBtn.id = "button-addon2";
		searchBtn.innerText = "Search";
		inputGroup.appendChild(inputSearch);
		inputGroup.appendChild(searchBtn);

		const spinnerContainer = document.createElement("div");
		this.spinnerContainer = spinnerContainer;
		spinnerContainer.classList.add("spinner-container", "ms-3", "invisible");
		inputGroup.appendChild(spinnerContainer);
		const spinnerBorder = document.createElement("div");
		this.spinnerBorder = spinnerBorder;
		spinnerBorder.classList.add("spinner-border");
		spinnerBorder.role = "status";
		spinnerContainer.appendChild(spinnerBorder);
		const span = document.createElement("span");
		span.classList.add("visually-hidden");
		span.innerText = "Loading...";
		spinnerBorder.appendChild(span);

		this.inputSearch = inputSearch;
		element.appendChild(inputGroup);
	}

	async getSearchInputs() {
		const response = await fetch(
			`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.inputSearch.value}&limit=10&exchange=NASDAQ`
		);
		const data = await response.json();
		return data;
	}

	async printResults(callback) {
		this.btn.addEventListener("click", async (ev) => {
			if (!this.inputValue.value) return;
			this.spinnerContainer.classList.remove("invisible");
			const data = await this.getSearchInputs();

			let companies = [];
			for (const item of data) {
				const profile = await this.getCompanyProfile(item.symbol);
				companies.push(profile);
			}
			callback(companies);
			this.spinnerContainer.classList.add("invisible");
		});
	}

	async getCompanyProfile(symbol) {
		const response = await fetch(
			`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
		);
		const data = await response.json();
		return data;
	}
}
