<template>
  <section class="section">
    <h1 class="title">{{ countdown$ }}</h1>
    <div class="buttons">
      <button :disabled="disabled" v-stream:click="snooze$" class="button is-success">Snooze</button>
      <button :disabled="disabled" v-stream:click="dismiss$" class="button is-danger">Dismiss</button>
    </div>
  </section>
</template>

<script>
import { map, startWith, scan, takeWhile, concat, repeatWhen, share, takeUntil } from 'rxjs/operators';
import { of, interval } from 'rxjs'
export default {
  domStreams: ['snooze$', 'dismiss$'],
  subscriptions() {
    const countdown$ = interval(1000).pipe(
      startWith(5), // 设置Observable的初始值
      scan(time => time - 1), // 类似于reduce 返回中间生成的值
      takeWhile(time => time > 0), // 通过函数判断Observable的值 出现不满足的值就立即完成
      concat(of('倒计时结束给你🌹！')), // 合并其他的 Observable
      share(), // 返回一个observable 共享源Observable
      repeatWhen(() => this.snooze$), // 返回的 Observalbe 是源 Observable 的镜像，除了 complete。 如果 notifier 发出值或 complete 通知，重新订阅源 Observable
      takeUntil(this.dismiss$), // 如果 notifier 发出值或 complete 通知，那么输出 Observable 停止镜像源 Observable ，然后完成
      concat(of('哈哈哈')) // 合并其他的 Observable
    )
    countdown$.subscribe((val) => {
      this.disabled = !(''+val).includes('倒计时结束给你🌹！')
    })
    return  {
      countdown$
    }
  },
  data() {
    return {
      disabled: false
    }
  }
};
</script>

<style lang="scss">

</style>
