<template>
  <div>
    <div class="wrapper">
      <div class="wrapper__title">Repositories</div>
      <div class="wrapper__cardBox">
        <div class="card" v-for="item in getData" :key="item.id">
          <div class="card__title">{{ item.name }}</div>
          <div class="card__desc">
            <p>{{ !item.description ? 'No description provided...' : item.description }}</p>
            <div class="card__descUrl"><a :href="item.url" target="_blank" class="card__descUrlLink">Link</a></div>
            <div class="card__descDate">Latest commit: {{ item.updated_at }}</div>
          </div>
        </div>
      </div>
      <div class="wrapper__footer" v-show="pageData.isEndOfPage">End Of Page...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { dataStore } from '~/store/index'
import { PageData, Data } from '~/types/index'

@Component({
})
export default class Index extends Vue {
  private get getData(): Array<Data> {
    return dataStore.retrieveData
  }

  private pageData: PageData = {
    currentShowing: 12,
    isEndOfPage: false
  }

  private async loadData(val: number): Promise<void> {
    await this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await dataStore.getData(val)
      this.$nuxt.$loading.finish()
    })
  }

  @Watch('getData')
  private onPageChange(): void {
    if(dataStore.retrieveDataLength < this.pageData.currentShowing) {
      this.pageData.isEndOfPage = true
      window.removeEventListener('scroll', this.increasePageShowingHelper)
    }
  }

  private async increasePageShowingHelper(): Promise<void> {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      this.pageData.currentShowing += 12
      await this.loadData(this.pageData.currentShowing)
    }
  }

  private async created(): Promise<void> {
    await this.loadData(this.pageData.currentShowing)
  }

  private mounted(): void {
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.increasePageShowingHelper)
  }

  private beforeDestroy(): void {
    window.removeEventListener('scroll', this.increasePageShowingHelper)
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/main';

.wrapper {
  width: 100%;
  &__title {
    font-size: $fzXL;
    margin-bottom: $spacingL;
    color: $primary;
  }
  &__cardBox {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary;
    font-size: $fzML;
  }
}

.card {
  height: 155px;
  width: 100%;
  margin: $spacingM 15px;
  padding: $spacingM $spacingM;
  border-radius: 4px;
  border: 1px solid #ccc;
  -webkit-box-shadow: 3px 4px 3px 1px rgba(0,0,0,0.1);
  -moz-box-shadow: 3px 4px 3px 1px rgba(0,0,0,0.1);
  box-shadow: 3px 4px 3px 1px rgba(0,0,0,0.1);
  @include grid-lg {
    width: 33%;
  }
  @include grid-xl {
    width: 25%;
  }
  &__title {
    font-size: $fzL;
    margin-bottom: $spacingM;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: $spacingS 0;
  }
  &__desc {
    > p {
      margin-bottom: $spacingM;
      line-height: 1.25;
      height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: $darken;
    }
    &Url {
      margin-bottom: $spacingM;
      > a {
        color: $secondary;
      }
    }
    &Date {
      color: $lighten;
      font-size: $fzSM;
    }
  }
}
</style>
