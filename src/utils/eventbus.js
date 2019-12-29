// 公共实例
import Vue from 'vue'
export default new Vue()
// 任何组件间的传值
// 解决   this.emit => this  当前实例触发的事件 只能当前实例监听
// 触发enentBus.$emit(‘自定义事件名’，携带参数)
// 监听eventBus.$on('事件名'，function(若干参数){})
