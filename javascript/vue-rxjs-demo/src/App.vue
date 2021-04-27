<template>
  <section class="section">
    <h1 class="title">{{ countdown$ }}</h1>
    <div class="buttons">
      <button :disabled="disabled" v-stream:click="snooze$" class="button is-success">Snooze</button>
      <button :disabled="disabled" v-stream:click="dismiss$" class="button is-danger">Dismiss</button>
    </div>
    <b-modal :active="error$">
      <h1 class="title has-text-white">出错了</h1>
      <button class="button" v-stream:click="retry$">retry</button>
    </b-modal>
    <button v-stream:click="load$" class="button">load</button>
    <h1 class="title">{{ name$ }}</h1>
    <img :src="image$" :alt="alt$">
  </section>
</template>

<script>
import { ajax } from 'rxjs/ajax'
import { 
  map, startWith, scan, takeWhile, concat, repeatWhen, share, takeUntil,
  switchMap, pluck, exhaustMap, debounceTime, retry, retryWhen, take, mergeMap, catchError, tap,  delay 
} from 'rxjs/operators';
import { of, interval, timer, merge, iif } from 'rxjs'
export default {
  domStreams: ['snooze$', 'dismiss$', 'load$', 'retry$'],
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

    let person$ = merge(
      this.load$,
      this.retry$
    ).pipe(
      debounceTime(300),
      switchMap(() => 
        ajax('http://localhost:3000/getdata').pipe(
          pluck('response'),
          // catchError((err) => of('error')),
          /**
           * 上层已经截获了error错误 下面的就不会retryWhen执行了
           * retryWhen和catchError二选一 暂时没有找到解决方案
           */
          // retryWhen(() => 
          //   of(1,2,3, 'error').pipe(
          //     // 设置根据of创建的observable递增的重新请求时间
          //     mergeMap(v => timer( v * 1000))
          //     // mergeMap(v => iif(() => v!== 'error', timer( v * 1000), of(v)))
          //   )
          // ),
          retryWhen(error => error.pipe(
            delay(1000),
            take(5)
          ))
        )
      ),
      share()
    )

    const error$ = person$.pipe(
      map(value => value === 'error')
    )
    const name$ = person$.pipe(pluck('name'))
    const image$ = person$.pipe(
      pluck('url'),
      map(val => 'http://localhost:3000/' + val)
    )
    const alt$ = person$.pipe(
      pluck('name'),
      map((val) => '这是一个:' + val))

    return  {
      countdown$,
      person$,
      name$,
      image$,
      alt$,
      error$
    }
  },
  data() {
    return {
      disabled: false
    }
  }
}
</script>

<style lang="scss">

</style>
