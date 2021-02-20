import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { Data } from '~/types/index'

@Module({
  name: 'data',
  stateFactory: true,
  namespaced: true,
  // dynamic: true,
})
export default class DataModule extends VuexModule {
  public data: Array<Data> = []

  public get retrieveData(): Array<Data> {
    return this.data.map((item: any) => ({
      ...item,
      url: 'https://github.com' + item.url.split('https://api.github.com/repos')[1],
      updated_at: new Date(item.updated_at).toLocaleString('en')
    }))
  }

  public get retrieveDataLength(): number {
    return this.data.length
  }

  @Mutation
  private setData(payload: Array<any>): void {
    this.data = payload.map(item => ({
      url: item.url,
      name: item.name,
      description: item.description,
      updated_at: item.updated_at
    }))
  }

  @Action({ commit: 'setData' })
  public async getData(perPage: number): Promise<Array<any>> {
    try {
      const res = await $axios.get(`/users/keiko15678/repos?page=1&per_page=${perPage}`, { headers: { Authorization: process.env.NUXT_ENV_GH_TOKEN }})
      return res && res.data
    } catch (e) {
      console.log('Error: ' + e.message)
      return []
    }
  }
}
