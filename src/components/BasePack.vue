<template>
  <div class="wrapper">
    <header class="navbar_">
      <div class="logo_">
        <img class="blibli-logo" src="../assets/img/blibli-white.png"/>
      </div>
    </header>
    <aside class="sidebar_">
      <section class="sidebar">
        <ul class="sidebar-menu">
          <li>
            <h3>Dashboard</h3>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<script>

export default {
  name: 'base-pack'
}
</script>

<style>
  body {
    background-color: #eef4f9;
  }
  .navbar_ {
    position: relative;
    width: auto;
    height: 60px;
    z-index: 1030;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  }
  .sidebar_ {
    position: absolute;
    top: 0;
    left: 0;
    width: 230px;
    min-height: 100%;
    z-index: 810;
    transition: ease-in-out;
    background-color: #0064b8;
    box-shadow: 0 0 12px 0 rgba(113, 113, 113, 0.5);
  }
  .logo_ {
    width: 230px;
    height: 60px;
    background-color: #1991eb;
  }
  .blibli-logo {
    width: 132px;
    height: 47px;
    margin-left: 40px;
    margin-top: 5px;
  }
</style>
