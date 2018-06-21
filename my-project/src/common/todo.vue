<script>
import Vue from "vue";
Vue.component("todo-item", {
  template: `
    <li>
      {{ title }}
      <button v-on:click="$emit('remove')">X</button>
    </li>
  `,
  props: ["title"] //props传值使用
});
Vue.component("base-input", {
  inheritAttrs: false,
  props: ["label", "value"],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
    `
});
Vue.component("tab-home", {
  data: function() {
    return {
      posts: [
        {
          id: 1,
          title: "cat",
          content: "<p>21</p>"
        },
        {
          id: 2,
          title: "hip",
          content: "<p>34</p>"
        },
        {
          id: 3,
          title: "cup",
          content: "<p>99</p>"
        }
      ],
      selectedPost : null
    };
  },
  template: `
    <div class="posts-tab">
      <ul class="posts-sidebar">
      <li v-for = "post in posts"
      :key = "post.id"
      class="{ selected: post === selectedPost }"
      @click = "selectedPost = post">
        {{post.title}}
      </li>
      </ul>
      <div class="selected-post-container">
        <div
          v-if = 'selectedPost'
          class="selected-post"
        >
          <h3>{{selectedPost.title}}</h3>
          <div v-html = 'selectedPost.content'></div>
        </div>
        <strong v-else>Click on a blog title to the left to view it</strong>
      </div>
    </div>
  `
});
Vue.component("tab-posts", {
  template: "<div>Posts component</div>"
});
Vue.component("tab-archive", {
  template: "<div>archive component</div>"
});
Vue.component("btn", {
  data: function() {
    return { count: 0 };
  },
  template: '<button v-on:click="count++">click {{count}} time</button>'
});
Vue.component("blog", {
  props: ["title"],
  template: `
    <p>{{title}}</p>
  `
});
</script>

