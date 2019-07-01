<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" ref="filterForm">
				<el-form-item>
					<el-input  v-model="filters.name" placeholder="上线人"></el-input>
				</el-form-item>
				<el-form-item>
				  <el-select v-model="filters.contentType" placeholder="内容类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                   </el-option>
                  </el-select>
				</el-form-item>
				<el-form-item>
					<!--
                  <el-date-picker v-model="filters.beginTime" type="datetime" placeholder="开始时间" default-time="12:00:00">
                 </el-date-picker>
                 </el-form-item>
				 <el-form-item>
                  <el-date-picker v-model="filters.endTime" type="datetime" placeholder="结束时间" default-time="12:00:00">
                 </el-date-picker>-->
				 <el-date-picker v-model="dateList" type="datetimerange" range-separator="至" unlink-panels start-placeholder="开始日期"
                     end-placeholder="结束日期">
                   </el-date-picker> 
                 </el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getContentListPage">查询</el-button>
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
		<el-table :data="contentCount" id="contentCountTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55" id="e-table-selection">
			</el-table-column> -->
			<el-table-column type="index" width="60" label="序号">
			</el-table-column>
			<el-table-column prop="contentCode" label="内容编号" width="120" >
			</el-table-column>
			<el-table-column prop="contentName" label="内容标题" width="100" >
			</el-table-column>
			<el-table-column prop="contentType" :formatter="typeFormatter" label="内容类型" width="100" >
			</el-table-column>
			<el-table-column prop="truePageViewCount" label="真浏览量" width="100" sortable>
			</el-table-column>
			<el-table-column prop="fakePageViewCount" label="假浏览量" width="100" sortable>
			</el-table-column>
			<el-table-column prop="creater" label="创建人" width="100" >
			</el-table-column>
			<el-table-column prop="online" label="上线人" width="100" >
			</el-table-column>
			<el-table-column prop="onlineTime"  label="上线时间" width="150" sortable>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
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
		</el-col>
	</section>
</template>

<script>
	import util from '@/common/js/util'
	//import NProgress from 'nprogress'
	import { getContentListPage } from '@/api/api';
    // import FileSaver from 'file-saver'
	// import XLSX from 'xlsx'
	import xlsx from "@/common/js/xlsx.js";
	export default {
		data() {
			return {
				filters: {
					name: '',
					beginTime:'',
					endTime:'',
					contentType:''
				},
				contentCount: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				pageSize:1,
				currentPage:1, //当前页
				options: [{value: '1',label: '直播'}, {value: '2',label: '图文'}, {value: '3',label: '图集'},
				          {value: '4',label: '视频'
				}],
				dateList:[]
			}
		},
		watch: {
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
			typeFormatter (row, column) {
			  let contentType = row.contentType
			  let value =''
			  for(var i in this.options){
                  if(contentType ==this.options[i].value){
					  value= this.options[i].label
					  break
				  }
			  }
			  return value
			},
			dateFormatter (row, column) {

			},
			handleCurrentChange(val) {
				this.page = val;
				this.currentPage =val
				this.getContentListPage();
			},
			 handleSizeChange(val) {
				 debugger
			  this.pageSize = val
			  this.getContentListPage();
            },
			//获取用户列表
			getContentListPage() {
				let para = {
					page: this.currentPage,
					pageSize:this.pageSize,
					name: this.filters.name,
					beginTime:this.filters.beginTime,
					endTime:this.filters.endTime,
					contentType:this.filters.contentType
				};
				this.listLoading = true;
				//NProgress.start();
				getContentListPage(para).then((res) => {
					this.total = res.data.totalCount;
					this.contentCount = res.data.data;
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
                contentCode:"内容编号",
				contentName:"内容标题",
				contentType:'内容类型',
				truePageViewCount:'真浏览量',
				fakePageViewCount:'假浏览量',
				creater:'创建人',
				online:'上线人',
				onlineTime:'上线时间'
            }
　　　　　　　xlsx(this.contentCount, fields, "内容统计"); 
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
			this.getContentListPage();
		}
	}

</script>