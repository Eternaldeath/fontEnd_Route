<template>
			<div class="movie_body">
				<!-- <Scroller> -->
					<Loading v-if="isLoading"/>
					<ul v-else>
						<li v-for="item in movieList" :key="item.id" @tap="handleToDetail">
							<div class="pic_show"><img :src="item.img"></div>
							<div class="info_list">
								<h2>{{item.nm}}</h2>
								<p class="version_info">
									<img src="@/assets/3D.png" alt="" v-if="item.ver.td">
									<img src="@/assets/max.png" alt="" v-if="item.ver.max">
								</p>
								<p><span class="person">{{item.wish}}</span> 人想看</p>
								<p>主演: {{item.star}}</p>
								<p>{{item.comingTitle}}上映</p>
							</div>
							<div class="btn_pre">
								预售
							</div>
						</li>
					</ul>
				<!-- </Scroller> -->
			</div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
	name:'ComingSoon',
	data(){
		return {
			movieList:[],
			isLoading:true,
			preCityId:-1,
		}
	},
	activated(){
		// https://www.softeem.xin/maoyanApi/ajax/comingList?ci=57&token=&limit=10
		// /ajax/comingList?ci=1&token=limit=10
		var cityId = this.$store.state.city.id;
		// 如果当前城市和之前切换的城市一样，就不再请求，保留 keep-live 的缓存机制
		if(this.preCityId === cityId){return ;}
		this.isLoading = true;
		this.axios.get(`/ajax/comingList?ci=${cityId}&token=&limit=10`).then((res)=>{
			var msg = res.data.coming;
			// console.log(res,msg);
			if(msg !== null){
			for(var i=0;i<msg.length;i++){
				msg[i].img = this.toGetMovieImg(msg[i].img);
				msg[i].ver = this.toGetVersion(msg[i].version);
			}
			this.movieList = msg;
			this.isLoading = false;
			this.preCityId = cityId;
			this.$nextTick(()=>{
				new BScroll(".movie_body");
			})
			// console.log(this.movieList);
		}else{
			console.log("获取失败！");
		}
		})
	},
		methods:{
			toGetMovieImg(picUrl){
				// console.log(picUrl);
				var newUrl = picUrl.replace('w.h/','');
				return newUrl;
			},
			toGetVersion(ver){
				var verArr = ver.split(' ');
				// console.log(verArr);
				var vers = {
					td:false,
					max:false
				};
				if(verArr[0]=='v3d')vers.td=true;
				if(verArr[1]=='imax')vers.max=true;
				// console.log(vers);
				return vers;
			},
			handleToDetail(){
				console.log("触发tap");
			}
	},
}
</script>

<style lang="scss" scoped>
    #content .movie_body{ flex:1; overflow:auto;}
    .movie_body ul{ margin:0 12px; overflow: hidden;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:20px;float: left;}
    .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}

	// .version_info img{width: 20px; float: left;}
</style>