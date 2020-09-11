<script>
import { mapActions } from 'vuex';
export default {
	methods: {
		...mapActions(['commitIngredientsByCategory'])
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		uni.getStorage({
		    key: 'storage_ingrdts',
		    success: (res) => {
				// console.log(res.data)
				res.data == undefined || this.commitIngredientsByCategory(res.data);
		    }
		});
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
