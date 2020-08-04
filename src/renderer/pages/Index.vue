<template>
  <div className="container">
        <div style={{display: fileArr.length === 0 ? 'block' : 'none'}}>
          <Button type="primary" onClick={chooseFile}>选择文件夹开始</Button>
        </div>
      

      <div style={{display: fileArr.length === 0 ? 'none' : 'block'}}>
        
        <div className="header">
          <Input 
            placeholder="输入关键字进行搜索"
            onChange={searchVideo}
            style={{ width: 200 }} />

          <el-input @change="searchVideo" placeholder="输入关键字进行搜索" style="width: 200px"></el-input>

          <InputGroup
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
          </InputGroup>
        </div>

        <div className="videoBox">
          {
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
          }
        </div>
      
      </div>
    </div>
</template>

<script>
export default {
  mounted: {
    chooseFile() {

    },
    searchVideo() {
      const value = e.target.value
      if(value === '') {
        setShow(fileArr)
        return
      }
      const filterVal = fileArr.filter(x => {
        return x.title.includes(value) || x.id === Number(value) || String(x.name).includes(value)
      })

      setShow(filterVal)
    }
  }
}
</script>

<style scoped>
.test {
  color: #333
}
</style>