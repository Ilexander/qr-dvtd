<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { Sparkle } from 'lucide-vue-next'
import { motion } from 'motion-v'
import { onBeforeMount } from 'vue'
import { Button } from '@/components/ui/button'
import { orpc } from './orpc'
import { bottomAnimation, topAnimation } from './utils'

function onButtonClick(link: string) {
  window.open(link)
}

const { mutateAsync } = useMutation(orpc.auth.mutationOptions())

onBeforeMount(async () => {
  const cookieUuid = await cookieStore.get('uuid')

  if (!cookieUuid) {
    const uuid = crypto.randomUUID()
    await mutateAsync({ uuid }).then(() => {
      cookieStore.set('uuid', uuid)
    })
  }
})
</script>

<template>
  <div class="bg-black p-8 pt-16 h-screen">
    <div class="max-w-xs mx-auto space-y-4">
      <div class="flex flex-col items-center space-y-4 mb-8">
        <motion.div v-bind="topAnimation()">
          <img src="../assets/Hoodie_Back_B.png" class="invert-100 h-18">
        </motion.div>
        <motion.div v-bind="bottomAnimation(0.2)">
          <img src="../assets/logo full vertical accent w.png" class="h-26">
        </motion.div>
      </div>
      <motion.div v-bind="topAnimation(0.2)">
        <Button class="gradient-border w-full flex items-center bg-black hover:bg-white hover:text-black">
          <Sparkle /> Карта івенту
        </Button>
      </motion.div>
      <motion.div v-bind="topAnimation(0.3)">
        <Button variant="outline" class="w-full flex items-center" @click="onButtonClick('https://www.instagram.com/d.voted.ua/')">
          <img class="size-4" src="../assets/instagram.png" alt="">
          D.Voted
        </Button>
      </motion.div>
      <motion.div v-bind="topAnimation(0.4)">
        <Button variant="outline" class="w-full flex items-center">
          <img class="size-4" src="../assets/Telegram_2019_Logo.svg.png" alt="">
          Чат івенту
        </Button>
      </motion.div>
      <motion.div v-bind="topAnimation(0.5)">
        <Button variant="outline" class="w-full flex items-center" @click="onButtonClick('https://www.youtube.com/@D.REAMERS')">
          <img class="h-4" src="../assets/Youtube_logo.png" alt="">
          Канал D.Reamers
        </Button>
      </motion.div>
    </div>
  </div>
</template>
