export default class LoadMore {
    constructor(btn){
        this.$loadMoreBtn = btn ? btn : null;
        this.currentPage = 1;
        this.numberOfItems = 0;

        if(this.$loadMoreBtn){
            this.matrixBlockId = this.$loadMoreBtn.dataset.matrixBlockId;
            this.categoryId = this.$loadMoreBtn.dataset.categoryId;
            this.loadMoreURL = this.$loadMoreBtn.dataset.loadMore;
            this.targetContainerId = this.$loadMoreBtn.dataset.targetContainerId;
            this.$targetContainer = document.getElementById(this.targetContainerId);
            this.numberOfItems = this.$targetContainer.childElementCount;
            this.$loadMoreBtn.addEventListener('click', (evt) => {
                this.fireLoading();
            });
        }
    }

    fireLoading(){
        const btnUrl = this.loadMoreURL + '?page=' + this.currentPage + '&categoryId=' + this.categoryId  + '&matrixBlockId=' + this.matrixBlockId;
        this.currentPage ++
        fetch(btnUrl)
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.drawContent(jsonResponse.html);
                if (jsonResponse.isLastPage) {
                    this.$loadMoreBtn.style.display = "none";

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    drawContent(newItemsList){

        if (this.$targetContainer) {
            this.$targetContainer.innerHTML += newItemsList;
            let newNumberOfItems = this.$targetContainer.childElementCount;
            let numberOfNewNews = newNumberOfItems - this.numberOfItems;

            this.fireA11y(this.$targetContainer, numberOfNewNews);

            let $firstNewItem = this.$targetContainer.children[this.numberOfItems];
            if($firstNewItem.querySelector('a')) {
                $firstNewItem.querySelector('a').focus();
            }

            this.numberOfItems = newNumberOfItems;

            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            window.scroll({
                left: 0,
                top: $firstNewItem.getBoundingClientRect().top + scrollTop
            });

        }
    }

    fireA11y(parent, count) {
        let $hiddenDescription = document.createElement('span');
        $hiddenDescription.classList.add('visually-hidden');
        $hiddenDescription.setAttribute('role', 'alert');
        $hiddenDescription.innerText = count + ' news loaded.';
        parent.insertAdjacentElement('beforebegin', $hiddenDescription);

        setTimeout(function () {
            $hiddenDescription.remove();
        }, 30000);
    }
}

