<template>
  <div>
    <header class="header">
      <div class="container container__mg">
        <div class="row">
          <div class="col">
            <div class="header__title" @click="handleScrollTop">github.com/keiko15678</div>
          </div>
        </div>
      </div>
    </header>
    <div class="container container__mg">
      <div class="row">
        <div class="col">
          <main class="body">
            <Nuxt />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Default extends Vue {
  private async handleScrollTop(): Promise<void> {
    window.scrollTo(0, 0)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/utils/variables';

.header {
  position: fixed;
  width: 100vw;
  padding: $spacingL 0;
  background-color: $primary;
  font-size: $fzL;
  color: $white;
  cursor: pointer;
}

.body {
  width: 100%;
  padding-top: 64px;
  margin-top: $spacingXXL;
  margin-bottom: $spacingXXL;
}
</style>
