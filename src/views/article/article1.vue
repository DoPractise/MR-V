<!--文案、文本之间的交互、滚动条、按钮、初始化、重置-->
<template>
    <div class="article">
        <div class="btn-group">
            <button @click="handleGetArticle">更新文章</button>
        </div>
        <div class="content-box">
            <div class="content" id="Content" :class="{'show': visible, 'hide': !visible }">{{articleHtml}}</div>
        </div>
    </div>
</template>
<script>
import { getArticle } from "@/api";
export default {
    name: "Article",
    data() {
        return {
            articleHtml: "",
            visible: false
        }
    },
    mounted() {
        this.getArticle();
    },
    methods: {
        handleGetArticle() {
            this.visible = false;
            this.getArticle();
        },
        getArticle() {
            const id = new Date().getTime();
            getArticle({ id })
                .then(res => {
                    this.articleHtml = res;
                    window.requestAnimationFrame(this.resetArticleContent());
                })
                .catch(err => {
                    console.log(28, err);
                });
        },
        resetArticleContent() {
            document.querySelector(".content-box .content").scrollTop = 0; // 固定值
            // document.querySelector(".content-box .content").scrollTo({top: 0, behavior: 'smooth'}); // 滑动
            this.visible = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.article {
    .btn-group {
        position: fixed;
        width: 100%;
        height: 50px;
        left: 0;
        top: 0;
        z-index: 100;
        padding: 10px 0;
        background-color: #efefef;
    }
    .content-box {
        width: 300px;
        height: 500px;
        margin: 70px auto 0;
        background-color: #eee;
    }
    .content {
        height: 460px;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;
        word-break: break-all;
        font-size: 14px;
        transition: all 0.2s ease 0s;
        -moz-transition: all 0.2s ease 0s;
        -webkit-transition: all 0.2s ease 0s;
        -o-transition: all 0.2s ease 0s;
    }
}
.show {
    visibility: visible;
}
.hide {
    visibility: hidden;
}
</style>