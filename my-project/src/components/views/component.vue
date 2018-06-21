<template>
    <!-- <base-input
        v-model="username"
        class="username-input"
        placeholder="Enter your username"
    ></base-input> -->
    <div>
        <button v-for="tab in tabs"  v-bind:key="tab" :class="['tab-button', { active: currentTab === tab }]" v-on:click="currentTab = tab">{{tab}}</button>
        <keep-alive>
            <transition name="fade" mode="out-in">
                <components :is = 'currentTabComponent' class="tab"></components>
            </transition>
           
        </keep-alive>
        <!-- <btn></btn><btn></btn><btn></btn> -->
        <!-- <blog title="wow123"></blog>
        <blog title="fs35"></blog>
        <slot name="head"></slot> -->
        <button @click="show = !show">Toggle</button>
            <transition name="fade" mode="in-out">
                <p v-if="show">hello</p>
            </transition>
            <transition name="bounce">
                <p v-if="show">hi</p>
            </transition>  
            <transition name="fade" mode="out-in">
                <component v-bind:is="view"></component>
            </transition>
            <!-- <transition>
                <button :key="doc">
                    {{buttonMsg}}
                </button>    
            </transition>  -->
    </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5;
}
.bounce-leave-active {
  animation: bounce-in 0.5 reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
.posts-tab {
  display: flex;
}
.posts-sidebar {
  max-width: 40vw;
  margin: 0;
  padding: 0 10px 0 0;
  list-style-type: none;
  border-right: 1px solid #ccc;
}
.posts-sidebar li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.posts-sidebar li:hover {
  background: #eee;
}
.posts-sidebar li.selected {
  background: lightblue;
}
.selected-post-container {
  padding-left: 10px;
}
.selected-post > :first-child {
  margin-top: 0;
  padding-top: 0;
}
</style>

<script>
import todo from "@/common/todo.vue";
export default {
  data() {
    return {
      currentTab: "home",
      tabs: ["home", "posts", "archive"],
      show: true,
      view: "v-a"
    };
  },
  computed: {
    currentTabComponent: function() {
      return "tab-" + this.currentTab.toLowerCase();
    },
    buttonMsg: function() {
      switch (this.doc) {
        case "off":
          return "Edit";
        case "on":
          return "Save";
      }
    }
  },
  components: {
    todo,
    "v-a": {
      template: "<div>template A</div>"
    },
    "v-b": {
      template: "<div>template B</div>"
    }
  }
};
</script>
