<template>
    		<div class="city_body">
				<Loading v-if="isLoading"/>
				<mt-index-list v-else class="inner_body">
					<mt-index-section  v-for="item in cityList.firstLetter" :key="item.index" :index="item.index">
						<mt-cell  v-for="itemList in item.list" :key="itemList.id" :title="itemList.nm" @click.native='handleToCity(itemList.nm,itemList.id)'></mt-cell>
					</mt-index-section>
				</mt-index-list>
			</div>

</template>

<script>
import { IndexList, IndexSection } from 'mint-ui';
import Vue from 'vue';
import BScroll from 'better-scroll'

Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

export default {
	name:'City',
	data(){
		return {
			cityList:['1','222','333'],
			test:["1","2"],
			isLoading:true,
		}
	},
	mounted(){
		var cityL = window.localStorage.getItem('cityList');

		if(cityL){
			// console.log(cityL);
			this.cityList = JSON.parse(cityL);
			this.isLoading = false;
		}else{
			this.axios.get('https://www.softeem.xin/maoyanApi/dianying/cities.json').then((res)=>{
			var msg = null;
			if(res !== null){
				var cities = res.data.cts;
				console.log(cities);
				// 对城市进行首字母排序
				this.cityList = this.formatCityList(cities);
				this.isLoading = false;
				window.localStorage.setItem('cityList',JSON.stringify(this.cityList));
			}else{
				msg = "获取城市列表失败!";
				console.log(msg);
			}
		});
		}
	},
	methods:{
		formatCityList(cities){
			var firstLetter = [];
			var hotList = [];

			for(var i=0;i<cities.length;i++){
				// 获取每一个城市截取的首字母
				var fletter = cities[i].py.substring(0,1).toUpperCase();
				if(toCom(fletter)){
					// 若返回 true，则将该城市对象新添加到数组中
					firstLetter.push({index:fletter,list:[{nm:cities[i].nm,id:cities[i].id}]});
				}else{
					for(var j=0;j<firstLetter.length;j++){
						if(firstLetter[j].index === fletter){
							firstLetter[j].list.push({nm:cities[i].nm,id:cities[i].id});
						}
					}
				}
			}
			// 排序
			firstLetter.sort((n1,n2)=>{
				if(n1.index>n2.index){
					return 1;
				}else{
					return -1;
				}
			});
			// console.log(firstLetter);
			// 用于判断截取的首字母是否已经在数组里面了
			function toCom(fletter){
			for(var i=0;i<firstLetter.length;i++){
				if(firstLetter[i].index === fletter){
					// 已经有了返回 false
					return false;
				}
			}
			return true;
		}
			return {
				firstLetter,
			};
		},
		handleToCity(nm,id){
			// console.log("111");
			this.$store.commit("city/CITY_INFO",{nm,id});
			// 编程式路由
			this.$router.push("/movie/nowPlaying");
			// 将当前的城市记录到本地存储中
			window.localStorage.setItem('nowNm',nm);
			window.localStorage.setItem('nowId',id);

		}
	}
}
</script>

<style lang="scss" scoped>
    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        width:0;
    }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>