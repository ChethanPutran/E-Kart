import NotificationServices, { NOTIF_WISHLIST_CHANGED } from './notification';

const ns = new NotificationServices();
let instance = null;
const wishList = [];
class DataServices {
	constructor(props) {
		if (!instance) {
			instance = this;
		}
		return instance;

	}

	itemOnWishList = item => {
		const wlItem = wishList.filter((wlItem) => {
			return wlItem._id === item._id;
		})

		return wlItem.length > 0;
	}

	addWishListItem = item => {

		wishList.push(item);
		ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);

	}
	removeWishListItem = item => {
		wishList.forEach((wishListItem, idx) => {
			if (wishListItem._id === item._id) {
				wishList.splice(idx, 1);
				ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
			}
		})

	}

}


export default DataServices;