export default class Header {

    constructor (container) {
        this.container = document.querySelector(container);
        this.schem = {
            mainMenu: '[data-main-bar]',
            mainMenuNav: '[data-main-nav]',
            mainToggle: '[data-main-toggle]',
            subitems: '[data-main-subitem]',
            subitemToggle: '[data-subitem-toggle]',
            subitemList: '[data-subitem-list]'
        };

        this.mainSubitems = [];
        this.mainToggles = [];
        this.mainMenu = null;
        this.mainMenuNav = null;

        this.state = {
            menuOpen: false,
            isSublistExpanded: false,
            expandedSublist: null,
            isHidden: false,
            width: window.innerWidth,
        };

        this.scrollDistance = 0;

        this.classes = {
            menuOpen: 'is-open',
            pageScroll: 'is-scroll',
            submenuOpen: 'is-expanded',
            hidden: 'is-invisible'
        };

        if (this.container) {
            // this.initSubMenu();
            this.initMobileMenu();
            this.initScrollListener();

            document.addEventListener('keydown', (event) => {
                const key = event.key;
                if (key === 'Escape') {
                    this.closeMenu();
                    // this.collapseSubMenu();
                }
            });

        }
    }

    initMobileMenu (){
        this.mainMenu = this.container.querySelector(this.schem.mainMenu);
        this.mainMenuNav = this.container.querySelector(this.schem.mainMenuNav);
        this.mainToggles = Array.prototype.slice.call(this.container.querySelectorAll(this.schem.mainToggle));
        this.mainToggles.forEach((switcher) => {
            console.log('ssss');
            switcher.addEventListener('click', () => {
                console.log('clic');
                if (this.state.menuOpen === false) {
                    console.log('op');
                    this.openMenu();
                } else {
                    console.log('hi');
                    this.closeMenu();
                }
            })
        });

        window.addEventListener('resize', () => {
            if( window.innerWidth !==  this.state.width && this.state.menuOpen) {
                this.closeMenu();
            }
            this.state.width = window.innerWidth;
        });
    }

    initScrollListener() {
        window.addEventListener('scroll', () => {
            let isEnable = window.pageYOffset > this.scrollDistance;
            this.mainMenu.classList.toggle(this.classes.pageScroll, isEnable);
        })
    }

    initSubMenu(){

        Array.prototype.slice.call(this.container.querySelectorAll(this.schem.subitems)).forEach((subitem) => {
            this.mainSubitems.push({
                container: subitem,
                menu: subitem.querySelector(this.schem.subitemList),
                toggle: subitem.querySelector(this.schem.subitemToggle)
            });
        });

        this.mainSubitems.forEach((item) => {
            item.toggle.addEventListener('click', (evt) => {
                this.expandSubMenu(item);
            })
        });

        document.addEventListener('click', (evt) => {
            // console.log(this.state.expandedSublist);
            if (!!this.state.expandedSublist && evt.target !== this.state.expandedSublist.container && !this.state.expandedSublist.container.contains(evt.target)) {
                this.collapseSubMenu();
            }
        });
    }

    getHeight() {
        return this.mainMenu ? this.mainMenu.offsetHeight : 0;
    }

    toggleHidden(isOff) {
        this.state.isHidden = isOff;
        this.mainMenu.classList.toggle(this.classes.hidden, this.state.isHidden);
    }


    expandSubMenu(itemToOpen){
        if(!!this.state.expandedSublist) {
            this.state.expandedSublist.menu.classList.remove(this.classes.submenuOpen);
        }
        itemToOpen.menu.classList.add(this.classes.submenuOpen);
        this.state.expandedSublist = {...itemToOpen};
    }

    collapseSubMenu(){
        if(!!this.state.expandedSublist) {
            this.state.expandedSublist.menu.classList.remove(this.classes.submenuOpen);
            this.state.expandedSublist = null;
        }
    }

    closeMenu (){
        this.state.menuOpen = false;
        this.mainMenu.classList.remove(this.classes.menuOpen);
        this.mainMenuNav.classList.remove(this.classes.menuOpen);
        this.collapseSubMenu();
        app.scroll.enable(this.mainMenuNav);
    }

    openMenu (){
        this.state.menuOpen = true;
        this.mainMenu.classList.add(this.classes.menuOpen);
        this.mainMenuNav.classList.add(this.classes.menuOpen);

        app.scroll.disable(this.mainMenuNav);
    }


}