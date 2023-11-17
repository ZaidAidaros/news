<template>
<v-card flat >
  <v-tabs v-model="currentWindow" fixed-tabs>
    <v-tab
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
      @click="onTab(window)"
    >
      {{ window.title }} {{ window.count }}
    </v-tab>
  </v-tabs>
  <v-window v-model="currentWindow">
    <v-window-item
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
    >
      <LoadingAndErrorSc
        :isLoading="window.loading"
        :msg="window.msg"
        :error="window.error"
      />
      <v-card flat>
        <v-virtual-scroll
          v-if="window.messages.length"
          :ref="window.scrollRef"
          :items="window.messages"
          height="700"
          item-height="70"
        >
          <template v-slot:default="{ item }">
            <VisterMsgComp
              :visterMsg="item"
              @on-deleted="deleteMsg"
              @on-updated="updateMsg"
            />
          </template>
        </v-virtual-scroll>
      </v-card>
    </v-window-item>
  </v-window>
</v-card>
</template>
<script>
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";
import VisterMsgComp from "@/components/VisterMsgComp.vue";
import adminController from "@/controllers/adminController.js";

export default {
  components: { LoadingAndErrorSc, VisterMsgComp },
  data() {
    return {
      currentWindow: "unReadedMessages",
      currentIndex: 0,
      windows: [
        {
          index: 0,
          title: "UnReaded Messages",
          value: "unReadedMessages",
          isReaded: false,
          count: 0,
          page: 0,
          messages: [],
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
        {
          index: 1,
          title: "Readed Messages",
          value: "readedMessages",
          isReaded: true,
          count: 0,
          page: 0,
          messages: [],
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
      ],
    };
  },
  async mounted() {
    await this.onTab(this.windows[0]);
  },
  methods: {
    onTab: async function (window) {
      this.currentWindow = window.value;
      this.currentIndex = window.index;
      if (!window.messages.length) {
        await this.loadMessages(window);
      }
    },
    updateMsg: function (msg) {
      const msgs = this.windows[0].messages.filter((el) => el.Id !== msg.Id);
      this.windows[0].messages = msgs;
      this.windows[0].count--;
      if (this.windows[1].isLoaded) {
        this.windows[1].messages.push(msg);
        this.windows[1].count++;
      }
    },
    deleteMsg: function (id) {
      const msgs = this.windows[this.currentIndex].messages.filter(
        (el) => el.Id !== id
      );
      this.windows[this.currentIndex].messages = msgs;
      this.windows[this.currentIndex].count--;
    },
    loadMessages: async function (window) {
      window.loading = true;
      window.error = false;
      window.msg = null;
      const res = await adminController.getVistersMsgs(
        window.page,
        window.isReaded
      );
      window.loading = false;
      if (res.state) {
        if (res.messages.length) {
          window.messages.push(...res.messages);
          window.page++;
          window.count = res.count;
          window.isLoaded = true;
        } else {
          window.msg = "There Is No Messages";
        }
      } else {
        window.msg = res.message;
        window.error = true;
      }
    },
  },
};
</script>
