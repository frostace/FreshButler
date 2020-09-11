import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {  
	login: false,  
	token: '',  
	avatarUrl: '',  
	userName: '',
	randomized: false,
	ingredientsByCategory: {
		"主食": [
			{
				"name": "山东拉面",
				"amount": 10,
				"unit": "g"
			},{
				"name": "意面",
				"amount": 10,
				"unit": "g"
			},{
				"name": "年糕",
				"amount": 10,
				"unit": "g"
			},{
				"name": "大米",
				"amount": 10,
				"unit": "g"
			},
		],
		"蔬菜": [
			{
				"name": "大白菜",
				"amount": 10,
				"unit": "g"
			},{
				"name": "莴苣",
				"amount": 10,
				"unit": "g"
			},{
				"name": "西洋菜",
				"amount": 10,
				"unit": "g"
			},{
				"name": "芥兰苗",
				"amount": 10,
				"unit": "g"
			},{
				"name": "胡萝卜",
				"amount": 10,
				"unit": "g"
			},{
				"name": "鸡腿菇",
				"amount": 10,
				"unit": "g"
			},
		],
		"肉类": [
			{
				"name": "鸡胸肉",
				"amount": 10,
				"unit": "g"
			},{
				"name": "牛尾",
				"amount": 10,
				"unit": "g"
			},{
				"name": "排骨",
				"amount": 10,
				"unit": "g"
			},{
				"name": "五花肉",
				"amount": 10,
				"unit": "g"
			},{
				"name": "鸡翅",
				"amount": 10,
				"unit": "g"
			},{
				"name": "牛绞肉",
				"amount": 10,
				"unit": "g"
			},
		],
		"水果": [
			{
				"name": "香蕉",
				"amount": 10,
				"unit": "g"
			},{
				"name": "苹果",
				"amount": 10,
				"unit": "g"
			},{
				"name": "西瓜",
				"amount": 10,
				"unit": "g"
			},{
				"name": "柠檬",
				"amount": 10,
				"unit": "g"
			},{
				"name": "橙子",
				"amount": 10,
				"unit": "g"
			},{
				"name": "榴莲",
				"amount": 10,
				"unit": "g"
			},
		],
		"调料": [
			{
				"name": "盐",
				"amount": 10,
				"unit": "g"
			},{
				"name": "糖",
				"amount": 10,
				"unit": "g"
			},{
				"name": "蕃茄酱",
				"amount": 10,
				"unit": "g"
			},{
				"name": "胡椒粉",
				"amount": 10,
				"unit": "g"
			},{
				"name": "小茴香",
				"amount": 10,
				"unit": "g"
			},{
				"name": "醋",
				"amount": 10,
				"unit": "g"
			},{
				"name": "酱油",
				"amount": 10,
				"unit": "g"
			},
		],
		"饮料": [
			{
				"name": "可乐",
				"amount": 10,
				"unit": "g"
			},{
				"name": "柠檬汁",
				"amount": 10,
				"unit": "g"
			},{
				"name": "白葡萄酒",
				"amount": 10,
				"unit": "g"
			},
		],
		"其他": [
			{
				"name": "榨菜",
				"amount": 10,
				"unit": "g"
			},
		],
	},
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
	getIngredientsByCategory: (state) => state.ingredientsByCategory,
	getSelectedIngredients: (state) => state.selectedIngredients,
	getRandomized: (state) => state.randomized,
};

const actions = {
	async commitIngredientsByCategory({ commit }, newIngredientsByCategory) {
		console.log("commiting")
		commit("pushIngredientsByCategory", newIngredientsByCategory);
	},
	async commitSelectedIngredients({ commit }, ingrdts) {
        commit("pushSelectedIngredients", ingrdts);
    },
	async commitRandomized({commit}, randomClicked) {
		commit("pushRandomized", randomClicked);
	}
};

const mutations = {  
	login(state, provider) {  
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
	pushIngredientsByCategory(state, newIngredientsByCategory) {
		state.ingredientsByCategory = newIngredientsByCategory;
		uni.setStorage({
			key: 'storage_ingrdts',
			data: newIngredientsByCategory,
			success: function() {
				console.log("success");
			}
		})
	},
	clearIngredientList() {
		// state.ingredientList.splice(1, 1, {
		// 	"letter": "姜饼",
		// 	"data": [
		// 		"撒打算",
		// 	]
		// });
		Vue.set(state.ingredientList, 1, {
			"letter": "姜饼",
			"data": [
				"撒打算",
			]
		});
		console.log(state.ingredientList);
	},
	pushSelectedIngredients(state, ingrdts) {
		state.selectedIngredients = ingrdts;
	},
	pushRandomized(state, randomClicked) {
		state.randomized = randomClicked;
	},
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {},
});