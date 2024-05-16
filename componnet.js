class F8 {
  static component(element, initialValue) {
    class MyComponent extends HTMLElement {
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.templateHTML = initialValue.template;

        if (this.templateHTML) {
          const templateEl = document.createElement("template");
          templateEl.innerHTML = this.templateHTML;
          this.shadow.appendChild(templateEl.content.cloneNode(true));

          if (element === "counter-app") {
            this.data = initialValue.data();
            this.customerEvent(this.shadow);
            this.render();
          }
        }
      }

      handleUpdateCount(count) {
        if (count === undefined) {
          const countEl = this.shadow.querySelector("h2");
          const countValue = countEl.innerText;
          const countArr = countValue.split(/({{ count }})/);

          countEl.innerText = "";

          countArr.forEach((value, index) => {
            if (index !== 1) countEl.append(document.createTextNode(value));
            else {
              const countValue = document.createTextNode(this.data.count);
              countEl.append(countValue);

              this.textNode = countValue;
            }
          });
        } else {
          this.textNode.textContent = count;
        }
      }

      customerEvent(shadow) {
        const buttonEls = shadow.querySelectorAll("button");
        buttonEls.forEach((button) => {
          const outerHTML = button.outerHTML;

          const regex = /v-on:(\w+)="(\w+.*?)"/;
          const match = outerHTML.match(regex);

          const attributeEvent = button.getAttributeNames().toString();
          const attributeArr = attributeEvent.split(":");

          if (attributeEvent) {
            const nameEvent = attributeArr[attributeArr.length - 1];

            button.addEventListener(nameEvent, () => {
              eval(`this.data.` + match[2]);

              const count = this.data.count;

              this.handleUpdateCount(count);

              const h1 = shadow.querySelector("h1");
              h1.textContent = this.data.title;
            });
          }
        });
      }

      render() {
        const h1 = this.shadow.querySelector("h1");
        h1.innerText = this.data.title;
        this.handleUpdateCount();
      }
    }

    customElements.define(element, MyComponent);
  }
}
