<template>
  <p
    v-if="!$route.meta.hideFooter"
    class="clearfix mb-0 hidden"
  >
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://www.firsttech.co.th/"
        target="_blank"
      >Firsttech Design  </b-link>
      <span class="d-none d-sm-inline-block"> Co., Ltd.</span>
    </span>

    <!-- <span class="float-md-right d-none d-md-block">Hand-crafted &amp; Made with
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span> -->
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
