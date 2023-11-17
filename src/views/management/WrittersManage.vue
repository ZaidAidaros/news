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
  <v-card v-if="$store.getters.isSearch" class="ma-2 pa-2">
    <v-card-text>
      <v-row justify="center">
        <v-text-field
          v-model="sVal"
          color="blue"
          label="Search"
          variant="underlined"
          :clearable="true"
          @update:model-value="onSChange"
        ></v-text-field>
        <v-btn @click="onSearch" color="blue" class="ma-3">Search</v-btn>
      </v-row>
    </v-card-text>
  </v-card>
  <v-window v-model="currentWindow">
    <v-window-item
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
    >
      <v-card flat>
        <v-virtual-scroll
          :ref="window.scrollRef"
          :items="sVal ? window.fWritters : window.writters"
          height="700"
          item-height="70"
        >
          <template v-slot:default="{ item }">
            <WritterComp
              :writter="item"
              @onApprove="onApprove"
              @onStop="onStop"
              @onDelete="deleteWritter"
            />
          </template>
        </v-virtual-scroll>
      </v-card>
      <LoadingAndErrorSc
        :isLoading="window.loading"
        :msg="window.msg"
        :error="window.error"
      />
    </v-window-item>
  </v-window>
</v-card>
</template>

<script>
import adminController from "@/controllers/adminController.js";
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";
import WritterComp from "@/components/WritterComp.vue";

export default {
  components: { LoadingAndErrorSc, WritterComp },
  data() {
    return {
      currentWindow: "newWrittersRequests",
      currentIndex: 0,
      sVal: null,
      windows: [
        {
          index: 0,
          title: "New Writters Requests",
          value: "newWrittersRequests",
          isApproved: null,
          isStoped: false,
          count: 0,
          page: 0,
          writters: [],
          fWritters: [],
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
        {
          index: 1,
          title: "Writters",
          value: "writters",
          isApproved: true,
          isStoped: false,
          count: 0,
          page: 0,
          writters: [],
          fWritters: [],
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
        {
          index: 2,
          title: "Stoped Writters",
          value: "approvedWritters",
          isApproved: true,
          isStoped: true,
          count: 0,
          page: 0,
          writters: [],
          fWritters: [],
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
        {
          index: 3,
          title: "Rejected Writters",
          value: "rejectedWritters",
          isApproved: false,
          isStoped: false,
          count: 0,
          page: 0,
          writters: [],
          fWritters: [],
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
      if (!window.isLoaded) {
        await this.loadWritters(window);
      }
    },
    contains: function (prop, val) {
      if (prop) {
        return prop.includes(val);
      }
      return false;
    },
    onSChange: function () {
      if (this.sVal) {
        this.windows[this.currentIndex].msg = null;
        this.windows[this.currentIndex].fWritters = this.windows[
          this.currentIndex
        ].writters.filter((writter) => {
          return (
            this.contains(writter.firstName, this.sVal) ||
            this.contains(writter.middelName, this.sVal) ||
            this.contains(writter.lastName, this.sVal) ||
            this.contains(writter.familyName, this.sVal) ||
            this.contains(writter.nickName, this.sVal) ||
            this.contains(writter.fullName, this.sVal) ||
            this.contains(writter.nic, this.sVal) ||
            this.contains(writter.address, this.sVal)
          );
        });
      }
    },
    onSearch: async function () {
      if (this.sVal) {
        const window = this.windows[this.currentIndex];
        window.loading = true;
        window.error = false;
        window.msg = null;
        window.page = 0;
        const res = await adminController.writtersSearch(
          this.sVal,
          window.page,
          window.isApproved,
          window.isStoped
        );
        window.loading = false;
        if (res.state) {
          if (res.writters.length) {
            window.fWritters = res.writters;
            window.page++;
            window.isLoaded = true;
            if (res.count) {
              window.count = res.count;
            }
          } else {
            window.msg = "There Is No Writters";
          }
        } else {
          window.msg = res.message;
          window.error = true;
        }
      }
    },
    onApprove: function (writter) {
      const writters = this.windows[this.currentIndex].writters.filter(
        (el) => el.Id !== writter.Id
      );
      this.windows[this.currentIndex].writters = writters;
      this.windows[this.currentIndex].count--;
      if (writter.isApproved) {
        if (this.windows[1].isLoaded) {
          this.windows[1].writters.push(writter);
          this.windows[1].count++;
        }
      } else {
        if (this.windows[3].isLoaded) {
          this.windows[3].writters.push(writter);
          this.windows[3].count++;
        }
      }
    },
    onStop: function (writter) {
      console.log(writter);
      const writters = this.windows[this.currentIndex].writters.filter(
        (el) => el.Id !== writter.Id
      );
      this.windows[this.currentIndex].writters = writters;
      this.windows[this.currentIndex].count--;
      if (writter.isStoped) {
        if (this.windows[2].isLoaded) {
          this.windows[2].writters.push(writter);
          this.windows[2].count++;
        }
      } else {
        if (this.windows[1].isLoaded) {
          this.windows[1].writters.push(writter);
          this.windows[1].count++;
        }
      }
    },
    deleteWritter: function (id) {
      const writters = this.windows[this.currentIndex].writters.filter(
        (el) => el.Id !== id
      );
      this.windows[this.currentIndex].writters = writters;
      this.windows[this.currentIndex].count--;
    },
    loadWritters: async function (window) {
      window.loading = true;
      window.error = false;
      window.msg = null;
      const res = await adminController.getWritters(
        window.page,
        window.isApproved,
        window.isStoped
      );
      window.loading = false;
      if (res.state) {
        if (res.writters.length) {
          window.writters.push(...res.writters);
          if (res.count) {
            window.count = res.count;
          }
          window.page++;
          window.isLoaded = true;
        } else {
          window.msg = "There Is No Writters";
        }
      } else {
        window.msg = res.message;
        window.error = true;
      }
    },
  },
};
</script>
