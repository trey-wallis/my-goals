import UIStore from './UIStore';
import DomainStore from './DomainStore';

/*
* The root store contains all of our other stores.
* It it passed down as a react property in the AppProvider class
*/
class RootStore {

	constructor(){
		this.uiStore = new UIStore(this);
		this.domainStore = new DomainStore(this);
	}

	get store(){
		return {
			ui: this.uiStore,
			domain: this.domainStore
		}
	}
}

//Intialize our root store
const rootStore = window.root = new RootStore();

export default rootStore;