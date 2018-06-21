
<template>
   <div>
     <!-- <div v-if="loginType === 'username'">
       <label>UserName</label>
       <input type="text" key="username-input">
     </div>
     <div v-else>
       <label>Email</label>
       <input type="text" key="email-input">
     </div> -->
     <!-- <ul>
       <li v-for="(item,index) in items" :key="(item,index)">
         {{ item.message }}{{index}}
       </li>
     </ul>
     <ol>
       <li v-for="value in object" :key = 'value'>
         {{value}}
       </li>
     </ol> -->
     <!-- <p v-for="n in even" :key="n">{{n}}</p>
     <p v-for="n in e(nums)" :key="n">{{n}}</p> -->
     <div>
       <!-- <input v-model="newTodoText" @keyup.enter="addNewTodo">
       <ul>
         <li is="todo-item" v-for="(todo,index) in todos" :key="todo.id" :title="todo.title" v-on:remove='todos.splice(index,1)'></li>
       </ul> -->
       <ul>
         <li  v-for="(item,index) in imgArray" :key="index" @click="select(index)" :class="{big: index===selectIndex}">
           <img :src="item.url" alt="">
         </li>
       </ul>
     </div>
     <!-- <input v-model="msg">
    <label >{{ msg }}</label> -->
    <!-- <div>
      <select v-model="selected">
        <option v-for="option in options" :key="option" v-bind:value="option.value">{{option.text}}</option>
      </select>
      <span>{{selected}}</span>
    </div> -->
   </div>
   
</template>
<script>
import todo from "@/common/todo.vue";
import about1 from "@/common/img/about1.jpg";
import about2 from "@/common/img/about2.jpg";
import about3 from "@/common/img/about3.jpg";
import about5 from "@/common/img/about5.jpg";  
export default {
  data() {
    return {
      items: [{ message: "Foo" }, { message: "Bar" }],
      object: {
        firstName: "John",
        lastName: "Doe",
        age: 30
      },
      nums: [1, 2, 3, 4, 5],
      msg: "",
      selected: "A",
      options: [
        { text: "One", value: "A" },
        { text: "Two", value: "B" },
        { text: "Three", value: "C" }
      ],
      newTodoText: "",
      todos: [
        {
          id: 1,
          title: "Do the dishes"
        },
        {
          id: 2,
          title: "Take out the trash"
        },
        {
          id: 3,
          title: "Mow the lawn"
        }
      ],
      nextTodoId: 4,
      imgArray: [
        { url: about1 },
        { url: about2 },
        { url: about3 },
        { url: about5 }
      ],
       selectIndex: undefined
    };
  },
  computed: {
    even: function() {
      return this.nums.filter(function(num) {
        return num % 2 === 0;
      });
    }
  },
  methods: {
    e: function(nums) {
      return nums.filter(function(num) {
        return num % 2 !== 0;
      });
    },
    addNewTodo: function() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      }),
        (this.newTodoText = "");
    },
    select (index) {
    this.selectIndex = this.selectIndex === index ? undefined : index
  }
  },
  components:{
    todo
  }
};
</script>

<style>
 img{
  transition: all .5s linear;
  transform: scale(0.5);
}
.big{
  transform: scale(2);
}
</style>

