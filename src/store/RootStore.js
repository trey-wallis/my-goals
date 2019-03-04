import UIStore from './UIStore';
import DomainStore from './DomainStore';

/*
* The root store contains all of our other stores.
* It it passed down as a react property in the AppProvider class
*/
class RootStore {

	constructor(){
		const uiStore = new UIStore(this);
		const domainStore = new DomainStore(this);

		this.store = {
			ui: uiStore,
			domain: domainStore,
		}
	}
}

//Intialize our root store
const rootStore = new RootStore();
window.ui = rootStore.store.ui;
window.domain = rootStore.store.domain;

export default rootStore;