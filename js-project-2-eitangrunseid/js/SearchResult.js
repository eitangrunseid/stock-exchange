class SearchResult {

    constructor(element) {
		this.element = element;
        const container = document.querySelector('.container');
		container.appendChild(element)
		const searchContainer = document.createElement('ul');
		this.searchContainer = searchContainer;
    }
	
	loadResults(companies) {
		this.searchContainer.innerHTML = "";
		for (let item of companies) {
			
			const itemSearchContainer = document.createElement("li");
			const searchImg = document.createElement("img");
			const link = document.createElement("a");
			const stockRate = document.createElement("div");
			const stockSymbol = document.createElement("span");
			const stockPercentage = document.createElement("span");
			const imgNameHolder = document.createElement("div");
            const percentageHolder = document.createElement("div");
			let percentageOver;
			
			stockRate.appendChild(stockPercentage);
			
			stockSymbol.innerHTML = `(${item.symbol})`;
			stockPercentage.innerHTML = `${item.profile.changesPercentage}`;
			
			item.profile.changesPercentage.charAt(1) === "-"
			? (percentageOver = "red")
			: (percentageOver = "green");
			
			itemSearchContainer.classList.add("item-search-container");
			itemSearchContainer.classList.add("list-group-item");
			itemSearchContainer.style.backgroundColor = "none";
			
			searchImg.classList.add("search-img");
			searchImg.src = item.profile.image;
			searchImg.alt = item.profile.companyName;
			
			link.innerHTML = `${item.profile.companyName} ${stockSymbol.innerHTML}`;
			link.href = `/company.html?symbol=${item.symbol}`;
			link.classList.add("link-item");
			
			stockPercentage.classList.add("stock-price");
            stockPercentage.style.color = percentageOver;
            
			imgNameHolder.appendChild(searchImg);
			imgNameHolder.classList.add("img-holder");
			imgNameHolder.appendChild(link);
			percentageHolder.appendChild(stockPercentage);
			percentageHolder.classList.add("percentage-holder");
			
			itemSearchContainer.appendChild(imgNameHolder);
			itemSearchContainer.appendChild(percentageHolder);
			this.searchContainer.appendChild(itemSearchContainer);
		}
		this.searchContainer.classList.add('list-group', 'list-group-flush', 'search-container');
		this.element.appendChild(this.searchContainer);
	}
}
