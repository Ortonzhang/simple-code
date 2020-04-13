<template>
  <section class="section">
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
import { interval, timer, of, merge, iif } from 'rxjs'
import { switchMap, pluck, exhaustMap, debounceTime, share, map, retry, retryWhen, take, mergeMap, catchError, tap,  delay } from 'rxjs/operators'
export default {
  domStreams: ['load$', 'retry$'],

  subscriptions() {
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
    
    return {
      person$,
      name$,
      image$,
      alt$,
      error$
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
