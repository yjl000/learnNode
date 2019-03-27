<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view/>
  </div>
</template>

<style lang="less">
html{
  font-size: 62.5%;
}
html,body{
  height: 100%;
  position: relative;
}
/* reset */
html, body, h1, h2, h3, h4, h5, h6, div, dl, dt, dd, ul, ol, li, p, blockquote, pre, hr, figure, table, caption, th, td, form, fieldset, legend, input, button, textarea, menu {
  margin: 0;
  padding: 0;
}
* {
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
::-ms-clear,::-ms-reveal{display:none;}

body {
  overflow: hidden;
  margin: 0 auto;
  /*background: #143d89;*/
  padding-right: 0 !important;
}

html {
  /*background: #143d89;*/
}

header, footer, section, article, aside, nav, hgroup, address, figure, figcaption, menu, details {
  display: block;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

caption, th {
  text-align: left;
  font-weight: normal;
}

html, body, fieldset, img, iframe, abbr {
  border: 0;
}

i, cite, em, var, address, dfn {
  font-style: normal;
}

[hidefocus], summary {
  outline: 0;
}

li {
  list-style: none;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
