<script setup lang="ts">
import { Sparkle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

function onButtonClick(link: string) {
  window.open(link)
}
</script>

<template>
  <div class="bg-black p-8 pt-16 h-screen">
    <div class="max-w-xs mx-auto space-y-4">
      <div class="flex flex-col items-center space-y-4 mb-8">
        <img src="../assets/Hoodie_Back_B.png" class="invert-100 h-18">
        <img src="../assets/logo full vertical accent w.png" class="h-26">
      </div>
      <Button class="gradient-border w-full flex items-center">
        <Sparkle /> Карта івенту
      </Button>
      <Button variant="outline" class="w-full flex items-center" @click="onButtonClick('https://www.instagram.com/d.voted.ua/')">
        <img class="size-4" src="../assets/instagram.png" alt="">
        D.Voted
      </Button>
      <Button variant="outline" class="w-full flex items-center">
        <img class="size-4" src="../assets/Telegram_2019_Logo.svg.png" alt="">
        Чат івенту
      </Button>
      <Button variant="outline" class="w-full flex items-center" @click="onButtonClick('https://www.youtube.com/@D.REAMERS')">
        <img class="h-4" src="../assets/Youtube_logo.png" alt="">
        Канал D.Reamers
      </Button>
    </div>
  </div>
</template>
