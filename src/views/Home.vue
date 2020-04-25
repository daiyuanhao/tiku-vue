<template>
  <div class="home">
    <div class="main">
      <div class="rowWrapper" v-for="(q,i) in questionData" :key="i">
        <div class="avatar"><img :src="'/api'+q.avatar" ></div>
        <div class="info">
          <div class="time">{{q.create_time | formatTime}}</div>
          <div class="meta"><a class="nickname">{{q.nickname}}</a>在<span class="subject">{{q.subject_name}}</span>{{q.is_admin?'发布':'分享'}}了一道{{$store.state.types[q.type]}}</div>
          <div class="content"><a @click="$router.push(`/question/${q.id}`)" v-html="q.question_name"></a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        questionData:null,
      }
    },
    created(){
      this.axios.get('/api/question/getByTime').then(res=>{
        this.questionData = res.data.rows.slice(0,10)
      })
    }
  }
</script>

<style scoped lang="stylus">
.home
  padding 10px 0
  background #ecf5ff
  min-height calc(100vh - 61px)
  .main
    background #fff
    width 1000px
    margin 0 auto
    padding 0 20px 50px
    .rowWrapper
      padding 20px 0
      display flex
      border-bottom 1px #DCDFE6 solid
      .time
        color #606266
      .avatar
        padding-right 10px
        vertical-align top
        img
          width 40px
      .meta
        margin-top 5px
        .nickname
          font-size 12px
          margin-right 5px
          &:hover
            text-decoration underline
        .subject
          font-size 12px
          margin 0 5px
      .content
        margin-top 10px
        >>> p
          margin 0
</style>