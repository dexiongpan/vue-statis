<template>
<div>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" ref="filterForm">
				<el-form-item>
					<label class="el-form-item__label" style="width: 90px;">发稿人:</label>
                    <div class="el-form-item__content" >
                      <div  class="el-input el-input--mini">
					    <el-input  v-model="filters.name" placeholder="发稿人"></el-input>
                      </div>
                    </div>
				</el-form-item>
				<el-form-item>
					<label class="el-form-item__label" style="width: 120px;">上线时间:</label>
                    <div class="el-form-item__content" >
                      <div  class="el-input el-input--mini">
					    <el-date-picker v-model="dateList" type="datetimerange" range-separator="至" unlink-panels start-placeholder="开始日期"
                        end-placeholder="结束日期">
					    </el-date-picker> 
                      </div>
                    </div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getWorkCountPage">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="resetForm">重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="exportExcel">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="workCount" id="workCountTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55" id="e-table-selection">
			</el-table-column> -->
			<el-table-column type="index" width="60" label="序号" sortable>
			</el-table-column>
			<el-table-column prop="publishedName" label="发稿人" width="120" >
			</el-table-column>
			<el-table-column prop="publishedCount" label="发稿总量" width="100"  sortable>
			</el-table-column>
			<el-table-column prop="pageViewCount" label="浏览总量" width="100" sortable>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-footer :span="24" class="toolbar">
			<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
		</el-footer>
	</section>
	
</div>
</template>

<script>
	import util from '@/common/js/util'
	//import NProgress from 'nprogress'
	import { getWorkListPage } from '@/api/api';
    // import FileSaver from 'file-saver'
	// import XLSX from 'xlsx'
	import xlsx from "@/common/js/xlsx.js";
	export default {
		data() {
			return {
				filters: {
					name: '',
					beginTime:'',
					endTime:''
				},
				workCount: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				pageSize:1,
				currentPage:1,//当前页
				dateList:[]
			}
		},
		computed:{

		},
		watch:{
			dateList:function(nval,oval){
               if(nval.length>0){
                 this.filters.beginTime= nval[0]
			   }
			   if(nval.length>1){
				   this.filters.endTime= nval[1]
			   }
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.currentPage =val
				this.getWorkCountPage();
			},
			 handleSizeChange(val) {
			  this.pageSize = val
			  this.getWorkCountPage();
            },
			//获取用户列表
			getWorkCountPage() {
				let para = {
					page: this.currentPage,
					pageSize:this.pageSize,
					name: this.filters.name,
					beginTime:this.filters.beginTime,
					endTime:this.filters.endTime
				};
				this.listLoading = true;
				//NProgress.start();
				getWorkListPage(para).then((res) => {
					this.total = res.data.totalCount;
					this.workCount = res.data.data;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			
			selsChange: function (sels) {
				this.sels = sels;
			},
		exportExcel () {
		let fields = {
			    id:'序号',
                publishedName:"发稿人",
				publishedCount:"发稿总量",
				pageViewCount:'浏览总量'
            }
　　　　　　　xlsx(this.workCount, fields, "工作量统计"); 
	 },
	   resetForm (){
		   
		  this.filters={
					name: '',
					beginTime:'',
					endTime:''
				}
			this.dateList=[]
	  }
		},
		mounted() {
			this.getWorkCountPage();
		}
	}

</script>