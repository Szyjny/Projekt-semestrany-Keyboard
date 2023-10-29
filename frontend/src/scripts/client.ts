import { ref, Ref, watch } from "vue";
import numeral from "numeral";

interface rebirth_template {
	points: number;
	bought_upgrades: object[];
}

class Client {
	private redactor: object;
	private money: Ref<number>; // Użyj ref jako typu, nie number
	private money_per_click: number;
	private money_per_sec: number;
	private views: number;
	private subscriptions: number;
	public colectors: Upgrade[];
	private done_minigame: object[];
	private have_minigame: object[];
	private not_own_minigame: object[];
	private rebirth: rebirth_template;

	constructor(
		SaveRedactor?: object,
		SaveMoney?: number,
		SaveMoneyPerClick?: number,
		SaveMoneyPerSec?: number,
		SaveViews?: number,
		SaveSubscriptions?: number,
		SaveColectors?: Upgrade[],
		SaveDone_minigames?: object[],
		SaveHave_minigame?: object[],
		SaveNot_own_minigame?: object[],
		SaveRebirth?: rebirth_template
	) {
		// TODO podmień na postać wcześniej stworzoną w drugiej opcji
		this.redactor = SaveRedactor || {};

		// TODO z przodu podmień 0 na wczytanie danej
		this.money = ref<number>(SaveMoney || 0);
		this.money_per_click = SaveMoneyPerClick || 0.1;
		this.money_per_sec = SaveMoneyPerSec || 0;
		this.views = SaveViews || 0;
		this.subscriptions = SaveSubscriptions || 0;

		this.colectors = SaveColectors || [
			{
				name: "Lamus",
				cost: ref<number>(10),
				incom: ref<number>(0.05),
				count: ref<number>(0),
				icon: "../../public/vite.svg",
				short_discription: "no to taki poziom dla bezdomnych xD",
				discription: "",
				condition_unlock: 0,
				unlock: true,
			},
			{
				name: "Morda",
				cost: ref<number>(100),
				incom: ref<number>(0.5),
				count: ref<number>(0),
				icon: "/src/assets/keyboards/Klawiatura.svg",
				short_discription:
					"zawsze można na to liczyć, ale nie zawsze wychodzi",
				discription: "",
				condition_unlock: 0,
				unlock: false,
			},
			{
				name: "Makaron",
				cost: ref<number>(1000),
				incom: ref<number>(5),
				count: ref<number>(0),
				icon: "../../public/Szlug 1.svg",
				short_discription: "<i>mammamijaaaaaaa</i>",
				discription: "",
				condition_unlock: 0,
				unlock: false,
			},
			{
				name: "Mak",
				cost: ref<number>(10000),
				incom: ref<number>(50),
				count: ref<number>(0),
				icon: "../../public/Mouse.svg",
				short_discription: "co robisz z kwiatkiem po wciągnięciu kulek?",
				discription: "",
				condition_unlock: 0,
				unlock: false,
			},
			{
				name: "Makowiec",
				cost: ref<number>(10000),
				incom: ref<number>(50),
				count: ref<number>(0),
				icon: "../../public/Mouse.svg",
				short_discription: "co robisz z kwiatkiem po wciągnięciu kulek?",
				discription: "",
				condition_unlock: 0,
				unlock: false,
			},
			{
				name: "Mak",
				cost: ref<number>(10000),
				incom: ref<number>(50),
				count: ref<number>(0),
				icon: "../../public/Mouse.svg",
				short_discription: "co robisz z kwiatkiem po wciągnięciu kulek?",
				discription: "",
				condition_unlock: 0,
				unlock: false,
			},
			{
				name: "Mak",
				cost: ref<number>(10000),
				incom: ref<number>(50),
				count: ref<number>(0),
				icon: "../../public/Mouse.svg",
				short_discription: "co robisz z kwiatkiem po wciągnięciu kulek?",
				discription: "",
				condition_unlock: 0,
				unlock: false,
			},
			{
				name: "Mak",
				cost: ref<number>(10000),
				incom: ref<number>(50),
				count: ref<number>(0),
				icon: "../../public/Mouse.svg",
				short_discription: "co robisz z kwiatkiem po wciągnięciu kulek?",
				discription: "",
				condition_unlock: 0,
				unlock: false,
			},
		];
		this.done_minigame = SaveDone_minigames || [];
		this.have_minigame = SaveHave_minigame || [];
		this.not_own_minigame = SaveNot_own_minigame || []; // TODO podmień na wszystkie miniGry, 2 opcja
		this.rebirth = SaveRebirth || { points: 0, bought_upgrades: [] };
	}

	click_keyboard() {
		this.money.value += this.money_per_click;
	}

	show_money() {
		return numeral(this.money.value).format("0.00a");
	}

	show_money_per_sec() {
		return numeral(this.money_per_sec).format("0.00a");
	}

	buy_upgrade(upgrade: Upgrade) {
		console.log(this.money.value - upgrade.cost.value);

		if (this.money.value - upgrade.cost.value >= 0) {
			console.log("yes");
			this.money.value -= upgrade.cost.value;
			this.money_per_sec += upgrade.incom.value;
			upgrade.count.value++;
			upgrade.cost.value *= 1.15;
		} else console.log("nope");
	}

	auto_income() {
		setInterval(() => {
			this.money.value += this.money_per_sec;
		}, 1000);
	}

	auto_show_upgrades() {
		watch(this.money, () => {
			this.colectors.forEach((colector) => {
				if (
					!colector.unlock &&
					colector.condition_unlock <= this.money.value
				) {
					colector.unlock = true;
				}
			});
		});
	}
}

export interface Upgrade {
	name: string;
	cost: Ref<number>;
	incom: Ref<number>;
	count: Ref<number>;
	icon: string;
	short_discription: string;
	discription: string;
	condition_unlock: number;
	unlock: boolean;
}

const CLIENT = new Client();
CLIENT.auto_income();
CLIENT.colectors.forEach((colector) => {
	colector.condition_unlock = Math.ceil(colector.cost.value / 8);
});
CLIENT.auto_show_upgrades();
console.log(CLIENT);

export default CLIENT;
