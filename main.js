"use strict";

F8.component("header-component", {
  template: `<h1>HEADER</h1>`,
});

F8.component("counter-app", {
  data: () => {
    return {
      count: 0,
      title: "Counter App",
    };
  },

  template: `
            <h1>{{ title }}</h1>
            <h2>Counted: {{ count }} times</h2>
            <button v-on:click="count--">-</button>
            <button v-on:click="count++">+</button>
            <button v-on:mouseover="title='Counter App Update'">Change</button>
          `,
});
