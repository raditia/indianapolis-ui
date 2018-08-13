<template>
  <div v-if="isShowModal">
    <div class="modal fade" id="modalUploadCff" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div v-if="isSuccess">
        <div>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <img src="/src/assets/img/success.png"/>
                <h1>SUCCESS</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <img src="/src/assets/img/failed.png"/>
                <h1>FAILED</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessModal',
  data () {
    return {

    }
  },
  props: {
    isSuccess: Boolean,
    isShowModal: Boolean
  }
}
</script>

<style>

</style>
