<template lang="pug">
  table.table.table-sm
    tr
      th Title
      th Description
      th URL
      th Created At
      th Updated At
    tr(
      v-for="item in items"
      :key="item.id"
    )
      td {{ item.name }}
      td {{ item.description }}
      td 
        a(
          :href="item.html_url"
          target="blank"
        ) {{ item.html_url }}
      td {{ item.created_at | date }}
      td {{ item.updated_at | date }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import dayjs from 'dayjs';
import { Repo } from '@/data-access/types';

@Component({
  filters: {
    date(value: string) {
      return dayjs(value).format('YYYY/MM/DD HH:mm:ss');
    },
  },
})
export default class Table extends Vue {
  @Prop({ type: Array, default: () => [] })
  public items!: Repo[];
}
</script>
