<template>
  <form>
    <div class="container">
      <div class="col-md-8 offset-2">
        <div class="box-header box-search">
          <h4><b>Insert CFF Number</b></h4>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <input id="input_search" type="text" style="width: 100%"/>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-default" style="float: right">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>

</template>

<script>
export default {
  name: 'CheckStatus'
}
</script>

<style scoped>
  .box-search {
    width: auto;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 9px 4px 0 rgba(119, 151, 178, 0.16);
  }

</style>
