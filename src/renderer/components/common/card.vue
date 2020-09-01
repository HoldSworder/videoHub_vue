<template>
  <div>
    <el-card shadow="hover"
             :body-style="{ padding: '0px' }">
      <img :src="cardData.img"
           class="card-img" />
      <div class="card-title">
        <span>{{ cardData.title }}</span>
        <div class="card-bottom clearfix">
          <time class="card-time">{{ cardData.duration }}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['cardData']
}
</script>

<style scoped>
.card-time {
  font-size: 13px;
  color: #999;
}

.card-bottom {
  margin-top: 13px;
  line-height: 12px;
}

.card-title {
  padding: 14px;
}

.card-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 212px;
  display: inline-block;
}
</style>
