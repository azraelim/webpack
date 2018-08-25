<template>
    <div class="pages-box">
        <ul class="pages" v-if="pageTotal > 0">
            <li class="pages-prev">
                <a v-if="pageNow != 1" href="javascript:void(0);" @click="prevClick">上一页</a>
            </li>
            <!--如果只有一页就不显示固定的第一个分页按钮了,避免重复-->
            <template v-if="pageTotal > 1">
                <li v-for="i in pageBegin" class="pages-li" :class="{active:i == pageNow}">
                    <span v-if="i == pageNow" v-text="i"></span>
                    <a v-else href="javascript:void(0);" @click="pageClick" v-text="i"></a>
                </li>
            </template>
            <li v-if="ellipsis[0] > slider">
                <span>...</span>
            </li>
            <li v-for="i in pageMiddle" class="pages-li" :class="{active:i == pageNow}">
                <span v-if="i == pageNow" v-text="i"></span>
                <a v-else href="javascript:void(0);" @click="pageClick" v-text="i"></a>
            </li>
            <li v-if="pageTotal - ellipsis[1] > slider">
                <span>...</span>
            </li>
            <li v-for="i in pageEnd" class="pages-li" :class="{active:i == pageNow}">
                <span v-if="i == pageNow" v-text="i"></span>
                <a v-else href="javascript:void(0);" @click="pageClick" v-text="i"></a>
            </li>
            
            <li class="pages-next">
                <a v-if="pageNow != pageTotal" href="javascript:void(0);" @click="nextClick">下一页</a>
            </li>

            <li class="jump-page">
                <span>跳转至第</span>
                <input type="number" v-model="pageNum">
                <span>页</span>
                <a href="javascript:void(0);" @click="goClick">GO</a>
            </li>
        </ul>
        <div class="blankbox" v-else>
            <div>123</div>
        </div>

    </div>
</template>

