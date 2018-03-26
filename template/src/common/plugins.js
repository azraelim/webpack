/**
 * Created by Administrator on 2018/3/21.
 */

import pages from  '../common/components/pages.vue'

export default {
    install(Vue){

        Vue.component(pages.name, pages);

    }
}
