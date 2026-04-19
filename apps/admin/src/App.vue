<script setup lang="ts">
import type { ChartConfig } from '@qr/ui/src/components/chart'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@qr/ui/src/components/chart'
import { useQuery } from '@tanstack/vue-query'
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import { computed } from 'vue'
import { orpc } from './orpc'

const { data: chartData } = useQuery(orpc.metrics.queryOptions())

interface Data { date: Date, count: number }

const chartConfig = {
  count: {
    label: 'Visitors Count',
    color: '#008bf8',
  },
} satisfies ChartConfig

const visitorCounts = computed(() => chartData.value?.reduce((acc, item) => acc += item.count, 0))
</script>

<template>
  <div class="p-8">
    <div class="text-xl mb-64">
      QR Code metrics Dashboard
    </div>
    <div class="text-lg mb-32">
      All visitors: <span class="text-green-500">{{ visitorCounts }}</span>
    </div>
    <div v-if="chartData">
      <ChartContainer :config="chartConfig" class="max-h-[400px] w-full">
        <VisXYContainer :data="chartData">
          <VisAxis
            type="x"
            :x="(d: Data) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :tick-format="(d: number) => {
              const date = new Date(d)
              return date.toLocaleDateString('en-US', {
                month: 'short',
              })
            }"
            :tick-values="chartData.map(d => d.date)"
          />
          <VisAxis
            type="y"
            :tick-format="(d: number) => ''"
            :tick-line="false"
            :domain-line="false"
            :grid-line="true"
          />
          <VisGroupedBar
            :x="(d: Data) => d.date"
            :y="[(d: Data) => d.count]"
            :color="[chartConfig.count.color]"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="
              componentToString(chartConfig, ChartTooltipContent, {
                labelFormatter(d) {
                  return new Date(d).toLocaleDateString('en-US', {
                    month: 'long',
                  });
                },
              })
            "
            :color="[chartConfig.count.color]"
          />
        </VisXYContainer>
      </ChartContainer>
    </div>
  </div>
</template>
