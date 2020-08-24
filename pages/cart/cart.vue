<template>
	<view>
		<view class="uni-common-mt">
			<!-- Popup window for alert -->
			<uni-popup ref="popup" type="message">
				<uni-popup-message 
					type="message" 
					message="本菜食谱尚未录入!" 
					:duration="1000" >
				</uni-popup-message>
			</uni-popup>
			<!-- dish list -->
			<view class="uni-form-item uni-column">
				<!-- <view class="title">实时获取输入值：{{newDishName}}</view> -->
				<view class="uni-input-box">
					<view class="uni-input-instruction">添加新菜:</view>
					<input class="uni-input" @input="onDishInput" @confirm="onDishConfirm" placeholder="如: 可乐鸡翅" />
				</view>
				<checkbox-group name="uni-dish-list" >
					<label class="uni-dish" v-for="(dish, index) in dishes" :key="dish.name" @tap="handleDishCheck($event, dish)">
						<checkbox class="uni-dish-checkbox" :value="dish.name" :checked="dish.checked"/>
						<view class="uni-dish-name">{{dish.name}}</view>
						<counter 
							@handleCount="handleDishCountClick"
							@tap.stop=""
							:index="index" 
							:value="dish.num"
							:delayed="100">
						</counter>
					</label>
				</checkbox-group>
			</view>
			<!-- ingredient list -->
			<view class="uni-form-item uni-column">
				<!-- <view class="title">实时获取输入值：{{newIngredientName}}</view> -->
				<view class="uni-input-box">
					<view class="uni-input-instruction">添加新食材:</view>
					<input class="uni-input" @input="onIngredientInput" placeholder="如: 五花肉" />
				</view>
				
				<checkbox-group name="uni-ingredient-list">
					<label class="uni-ingredient" v-for="(ingredient, index) in ingredients" :key="ingredient.name">
						<checkbox class="uni-ingredient-checkbox" :value="ingredient.name" :checked="ingredient.checked"/>
						<view class="uni-ingredient-name">{{ingredient.name}}</view>
						<counter 
							@handleCount="handleIngredientCountClick"
							@tap.stop=""
							:index="index" 
							:value="ingredient.num"
							:unit="ingredient.unit"
							:increment="ingredient.increment"
							:delayed="100">
						</counter>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	import counter from '@/components/lxc-count/lxc-count.vue';
	import Recipe from '../../helpers/recipe.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	export default {
		components: {
			counter,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				newDishName: '',
				newIngredientName: '',
				dishes: [
					{
						name: "红烧排骨",
						checked: false,
						num: 0,
					},
					{
						name: "土豆牛肉",
						checked: false,
						num: 0,
					},
					// {
					// 	name: "可乐鸡翅",
					// 	checked: 'false',
					// 	num: 1,
					// },
					// {
					// 	name: "咸蛋豆腐",
					// 	checked: 'false',
					// 	num: 1,
					// },
				],
				ingredients: [],
			};
		},
		methods: {
			onDishInput: function(event) {
				this.newDishName = event.target.value;
			},
			onDishConfirm(event) {
				let dishName = event.detail.value;
				// check if in recipe?
				if (!this.getRecipe(dishName)) {
					console.log("没有找到菜名对应的食谱!");
					this.$refs.popup.open();
					return;
				} 
				let inputDish, index;
				// check if in this.dishes?
				if (this.dishes.some((dish, idx) => {
					inputDish = dish;
					index = idx;
					return dish.name === dishName;
				})) {
					this.$set(this.dishes, index, {
						...inputDish,
						num: inputDish.num + 1
					});
					return;
				}
				// not in this.dishes, but in recipe
				this.$set(this.dishes, this.dishes.length, {
					name: dishName,
					checked: true,
					num: 1
				});
				this.updateIngredientByDish(dishName, 1);
			},
			onIngredientInput: function(event) {
				this.newIngredientName = event.target.value;
			},
			handleDishCountClick: function(val, index) {
				// update checkbox status according to val
				this.$set(this.dishes, index, {
					...this.dishes[index],
					checked: val !== 0
				});
				
				let increment = val - this.dishes[index]['num'];
				this.dishes[index]['num'] = val;
				this.updateIngredientByDish(this.dishes[index]['name'], increment);
			},
			handleIngredientCountClick: function(val, index) {
				this.ingredients[index]['num'] = val;
			},
			getRecipe(dish) {
				// TODO: replace this with async 
				return Recipe[dish];
			},
			handleDishCheck(e, target) {
				let newChecked = !target.checked;
				// TODO: Time complexity to be improved, to be refactored ITO data structure
				this.dishes.forEach(dish => {
					dish.name === target.name && (() => {
						this.$set(dish, 'checked', newChecked);	// update checkbox
						this.$set(dish, 'num', Number(newChecked)); // update counter
					})();
				});
				// update ingredients accordingly
				let opt = newChecked ? 1 : -1; // operator
				this.updateIngredientByDish(target.name, opt);
			},
			updateIngredientByDish(dishName, increment) {
				let recipe = this.getRecipe(dishName);
				recipe.forEach(ingrdt => {
					let ing, index;
					// check if ingrdt contained in this.ingredients
					if (this.ingredients.some((ingredient, idx) => {
						[ing, index] = [ingredient, idx];
						return ingredient.name === ingrdt.name;
					})) {
						// originally exist in this.ingredients
						let newNum = ing.num + increment * ingrdt.num;
						this.$set(this.ingredients, index, {
							...ing,
							num: ing.num + increment * ingrdt.num,
							checked: newNum !== 0
						});
					} else {
						// originally not exist in this.ingredients
						this.$set(this.ingredients, this.ingredients.length, {
							...ingrdt,
							checked: true
						});
					}
				});
				console.log(this.ingredients);
			}
		},
		onLoad() {
			// console.log(Recipe);
		}
	}
</script>

<style lang="scss">
	.uni-common-mt {
		margin: 10px;
	}
	.uni-dish-list, .uni-ingredient-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.uni-dish, .uni-ingredient {
		margin: 5px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-input-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.uni-input-instruction {
	}
	.uni-input {
		flex: 1 0 auto;
		border: 1px solid #ccc;
		border-radius: 2px;
		padding: 5px 10px;
		margin-left: 10px;
	}
</style>
