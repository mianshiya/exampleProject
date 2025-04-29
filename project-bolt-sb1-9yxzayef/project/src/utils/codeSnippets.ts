export const flexboxCode = {
  html: `<div class="container">
  <div class="left-column">左侧栏</div>
  <div class="middle-column">中间内容区</div>
  <div class="right-column">右侧栏</div>
</div>`,
  css: `.container {
  display: flex;
  width: 100%;
  height: 400px;
}

.left-column {
  width: 200px;
  background-color: #dbeafe;
}

.middle-column {
  flex: 1;
  background-color: #f3f4f6;
}

.right-column {
  width: 200px;
  background-color: #ede9fe;
}`
};

export const gridCode = {
  html: `<div class="container">
  <div class="left-column">左侧栏</div>
  <div class="middle-column">中间内容区</div>
  <div class="right-column">右侧栏</div>
</div>`,
  css: `.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  width: 100%;
  height: 400px;
}

.left-column {
  background-color: #dbeafe;
}

.middle-column {
  background-color: #f3f4f6;
}

.right-column {
  background-color: #ede9fe;
}`
};