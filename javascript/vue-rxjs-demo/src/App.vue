<template>
  <section class="section">
    <b-tabs v-model="activeTab">
      <b-tab-item :label="people.name" :value="people.id" v-for="people in people$" :key="people.id"></b-tab-item>
    </b-tabs>
    <h1 class="title">{{ name$ }}</h1>
    <img :src="images$" :alt="alt$">
  </section>
</template>

<script>
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { take, pluck, share, map, switchAll, switchMap } from 'rxjs/operators';
export default {
  data() {
    return {
      activeTab: 1
    }
    
  },
  domStreams: [],
  subscriptions() {
    const people$ = ajax('http://localhost:3000/people').pipe(
      pluck('response')
    )

    const activeTab$ = this.$watchAsObservable(
      'activeTab',
      { immediate: true }
    ).pipe(
      pluck('newValue')
    )


    const person$ = activeTab$.pipe(
      switchMap(id => 
        ajax(`http://localhost:3000/people/${id}`).pipe(
          pluck('response'),
        )
      ),
      share()
    )

    const name$ = person$.pipe(
      pluck('name')
    )
    const images$ = person$.pipe(
      pluck('image'),
      map(value => `http://localhost:3000/${value}`)
    )
    const alt$ = name$.pipe(
      map(value => `this is ${value}`)
    )
    return {
      people$,
      name$,
      images$,
      alt$,
    }
  }
};
</script>

<style>
nav::-webkit-scrollbar{
  width: 0;
}
</style>
