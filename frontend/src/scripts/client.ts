import { ref, Ref, watch } from "vue";
import numeral from "numeral";

interface rebirth_template {
	points: number;
	bought_upgrades: object[];
}

class Client {
	private redactor: object;
	private money: Ref<number>;
	private money_per_click: number;
	private money_per_sec: number;
	private views: number;
	private subscriptions: number;
	public colectors: Ref<Upgrade[]>;
	private done_minigame: object[];
	private have_minigame: object[];
	private not_own_minigame: object[];
	private rebirth: rebirth_template;
	public multipy = ref<number>(1);

	constructor(
		SaveRedactor?: object,
		SaveMoney?: number,
		SaveMoneyPerClick?: number,
		SaveMoneyPerSec?: number,
		SaveViews?: number,
		SaveSubscriptions?: number,
		SaveDone_minigames?: object[],
		SaveHave_minigame?: object[],
		SaveNot_own_minigame?: object[],
		SaveRebirth?: rebirth_template
	) {
		this.redactor = SaveRedactor || {};
		this.money = ref<number>(SaveMoney || 100);
		this.money_per_click = SaveMoneyPerClick || 0.1;
		this.money_per_sec = SaveMoneyPerSec || 0;
		this.views = SaveViews || 0;
		this.subscriptions = SaveSubscriptions || 0;
		this.colectors = ref<Upgrade[]>([]); // Pusta tablica na początek
		this.done_minigame = SaveDone_minigames || [];
		this.have_minigame = SaveHave_minigame || [];
		this.not_own_minigame = SaveNot_own_minigame || [];
		this.rebirth = SaveRebirth || { points: 0, bought_upgrades: [] };
	} // Przykładowa funkcja dodająca kolektor
	addColector(colector: Upgrade) {
		this.colectors.value.push(colector);
	}

	// Funkcja obsługująca kliknięcie w klawiaturę
	click_keyboard() {
		this.money.value += this.money_per_click;
	}

	// Funkcja wyświetlająca ilość pieniędzy sformatowaną
	show_money() {
		return numeral(this.money.value).format("0.00a");
	}

	// Funkcja wyświetlająca przychód na sekundę sformatowany
	show_money_per_sec() {
		return numeral(this.money_per_sec).format("0.00a");
	}

	// Funkcja kupowania ulepszenia
	buy_upgrade(upgrade: Upgrade, cost: number) {
		if (this.money.value - cost >= 0) {
			if (CLIENT.multipy.value === 1) {
				this.money.value -= cost;
				this.money_per_sec += upgrade.incom;
				upgrade.count++;
				upgrade.cost *= 1.15;
				return;
			}

			this.money.value -= cost;
			this.money_per_sec += upgrade.incom * this.multipy.value;
			upgrade.count += this.multipy.value;
			upgrade.cost = cost;
		}
	}

	// Funkcja obsługująca automatyczny przychód co sekundę
	auto_income() {
		setInterval(() => {
			this.money.value += this.money_per_sec;
		}, 1000);
	}

	// Funkcja monitorująca odblokowywanie ulepszeń na podstawie dostępnego budżetu
	auto_show_upgrades() {
		watch(this.money, () => {
			this.colectors.value.forEach((colector) => {
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
	id: string;
	name: string;
	cost: number;
	incom: number;
	count: number;
	icon: string;
	short_discription: string;
	discription: string;
	condition_unlock: number;
	unlock: boolean;
}

const CLIENT = new Client();
CLIENT.auto_income();
let i = 0;
// Dodajmy przykładowe kolektory na początku
CLIENT.addColector({
	id: `colector_${i++}`,
	name: "Lamus",
	cost: 10,
	incom: 0.05,
	count: 0,
	icon: "../../public/vite.svg",
	short_discription: "On ci tylko <i>prawie</i> pomorze...",
	discription: "",
	condition_unlock: 0,
	unlock: true,
});
CLIENT.addColector({
	id: `colector_${i++}`,
	name: "Morda",
	cost: 100,
	incom: 0.5,
	count: 0,
	icon: "../../public/Szlug 1.svg",
	short_discription: "Zawsze można na to liczyć, ale nie zawsze wychodzi",
	discription: "",
	condition_unlock: 0,
	unlock: false,
});
CLIENT.addColector({
	id: `colector_${i++}`,
	name: "Pizza",
	cost: 1000,
	incom: 5,
	count: 0,
	icon: "/src/assets/keyboards/Klawiatura.svg",
	short_discription: "<i>Mammamija</i>",
	discription: "",
	condition_unlock: 0,
	unlock: false,
});
CLIENT.addColector({
	id: `colector_${i++}`,
	name: "Witamina X",
	cost: 10000,
	incom: 50,
	count: 0,
	icon: "/src/assets/vue.svg",
	short_discription: "Od zażycia tego wybuchasz z przedawkowania witamin :>",
	discription: "",
	condition_unlock: 0,
	unlock: false,
});
CLIENT.addColector({
	id: `colector_${i++}`,
	name: "Szczur",
	cost: 100000,
	incom: 500,
	count: 0,
	icon: "../../public/Mouse.svg",
	short_discription: "<i>ZARAZ POZWĘ SAGANA ZA NARUSZENIE MEGO IMIENIA!!!</i>",
	discription: "",
	condition_unlock: 0,
	unlock: false,
});

CLIENT.colectors.value.forEach((colector) => {
	colector.condition_unlock = Math.ceil(colector.cost / 8);
});

CLIENT.auto_show_upgrades();
console.log(CLIENT);

export default CLIENT;
