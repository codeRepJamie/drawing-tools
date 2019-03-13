<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-for="(item, index) in items" :key="index">
      {{item.id}}.{{item.message}}
    </p>
    <p>{{site}}</p>
    <p>{{imei}}</p>
    <button class="btn" @click="btn2Click()">动态赋值</button><br/><br/>
    <button class="btn" @click="btn3Click()">为data新增属性</button><br/><br/>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      items:[
        {message:"Test one",id:"1"},
        {message:"Test two",id:"2"},
        {message:"Test three",id:"3"}
      ],
      site: '',
      imei: null
    }
  },
  methods:{
    btn2Click: function(){
      //Vue methods中的this 指向的是Vue的实例，这里可以直接在this中找到items
      Vue.set(this.items,0,{message:"Change Test",id:'10'})
    },
    btn3Click: function(){
      var itemLen=this.items.length;
      Vue.set(this.items,itemLen,{message:"Test add attr",id:itemLen + 1});
      console.log(this.items)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

button{
  border: 1px solid #333;
}
</style>
