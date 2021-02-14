<template>
    <div class="movie_body" ref="movie_body" id="movie_body">
		<Loading v-if="isLoading"/>
		<ul v-else>
			<li v-for="item in movieList" :key="item.id" @tap="handleToDetail">
				<div class="pic_show"><img v-lazy.movie_body="item.img"></div>
				<div class="info_list">
					<h2>{{item.nm}}</h2>
					<p class="version_info">
						<img src="@/assets/3D.png" alt="" v-if="item.ver.td">
						<img src="@/assets/max.png" alt="" v-if="item.ver.max">
					</p>
					<p>观众评 <span class="grade">{{item.sc}}</span></p>
					<p>主演: {{item.star}}</p>
					<p>上映时间:{{item.rt}}</p>
				</div>
				<div class="btn_mall">
					购票
				</div>
			</li>
			<!-- <li class="loadMore" style=" border: none;">{{pullDowning}}</li> -->
		</ul>
	</div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
	name:'NowPlaying',
	data(){
		return {
			movieList:[],
			isLoading: true,
			// pullDownMsg:'',
			// 请求数据偏移
			offset: 0,
			scroll:null,
			preCityId:-1,
		}
	},
	// activeted 用于存在 keep live 时激活
	activated(){
		var cityId = this.$store.state.city.id;
		// 如果当前城市和之前切换的城市一样，就不再请求，保留 keep-live 的缓存机制
		if(this.preCityId === cityId){return ;}
		this.isLoading = true;
	this.axios.get("https://www.softeem.xin/maoyanApi/ajax/movieOnInfoList?cityId="+cityId).then((res)=>{
		var msg = res.data.movieList;
		// console.log(msg);
		if(msg !== null){
			for(var i=0;i<msg.length;i++){
				msg[i].img = this.toGetMovieImg(msg[i].img);
				msg[i].ver = this.toGetVersion(msg[i].version);
				this.preCityId = cityId;
			}
			this.movieList = msg;
			this.isLoading = false;
			this.$nextTick(()=>{
				this.scroll = new BScroll(".movie_body");
			});

			// this.scroll.on('scroll',(pos)=>{
			// 	if(pos.y<0){
			// 		console.log(pos.y);
			// 		this.offset += 10;
			// 		this.pullDowning = '加载更多...';
			// 		this.axios.get(`/ajax/cinemaList?day=${time}&cityId=1&updateShowDay=true&limit=10&offset=${this.offset}`).then((res)=>{
			// 			console.log(this.offset);
			// 			this.cinemaList = [...this.cinemaList,...res.data.cinemas];
			// 			// console.log(res.data.cinemas);
			// 			// this.cinemaList = res.data.cinemas;
			// 			this.pullDowning = '';
			// 		}
			// 	)}
			// });
		}else{
			console.log("获取失败！");
		}
	});
	},
	updated()
	{ 
		if(this.scroll)
		{
			// this.scroll.finishPullUp();
			this.scroll.refresh();
		}
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
	filters:{
	}
	
	
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
    .movie_body .info_list img{ width:20px; float: left;}
    .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
    .movie_body .pullDown{margin: 0; padding: 0; border: none; text-align: center;font-size: 12px;color: #666;}
	// 设置懒加载样式
	img[lazy=loading] {width:20px; float: left;}

	// position: absolute; right:10px; top: 5px;
	// 自定义
	.loadMore{text-align: center; font-size: 13px; color: #313538;}
</style>