<template lang="pug">
  .home(
    v-infinite-scroll="onScrollToBottom"
  )
    .bg

    Table(
      :items="items"
    )

    .loading.d-flex.justify-content-center(v-if="isLoading")
      .spinner-border.text-primary

    .error.d-flex.justify-content-center.text-danger(v-if="isError")
      | Something wrong!

    .empty.d-flex.justify-content-center.text-info(v-if="isEmpty")
      | No more data is available!
    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { uniqueId } from 'lodash/fp';
import { apiGithub } from '@/data-access/github';
import { Repo } from '@/data-access/types';
import InfiniteScroll from '@/directives/infinite-scroll';
import Table from './Table.vue';

// in order to show infinite scroll easily, I replicate my repos response
function replicateData(item: Repo) {
  return new Array(30).fill(1).map((o, i) => ({
    ...item,
    id: uniqueId('repo'),
    name: `${item.name} (${i})`,
  }));
}

@Component({
  components: {
    Table,
  },
  directives: {
    'infinite-scroll': InfiniteScroll,
  },
})
export default class Home extends Vue {
  public items: Repo[] = [];
  public page = 1;
  public perPage = 1;
  public isLoading = false;
  public isEmpty = false;
  public isError = false;

  public created() {
    this.queryData();
  }

  public onScrollToBottom() {
    if (this.isLoading || this.isEmpty) {
      return;
    }

    this.page++;
    this.queryData();
  }

  public async queryData() {
    this.isLoading = true;

    const params = {
      page: this.page,
      per_page: this.perPage,
    };
    const payload = {
      params,
      name: 'natsusola',
    };

    try {
      const res = await apiGithub.listRepo(payload);
      if (res.length) {
        this.items = [...this.items, ...replicateData(res[0])];
      }
      this.isEmpty = !res.length;
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  overflow: auto;
  flex-grow: 1;
  position: relative;
}

.table {
  position: relative;
}

.bg {
  position: absolute;
  top: 0;
  background: url('https://i.picsum.photos/id/1001/1920/1080.jpg') center center
    no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  opacity: 0.2;
}
</style>
