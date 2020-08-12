<template>
  <div className="container">
    <div :style="{ display: fileArr.length === 0 ? 'block' : 'none' }">
      <el-button type="primary" @click="chooseFile">选择文件夹开始</el-button>
      <!-- <Button type="primary" onClick={chooseFile}>选择文件夹开始</Button> -->
    </div>

    <div :style="{ display: fileArr.length === 0 ? 'none' : 'block' }">
      <div className="header">
        <!-- <Input 
            placeholder="输入关键字进行搜索"
            onChange={searchVideo}
            style={{ width: 200 }} /> -->

        <el-input
          @change="searchVideo"
          placeholder="输入关键字进行搜索"
          style="width: 200px"></el-input>

        <!-- <InputGroup
            style={{ width: 'auto' }}>
            <Select defaultValue="default"
              onChange={sortFiles}>
              <Option value="default">默认排序</Option>
              <Option value="TIME POSITIVE">日期升序</Option>
              <Option value="TIME NEGATIVE">日期降序</Option>
              <Option value="DURATION POSITIVE">时长升序</Option>
              <Option value="DURATION NEGATIVE">时长降序</Option>
              <Option value="CAN NOT PLAY">特殊文件</Option>
              <Option value="ERROR">错误文件</Option>
            </Select>
          </InputGroup> -->

        <el-select @change="sortFiles" v-model="sortVal">
          <el-option value="default">默认排序</el-option>
          <el-option value="TIME POSITIVE">日期升序</el-option>
          <el-option value="TIME NEGATIVE">日期降序</el-option>
          <el-option value="DURATION POSITIVE">时长升序</el-option>
          <el-option value="DURATION NEGATIVE">时长降序</el-option>
          <el-option value="CAN NOT PLAY">特殊文件</el-option>
          <el-option value="ERROR">错误文件</el-option>
        </el-select>
      </div>

      <div class="videoBox">
        <el-card v-for="(item, index) in showArr" :key="index" shadow="hover">
          <img :src="item.img" />
          <div>
            <span>{{ item.title }}</span>
            <div class="clearfix">
              <time>{{ item.duration }}</time>
            </div>
          </div>
        </el-card>
        <!-- {
            showArr.map((item, index) => {
              return (

                  <Card 
                    className="card"
                    style={{ width: 240 }}
                    cover={<img alt={item.title} src={item.img} />}
                    key={index}
                    onContextMenu={delVideo.bind(this, item)}
                    onDoubleClick={playVideo.bind(this, item)}> 
                    <Meta title={item.title} description={item.duration}></Meta>
                  </Card>
              )
            })
          } -->
      </div>
    </div>
  </div>
</template>

<script>

const {remote} = window.require('electron')
const {shell, Menu, webContents, dialog} = remote 

export default {
  data() {
    return {
      showArr: [],
      fileArr: [],
      sortVal: ''
    }
  },
  methods: {
    chooseFile() {
      dialog.showOpenDialog({
        title: '选择视频文件夹',
        properties: ['openFile', 'openDirectory']
      }).then(res => {
        saveConfig({
            dirPath: res.filePaths[0]
        })

        setFiles([])
        loadVideo()
      })
    },
    sortFiles() {},
    searchVideo() {},
  },
}
</script>

<style scoped>
.test {
  color: #333;
}
</style>