<script>
    export default{
        name: 'pages',
        props: {
            //总页数
            total: {
                type: [Number, String],
                required: true
            },
            //当前页
            now: {
                type: [Number, String],
                default: 1
            }
        },
        data() {
            return {
                //当前页
                pageNow: this.now,
                //总页数
                pageTotal: this.total,
                //输入的页码
                pageNum: "",
                //显示分页按钮的个数
                length: 8,
                //前后固定的分页按钮个数
                slider: 1
            }
        },
        watch: {
            total(val){
                let page_total = parseInt(val);
                page_total = (isNaN(page_total) || page_total < 1) ? 1 : page_total;
                this.pageTotal = page_total;

                let page_now = parseInt(this.now);
                page_now = (isNaN(page_now) || this.pageTotal < 2 || page_now < 1) ? 1 : page_now;
                page_now = page_now > this.pageTotal ? this.pageTotal : page_now;
                this.pageNow = page_now;
            },
            now(val){

                let page_now = parseInt(val);
                page_now = (isNaN(page_now) || this.pageTotal < 2 || page_now < 1) ? 1 : page_now;
                page_now = page_now > this.pageTotal ? this.pageTotal : page_now;
                this.pageNow = page_now;

            }
        },
        computed: {
            //前边显示固定分页数
            pageBegin(){
                return Math.min(this.slider, this.ellipsis[0]);
            },
            //中间显示分页数
            pageMiddle(){
                let arr = [];
                for (let i = this.ellipsis[0] + 1; i <= this.ellipsis[1]; i++) {
                    arr.push(i);
                }
                return arr;
            },
            //后边显示分页数
            pageEnd(){
                let arr = [];
                for (let i = this.ellipsis[2] + 1; i <= this.pageTotal; i++) {
                    arr.push(i);
                }
                return arr;
            },
            /**
             * 出现三个点时的分页的范围
             * @returns {*[]}
             * begin: 开始页码
             * end: 结束页码
             * end_max: 结束页码的最大值
             */
            ellipsis() {
                let end_max = this.pageTotal - this.slider;
                let begin = this.pageNow - (this.length / 2) + this.slider;
                begin = begin < 1 ? 1 : begin;
                let end = begin + this.length - 2 * this.slider;
                //当begin达到最小值后需要根据begin重新计算end以保证显示的分页按钮个数不变
                end = begin < this.slider ? (end + this.slider - begin) : end;
                if (end >= end_max) {
                    end = end_max;
                    //当end达到最大值后需要根据end重新计算begin以保证显示的分页按钮个数不变
                    begin = (end - this.length + 2 * this.slider) < 1 ? 1 : (end - this.length + 2 * this.slider);
                }
                return [begin, end, end_max];
            }
        },
        methods: {
            //上一页
            prevClick() {
                this.pageNow--;
                this.pageNow = this.pageNow < 1 ? 1 : this.pageNow;
                this.changePage(this.pageNow);
            },
            //下一页
            nextClick() {
                this.pageNow++;
                this.pageNow = this.pageNow > this.pageTotal ? this.pageTotal : this.pageNow;
                this.changePage(this.pageNow);
            },
            //点击页码
            pageClick(e) {
                this.pageNow = Number(e.target.innerHTML.trim());
                this.changePage(this.pageNow);
            },
            //输入页码
            pageInput(e){
                let num = parseInt(e.target.innerHTML);
                if(isNaN(num)){
                    this.pageNum = '';
                    e.target.innerHTML = '';
                } else {
                    this.pageNum = num;
                    //e.target.innerHTML = num;
                }
            },
            //跳转到输入的页码
            goClick() {
                this.pageNum = this.pageNum < 1 ? 1 : this.pageNum;
                this.pageNum = this.pageNum > this.pageTotal ? this.pageTotal : this.pageNum;
                this.pageNow = this.pageNum;
                this.pageNum = "";
                this.changePage(this.pageNow);
            },
            // 切换分页
            changePage(page){
                let {name, params, query} = this.$route;
                this.$router.push({
                    name,
                    params: Object.assign(params, {page}),
                    query
                });
            }
        }
    }
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
    @theme:#319bff;
    .pages-box{
        position: relative;
        padding: 5px 10px;
        margin: 20px 0;
        text-align: center;
    }
    
    .pages{
        display: inline-block;
        padding: 10px 0;
        &:after{
            content: "";
            display: table;
            line-height: 0;
            clear: both;
        }
        li{
            list-style: none;
            float: left;
            height: 20px;
            line-height: 20px;
            text-align: center;
            margin: 0 5px;
            box-sizing: border-box;
            font-size: 13px;
            span, a{
                /*display: block;
                width: 100%;
                height: 100%;
                padding: 0 2px;
                box-sizing: border-box;*/
            }
        }
        .pages-li{
            min-width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 5px;
            box-sizing: border-box;
            border: 1px solid @theme;
            color: @theme;
            a{
                display: inline-block;
                width: 100%;
                height: 100%;
                color: @theme;
            }
            &.active{
                background: @theme;
                span{
                    color: #fff;
                }
            }
        }
        .pages-prev, .pages-next{
            padding: 0 8px;
            font-size: 12px;
            a{
                display: block;
                position: relative;
                color: @theme;
                height: 30px;
                line-height: 30px;
                &:before{
                    content: '';
                    position: absolute;
                    top: 50%;
                    display: block;
                    width: 6px;
                    height: 6px;margin-top:-4px;
                    border-left: 1px solid @theme;
                    border-top: 1px solid @theme;
                }
            }
        }
        .pages-prev a{
            padding-left: 8px;
            &:before{
                transform:rotate(-45deg);
                left: 0;
            }
        }
        .pages-next a{
            padding-right: 8px;
            &:before{
                transform:rotate(135deg);
                right: 0;
            }
        }
        .pages-num{
            .num-input{
                min-width: 20px;
                height: 20px;
                padding: 0 5px;
                line-height: 20px;
                border-radius: 2px;
                border: 1px solid @theme;
                color: @theme;
                text-align: center;
                outline: none;
            }
        }
        .pages-go{
            a{
                color: @theme;
            }
            span{
                color: #666;
            }
        }
        .jump-page{
            margin-left: 20px;
            width: 140px;
            span{
                width: auto;
                float: left;
                display: inline-block;
            }
            input{
                float: left;
                display: inline-block;
                width: 30px;
                height: 20px;
                text-align: center;
                border: 1px solid #01b7ff
            }
            a{

                box-sizing: content-box;
                display: inline-block;
                width: 26px;
                height: 20px;
                line-height: 20px;
                border: 1px solid @theme;
                color: @theme;
            }
        }
    }
    .blankbox{
        height: 50px;
        display: block;
    }
</style>
