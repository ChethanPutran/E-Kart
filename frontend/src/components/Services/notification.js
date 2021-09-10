
export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

var observers = {

};
let instance = null;


class NotificationServices {
	constructor(props) {
		if (!instance) {
			instance = this;
		}
		return instance;
	}

	postNotification = (notifName, data) => {
		const obs = observers[notifName];
		for (let x = 0; x < obs.length; x++) {
			const obj = obs[x];
			obj.callBack(data);

		}
	}
	addObserver = (notifName, observer, callBack) => {
		let obs = observers[notifName];
		if (!obs) {
			observers[notifName] = [];
		}
		let obj = { observer: observer, callBack: callBack };
		observers[notifName].push(obj);
	}



	removeObserver = (observer, notifName) => {
		const obs = observers[notifName];
		if (obs) {
			for (let x = 0; x < obs.length; x++) {
				if (observer === obs[x].observer) {
					obs.splice(x, 1);
					observers[notifName] = obs;
					break;

				}
			}
		}
	}



}
export default NotificationServices;