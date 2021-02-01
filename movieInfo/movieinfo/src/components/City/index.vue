<template>
    		<div class="city_body">
				<!-- <div class="city_list">
					<div class="city_sort">
						<div v-for="item in cityList.firstLetter" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="itemList in item.list" :key="itemList.id">{{itemList.nm}}</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="city_index">
					<ul>
						<li>A</li>
						<li>B</li>
						<li>C</li>
						<li>D</li>
						<li>E</li>
					</ul>
				</div> -->
				<mt-index-list>
					<mt-index-section  v-for="item in cityList.firstLetter" :key="item.index" :index="item.index">
						<mt-cell  v-for="itemList in item.list" :key="itemList.id" :title="itemList.nm"></mt-cell>
					</mt-index-section>
				</mt-index-list>
			</div>

</template>

<script>
import { IndexList, IndexSection } from 'mint-ui';
import Vue from 'vue'

Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

export default {
	name:'City',
	data(){
		return {
			cityList:['1','222','333'],
			test:["1","2"],
		}
	},
	mounted(){
		this.axios.get('https://www.softeem.xin/maoyanApi/dianying/cities.json').then((res)=>{
			var msg = null;
			// console.log(res.data.cts);
			if(res !== null){
				var cities = res.data.cts;
				// console.log(cities);
				// 对城市进行首字母排序
				this.cityList = this.formatCityList(cities);
				console.log(this.formatCityList(cities));
				console.log(this.cityList);
			}else{
				msg = "获取城市列表失败!";
				console.log(msg);
			}
		});
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