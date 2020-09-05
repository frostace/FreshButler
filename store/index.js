import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {  
	login: false,  
	token: '',  
	avatarUrl: '',  
	userName: '',
	randomized: false,
	ingredientList: [
		{
			"letter": "主食",
			"data": [
				"山东拉面",
				"意面",
				"年糕",
				"大米",
			]
		}, 
		{
			"letter": "蔬菜",
			"data": [
				"大白菜",
				"莴苣",
				"西洋菜",
				"芥兰苗",
				"胡萝卜",
				"鸡腿菇"
			]
		},
		{
			"letter": "肉类",
			"data": [
				"鸡胸肉",
				"牛尾",
				"排骨",
				"五花肉",
				"鸡翅",
				"牛绞肉"
			]
		},
		{
			"letter": "水果",
			"data": [
				"香蕉",
				"苹果",
				"西瓜",
				"柠檬",
				"橙子",
				"榴莲"
			]
		},
		{
			"letter": "调料",
			"data": [
				"盐",
				"糖",
				"蕃茄酱",
				"胡椒粉",
				"小茴香",
				"醋",
				"酱油"
			]
		},
		{
			"letter": "饮料",
			"data": [
				"可乐",
				"柠檬汁",
				"白葡萄酒",
			]
		},
		{
			"letter": "其他",
			"data": [
				"榨菜",
			]
		},
	],
	selectedIngredients: [],
	cookableMeatDishes: [
		{
			name: "土豆排骨",
			weight: 1
		},
		{
			name: "萝卜排骨",
			weight: 1
		},
		{
			name: "咖喱牛腩",
			weight: 1
		},
		{
			name: "红烧肉",
			weight: 1
		},
		{
			name: "可乐鸡",
			weight: 1
		},
		{
			name: "照烧鸡排",
			weight: 1
		},
		{
			name: "黑椒蜂蜜蒜香鸡排",
			weight: 1
		},
		{
			name: "照烧猪排",
			weight: 1
		},
		{
			name: "黑椒蜂蜜蒜香猪排",
			weight: 1
		},
		{
			name: "羊肉串",
			weight: 1
		},
		{
			name: "叉烧肉",
			weight: 1
		},
		{
			name: "鱼香肉丝",
			weight: 1
		},
		{
			name: "水蒸蛋",
			weight: 1
		},
		{
			name: "番茄炒蛋",
			weight: 1
		},
		{
			name: "牛百叶",
			weight: 1
		},
		{
			name: "油焖大虾",
			weight: 1
		},
		{
			name: "西兰花虾仁",
			weight: 1
		},
		{
			name: "芹菜虾仁",
			weight: 1
		},
		{
			name: "番茄毛豆蒸肉饼",
			weight: 1
		},
		{
			name: "红烧牛尾",
			weight: 1
		},
		{
			name: "牛排",
			weight: 1
		},
	],
	cookableVegetableDishes: [
		{
			name: "茄子",
			weight: 1
		},
		{
			name: "咸蛋豆腐",
			weight: 1
		},
		{
			name: "金针菇玉子豆腐",
			weight: 1
		},
		{
			name: "芹菜香干",
			weight: 1
		},
		{
			name: "炒三丝",
			weight: 1
		},
		{
			name: "芥兰",
			weight: 1
		},
		{
			name: "秋葵",
			weight: 1
		},
		{
			name: "鸡腿菇",
			weight: 1
		},
		{
			name: "干锅花菜",
			weight: 1
		},
		{
			name: "煎番茄",
			weight: 1
		},
	],
	cookableMainDishes: [
		{
			name: "土豆泥",
			weight: 1
		},
		{
			name: "拉面",
			weight: 1
		},
		{
			name: "意面",
			weight: 1
		},
		{
			name: "饺子",
			weight: 1
		},
		{
			name: "云吞",
			weight: 1
		},
		{
			name: "冷面",
			weight: 1
		},
		{
			name: "年糕",
			weight: 1
		},
		{
			name: "米饭",
			weight: 1
		},
	],
	cookableMixedDishes: [
		{
			name: "虾仁菌菇炒年糕",
			weight: 1
		},
		{
			name: "餐蛋面",
			weight: 1
		},
		{
			name: "肉酱面",
			weight: 1
		},
		{
			name: "卤肉饭",
			weight: 1
		},
		{
			name: "牛丼饭",
			weight: 1
		},
		{
			name: "煲仔饭",
			weight: 1
		},
		{
			name: "蛋包饭",
			weight: 1
		},
		{
			name: "南瓜腊肠焖饭",
			weight: 1
		},
		{
			name: "鸡肉焖饭",
			weight: 1
		},
		{
			name: "墨西哥肉酱饭",
			weight: 1
		},
		{
			name: "韩式炒牛肉",
			weight: 1
		},
		{
			name: "豆腐锅配饭",
			weight: 1
		},
		{
			name: "八宝饭",
			weight: 1
		},
	]
};

const getters = {
	getIngredientList: (state) => state.ingredientList,
	getSelectedIngredients: (state) => state.selectedIngredients,
	getRandomized: (state) => state.randomized,
};

const actions = {
	async commitSelectedIngredients({ commit }, ingrdts) {
        commit("pushSelectedIngredients", ingrdts);
    },
	async commitRandomized({commit}, randomClicked) {
		commit("pushRandomized", randomClicked);
	}
};

const mutations = {  
	login(state, provider) {  
		console.log(state)
		console.log(provider)
		state.login = true;
		state.token = provider.token;
		state.userName = provider.userName;
		state.avatarUrl = provider.avatarUrl;
	},  
	logout(state) {  
		state.login = false;
		state.token = '';
		state.userName = '';
		state.avatarUrl = '';
	},
	pushSelectedIngredients(state, ingrdts) {
		state.selectedIngredients = ingrdts;
	},
	pushRandomized(state, randomClicked) {
		state.randomized = randomClicked;
	}
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {},
});